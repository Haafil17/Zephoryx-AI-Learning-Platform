import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, ChevronRight, BookOpen, Brain, Workflow, GitBranch, Users, Wrench, Eye, Shield } from "lucide-react";
import { motion } from "framer-motion";

export const AgenticAITopics = () => {
  const concepts = [
    {
      title: "What is Agentic AI?",
      description: "Agentic AI refers to AI systems that can autonomously pursue goals by reasoning, planning, and executing multi-step tasks with minimal human intervention. Unlike chatbots that respond to single prompts, agents maintain state, use tools, make decisions, and iterate until a goal is achieved. The term was popularized by Andrew Ng in early 2024 and represents the next evolution beyond simple LLM applications.",
      icon: Bot,
      keyPoints: [
        "Agents reason about what steps are needed to achieve a goal",
        "They use tools (APIs, databases, code execution) autonomously",
        "They can self-correct by reviewing their own outputs"
      ],
      learnMoreUrl: "https://www.deeplearning.ai/the-batch/how-agents-can-improve-llm-performance/"
    },
    {
      title: "Cognitive Architecture Patterns",
      description: "Agent cognitive architectures define how an agent thinks and acts. Key patterns: (1) Router — classifies input and routes to specialized handlers. (2) State Machine — predefined states with conditional transitions (LangGraph). (3) DAG — directed acyclic graph of tasks. (4) Autonomous — fully open-ended planning and execution. Production systems typically use state machines for predictability and reliability.",
      icon: Brain,
      keyPoints: [
        "Router pattern: simplest, best for classification-based workflows",
        "State machine (LangGraph): predictable, debuggable, production-ready",
        "Autonomous agents: most flexible but hardest to control"
      ],
      learnMoreUrl: "https://blog.langchain.dev/what-is-a-cognitive-architecture/"
    },
    {
      title: "Planning & Reasoning",
      description: "Planning is how agents break down complex goals into executable steps. Approaches: (1) ReAct — interleaved reasoning and action. (2) Plan-then-Execute — create a full plan, then execute sequentially. (3) Reflexion — the agent reviews its performance and adjusts. (4) LATS (Language Agent Tree Search) — explores multiple plans using tree search. OpenAI's o1/o3 models have built-in chain-of-thought reasoning that makes planning more reliable.",
      icon: Workflow,
      keyPoints: [
        "ReAct is the most widely implemented pattern (LangChain default)",
        "Plan-then-Execute works better for complex multi-step tasks",
        "Reflexion: agent learns from its own mistakes within a session"
      ],
      learnMoreUrl: "https://arxiv.org/abs/2310.04406"
    },
    {
      title: "Memory Systems for Agents",
      description: "Agents need memory to maintain context across interactions. Short-term memory: the conversation history within a session (typically last N messages or a sliding window). Long-term memory: persisted information across sessions using vector databases or knowledge graphs. Working memory: scratch space for the current task (intermediate results, plans). Mem0 and Zep are purpose-built memory layers for AI agents.",
      icon: Eye,
      keyPoints: [
        "Short-term: conversation buffer, sliding window, or summary",
        "Long-term: vector store (Pinecone, pgvector) for cross-session recall",
        "Mem0 and Zep: dedicated memory infrastructure for agents"
      ],
      learnMoreUrl: "https://mem0.ai/"
    },
    {
      title: "Multi-Agent Collaboration",
      description: "Multi-agent systems use multiple specialized AI agents working together. Each agent has a specific role, tools, and expertise. Communication patterns: (1) Sequential — agents work in a pipeline (researcher → writer → editor). (2) Hierarchical — a manager agent delegates to worker agents. (3) Debate — agents argue different positions to reach better answers. Frameworks: CrewAI, AutoGen (Microsoft), Swarm (OpenAI experimental).",
      icon: Users,
      keyPoints: [
        "CrewAI: define agents with roles, goals, tools, and delegation rules",
        "AutoGen: agents have conversations to solve problems collaboratively",
        "OpenAI Swarm: lightweight, experimental multi-agent framework"
      ],
      learnMoreUrl: "https://docs.crewai.com/concepts/agents"
    },
    {
      title: "Tool Integration & A2A Protocol",
      description: "Tools extend agent capabilities beyond text generation. Common tools: web search (Tavily, Brave), code execution (E2B sandbox), browser automation (Playwright), database access, and API calls. Google's Agent-to-Agent (A2A) protocol (April 2025) enables agents built on different frameworks to discover and communicate with each other, complementing MCP which handles tool integration.",
      icon: Wrench,
      keyPoints: [
        "Tavily: purpose-built search API for AI agents",
        "E2B: sandboxed code execution environment for agents",
        "A2A protocol: inter-agent communication standard by Google"
      ],
      learnMoreUrl: "https://google.github.io/A2A/"
    },
    {
      title: "Agent Evaluation & Observability",
      description: "Evaluating agents is harder than evaluating single LLM calls because agents make multiple decisions. Key metrics: task completion rate, number of steps taken, tool call accuracy, cost per task, and latency. LangSmith provides tracing and evaluation for LangChain agents. Arize Phoenix and Weights & Biases Weave offer model observability. Always trace every LLM call and tool invocation in production.",
      icon: GitBranch,
      keyPoints: [
        "LangSmith: end-to-end tracing and evaluation for agents",
        "Arize Phoenix: open-source LLM observability platform",
        "Trace every decision point to debug agent failures"
      ],
      learnMoreUrl: "https://docs.smith.langchain.com/"
    },
    {
      title: "Production Agent Best Practices",
      description: "Deploying agents to production requires: (1) Deterministic fallbacks — if the agent fails, fall back to a simpler flow. (2) Human-in-the-loop — require approval for high-stakes actions. (3) Cost budgets — set maximum token/dollar limits per task. (4) Timeout handling — agents can get stuck in loops. (5) Structured logging — log every thought, action, and observation. Start simple (router → state machine) before building autonomous agents.",
      icon: Shield,
      keyPoints: [
        "Start with deterministic workflows, add agency gradually",
        "Human-in-the-loop for any action that modifies external state",
        "Set hard limits on iterations, tokens, and cost per task"
      ],
      learnMoreUrl: "https://www.anthropic.com/engineering/building-effective-agents"
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200 border-0 px-4 py-1.5">
            <Bot className="w-4 h-4 mr-1" /> The Future of AI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Agentic AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            AI systems that reason, plan, use tools, and complete complex tasks autonomously. The next frontier beyond chatbots.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {concepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-md">
                      <concept.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-display">{concept.title}</CardTitle>
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
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                    onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Agent Architecture Diagram */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Agent Architecture Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🧠</div>
              <h4 className="font-bold text-lg mb-2">Reasoning</h4>
              <p className="text-sm text-white/80">LLM processes the goal, current state, and available tools to decide the next action</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="font-bold text-lg mb-2">Tool Use</h4>
              <p className="text-sm text-white/80">Agent calls APIs, searches the web, runs code, or queries databases</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">💾</div>
              <h4 className="font-bold text-lg mb-2">Memory</h4>
              <p className="text-sm text-white/80">Short-term (conversation), working (current task), and long-term (vector store)</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🔄</div>
              <h4 className="font-bold text-lg mb-2">Iteration</h4>
              <p className="text-sm text-white/80">Agent reviews results, adjusts plan, and repeats until the goal is achieved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
