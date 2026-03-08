import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, ChevronRight, BookOpen, Terminal, GitBranch, Bug, FileCode, Wrench, Zap, Shield, TestTube, Layers } from "lucide-react";
import { motion } from "framer-motion";

export const CodingTopics = () => {
  const concepts = [
    {
      title: "AI-Powered Code Generation",
      description: "AI code generation tools predict and write code from natural language descriptions or partial code context. GitHub Copilot (powered by Codex/GPT-4) integrates directly into VS Code and JetBrains IDEs, providing real-time suggestions as you type. Cursor is an AI-native IDE built around Claude and GPT-4 with full codebase awareness. Amazon Q Developer (formerly CodeWhisperer) is optimized for AWS services. Studies show these tools can increase developer productivity by 30-55% (GitHub, 2023).",
      icon: Code,
      keyPoints: [
        "GitHub Copilot: 55% faster task completion (GitHub research with Accenture)",
        "Cursor: AI-native IDE with full project context, multi-file editing, and terminal integration",
        "Codeium: free alternative to Copilot with support for 70+ languages"
      ],
      learnMoreUrl: "https://github.com/features/copilot"
    },
    {
      title: "Prompt Engineering for Code",
      description: "Writing effective prompts for code generation is a distinct skill from prompting for text. Best practices: (1) Specify the language, framework, and version explicitly. (2) Describe the function signature, inputs, outputs, and edge cases. (3) Provide context about the surrounding codebase — what imports are available, what patterns are used. (4) Ask for tests alongside implementation. (5) Use few-shot examples showing your coding style. For complex features, break into smaller functions and generate each separately.",
      icon: Terminal,
      keyPoints: [
        "Always specify: language, framework version, coding style, error handling approach",
        "Include the function signature, types, and expected behavior for edge cases",
        "Ask for unit tests in the same prompt — 'Write the function AND its tests'"
      ],
      example: {
        bad: "Write a function to process user data.",
        good: "Write a TypeScript function `processUserData` that:\n- Takes a `UserInput` object with `name: string`, `email: string`, `age?: number`\n- Validates email format using regex\n- Returns `{ valid: boolean, errors: string[], sanitized: UserInput }`\n- Trims whitespace from string fields\n- Throws if name is empty\n- Include unit tests using Vitest"
      },
      learnMoreUrl: "https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot"
    },
    {
      title: "AI-Assisted Debugging",
      description: "AI transforms debugging from a time-consuming investigation into a conversation. Paste an error message, stack trace, or buggy code into Claude or ChatGPT and get immediate analysis of the root cause, explanation of why it happens, and a fix. Advanced patterns: (1) Rubber duck debugging with AI — explain the problem and let the AI ask clarifying questions. (2) Ask 'What are all the ways this code could fail?' for proactive bug finding. (3) Use AI to read unfamiliar codebases — 'Explain what this function does and identify any bugs.'",
      icon: Bug,
      keyPoints: [
        "Paste the full error message + relevant code context for accurate diagnosis",
        "Ask 'What are all the ways this could fail?' for proactive bug hunting",
        "Use AI to explain unfamiliar code before modifying it — reduces introduction of new bugs"
      ],
      learnMoreUrl: "https://docs.cursor.com/"
    },
    {
      title: "Code Review with AI",
      description: "AI code review tools analyze pull requests for bugs, security vulnerabilities, performance issues, and style violations. CodeRabbit reviews PRs on GitHub/GitLab with contextual comments. Amazon CodeGuru identifies expensive code patterns and security issues. SonarQube with AI plugins detects code smells and technical debt. Best practice: use AI review as a first pass before human review — it catches obvious issues and frees human reviewers to focus on architecture and logic decisions.",
      icon: GitBranch,
      keyPoints: [
        "CodeRabbit: AI-powered PR reviews with line-by-line comments on GitHub/GitLab",
        "Amazon CodeGuru: detects expensive operations, concurrency issues, security vulnerabilities",
        "AI review catches ~30% of bugs that human reviewers miss (Microsoft Research)"
      ],
      learnMoreUrl: "https://www.coderabbit.ai/"
    },
    {
      title: "AI Test Generation",
      description: "AI can generate comprehensive test suites from code or specifications. Approaches: (1) Generate unit tests from function implementations — AI reads the code and generates tests covering happy paths, edge cases, and error conditions. (2) Generate tests from requirements — describe what the function should do, AI writes tests before implementation (TDD with AI). (3) Mutation testing — AI creates variations of code to verify test coverage. Tools: Copilot generates inline tests, Codium AI specializes in test generation, and Diffblue Cover generates Java unit tests automatically.",
      icon: TestTube,
      keyPoints: [
        "CodiumAI: generates comprehensive test suites with edge cases from function code",
        "TDD with AI: write the requirement → AI generates tests → then implement to pass",
        "Always review AI-generated tests — they may miss domain-specific edge cases"
      ],
      learnMoreUrl: "https://www.codium.ai/"
    },
    {
      title: "Full-Stack AI Development",
      description: "AI-first development platforms generate entire applications from descriptions. Lovable generates full React + Tailwind + Supabase applications from natural language. Vercel's v0 generates React components from prompts using shadcn/ui. Bolt.new by StackBlitz generates and deploys full-stack apps in the browser. Replit Agent builds and deploys applications with an AI that can install packages, create files, and run the dev server. These tools are best for MVPs, prototypes, and learning.",
      icon: Layers,
      keyPoints: [
        "Lovable: generates production React + TypeScript + Supabase apps from descriptions",
        "v0 by Vercel: generates and previews React components using shadcn/ui",
        "Bolt.new: full-stack app generation with in-browser dev environment and deployment"
      ],
      learnMoreUrl: "https://lovable.dev/"
    },
    {
      title: "AI for DevOps & Infrastructure",
      description: "AI is automating infrastructure management and operations. GitHub Copilot for CLI suggests terminal commands from natural language. Amazon Q for AWS generates CloudFormation templates and troubleshoots AWS issues. Kubernetes Copilot helps manage clusters. AI-powered monitoring (Datadog AI, New Relic AI) detects anomalies, predicts incidents, and suggests root causes. For IaC (Infrastructure as Code), AI generates Terraform, Pulumi, and Docker configurations from descriptions.",
      icon: Wrench,
      keyPoints: [
        "GitHub Copilot CLI: natural language → shell commands (with explanation before execution)",
        "AI-powered observability: automatic anomaly detection and root cause analysis",
        "Generate Terraform, Docker, and CI/CD configs from natural language descriptions"
      ],
      learnMoreUrl: "https://docs.github.com/en/copilot/github-copilot-in-the-cli"
    },
    {
      title: "Security-Focused AI Coding",
      description: "AI can both introduce and detect security vulnerabilities. OWASP identifies 'insecure code generation' as a top LLM risk — AI may generate code with SQL injection, XSS, or insecure deserialization vulnerabilities. Mitigations: (1) Always review AI-generated code for security. (2) Use SAST tools (Snyk, Semgrep) on AI-generated code. (3) Ask AI to specifically review code for OWASP Top 10 vulnerabilities. (4) Use security-focused prompts: 'Write this with input validation, parameterized queries, and proper error handling.'",
      icon: Shield,
      keyPoints: [
        "40% of Copilot-generated code contains potential vulnerabilities (Stanford study)",
        "Always run SAST/DAST tools on AI-generated code before deployment",
        "Prompt: 'Review this code for OWASP Top 10 vulnerabilities and fix any issues found'"
      ],
      learnMoreUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
    },
    {
      title: "Documentation with AI",
      description: "AI generates and maintains documentation from code, reducing one of development's most neglected tasks. Use cases: (1) Generate JSDoc/docstrings from function implementations. (2) Create README files from project structure. (3) Generate API documentation from OpenAPI specs or route definitions. (4) Write architecture decision records (ADRs) from design discussions. (5) Keep docs in sync — AI detects when code changes make documentation outdated. Mintlify and Swimm specialize in AI-powered documentation.",
      icon: FileCode,
      keyPoints: [
        "Mintlify: generates and hosts beautiful documentation from your codebase",
        "Swimm: keeps documentation in sync with code changes automatically",
        "Prompt: 'Generate comprehensive JSDoc for all exported functions in this file'"
      ],
      learnMoreUrl: "https://mintlify.com/"
    },
    {
      title: "AI Coding Best Practices",
      description: "To get maximum value from AI coding tools: (1) Understand the code AI generates — don't blindly copy-paste. (2) Write clear function signatures and types first, then let AI fill the implementation. (3) Use AI for boilerplate but write core business logic yourself. (4) Always test AI-generated code thoroughly. (5) Use AI to learn — ask 'Explain why this approach is better than X.' (6) Keep context small — AI performs better on focused, single-responsibility functions than on large, complex ones.",
      icon: Zap,
      keyPoints: [
        "Type-first development: define interfaces/types → AI generates implementations",
        "Small functions: AI writes better code for focused, single-purpose functions",
        "Use AI to learn, not just to produce — ask 'why' and 'what are the trade-offs'"
      ],
      learnMoreUrl: "https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/"
    },
  ];

  const tools = [
    { name: "GitHub Copilot", desc: "AI pair programmer — real-time code suggestions in your IDE", url: "https://github.com/features/copilot" },
    { name: "Cursor", desc: "AI-native IDE with full codebase awareness and multi-file editing", url: "https://cursor.com/" },
    { name: "Lovable", desc: "Generate full-stack React + Supabase apps from natural language", url: "https://lovable.dev/" },
    { name: "v0 by Vercel", desc: "Generate React components with shadcn/ui from prompts", url: "https://v0.dev/" },
    { name: "Codeium", desc: "Free AI code completion for 70+ languages in any IDE", url: "https://codeium.com/" },
    { name: "Bolt.new", desc: "Full-stack app generation with in-browser dev and deployment", url: "https://bolt.new/" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border-0 px-4 py-1.5">
            <Code className="w-4 h-4 mr-1" /> Developer Productivity
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            AI-Powered Coding
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Master AI coding tools, prompting techniques for code, AI-assisted debugging, test generation, and security — with real tools and research-backed practices.
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
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-md">
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
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Example comparison if available */}
                  {'example' in concept && concept.example && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">❌ Vague Prompt</p>
                        <p className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">{(concept as any).example.bad}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50">
                        <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">✅ Specific Prompt</p>
                        <p className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">{(concept as any).example.good}</p>
                      </div>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full justify-between text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
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

        {/* AI Coding Tools */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Essential AI Coding Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.name}
                onClick={() => window.open(tool.url, '_blank', 'noopener,noreferrer')}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/20 transition-colors"
              >
                <h4 className="font-bold text-lg mb-1">{tool.name}</h4>
                <p className="text-sm text-white/80">{tool.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
