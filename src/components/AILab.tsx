import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import {
  Brain, Rocket, Code2, Map, GraduationCap, LineChart,
  Send, Sparkles, Lightbulb, CheckCircle2, Loader2, Github, FileText, Plus,
} from "lucide-react";

type Tab = "mentor" | "projects" | "review" | "roadmap" | "skills" | "portfolio";

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "mentor", label: "AI Mentor", icon: Brain },
  { id: "projects", label: "Projects", icon: Rocket },
  { id: "review", label: "Code Review", icon: Code2 },
  { id: "roadmap", label: "Roadmap", icon: Map },
  { id: "skills", label: "Skill Graph", icon: LineChart },
  { id: "portfolio", label: "Portfolio", icon: GraduationCap },
];

async function callLab(action: string, payload: any = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const url = `${import.meta.env.VITE_SUPABASE_URL || "https://xnkedyucvknvzrkvogog.supabase.co"}/functions/v1/ai-lab`;
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token || ""}`,
    },
    body: JSON.stringify({ action, ...payload }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || "Request failed");
  return j;
}

export const AILab: React.FC = () => {
  const [tab, setTab] = useState<Tab>("mentor");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-primary/20 text-primary text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4" /> AI LAB · Where you become an engineer
        </div>
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Build. Get Reviewed. Ship.
        </h2>
        <p className="text-muted-foreground mt-2">Your personal AI mentor, project studio, code reviewer, and portfolio builder — all in one place.</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all border ${
              tab === t.id
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg"
                : "bg-card border-border hover:border-primary/40"
            }`}>
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        {tab === "mentor" && <MentorPanel />}
        {tab === "projects" && <ProjectsPanel />}
        {tab === "review" && <ReviewPanel />}
        {tab === "roadmap" && <RoadmapPanel />}
        {tab === "skills" && <SkillGraphPanel />}
        {tab === "portfolio" && <PortfolioPanel />}
      </motion.div>
    </div>
  );
};

// ============ MENTOR ============
const MentorPanel: React.FC = () => {
  const { user } = useAuth();
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hey — I'm your AI Mentor. I remember every lesson, mistake, and project you've done. What are we working on today?" },
  ]);
  const [input, setInput] = useState("");
  const [hintMode, setHintMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("mentor_profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (!data) {
        await supabase.from("mentor_profiles").insert({ user_id: user.id });
        const { data: created } = await supabase.from("mentor_profiles").select("*").eq("user_id", user.id).maybeSingle();
        setProfile(created);
      } else setProfile(data);
    })();
  }, [user]);

  useEffect(() => { scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setMsgs((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await callLab("mentor_chat", { message: q, hintMode });
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e: any) {
      toast.error(e.message);
    } finally { setLoading(false); }
  };

  const saveProfile = async () => {
    if (!user || !profile) return;
    await supabase.from("mentor_profiles").update({
      goal: profile.goal, notes: profile.notes,
      strengths: profile.strengths, weaknesses: profile.weaknesses,
      updated_at: new Date().toISOString(),
    }).eq("user_id", user.id);
    toast.success("Mentor updated");
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-0 overflow-hidden flex flex-col h-[600px]">
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-bold">Your AI Mentor</span>
          </div>
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input type="checkbox" checked={hintMode} onChange={(e) => setHintMode(e.target.checked)} />
            <Lightbulb className="w-3.5 h-3.5" /> Hint ladder (no full answers)
          </label>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                m.role === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "bg-muted"
              }`}>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><div className="bg-muted px-4 py-2 rounded-2xl"><Loader2 className="w-4 h-4 animate-spin" /></div></div>}
        </div>
        <div className="p-3 border-t flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything — I remember your progress..." disabled={loading} />
          <Button onClick={send} disabled={loading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <Card className="p-5 space-y-4">
        <h3 className="font-bold flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Mentor Profile</h3>
        <div>
          <label className="text-xs font-semibold text-muted-foreground">Goal</label>
          <Input value={profile?.goal || ""} onChange={(e) => setProfile({ ...profile, goal: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground">Strengths (comma-separated)</label>
          <Input value={(profile?.strengths || []).join(", ")}
            onChange={(e) => setProfile({ ...profile, strengths: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground">Weaknesses (comma-separated)</label>
          <Input value={(profile?.weaknesses || []).join(", ")}
            onChange={(e) => setProfile({ ...profile, weaknesses: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground">Notes</label>
          <Textarea value={profile?.notes || ""} onChange={(e) => setProfile({ ...profile, notes: e.target.value })} rows={4} />
        </div>
        <Button onClick={saveProfile} className="w-full">Save Profile</Button>
        <p className="text-xs text-muted-foreground">Your mentor uses this + your recent activity every time you chat.</p>
      </Card>
    </div>
  );
};

// ============ PROJECTS ============
const ProjectsPanel: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("lab_projects").select("*").order("difficulty").then(({ data }) => setProjects(data || []));
  }, []);
  const diffColor = (d: string) => ({
    beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    intermediate: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    advanced: "bg-rose-500/10 text-rose-600 border-rose-500/30",
  }[d] || "");
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((p) => (
        <Card key={p.id} className="p-5 hover:shadow-xl transition-all hover:-translate-y-1">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="outline" className="text-xs">{p.topic}</Badge>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase ${diffColor(p.difficulty)}`}>{p.difficulty}</span>
          </div>
          <h3 className="font-bold text-lg mb-1">{p.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{p.brief}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{p.language}</span>
            <Button size="sm" variant="outline" onClick={() => {
              const evt = new CustomEvent("openReview", { detail: p });
              window.dispatchEvent(evt);
              toast.success("Loaded in Code Review — switch to that tab");
            }}>
              <Code2 className="w-3.5 h-3.5 mr-1" /> Build & Review
            </Button>
          </div>
        </Card>
      ))}
      {projects.length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">Run the migration to seed projects.</p>}
    </div>
  );
};

