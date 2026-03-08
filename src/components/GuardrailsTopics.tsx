import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ChevronRight, BookOpen, AlertTriangle, Lock, Eye, Filter, ShieldCheck, Ban, FileWarning } from "lucide-react";
import { motion } from "framer-motion";

export const GuardrailsTopics = () => {
  const concepts = [
    {
      title: "What are AI Guardrails?",
      description: "Guardrails are programmatic safety layers that sit between users and AI models. They validate inputs (preventing prompt injection, jailbreaks, off-topic queries) and outputs (blocking harmful content, hallucinations, PII leakage). Unlike model alignment (which is baked into training), guardrails are runtime checks you control. They're essential for any production AI application.",
      icon: Shield,
      keyPoints: [
        "Input guardrails validate user prompts before they reach the model",
        "Output guardrails filter model responses before they reach users",
        "Guardrails are independent of the model — they work with any LLM"
      ],
      learnMoreUrl: "https://docs.nvidia.com/nemo/guardrails/getting_started/introduction.html"
    },
    {
      title: "NVIDIA NeMo Guardrails",
      description: "NeMo Guardrails is an open-source toolkit by NVIDIA for adding programmable guardrails to LLM applications. It uses Colang (a domain-specific language) to define conversational flows, topic boundaries, and safety rules. You define what the AI can and cannot discuss, how it should handle sensitive topics, and what to do when rules are violated. Works with any LLM (OpenAI, Anthropic, local models).",
      icon: ShieldCheck,
      keyPoints: [
        "Colang DSL defines conversation flows declaratively",
        "Topical rails keep the AI on-topic (e.g., only answer about your product)",
        "Fact-checking rails detect and flag hallucinations"
      ],
      learnMoreUrl: "https://github.com/NVIDIA/NeMo-Guardrails"
    },
    {
      title: "Prompt Injection & Jailbreaks",
      description: "Prompt injection is the #1 security risk in LLM applications (OWASP Top 10 for LLMs). Direct injection: users craft prompts to override system instructions ('Ignore previous instructions and...'). Indirect injection: malicious content in retrieved documents or tool outputs manipulates the model. Defenses include: input sanitization, instruction hierarchy (system > user), canary tokens, and output validation.",
      icon: AlertTriangle,
      keyPoints: [
        "OWASP ranks prompt injection as the #1 LLM security risk",
        "Indirect injection via RAG documents is harder to detect",
        "Defense-in-depth: combine multiple protection layers"
      ],
      learnMoreUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
    },
    {
      title: "Content Filtering & Moderation",
      description: "Content moderation APIs classify text and images for harmful content: hate speech, violence, sexual content, self-harm, etc. OpenAI's Moderation API is free and classifies text into 11 categories. Anthropic uses Constitutional AI to train models that self-moderate. Azure AI Content Safety provides customizable severity thresholds. For production apps, always run both input and output through moderation before displaying to users.",
      icon: Filter,
      keyPoints: [
        "OpenAI Moderation API: free, 11 harm categories, works with any text",
        "Anthropic Constitutional AI: model self-moderates based on principles",
        "Azure Content Safety: customizable thresholds per category"
      ],
      learnMoreUrl: "https://platform.openai.com/docs/guides/moderation"
    },
    {
      title: "PII Detection & Data Privacy",
      description: "LLMs can inadvertently leak personally identifiable information (PII) from training data or user inputs. Guardrails should: detect PII in inputs (names, emails, SSNs, credit cards) before sending to the model, redact PII from outputs, enforce data residency requirements. Microsoft Presidio is an open-source PII detection engine. For GDPR/HIPAA compliance, consider on-premise models or PII-stripped prompts.",
      icon: Lock,
      keyPoints: [
        "Microsoft Presidio: open-source PII detection and anonymization",
        "Regex + NER models catch structured and unstructured PII",
        "GDPR Article 17: users can request deletion of AI-processed data"
      ],
      learnMoreUrl: "https://microsoft.github.io/presidio/"
    },
    {
      title: "Hallucination Detection",
      description: "Hallucination is when an LLM generates plausible-sounding but factually incorrect information. Detection approaches: Self-consistency checking (generate multiple responses, flag disagreements), Retrieval verification (check claims against source documents), Confidence scoring (low-confidence tokens often indicate hallucination). Vectara's Hughes Hallucination Evaluation Model (HHEM) scores factual consistency. In RAG systems, compare the response against retrieved chunks.",
      icon: Eye,
      keyPoints: [
        "Self-consistency: multiple generations should agree on facts",
        "HHEM by Vectara: automated hallucination scoring model",
        "Citation verification: every claim should map to a source"
      ],
      learnMoreUrl: "https://huggingface.co/vectara/hallucination_evaluation_model"
    },
    {
      title: "Rate Limiting & Cost Control",
      description: "Without guardrails, a single user could run up massive API bills. Essential controls: per-user rate limits (requests per minute), token budgets (max tokens per request and per day), iteration limits for agents (prevent infinite loops), cost alerts and circuit breakers. Implement exponential backoff for retries. Monitor cost per user, per feature, and per model. Set hard spending caps at the API provider level.",
      icon: Ban,
      keyPoints: [
        "Token budgets prevent runaway costs from verbose prompts",
        "Agent iteration limits (e.g., max 10 tool calls) prevent loops",
        "API provider spending caps are your last line of defense"
      ],
      learnMoreUrl: "https://platform.openai.com/docs/guides/rate-limits"
    },
    {
      title: "Testing & Red-Teaming AI Systems",
      description: "Red-teaming is the practice of deliberately trying to break AI systems to find vulnerabilities. Garak is an open-source LLM vulnerability scanner that tests for prompt injection, data leakage, and harmful outputs. Microsoft's PyRIT (Python Risk Identification Toolkit) automates red-teaming at scale. Best practice: establish a red team process before deployment, test regularly, and maintain a catalog of known attack patterns.",
      icon: FileWarning,
      keyPoints: [
        "Garak: open-source LLM vulnerability scanner",
        "PyRIT by Microsoft: automated red-teaming framework",
        "NIST AI RMF provides a governance framework for AI risk"
      ],
      learnMoreUrl: "https://github.com/NVIDIA/garak"
    },
  ];

  const frameworks = [
    { name: "NeMo Guardrails", desc: "NVIDIA's open-source toolkit for programmable AI safety rails", url: "https://github.com/NVIDIA/NeMo-Guardrails" },
    { name: "Guardrails AI", desc: "Python framework for validating LLM outputs with Pydantic-like validators", url: "https://www.guardrailsai.com/" },
    { name: "LangChain Safety", desc: "Built-in moderation chains and constitutional AI chains", url: "https://python.langchain.com/docs/guides/productionization/safety/" },
    { name: "Rebuff", desc: "Self-hardening prompt injection detection service", url: "https://github.com/protectai/rebuff" },
    { name: "Microsoft Presidio", desc: "Open-source PII detection and anonymization", url: "https://microsoft.github.io/presidio/" },
    { name: "Garak", desc: "LLM vulnerability scanner for automated security testing", url: "https://github.com/NVIDIA/garak" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 border-0 px-4 py-1.5">
            <Shield className="w-4 h-4 mr-1" /> AI Safety & Security
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI Guardrails & Safety
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Production AI systems need safety layers. Learn prompt injection defense, content moderation, PII protection, hallucination detection, and red-teaming.
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
                    <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 shadow-md">
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
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                    onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Read Documentation</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Guardrails Implementation Example */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-6">Example: NeMo Guardrails Configuration</h3>
          <pre className="text-sm overflow-x-auto bg-slate-800 rounded-xl p-6 font-mono leading-relaxed">
{`# config.yml - NeMo Guardrails
models:
  - type: main
    engine: openai
    model: gpt-4o

rails:
  input:
    flows:
      - self check input        # Block prompt injection
      - check jailbreak         # Detect jailbreak attempts
  output:
    flows:
      - self check output       # Validate response safety
      - check hallucination     # Fact-check against sources

# Colang flow definition
define user ask off topic
  "Can you help me hack a website?"
  "Write malware code"

define flow
  user ask off topic
  bot refuse to respond
  bot offer to help with on topic`}
          </pre>
        </div>

        {/* Frameworks */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">AI Safety Frameworks & Tools</h3>
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
