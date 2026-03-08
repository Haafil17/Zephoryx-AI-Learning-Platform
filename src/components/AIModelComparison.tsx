
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, Zap, DollarSign, Clock, CheckCircle, XCircle, ExternalLink } from "lucide-react";

interface AIModel {
  name: string;
  provider: string;
  contextWindow: string;
  inputPrice: string;
  outputPrice: string;
  multimodal: boolean;
  reasoning: string;
  coding: string;
  speed: string;
  openSource: boolean;
  releaseDate: string;
  bestFor: string[];
  docsUrl: string;
}

const models: AIModel[] = [
  {
    name: "GPT-4o",
    provider: "OpenAI",
    contextWindow: "128K",
    inputPrice: "$2.50/1M",
    outputPrice: "$10.00/1M",
    multimodal: true,
    reasoning: "9/10",
    coding: "9/10",
    speed: "Fast",
    openSource: false,
    releaseDate: "May 2024",
    bestFor: ["General purpose", "Vision tasks", "Function calling"],
    docsUrl: "https://platform.openai.com/docs/models/gpt-4o"
  },
  {
    name: "GPT-4o mini",
    provider: "OpenAI",
    contextWindow: "128K",
    inputPrice: "$0.15/1M",
    outputPrice: "$0.60/1M",
    multimodal: true,
    reasoning: "7/10",
    coding: "7/10",
    speed: "Very Fast",
    openSource: false,
    releaseDate: "Jul 2024",
    bestFor: ["Cost-effective tasks", "High volume", "Simple queries"],
    docsUrl: "https://platform.openai.com/docs/models/gpt-4o-mini"
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    contextWindow: "200K",
    inputPrice: "$3.00/1M",
    outputPrice: "$15.00/1M",
    multimodal: true,
    reasoning: "9/10",
    coding: "10/10",
    speed: "Fast",
    openSource: false,
    releaseDate: "Jun 2024",
    bestFor: ["Coding", "Analysis", "Long documents"],
    docsUrl: "https://docs.anthropic.com/en/docs/about-claude/models"
  },
  {
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    contextWindow: "200K",
    inputPrice: "$0.25/1M",
    outputPrice: "$1.25/1M",
    multimodal: true,
    reasoning: "7/10",
    coding: "7/10",
    speed: "Very Fast",
    openSource: false,
    releaseDate: "Mar 2024",
    bestFor: ["Speed-critical tasks", "Customer support", "Classification"],
    docsUrl: "https://docs.anthropic.com/en/docs/about-claude/models"
  },
  {
    name: "Gemini 2.5 Flash",
    provider: "Google",
    contextWindow: "1M",
    inputPrice: "$0.15/1M",
    outputPrice: "$0.60/1M",
    multimodal: true,
    reasoning: "8/10",
    coding: "8/10",
    speed: "Very Fast",
    openSource: false,
    releaseDate: "Mar 2025",
    bestFor: ["Long context", "Multimodal", "Cost efficiency"],
    docsUrl: "https://ai.google.dev/gemini-api/docs"
  },
  {
    name: "Gemini 2.5 Pro",
    provider: "Google",
    contextWindow: "1M",
    inputPrice: "$1.25/1M",
    outputPrice: "$10.00/1M",
    multimodal: true,
    reasoning: "9/10",
    coding: "9/10",
    speed: "Fast",
    openSource: false,
    releaseDate: "Mar 2025",
    bestFor: ["Complex reasoning", "Research", "Code generation"],
    docsUrl: "https://ai.google.dev/gemini-api/docs"
  },
  {
    name: "Llama 3.1 405B",
    provider: "Meta",
    contextWindow: "128K",
    inputPrice: "Self-hosted",
    outputPrice: "Self-hosted",
    multimodal: false,
    reasoning: "8/10",
    coding: "8/10",
    speed: "Varies",
    openSource: true,
    releaseDate: "Jul 2024",
    bestFor: ["Self-hosting", "Fine-tuning", "Privacy-sensitive"],
    docsUrl: "https://llama.meta.com/"
  },
  {
    name: "Llama 3.1 70B",
    provider: "Meta",
    contextWindow: "128K",
    inputPrice: "Self-hosted",
    outputPrice: "Self-hosted",
    multimodal: false,
    reasoning: "7/10",
    coding: "7/10",
    speed: "Fast",
    openSource: true,
    releaseDate: "Jul 2024",
    bestFor: ["On-premise", "Custom fine-tuning", "Budget-friendly"],
    docsUrl: "https://llama.meta.com/"
  },
  {
    name: "Mistral Large 2",
    provider: "Mistral AI",
    contextWindow: "128K",
    inputPrice: "$2.00/1M",
    outputPrice: "$6.00/1M",
    multimodal: false,
    reasoning: "8/10",
    coding: "8/10",
    speed: "Fast",
    openSource: false,
    releaseDate: "Jul 2024",
    bestFor: ["Multilingual", "Code", "European compliance"],
    docsUrl: "https://docs.mistral.ai/"
  },
  {
    name: "DeepSeek V3",
    provider: "DeepSeek",
    contextWindow: "128K",
    inputPrice: "$0.27/1M",
    outputPrice: "$1.10/1M",
    multimodal: false,
    reasoning: "8/10",
    coding: "9/10",
    speed: "Fast",
    openSource: true,
    releaseDate: "Dec 2024",
    bestFor: ["Coding", "Math", "Cost-effective reasoning"],
    docsUrl: "https://www.deepseek.com/"
  },
];

