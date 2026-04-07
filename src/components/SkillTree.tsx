
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Brain, Code, Sparkles, Database, Shield, Bot, Eye,
  FileText, Rocket, Settings, Network, Plug, Atom,
  Lock, CheckCircle2, ChevronRight, Zap, Target
} from "lucide-react";

interface SkillNode {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  tab: string;
  tier: number;
  requires: string[];
  xpRequired: number;
  description: string;
}

const skillNodes: SkillNode[] = [
  // Tier 0 - Foundations
  { id: "ai-basics", title: "AI Fundamentals", icon: Brain, color: "from-blue-500 to-cyan-500", tab: "ai", tier: 0, requires: [], xpRequired: 0, description: "Core concepts of artificial intelligence" },
  { id: "prompting", title: "Prompt Engineering", icon: Sparkles, color: "from-amber-500 to-orange-500", tab: "prompting", tier: 0, requires: [], xpRequired: 0, description: "Master the art of prompting" },

  // Tier 1 - Core Skills
  { id: "nlp", title: "NLP & Text", icon: FileText, color: "from-sky-500 to-blue-500", tab: "nlp", tier: 1, requires: ["ai-basics"], xpRequired: 100, description: "Natural language processing" },
  { id: "deep-learning", title: "Deep Learning", icon: Brain, color: "from-rose-500 to-pink-500", tab: "deeplearning", tier: 1, requires: ["ai-basics"], xpRequired: 100, description: "Neural networks and architectures" },
  { id: "genai", title: "Generative AI", icon: Sparkles, color: "from-purple-500 to-pink-500", tab: "genai", tier: 1, requires: ["prompting"], xpRequired: 100, description: "How generative models work" },

  // Tier 2 - Intermediate
  { id: "transformers", title: "Transformers", icon: Zap, color: "from-violet-500 to-purple-500", tab: "transformers", tier: 2, requires: ["deep-learning"], xpRequired: 300, description: "Attention mechanisms & architectures" },
  { id: "embeddings", title: "Embeddings", icon: Target, color: "from-teal-500 to-emerald-500", tab: "embeddings", tier: 2, requires: ["nlp"], xpRequired: 300, description: "Vector representations & similarity" },
  { id: "models", title: "AI Models", icon: Bot, color: "from-indigo-500 to-blue-500", tab: "models", tier: 2, requires: ["genai"], xpRequired: 300, description: "LLMs, GPT, Claude, Gemini" },
  { id: "vision", title: "Computer Vision", icon: Eye, color: "from-violet-500 to-fuchsia-500", tab: "vision", tier: 2, requires: ["deep-learning"], xpRequired: 300, description: "Image recognition & generation" },

  // Tier 3 - Advanced
  { id: "rag", title: "RAG Systems", icon: Database, color: "from-emerald-500 to-teal-500", tab: "rag", tier: 3, requires: ["embeddings", "models"], xpRequired: 500, description: "Retrieval-Augmented Generation" },
  { id: "finetuning", title: "Fine-Tuning", icon: Settings, color: "from-orange-500 to-red-500", tab: "finetuning", tier: 3, requires: ["transformers"], xpRequired: 500, description: "LoRA, QLoRA, PEFT techniques" },
  { id: "agentic", title: "Agentic AI", icon: Bot, color: "from-indigo-500 to-violet-500", tab: "agentic", tier: 3, requires: ["models"], xpRequired: 500, description: "Autonomous AI agents" },
  { id: "guardrails", title: "AI Guardrails", icon: Shield, color: "from-red-500 to-rose-500", tab: "guardrails", tier: 3, requires: ["models"], xpRequired: 500, description: "Safety and content filtering" },

  // Tier 4 - Expert
  { id: "orchestrators", title: "Orchestrators", icon: Network, color: "from-orange-500 to-red-500", tab: "orchestrators", tier: 4, requires: ["agentic"], xpRequired: 800, description: "Multi-agent coordination" },
  { id: "mcp", title: "MCP Protocol", icon: Plug, color: "from-violet-500 to-purple-500", tab: "mcp", tier: 4, requires: ["agentic"], xpRequired: 800, description: "Model Context Protocol" },
  { id: "mlops", title: "MLOps", icon: Rocket, color: "from-lime-500 to-green-500", tab: "mlops", tier: 4, requires: ["finetuning"], xpRequired: 800, description: "Deploying AI at scale" },
  { id: "ethics", title: "AI Ethics", icon: Shield, color: "from-emerald-500 to-teal-500", tab: "ethics", tier: 4, requires: ["guardrails"], xpRequired: 800, description: "Responsible AI development" },
  { id: "quantum", title: "Quantum AI", icon: Atom, color: "from-cyan-500 to-blue-500", tab: "quantum", tier: 4, requires: ["deep-learning"], xpRequired: 1000, description: "Quantum computing meets AI" },
];

const tierLabels = ["🌱 Foundations", "📚 Core Skills", "⚡ Intermediate", "🔥 Advanced", "🏆 Expert"];

interface SkillTreeProps {
  userXp?: number;
  completedTopics?: string[];
  onNavigate?: (tab: string) => void;
}

export const SkillTree: React.FC<SkillTreeProps> = ({
  userXp = 0,
  completedTopics = [],
  onNavigate
}) => {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const isCompleted = (node: SkillNode): boolean => completedTopics.includes(node.id);

  const getNodeStatus = (node: SkillNode): 'completed' | 'unlocked' => {
    if (isCompleted(node)) return 'completed';
    return 'unlocked';
  };

  const tiers = [0, 1, 2, 3, 4];
  const totalNodes = skillNodes.length;
  const completedCount = skillNodes.filter(n => isCompleted(n)).length;
  const overallProgress = totalNodes > 0 ? (completedCount / totalNodes) * 100 : 0;

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🎮 AI Skill Tree
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master AI step by step. Unlock new skills as you progress through the learning path.
          </p>
          <div className="mt-4 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>{completedCount}/{totalNodes} skills</span>
              <span>{Math.round(overallProgress)}% mastery</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </div>

        <div className="space-y-8">
          {tiers.map(tier => {
            const nodesInTier = skillNodes.filter(n => n.tier === tier);
            return (
              <div key={tier}>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-sm font-semibold px-3 py-1">
                    {tierLabels[tier]}
                  </Badge>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {nodesInTier.map((node, i) => {
                    const status = getNodeStatus(node);
                    return (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Card
                          className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                            status === 'completed'
                              ? 'border-green-500/50 bg-green-500/5 shadow-green-500/10 shadow-lg'
                              : 'border-primary/30 bg-card hover:shadow-xl hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedNode(node)}
                        >
                          <CardContent className="p-4 text-center">
                            {status === 'completed' && (
                              <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-green-500" />
                            )}
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center mx-auto mb-2`}>
                              <node.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-sm font-bold text-foreground leading-tight mb-1">{node.title}</h4>
                            <p className="text-[10px] text-muted-foreground leading-tight">{node.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Detail */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="border-primary/30 bg-card/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedNode.color} flex items-center justify-center`}>
                      <selectedNode.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{selectedNode.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedNode.description}</p>
                      {selectedNode.requires.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Requires: {selectedNode.requires.map(r => skillNodes.find(n => n.id === r)?.title).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      onNavigate?.(selectedNode.tab);
                      setSelectedNode(null);
                    }}
                    className="gap-2"
                  >
                    Start Learning <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};
