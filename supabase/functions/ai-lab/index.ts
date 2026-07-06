import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODEL = "google/gemini-3-flash-preview";
const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

async function callAI(messages: any[], jsonMode = false) {
  const key = Deno.env.get("LOVABLE_API_KEY");
  const body: any = { model: MODEL, messages };
  if (jsonMode) body.response_format = { type: "json_object" };
  const r = await fetch(AI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key!,
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`AI ${r.status}: ${t}`);
  }
  const j = await r.json();
  return j.choices?.[0]?.message?.content ?? "";
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SRK = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const jwt = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    if (!jwt) return json({ error: "Unauthorized" }, 401);

    const authClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    const { data: ud, error: ue } = await authClient.auth.getUser(jwt);
    if (ue || !ud?.user) return json({ error: "Unauthorized" }, 401);
    const userId = ud.user.id;
    const admin = createClient(SUPABASE_URL, SRK);

    const body = await req.json();
    const action = body.action as string;

    if (action === "mentor_chat") {
      const userMsg = String(body.message || "").slice(0, 4000);
      const projectContext = String(body.projectContext || "");
      const hintMode = !!body.hintMode;

      const { data: profile } = await admin
        .from("mentor_profiles").select("*").eq("user_id", userId).maybeSingle();
      const { data: events } = await admin
        .from("mentor_events").select("kind,summary,created_at")
        .eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
      const { data: skills } = await admin
        .from("skill_scores").select("skill,score").eq("user_id", userId);

      const sys = `You are the student's personal AI Mentor at Zephoryx AI Lab. You REMEMBER them across sessions.

STUDENT PROFILE
Goal: ${profile?.goal || "Become an AI Engineer"}
Strengths: ${JSON.stringify(profile?.strengths || [])}
Weaknesses: ${JSON.stringify(profile?.weaknesses || [])}
Interests: ${JSON.stringify(profile?.interests || [])}
Notes: ${profile?.notes || "(none yet)"}

SKILL SCORES: ${JSON.stringify(skills || [])}
RECENT ACTIVITY (newest first): ${JSON.stringify(events || [])}

${projectContext ? `CURRENT PROJECT CONTEXT: ${projectContext}` : ""}

MENTOR RULES
- Reference their past mistakes and progress by name — you have memory.
- ${hintMode ? "HINT LADDER MODE: NEVER give the full answer. Give ONE hint at a time in this order: Hint 1 (nudge) → Hint 2 (concept) → Hint 3 (approach) → Explanation → Only if they explicitly ask 3+ times, the solution." : "Prefer guidance over answers. Explain the 'why'."}
- Connect new topics to concepts they already know.
- Be concise, direct, technically accurate. Use markdown.`;

      const reply = await callAI([
        { role: "system", content: sys },
        { role: "user", content: userMsg },
      ]);

      await admin.from("mentor_events").insert({
        user_id: userId, kind: "chat",
        summary: userMsg.slice(0, 200),
      });

      return json({ reply });
    }

    if (action === "review_code") {
      const projectId = String(body.projectId);
      const code = String(body.code || "").slice(0, 20000);
      const { data: project } = await admin
        .from("lab_projects").select("*").eq("id", projectId).maybeSingle();
      if (!project) return json({ error: "Project not found" }, 404);

      const sys = `You are a senior AI engineer reviewing a student's project submission.
Return STRICT JSON only, no markdown, matching:
{
  "scores": {"architecture":0-100,"code_quality":0-100,"docs":0-100,"performance":0-100,"security":0-100,"ui":0-100,"deployment":0-100},
  "overall": 0-100,
  "strengths": ["..."],
  "issues": ["..."],
  "suggestions": ["..."],
  "explanation": "1-2 paragraph mentor-style feedback",
  "skill_updates": [{"skill":"Python","delta":5}]
}`;
      const user = `Project: ${project.title}\nBrief: ${project.brief}\nLanguage: ${project.language}\n\nSTUDENT CODE:\n\`\`\`${project.language}\n${code}\n\`\`\``;
      const raw = await callAI([
        { role: "system", content: sys },
        { role: "user", content: user },
      ], true);
      let review: any = {};
      try { review = JSON.parse(raw); } catch { review = { explanation: raw, overall: 0, scores: {}, suggestions: [] }; }
      const score = Math.max(0, Math.min(100, Number(review.overall) || 0));

      const { data: sub } = await admin.from("lab_submissions").insert({
        user_id: userId, project_id: projectId, code, review, score, status: "graded",
      }).select().single();

      // Apply skill updates
      if (Array.isArray(review.skill_updates)) {
        for (const s of review.skill_updates) {
          const skill = String(s.skill || "").slice(0, 60);
          const delta = Math.max(-20, Math.min(20, Number(s.delta) || 0));
          if (!skill) continue;
          const { data: existing } = await admin
            .from("skill_scores").select("score").eq("user_id", userId).eq("skill", skill).maybeSingle();
          const next = Math.max(0, Math.min(100, (existing?.score || 0) + delta));
          await admin.from("skill_scores").upsert({ user_id: userId, skill, score: next, updated_at: new Date().toISOString() }, { onConflict: "user_id,skill" });
        }
      }

      await admin.from("mentor_events").insert({
        user_id: userId, kind: "project_submit",
        summary: `Submitted "${project.title}" — scored ${score}/100`,
        meta: { project_id: projectId, score },
      });

      return json({ submission: sub, review });
    }

    if (action === "generate_roadmap") {
      const goal = String(body.goal || "Become an AI Engineer").slice(0, 200);
      const { data: skills } = await admin.from("skill_scores").select("skill,score").eq("user_id", userId);

      const sys = `You build a 12-week actionable learning roadmap. Return STRICT JSON:
{"weeks":[{"week":1,"focus":"...","topics":["..."],"projects":["..."],"deliverable":"..."}]}
Exactly 12 weeks. Adapt to current skill levels provided.`;
      const user = `Goal: ${goal}\nCurrent skills: ${JSON.stringify(skills || [])}`;
      const raw = await callAI([
        { role: "system", content: sys },
        { role: "user", content: user },
      ], true);
      let parsed: any = { weeks: [] };
      try { parsed = JSON.parse(raw); } catch {}
      const plan = Array.isArray(parsed.weeks) ? parsed.weeks.slice(0, 12) : [];

      await admin.from("lab_roadmaps").upsert({
        user_id: userId, goal, plan, current_week: 1, updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });

      return json({ goal, plan });
    }

    if (action === "build_portfolio") {
      const submissionId = String(body.submissionId);
      const { data: sub } = await admin
        .from("lab_submissions").select("*, lab_projects(*)")
        .eq("id", submissionId).eq("user_id", userId).maybeSingle();
      if (!sub) return json({ error: "Submission not found" }, 404);

      const project = (sub as any).lab_projects;
      const sys = `Turn a student project into a polished portfolio item. Return STRICT JSON:
{"title":"...","readme":"# markdown README with sections: Overview, Features, Tech Stack, How It Works, Setup, Screenshots, Author","resume_bullet":"one strong resume bullet under 200 chars","tags":["..."]}`;
      const user = `Project: ${project.title}\nBrief: ${project.brief}\nScore: ${sub.score}\nReview: ${JSON.stringify(sub.review)}\nCode:\n\`\`\`\n${String(sub.code).slice(0, 6000)}\n\`\`\``;
      const raw = await callAI([
        { role: "system", content: sys },
        { role: "user", content: user },
      ], true);
      let p: any = {};
      try { p = JSON.parse(raw); } catch { p = { title: project.title, readme: raw, resume_bullet: "", tags: [] }; }

      const { data: item } = await admin.from("lab_portfolio").insert({
        user_id: userId,
        submission_id: submissionId,
        title: String(p.title || project.title).slice(0, 200),
        readme: String(p.readme || "").slice(0, 20000),
        resume_bullet: String(p.resume_bullet || "").slice(0, 400),
        tags: Array.isArray(p.tags) ? p.tags.slice(0, 10) : [],
      }).select().single();

      return json({ item });
    }

    if (action === "log_lesson") {
      const topic = String(body.topic || "").slice(0, 100);
      const skill = String(body.skill || topic).slice(0, 60);
      if (!topic) return json({ error: "topic required" }, 400);
      await admin.from("mentor_events").insert({
        user_id: userId, kind: "lesson_complete", summary: `Completed lesson: ${topic}`,
      });
      const { data: existing } = await admin
        .from("skill_scores").select("score").eq("user_id", userId).eq("skill", skill).maybeSingle();
      const next = Math.min(100, (existing?.score || 0) + 5);
      await admin.from("skill_scores").upsert({ user_id: userId, skill, score: next, updated_at: new Date().toISOString() }, { onConflict: "user_id,skill" });
      return json({ ok: true, score: next });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e: any) {
    console.error(e);
    return json({ error: e.message || "Server error" }, 500);
  }
});

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