const [selectedModels, setSelectedModels] = [() => {}, () => {}]; // placeholder

export const AIModelComparison = () => {
  const [selected, setSelected] = useState<string[]>(["GPT-4o", "Claude 3.5 Sonnet", "Gemini 2.5 Flash"]);
  const [view, setView] = useState<"table" | "cards">("table");

  const toggleModel = (name: string) => {
    setSelected(prev => 
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

  const filteredModels = models.filter(m => selected.includes(m.name));

  const providerColor = (provider: string) => {
    const colors: Record<string, string> = {
      "OpenAI": "from-emerald-500 to-green-500",
      "Anthropic": "from-orange-500 to-amber-500",
      "Google": "from-blue-500 to-cyan-500",
      "Meta": "from-blue-600 to-indigo-500",
      "Mistral AI": "from-violet-500 to-purple-500",
      "DeepSeek": "from-sky-500 to-blue-500",
    };
    return colors[provider] || "from-gray-500 to-gray-600";
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Compare AI Models
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Side-by-side comparison of leading LLMs — pricing, capabilities, context windows, and best use cases
          </p>
        </div>

        {/* Model selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {models.map(model => (
            <Button
              key={model.name}
              variant={selected.includes(model.name) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleModel(model.name)}
              className="text-xs"
            >
              {model.name}
            </Button>
          ))}
        </div>

        {/* Comparison Table */}
        {filteredModels.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Feature</th>
                  {filteredModels.map(m => (
                    <th key={m.name} className="text-center p-3 min-w-[160px]">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-bold text-foreground text-sm">{m.name}</span>
                        <Badge variant="secondary" className="text-[10px]">{m.provider}</Badge>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground flex items-center gap-2"><Brain className="w-4 h-4" /> Context Window</td>
                  {filteredModels.map(m => <td key={m.name} className="p-3 text-center font-semibold text-foreground">{m.contextWindow}</td>)}
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4" /> Input Price</td>
                  {filteredModels.map(m => <td key={m.name} className="p-3 text-center text-foreground">{m.inputPrice}</td>)}
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4" /> Output Price</td>
                  {filteredModels.map(m => <td key={m.name} className="p-3 text-center text-foreground">{m.outputPrice}</td>)}
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground">Multimodal</td>
                  {filteredModels.map(m => <td key={m.name} className="p-3 text-center">{m.multimodal ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-muted-foreground/40 mx-auto" />}</td>)}
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground">Reasoning</td>
                  {filteredModels.map(m => <td key={m.name} className="p-3 text-center font-semibold text-foreground">{m.reasoning}</td>)}
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground">Coding</td>
                  {filteredModels.map(m => <td key={m.name} className="p-3 text-center font-semibold text-foreground">{m.coding}</td>)}
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4" /> Speed</td>
                  {filteredModels.map(m => <td key={m.name} className="p-3 text-center text-foreground">{m.speed}</td>)}
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground">Open Source</td>
                  {filteredModels.map(m => <td key={m.name} className="p-3 text-center">{m.openSource ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-muted-foreground/40 mx-auto" />}</td>)}
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground">Released</td>
                  {filteredModels.map(m => <td key={m.name} className="p-3 text-center text-muted-foreground text-xs">{m.releaseDate}</td>)}
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground">Best For</td>
                  {filteredModels.map(m => (
                    <td key={m.name} className="p-3 text-center">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {m.bestFor.map(tag => (
                          <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-muted-foreground">Docs</td>
                  {filteredModels.map(m => (
                    <td key={m.name} className="p-3 text-center">
                      <a href={m.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                        Documentation <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {filteredModels.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Brain className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>Select models above to compare them side-by-side</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-6">
          Pricing and capabilities as of early 2025. Check official documentation for the latest information.
        </p>
      </div>
    </section>
  );
};
