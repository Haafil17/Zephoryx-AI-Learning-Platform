import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const requestSchema = z.object({
  action: z.enum(['analyze', 'test', 'rag', 'embed', 'mentor']),
  prompt: z.string().max(5000).optional(),
  userContext: z.object({
    xp: z.number().optional(),
    level: z.string().optional(),
    completedTopics: z.array(z.string()).optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  }).optional(),
  addToKnowledge: z.object({
    title: z.string().trim().min(1).max(200),
    content: z.string().trim().min(1).max(10000),
    category: z.string().trim().max(50)
  }).optional()
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    
    // Validate input
    const validationResult = requestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid input", 
          details: validationResult.error.errors 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { action, prompt, addToKnowledge } = validationResult.data;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    let systemPrompt = "";
    let userPrompt = prompt;
    let sources = [];
    
    if (action === "analyze") {
      systemPrompt = `You are a world-class prompt engineering expert. Analyze prompts and create CONCISE, POWERFUL optimized versions.

ANALYSIS REQUIREMENTS:
1. Score each dimension honestly (1-10): Clarity, Specificity, Context, Actionability
2. Identify 2-3 genuine strengths (be specific, not generic)
3. Identify 2-3 genuine weaknesses (be honest and constructive)
4. Provide 3-5 actionable improvement suggestions

OPTIMIZED PROMPT REQUIREMENTS - CRITICAL:
Your optimized version must be:
- CONCISE: Maximum 4-6 sentences. No fluff, no filler. Every word must earn its place.
- POWERFUL: Scores 9-10 on ALL dimensions despite being short
- DIRECT: Start with the role/task immediately. No preamble.
- STRUCTURED: Use a clear format like "You are [role]. [Task]. [Constraints]. [Output format]."
- COMPLETE: Include role, task, constraints, and output format in minimal words

DO NOT write long paragraphs. DO NOT add unnecessary context. The best prompts are SHORT and PRECISE.

EXPLANATION REQUIREMENTS:
After the optimized prompt, provide a "Why This Prompt Works:" section that:
- Lists each technique used (role prompting, constraints, output formatting) in bullet points
- Explains how each weakness was fixed
- Keeps explanations clear and educational, 2-3 sentences per point

Format your response in clear sections with the exact headers specified.`;
    } else if (action === "test") {
      systemPrompt = "You are a helpful AI assistant. Respond to the user's prompt naturally and helpfully.";
    } else if (action === "mentor") {
      const ctx = rawBody.userContext || {};
      const diffLevel = ctx.difficulty || 'intermediate';
      const explanationStyle = diffLevel === 'beginner' 
        ? 'Explain like the user is 5 years old. Use simple analogies, everyday examples, and avoid jargon.'
        : diffLevel === 'advanced'
        ? 'Give deep technical explanations with academic rigor, formulas, architecture details, and research references.'
        : 'Give clear explanations with real-world examples. Balance accessibility with technical accuracy.';
      
      systemPrompt = `You are ZEPHORYX AI Mentor — a personalized AI tutor for the ZEPHORYX AI Learning Platform.

USER CONTEXT:
- XP: ${ctx.xp || 0} | Level: ${ctx.level || 'Beginner'}
- Completed topics: ${(ctx.completedTopics || []).join(', ') || 'None yet'}
- Difficulty preference: ${diffLevel}

YOUR BEHAVIOR:
- ${explanationStyle}
- If the user asks about a topic they haven't learned, introduce it gently and suggest prerequisites.
- If they ask to be quizzed, generate 3-5 multiple choice questions on their completed topics.
- If they're struggling, simplify and use analogies.
- Be encouraging, track their growth, and suggest what to learn next based on their progress.
- Keep responses focused and under 300 words unless the user asks for detail.`;
    } else if (action === "rag") {
      // RAG: Generate embedding for the query
      const embeddingResponse = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: prompt,
        }),
      });

      if (!embeddingResponse.ok) {
        throw new Error(`Failed to generate embedding: ${embeddingResponse.status}`);
      }

      const embeddingData = await embeddingResponse.json();
      const queryEmbedding = embeddingData.data[0].embedding;

      // Search for similar content in knowledge base
      const { data: similarDocs, error: searchError } = await supabase.rpc(
        "match_knowledge_base",
        {
          query_embedding: queryEmbedding,
          match_threshold: 0.7,
          match_count: 5,
        }
      );

      if (searchError) {
        throw new Error("Failed to search knowledge base");
      }

      if (!similarDocs || similarDocs.length === 0) {
        // If no knowledge base results, use general AI knowledge
        systemPrompt = "You are a helpful AI assistant. Answer the user's question using your general knowledge. Be informative and accurate.";
      } else {
        // Compile context from retrieved documents
        const context = similarDocs
          .map((doc: any) => `Title: ${doc.title}\n${doc.content}`)
          .join("\n\n---\n\n");

        sources = similarDocs.map((doc: any) => ({
          title: doc.title,
          category: doc.category,
          similarity: doc.similarity,
        }));

        systemPrompt = `You are a helpful AI assistant. Answer the user's question based ONLY on the following context from the knowledge base. If the answer cannot be found in the context, say you don't have that information in your knowledge base.

Context:
${context}`;
      }
    } else if (action === "embed" && addToKnowledge) {
      // Generate embedding for content to add to knowledge base
      const embeddingResponse = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: addToKnowledge.content,
        }),
      });

      if (!embeddingResponse.ok) {
        throw new Error(`Failed to generate embedding: ${embeddingResponse.status}`);
      }

      const embeddingData = await embeddingResponse.json();
      const embedding = embeddingData.data[0].embedding;

      // Insert into knowledge base
      const { error: insertError } = await supabase.from("knowledge_base").insert({
        title: addToKnowledge.title,
        content: addToKnowledge.content,
        category: addToKnowledge.category,
        embedding: embedding,
      });

      if (insertError) {
        throw new Error("Failed to add to knowledge base");
      }

      return new Response(
        JSON.stringify({ result: "Successfully added to knowledge base" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    return new Response(
      JSON.stringify({ result, sources }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in prompt-ai function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