// ============ CODE REVIEW ============
const ReviewPanel: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [projectId, setProjectId] = useState<string>("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<any>(null);
  const [lastSubmissionId, setLastSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("lab_projects").select("*").order("difficulty").then(({ data }) => {
      setProjects(data || []);
      if (data?.[0]) { setProjectId(data[0].id); setCode(data[0].starter_code || ""); }
    });
    const handler = (e: any) => {
      const p = e.detail; setProjectId(p.id); setCode(p.starter_code || ""); setReview(null);
    };
    window.addEventListener("openReview", handler);
    return () => window.removeEventListener("openReview", handler);
  }, []);

  const submit = async () => {
    if (!code.trim() || !projectId) return;
    setLoading(true); setReview(null);
    try {
      const r = await callLab("review_code", { projectId, code });
      setReview(r.review);
      setLastSubmissionId(r.submission?.id || null);
      toast.success(`Graded: ${r.review.overall}/100`);
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  const buildPortfolio = async () => {
    if (!lastSubmissionId) return;
    try {
      await callLab("build_portfolio", { submissionId: lastSubmissionId });
      toast.success("Added to portfolio!");
    } catch (e: any) { toast.error(e.message); }
  };

  const project = projects.find((p) => p.id === projectId);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-5 space-y-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground">Project</label>
          <select className="w-full mt-1 rounded-md border bg-background px-3 py-2 text-sm"
            value={projectId} onChange={(e) => {
              setProjectId(e.target.value);
              const p = projects.find((x) => x.id === e.target.value);
              setCode(p?.starter_code || ""); setReview(null);
            }}>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </div>
        {project && <p className="text-sm text-muted-foreground">{project.brief}</p>}
        <Textarea value={code} onChange={(e) => setCode(e.target.value)}
          className="font-mono text-xs min-h-[400px]" placeholder="Paste your code..." />
        <Button onClick={submit} disabled={loading} className="w-full">
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Reviewing...</> : <><Code2 className="w-4 h-4 mr-2" /> Submit for AI Review</>}
        </Button>
      </Card>

      <Card className="p-5">
        {!review && <div className="text-center text-muted-foreground py-16"><Code2 className="w-12 h-12 mx-auto mb-3 opacity-40" /><p>Submit code to get scored on architecture, quality, security, and more.</p></div>}
        {review && (
          <div className="space-y-4">
            <div className="text-center py-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-primary/20">
              <div className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{review.overall}<span className="text-2xl">/100</span></div>
              <div className="text-xs text-muted-foreground uppercase mt-1 font-semibold">Overall Score</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(review.scores || {}).map(([k, v]: any) => (
                <div key={k} className="p-2 rounded-lg bg-muted">
                  <div className="text-[10px] uppercase text-muted-foreground font-semibold">{k.replace("_", " ")}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${v}%` }} />
                    </div>
                    <span className="text-xs font-bold">{v}</span>
                  </div>
                </div>
              ))}
            </div>
            {review.explanation && (
              <div className="prose prose-sm dark:prose-invert max-w-none"><ReactMarkdown>{review.explanation}</ReactMarkdown></div>
            )}
            {review.strengths?.length > 0 && <div><h4 className="font-semibold text-sm mb-1 text-emerald-600">Strengths</h4><ul className="text-sm space-y-1 list-disc list-inside">{review.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul></div>}
            {review.issues?.length > 0 && <div><h4 className="font-semibold text-sm mb-1 text-rose-600">Issues</h4><ul className="text-sm space-y-1 list-disc list-inside">{review.issues.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul></div>}
            {review.suggestions?.length > 0 && <div><h4 className="font-semibold text-sm mb-1 text-primary">Suggestions</h4><ul className="text-sm space-y-1 list-disc list-inside">{review.suggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul></div>}
            {lastSubmissionId && <Button onClick={buildPortfolio} variant="outline" className="w-full"><Plus className="w-4 h-4 mr-1" /> Turn into Portfolio Item</Button>}
          </div>
        )}
      </Card>
    </div>
  );
};

// ============ ROADMAP ============
const RoadmapPanel: React.FC = () => {
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [goal, setGoal] = useState("Become an AI Engineer");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("lab_roadmaps").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      if (data) { setRoadmap(data); setGoal(data.goal); }
    });
  }, [user]);

  const generate = async () => {
    setLoading(true);
    try {
      const r = await callLab("generate_roadmap", { goal });
      setRoadmap({ goal: r.goal, plan: r.plan, current_week: 1 });
      toast.success("Roadmap generated");
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <Card className="p-5 flex flex-col md:flex-row gap-3 items-end">
        <div className="flex-1">
          <label className="text-xs font-semibold text-muted-foreground">Your Goal</label>
          <Input value={goal} onChange={(e) => setGoal(e.target.value)} />
        </div>
        <Button onClick={generate} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Map className="w-4 h-4 mr-2" />}
          {roadmap ? "Regenerate 12-Week Plan" : "Generate 12-Week Plan"}
        </Button>
      </Card>

      {roadmap?.plan?.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmap.plan.map((w: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="p-5 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-sm">{w.week}</div>
                  <div className="font-bold">{w.focus}</div>
                </div>
                {w.topics?.length > 0 && <div className="mb-2"><div className="text-[10px] uppercase text-muted-foreground font-semibold">Topics</div><div className="text-sm">{w.topics.join(", ")}</div></div>}
                {w.projects?.length > 0 && <div className="mb-2"><div className="text-[10px] uppercase text-muted-foreground font-semibold">Projects</div><div className="text-sm">{w.projects.join(", ")}</div></div>}
                {w.deliverable && <div><div className="text-[10px] uppercase text-muted-foreground font-semibold">Deliverable</div><div className="text-sm">{w.deliverable}</div></div>}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      {!roadmap && <p className="text-center text-muted-foreground py-8">Set a goal and generate your adaptive roadmap.</p>}
    </div>
  );
};

// ============ SKILL GRAPH ============
const DEFAULT_SKILLS = ["Python", "NumPy", "Pandas", "Machine Learning", "Deep Learning", "Transformers", "RAG Systems", "Agentic AI", "MLOps"];

const SkillGraphPanel: React.FC = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;
    supabase.from("skill_scores").select("*").eq("user_id", user.id).then(({ data }) => {
      const map: Record<string, number> = {};
      (data || []).forEach((s: any) => { map[s.skill] = s.score; });
      setScores(map);
    });
  }, [user]);

  return (
    <Card className="p-6 space-y-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <LineChart className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-lg">Your Skill Graph</h3>
      </div>
      <p className="text-sm text-muted-foreground">Scores rise when you finish lessons and get graded on projects.</p>
      <div className="space-y-3">
        {DEFAULT_SKILLS.map((skill) => {
          const score = scores[skill] || 0;
          return (
            <div key={skill}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{skill}</span>
                <span className="text-xs font-mono font-bold">{score}/100</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// ============ PORTFOLIO ============
const PortfolioPanel: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("lab_portfolio").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => setItems(data || []));
  }, [user]);

  if (selected) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setSelected(null)}>← Back</Button>
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">{selected.title}</h2>
          <div className="flex flex-wrap gap-1">
            {(selected.tags || []).map((t: string, i: number) => <Badge key={i} variant="outline">{t}</Badge>)}
          </div>
          <div className="p-3 rounded-lg bg-muted italic text-sm">"{selected.resume_bullet}"</div>
          <div>
            <div className="flex items-center gap-2 mb-2"><Github className="w-4 h-4" /><span className="font-semibold text-sm">README.md</span>
              <Button size="sm" variant="ghost" className="ml-auto" onClick={() => { navigator.clipboard.writeText(selected.readme); toast.success("Copied"); }}>Copy</Button>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none border rounded-lg p-4 bg-background/50">
              <ReactMarkdown>{selected.readme}</ReactMarkdown>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-muted-foreground">No portfolio items yet. Submit a project for review and click "Turn into Portfolio Item".</p>
        </Card>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="p-5 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1" onClick={() => setSelected(item)}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</span>
            </div>
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{item.resume_bullet}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {(item.tags || []).slice(0, 3).map((t: string, i: number) => <Badge key={i} variant="outline" className="text-[10px]">{t}</Badge>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
