import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Network, ChevronRight, BookOpen, Bot, GitBranch, Repeat, Brain, Shield } from "lucide-react";
import { motion } from "framer-motion";

export const OrchestratorTopics = () => {
  const concepts = [
    {
      title: "What are AI Orchestrators?",
      description: "AI Orchestrators (also called AI Agents or Agentic Systems) are systems that use LLMs as the reasoning engine to plan and execute multi-step tasks. Unlike simple prompt→response flows, orchestrators break complex problems into steps, use tools, maintain state across interactions, and can loop back to correct mistakes. Key frameworks: LangChain, LlamaIndex, CrewAI, AutoGen, and Semantic Kernel.",
      icon: Network,
      keyPoints: [
        "LLM acts as the 'brain' that decides what to do next",
        "Tools provide the 'hands' — APIs, databases, code execution",
        "Memory provides context across conversation turns"
      ],
      learnMoreUrl: "https://python.langchain.com/docs/concepts/agents/"
    },
    {
      title: "Agent Architectures",
      description: "ReAct (Reason + Act): The agent thinks step by step, decides on an action, observes the result, and repeats. This is the most common pattern. Plan-and-Execute: The agent creates a full plan upfront, then executes each step. Better for complex multi-step tasks. Reflection: The agent reviews its own output and iterates to improve quality. Multi-Agent: Multiple specialized agents collaborate — one researches, one writes, one reviews.",
      icon: GitBranch,
      keyPoints: [
        "ReAct: Think → Act → Observe → Repeat",
        "Plan-and-Execute: Plan all steps, then execute sequentially",
        "Multi-Agent: Specialized agents with different roles collaborate"
      ],
      learnMoreUrl: "https://blog.langchain.dev/planning-agents/"
    },
    {
      title: "LangGraph & Workflow Agents",
      description: "LangGraph (by LangChain) models agent logic as a state machine / graph. Nodes represent steps (LLM calls, tool use, human input), edges represent transitions. This gives you precise control over agent behavior: conditional branching, parallel execution, human-in-the-loop approval, and persistent state. It's the most production-ready framework for building complex agent workflows.",
      icon: Repeat,
      keyPoints: [
        "State machine model gives predictable agent behavior",
        "Supports human-in-the-loop for approval workflows",
        "Built-in checkpointing for long-running agents"
      ],
      learnMoreUrl: "https://langchain-ai.github.io/langgraph/"
    },
    {
      title: "Multi-Agent Systems",
      description: "Multi-Agent systems use multiple AI agents with specialized roles working together. CrewAI defines agents with specific roles, goals, and backstories. Microsoft's AutoGen enables agent-to-agent conversations. Examples: A research crew with a Researcher (finds info), Writer (creates content), and Editor (reviews quality). Each agent can use different models and tools optimized for their role.",
      icon: Bot,
      keyPoints: [
        "CrewAI: Role-based agent teams with defined workflows",
        "AutoGen: Conversational agents that negotiate solutions",
        "Specialized agents outperform single general-purpose agents"
      ],
      learnMoreUrl: "https://docs.crewai.com/"
    },
    {
      title: "Tool Use & Function Calling",
      description: "Modern LLMs can decide when to call external tools. OpenAI and Anthropic both support tool/function calling — you define available tools with JSON Schema, the model decides which to call and with what arguments, your code executes the tool and returns results. This is the foundation of all agent architectures. Tools can be anything: web search, database queries, code execution, API calls, file operations.",
      icon: Brain,
      keyPoints: [
        "JSON Schema defines tool parameters and descriptions",
        "Model decides when and which tool to call",
        "Parallel tool calls allow multiple actions simultaneously"
      ],
      learnMoreUrl: "https://platform.openai.com/docs/guides/function-calling"
    },
    {
      title: "Production Agent Safety",
      description: "Deploying agents in production requires guardrails. Key concerns: Tool call validation (verify the agent isn't calling dangerous tools), Output monitoring (detect harmful or incorrect responses), Cost control (set token budgets and iteration limits), Human-in-the-loop (require approval for high-stakes actions), Sandboxing (run code execution in isolated environments). Anthropic's Constitutional AI and NeMo Guardrails by NVIDIA address these challenges.",
      icon: Shield,
      keyPoints: [
        "Set maximum iteration limits to prevent infinite loops",
        "Require human approval for destructive actions",
        "Monitor and log all tool calls for audit trails"
      ],
      learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use"
    },
  ];

  const frameworks = [
    { name: "LangChain", desc: "Most popular framework for building LLM applications and agents", url: "https://python.langchain.com/" },
    { name: "LangGraph", desc: "State machine framework for complex agent workflows", url: "https://langchain-ai.github.io/langgraph/" },
    { name: "LlamaIndex", desc: "Data framework for LLM apps — best for RAG and data agents", url: "https://docs.llamaindex.ai/" },
    { name: "CrewAI", desc: "Role-based multi-agent orchestration framework", url: "https://docs.crewai.com/" },
    { name: "AutoGen", desc: "Microsoft's multi-agent conversation framework", url: "https://microsoft.github.io/autogen/" },
    { name: "Semantic Kernel", desc: "Microsoft's SDK for integrating AI into apps (.NET, Python, Java)", url: "https://learn.microsoft.com/en-us/semantic-kernel/" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 border-0 px-4 py-1.5">
            <Network className="w-4 h-4 mr-1" /> Agentic AI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI Orchestrators & Agents
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Build AI systems that can reason, plan, use tools, and complete complex multi-step tasks autonomously.
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
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-md">
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
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/30"
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

        {/* Frameworks */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Popular Agent Frameworks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frameworks.map((fw) => (
              <button
                key={fw.name}
                onClick={() => window.open(fw.url, '_blank', 'noopener,noreferrer')}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/20 transition-colors"
              >
                <h4 className="font-bold text-lg mb-1">{fw.name}</h4>
                <p className="text-sm text-white/80">{fw.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
