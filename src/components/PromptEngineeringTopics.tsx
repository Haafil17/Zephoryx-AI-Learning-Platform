import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ChevronRight, BookOpen, MessageSquare, Layers, GitBranch, Repeat, Target, Brain, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export const PromptEngineeringTopics = () => {
  const concepts = [
    {
      title: "Zero-Shot Prompting",
      description: "Zero-shot prompting gives the model a task without any examples. The model relies entirely on its pre-training to generate the answer. This works well for simple, well-defined tasks. The key is writing clear, specific instructions. GPT-4o and Claude 3.5 Sonnet are strong enough for most zero-shot tasks. For ambiguous tasks, few-shot or chain-of-thought prompting performs better.",
      icon: Target,
      keyPoints: [
        "No examples provided — just instructions",
        "Works best with powerful models (GPT-4o, Claude 3.5)",
        "Add constraints: format, length, tone, audience"
      ],
      example: {
        bad: "Summarize this article.",
        good: "Summarize the following article in 3 bullet points, each under 20 words. Focus on the key findings and their practical implications. Write for a technical audience."
      },
      learnMoreUrl: "https://www.promptingguide.ai/techniques/zeroshot"
    },
    {
      title: "Few-Shot Prompting",
      description: "Few-shot prompting provides 2-5 examples of the desired input-output pattern before the actual task. This teaches the model the expected format, style, and reasoning pattern. Research by Brown et al. (GPT-3 paper) showed few-shot dramatically improves performance on complex tasks. Choose diverse, representative examples. Order matters — put the most similar example last.",
      icon: Layers,
      keyPoints: [
        "2-5 examples is the sweet spot (more can confuse smaller models)",
        "Examples should cover edge cases and diverse scenarios",
        "Label quality matters — incorrect examples degrade output"
      ],
      example: {
        bad: "Classify the sentiment of reviews.",
        good: "Classify each review as Positive, Negative, or Neutral.\n\nReview: 'The battery lasts all day, incredible!' → Positive\nReview: 'Screen cracked after one drop.' → Negative\nReview: 'It's an okay phone, nothing special.' → Neutral\n\nReview: 'Camera quality blew me away, best purchase this year!'"
      },
      learnMoreUrl: "https://www.promptingguide.ai/techniques/fewshot"
    },
    {
      title: "Chain-of-Thought (CoT)",
      description: "Chain-of-Thought prompting asks the model to show its reasoning step by step before giving the final answer. Introduced by Wei et al. (2022, Google), it dramatically improves performance on math, logic, and complex reasoning tasks. Simply adding 'Let's think step by step' can improve accuracy by 10-40% on reasoning benchmarks. CoT works best with models ≥ 100B parameters.",
      icon: GitBranch,
      keyPoints: [
        "\"Let's think step by step\" — the simplest CoT trigger",
        "Manual CoT: provide step-by-step examples in your prompt",
        "Auto-CoT: let the model generate reasoning chains automatically"
      ],
      example: {
        bad: "A store has 45 apples. They sell 12 in the morning and receive 28 more. How many?",
        good: "A store has 45 apples. They sell 12 in the morning and receive 28 more. How many apples do they have now?\n\nLet's solve this step by step:\n1. Start with the initial count\n2. Subtract what was sold\n3. Add what was received\n4. State the final answer"
      },
      learnMoreUrl: "https://arxiv.org/abs/2201.11903"
    },
    {
      title: "System Prompts & Role-Based Prompting",
      description: "System prompts set the AI's behavior, personality, constraints, and knowledge boundaries for an entire conversation. Role-based prompting assigns the model a specific persona ('You are a senior Python developer with 15 years of experience'). Effective system prompts include: role definition, task boundaries, output format, safety rules, and examples of desired behavior. Anthropic and OpenAI both recommend structured system prompts.",
      icon: MessageSquare,
      keyPoints: [
        "System prompt → sets context for the entire conversation",
        "Specific roles outperform generic ones ('senior Python dev' > 'developer')",
        "Include what the model should NOT do (negative constraints)"
      ],
      example: {
        bad: "You are a helpful assistant.",
        good: "You are a senior database architect specializing in PostgreSQL and Supabase. You have 15 years of experience designing schemas for SaaS applications.\n\nRules:\n- Always suggest Row Level Security (RLS) policies\n- Recommend indexes for common query patterns\n- Flag potential N+1 query issues\n- Never suggest storing passwords in plain text\n- Format SQL with proper indentation"
      },
      learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts"
    },
    {
      title: "ReAct Prompting (Reason + Act)",
      description: "ReAct (Yao et al., 2022) combines reasoning traces with tool-use actions in an interleaved fashion. The model: Thinks (generates reasoning about what to do), Acts (calls a tool or takes an action), Observes (processes the result), then repeats. This is the foundation of modern AI agents. LangChain's agent framework and OpenAI's function calling both implement ReAct patterns.",
      icon: Repeat,
      keyPoints: [
        "Thought → Action → Observation → loop until done",
        "Outperforms both pure reasoning and pure acting approaches",
        "Foundation pattern for LangChain agents and tool-use"
      ],
      example: {
        bad: "What's the weather in Paris and should I bring an umbrella?",
        good: "Answer the user's question using the available tools.\n\nThought: I need to find the current weather in Paris.\nAction: get_weather(city='Paris')\nObservation: Temperature: 15°C, Conditions: Light rain, Humidity: 85%\nThought: It's raining in Paris. I should recommend an umbrella.\nAnswer: The current weather in Paris is 15°C with light rain. Yes, definitely bring an umbrella!"
      },
      learnMoreUrl: "https://arxiv.org/abs/2210.03629"
    },
    {
      title: "Structured Output Prompting",
      description: "Structured output prompting ensures the model returns data in a specific, parseable format (JSON, XML, CSV, YAML). This is critical for building applications that process AI outputs programmatically. OpenAI's Structured Outputs feature guarantees valid JSON matching a JSON Schema. Anthropic's tool_use also returns structured data. For open models, use constrained decoding libraries like Outlines or guidance.",
      icon: Brain,
      keyPoints: [
        "OpenAI Structured Outputs: guaranteed valid JSON Schema conformance",
        "Anthropic tool_use: structured responses via function calling",
        "Outlines library: constrained decoding for open models"
      ],
      example: {
        bad: "Extract the name, email, and company from this text.",
        good: "Extract contact information from the following text. Return a JSON object with this exact schema:\n\n```json\n{\n  \"name\": \"string\",\n  \"email\": \"string or null\",\n  \"company\": \"string or null\",\n  \"role\": \"string or null\"\n}\n```\n\nText: \"Hi, I'm Sarah Chen from Acme Corp. Reach me at sarah@acme.com\""
      },
      learnMoreUrl: "https://platform.openai.com/docs/guides/structured-outputs"
    },
    {
      title: "Meta-Prompting & Prompt Chaining",
      description: "Meta-prompting uses an LLM to generate or optimize prompts for another LLM call. Prompt chaining breaks complex tasks into a sequence of simpler prompts, where each step's output feeds into the next step's input. This is more reliable than asking one huge prompt to do everything. Example chain: Extract key topics → Research each topic → Write sections → Combine into article → Edit for quality.",
      icon: Lightbulb,
      keyPoints: [
        "Break complex tasks into 3-5 chained prompt steps",
        "Each step should have a single, clear objective",
        "Validate intermediate outputs before passing to next step"
      ],
      example: {
        bad: "Write a comprehensive research report about quantum computing.",
        good: "Step 1 prompt: 'List the 5 most important recent developments in quantum computing (2024-2025). For each, give a one-sentence summary.'\n\nStep 2 prompt: 'For each development below, write a 200-word analysis covering: what happened, why it matters, and what comes next. [Insert Step 1 output]'\n\nStep 3 prompt: 'Combine these analyses into a cohesive report with an executive summary and conclusion. [Insert Step 2 output]'"
      },
      learnMoreUrl: "https://www.promptingguide.ai/techniques/prompt_chaining"
    },
    {
      title: "Tree-of-Thought (ToT) & Self-Consistency",
      description: "Tree-of-Thought (Yao et al., 2023) extends chain-of-thought by exploring multiple reasoning paths simultaneously and using search algorithms (BFS/DFS) to find the best solution. Self-Consistency (Wang et al., 2022) generates multiple independent reasoning chains and takes the majority vote. Both techniques significantly improve accuracy on complex reasoning tasks like math, coding challenges, and strategic planning.",
      icon: GitBranch,
      keyPoints: [
        "ToT explores multiple reasoning branches in parallel",
        "Self-Consistency: generate N answers, take the majority vote",
        "Both trade compute cost for accuracy — worth it for critical tasks"
      ],
      example: {
        bad: "Solve this logic puzzle.",
        good: "Solve this logic puzzle by exploring multiple approaches.\n\nApproach 1: Start from the constraints and work forward.\nApproach 2: Start from the answer and work backward.\nApproach 3: Eliminate impossible options first.\n\nFor each approach, show your reasoning. Then compare the results and provide the final answer that the majority of approaches agree on."
      },
      learnMoreUrl: "https://arxiv.org/abs/2305.10601"
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border-0 px-4 py-1.5">
            <Sparkles className="w-4 h-4 mr-1" /> Core Skill
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Prompt Engineering Deep Dive
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Master every major prompting technique with real examples, academic references, and practical guidance. Based on research from Google, OpenAI, and Anthropic.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {concepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md">
                      <concept.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-display">{concept.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {concept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Points:</h4>
                    <ul className="space-y-1.5">
                      {concept.keyPoints.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Example comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                      <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">❌ Weak Prompt</p>
                      <p className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">{concept.example.bad}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50">
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">✅ Strong Prompt</p>
                      <p className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">{concept.example.good}</p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-between text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30"
                    onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Read Research Paper / Docs</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Essential Resources */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Essential Prompt Engineering Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Prompting Guide", desc: "Comprehensive guide covering all major techniques with examples", url: "https://www.promptingguide.ai/" },
              { name: "OpenAI Prompt Engineering", desc: "Official best practices from OpenAI for GPT models", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
              { name: "Anthropic Prompt Library", desc: "Production-ready prompt templates from Anthropic", url: "https://docs.anthropic.com/en/prompt-library/library" },
              { name: "Google Gemini Prompting", desc: "Google's guide to prompting Gemini models effectively", url: "https://ai.google.dev/gemini-api/docs/prompting-strategies" },
              { name: "Learn Prompting", desc: "Free, open-source course on prompt engineering", url: "https://learnprompting.org/" },
              { name: "Chain-of-Thought Paper", desc: "The original CoT paper by Wei et al. (Google, 2022)", url: "https://arxiv.org/abs/2201.11903" },
            ].map((resource) => (
              <button
                key={resource.name}
                onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/20 transition-colors"
              >
                <h4 className="font-bold text-lg mb-1">{resource.name}</h4>
                <p className="text-sm text-white/80">{resource.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
