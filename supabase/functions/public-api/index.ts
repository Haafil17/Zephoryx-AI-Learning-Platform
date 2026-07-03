import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

  // --- API key auth ---
  const apiKey = req.headers.get("x-api-key") || new URL(req.url).searchParams.get("api_key");
  if (!apiKey) return json({ error: "Missing X-API-Key header" }, 401);

  const keyHash = await sha256(apiKey);
  const { data: keyRow } = await admin
    .from("api_keys")
    .select("id, revoked")
    .eq("key_hash", keyHash)
    .maybeSingle();

  if (!keyRow || keyRow.revoked) return json({ error: "Invalid or revoked API key" }, 401);

  // Fire-and-forget usage tracking
  admin.from("api_keys").update({
    last_used_at: new Date().toISOString(),
    request_count: (await admin.rpc as any) ? undefined : undefined,
  }).eq("id", keyRow.id).then(() => {});
  admin.rpc("pg_catalog.now").then(() => {}).catch(() => {});
  // simple increment via raw update
  admin.from("api_keys").select("request_count").eq("id", keyRow.id).single().then(({ data }) => {
    if (data) admin.from("api_keys").update({ request_count: (data.request_count || 0) + 1 }).eq("id", keyRow.id).then(() => {});
  });

  // --- Route ---
  const url = new URL(req.url);
  // path after /public-api
  const path = url.pathname.replace(/^.*\/public-api/, "").replace(/\/+$/, "") || "/";

  try {
    // GET /topics - list all learning topics
    if (path === "/topics" && req.method === "GET") {
      const topics = [
        "prompt-engineering", "agentic-ai", "rag", "llm-fine-tuning", "nlp",
        "computer-vision", "mlops", "deep-learning", "transformers", "embeddings",
        "ai-ethics", "genai", "mcp", "guardrails", "orchestrator", "memory-systems",
        "quantum", "ai-models", "ai-comparison", "coding", "ai-topics",
      ];
      return json({ topics });
    }

    // GET /lessons
    if (path === "/lessons" && req.method === "GET") {
      const { data, error } = await admin.from("lessons").select("*").order("order_index");
      if (error) throw error;
      return json({ lessons: data });
    }

    // GET /certificate/verify?number=ZEPH-XXXX
    if (path === "/certificate/verify" && req.method === "GET") {
      const number = url.searchParams.get("number");
      if (!number) return json({ error: "Missing 'number' param" }, 400);
      const { data } = await admin
        .from("certifications")
        .select("certificate_number, recipient_name, title, issued_at")
        .eq("certificate_number", number)
        .maybeSingle();
      return json({ valid: !!data, certificate: data || null });
    }

    // GET /models - AI model comparison
    if (path === "/models" && req.method === "GET") {
      return json({
        models: [
          { name: "GPT-4o", provider: "OpenAI", context: 128000, input_price: 2.5, output_price: 10 },
          { name: "Claude 3.5 Sonnet", provider: "Anthropic", context: 200000, input_price: 3, output_price: 15 },
          { name: "Gemini 2.5 Flash", provider: "Google", context: 1000000, input_price: 0.075, output_price: 0.3 },
          { name: "Llama 3.3 70B", provider: "Meta", context: 128000, input_price: 0.6, output_price: 0.6 },
          { name: "DeepSeek V3", provider: "DeepSeek", context: 64000, input_price: 0.27, output_price: 1.1 },
          { name: "Mistral Large", provider: "Mistral", context: 128000, input_price: 2, output_price: 6 },
        ],
      });
    }

    // POST /ai/chat  { prompt: string, system?: string }
    if (path === "/ai/chat" && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const prompt = String(body.prompt || "").slice(0, 5000);
      const system = String(body.system || "You are a helpful AI assistant.").slice(0, 2000);
      if (!prompt) return json({ error: "Missing 'prompt'" }, 400);

      const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "system", content: system }, { role: "user", content: prompt }],
        }),
      });
      if (resp.status === 429) return json({ error: "Rate limit exceeded" }, 429);
      if (resp.status === 402) return json({ error: "AI credits exhausted" }, 402);
      if (!resp.ok) return json({ error: "AI gateway error" }, 502);
      const data = await resp.json();
      return json({ result: data.choices?.[0]?.message?.content || "" });
    }

    // POST /ai/analyze-prompt  { prompt: string }
    if (path === "/ai/analyze-prompt" && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const prompt = String(body.prompt || "").slice(0, 5000);
      if (!prompt) return json({ error: "Missing 'prompt'" }, 400);

      const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: "You are a prompt engineering expert. Analyze the prompt: score Clarity, Specificity, Context, Actionability (1-10). List 3 strengths, 3 weaknesses, and provide a concise optimized version (max 6 sentences)." },
            { role: "user", content: prompt },
          ],
        }),
      });
      if (!resp.ok) return json({ error: "AI gateway error" }, 502);
      const data = await resp.json();
      return json({ analysis: data.choices?.[0]?.message?.content || "" });
    }

    // POST /ai/embed  { input: string }
    if (path === "/ai/embed" && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const input = String(body.input || "").slice(0, 8000);
      if (!input) return json({ error: "Missing 'input'" }, 400);
      const resp = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "text-embedding-3-small", input }),
      });
      if (!resp.ok) return json({ error: "Embedding error" }, 502);
      const data = await resp.json();
      return json({ embedding: data.data?.[0]?.embedding || [] });
    }

    // GET / - API index
    if (path === "/" && req.method === "GET") {
      return json({
        name: "Zephoryx AI Lab Public API",
        version: "1.0.0",
        endpoints: [
          "GET  /topics",
          "GET  /lessons",
          "GET  /models",
          "GET  /certificate/verify?number=ZEPH-XXXX",
          "POST /ai/chat            { prompt, system? }",
          "POST /ai/analyze-prompt  { prompt }",
          "POST /ai/embed           { input }",
        ],
        auth: "Send header: X-API-Key: <your-key>",
      });
    }

    return json({ error: "Not found", path }, 404);
  } catch (e) {
    console.error("public-api error", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
