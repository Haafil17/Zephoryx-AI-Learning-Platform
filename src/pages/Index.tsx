
import { Hero } from "@/components/Hero";
import { ExpandedTechniques } from "@/components/ExpandedTechniques";
import { Examples } from "@/components/Examples";
import { EnhancedBestPractices } from "@/components/EnhancedBestPractices";
import { Resources } from "@/components/Resources";
import { EnhancedInteractiveFeatures } from "@/components/EnhancedInteractiveFeatures";
import { AITopics } from "@/components/AITopics";
import { GenAITopics } from "@/components/GenAITopics";
import { QuantumTopics } from "@/components/QuantumTopics";
import { CodingTopics } from "@/components/CodingTopics";
import { RAGTopics } from "@/components/RAGTopics";
import { MCPTopics } from "@/components/MCPTopics";
import { OrchestratorTopics } from "@/components/OrchestratorTopics";
import { AIModelsTopics } from "@/components/AIModelsTopics";
import { GuardrailsTopics } from "@/components/GuardrailsTopics";
import { PromptEngineeringTopics } from "@/components/PromptEngineeringTopics";
import { AgenticAITopics } from "@/components/AgenticAITopics";
import { LLMFineTuningTopics } from "@/components/LLMFineTuningTopics";
import { NLPTopics } from "@/components/NLPTopics";
import { ComputerVisionTopics } from "@/components/ComputerVisionTopics";
import { MLOpsTopics } from "@/components/MLOpsTopics";
import { DeepLearningTopics } from "@/components/DeepLearningTopics";
import { Videos } from "@/components/Videos";
import { Footer } from "@/components/Footer";

import { Newsletter } from "@/components/Newsletter";

import { LearningPaths } from "@/components/LearningPaths";
import { CommunitySection } from "@/components/CommunitySection";
import { PromptBuilder } from "@/components/PromptBuilder";
import { PromptAnalyzer } from "@/components/PromptAnalyzer";
import { PromptTester } from "@/components/PromptTester";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Zap, 
  Search, 
  Code, 
  Atom, 
  Sparkles,
  Target,
  Play,
  X,
  Database,
  Plug,
  Network,
  Cpu,
  Shield,
  Bot,
  Eye,
  FileText,
  Rocket,
  Settings
} from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("prompting");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('changeTab', handleTabChange as EventListener);
    return () => window.removeEventListener('changeTab', handleTabChange as EventListener);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "Prompt Engineering",
      description: "Master zero-shot, few-shot, chain-of-thought, ReAct, and every major prompting technique with real examples",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Bot,
      title: "Agentic AI",
      description: "Build AI systems that reason, plan, use tools, and complete complex tasks autonomously",
      color: "from-indigo-500 to-violet-500"
    },
    {
      icon: Database,
      title: "RAG & Retrieval",
      description: "Learn Retrieval-Augmented Generation — embeddings, vector search, chunking, and production architectures",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Plug,
      title: "MCP Protocol",
      description: "Model Context Protocol — the universal standard for connecting AI to external tools and data",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Network,
      title: "AI Orchestrators",
      description: "LangChain, LangGraph, CrewAI — frameworks for building multi-agent systems and workflows",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Guardrails & Safety",
      description: "Prompt injection defense, content moderation, PII protection, and AI red-teaming",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Brain,
      title: "Gen AI & Models",
      description: "GPT-4o, Claude, Gemini, Llama — understand every major model and when to use each one",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Code,
      title: "Coding & Quantum",
      description: "AI-powered development, code generation, and the frontier of quantum computing + AI",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: Settings,
      title: "LLM Fine-Tuning",
      description: "LoRA, QLoRA, RLHF, DPO — customize language models for your specific domain and use case",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: FileText,
      title: "NLP & Text Processing",
      description: "Tokenization, embeddings, NER, sentiment analysis, and machine translation fundamentals",
      color: "from-sky-500 to-blue-500"
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "CNNs, YOLO, SAM, Vision Transformers — image classification, detection, and generation",
      color: "from-violet-500 to-fuchsia-500"
    },
    {
      icon: Rocket,
      title: "AI Deployment & MLOps",
      description: "Model serving, monitoring, CI/CD for ML, quantization, and production AI security",
      color: "from-lime-500 to-green-500"
    },
    {
      icon: Brain,
      title: "Deep Learning",
      description: "Transformers, LSTMs, GRUs, attention mechanisms, embeddings, and foundation models",
      color: "from-rose-500 to-pink-500"
    }
  ];

  const homeVideos = [
    {
      id: "getting-started",
      title: "Getting Started with AI Prompting",
      description: "Learn the basics of AI prompting in under 5 minutes",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop&crop=center",
      duration: "4:32",
      embedId: "kWmX3pd1f10"
    },
    {
      id: "advanced-techniques", 
      title: "Advanced Prompting Techniques",
      description: "Chain-of-thought & few-shot learning strategies",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=225&fit=crop&crop=center",
      duration: "8:15",
      embedId: "aircAruvnKk"
    },
    {
      id: "real-examples",
      title: "Real-World AI Applications",
      description: "Live demonstrations & practical use cases",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop&crop=center",
      duration: "12:45",
      embedId: "yR4hNBNS6yc"
    }
  ];

  const handleVideoPlay = (video: typeof homeVideos[0]) => {
    setPlayingVideoId(video.id);
    toast.success(`Playing: ${video.title}`, { description: "Loading video tutorial" });
  };

  const closeVideo = () => {
    setPlayingVideoId(null);
  };

  const currentVideo = homeVideos.find(v => v.id === playingVideoId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Hero />
      
      {/* AI-Powered Tools Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              AI-Powered Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Interactive AI tools powered by Gemini 2.5 Flash with full access to our knowledge base
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PromptAnalyzer />
            <PromptTester />
          </div>
        </div>
      </section>
      
      {/* Video Modal */}
      {playingVideoId && currentVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-border">
            <div className="flex justify-between items-center p-6 border-b border-border bg-muted/50">
              <div>
                <h3 className="text-xl font-bold text-foreground">{currentVideo.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{currentVideo.description}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={closeVideo}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                allowFullScreen
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={currentVideo.title}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Features Overview Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Everything You Need to Master AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              From prompt engineering to RAG, MCP, agentic AI, guardrails, and quantum computing — real content, real resources, no fluff.
            </p>
            
            {/* Video Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {homeVideos.map((video) => (
                <Card key={video.id} className="group hover:shadow-2xl transition-all duration-500 bg-card/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105 hover:-translate-y-2 cursor-pointer" onClick={() => handleVideoPlay(video)}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-2xl transform scale-0 group-hover:scale-100 transition-all duration-300">
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                    <Badge className="absolute top-3 right-3 bg-black/80 text-white font-semibold px-2 py-1">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {video.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <Card className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex justify-center mb-12 gap-2 bg-muted/30 dark:bg-muted/10 rounded-full shadow-sm flex-wrap p-3 border border-border/50 backdrop-blur-sm">
            {[
              { value: "prompting", label: "✍️ Prompt Engineering" },
              { value: "agentic", label: "🤖 Agentic AI" },
              { value: "rag", label: "🔍 RAG" },
              { value: "mcp", label: "🔌 MCP" },
              { value: "orchestrators", label: "⚙️ Orchestrators" },
              { value: "guardrails", label: "🛡️ Guardrails" },
              { value: "genai", label: "🎨 Gen AI" },
              { value: "models", label: "🧠 Models" },
              { value: "techniques", label: "🎯 Techniques" },
              { value: "examples", label: "💡 Examples" },
              { value: "bestpractices", label: "🏆 Best Practices" },
              { value: "coding", label: "💻 Coding" },
              { value: "quantum", label: "⚛️ Quantum" },
              { value: "ai", label: "📘 AI Basics" },
              { value: "aitools", label: "🔧 AI Tools" },
              { value: "videos", label: "🎥 Videos" },
              { value: "resources", label: "📚 Resources" },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="prompting" className="focus:outline-none"><PromptEngineeringTopics /></TabsContent>
          <TabsContent value="agentic" className="focus:outline-none"><AgenticAITopics /></TabsContent>
          <TabsContent value="rag" className="focus:outline-none"><RAGTopics /></TabsContent>
          <TabsContent value="mcp" className="focus:outline-none"><MCPTopics /></TabsContent>
          <TabsContent value="orchestrators" className="focus:outline-none"><OrchestratorTopics /></TabsContent>
          <TabsContent value="guardrails" className="focus:outline-none"><GuardrailsTopics /></TabsContent>
          <TabsContent value="genai" className="focus:outline-none"><GenAITopics /></TabsContent>
          <TabsContent value="models" className="focus:outline-none"><AIModelsTopics /></TabsContent>
          <TabsContent value="techniques" className="focus:outline-none"><ExpandedTechniques /></TabsContent>
          <TabsContent value="examples" className="focus:outline-none"><Examples /></TabsContent>
          <TabsContent value="bestpractices" className="focus:outline-none"><EnhancedBestPractices /></TabsContent>
          <TabsContent value="coding" className="focus:outline-none"><CodingTopics /></TabsContent>
          <TabsContent value="quantum" className="focus:outline-none"><QuantumTopics /></TabsContent>
          <TabsContent value="ai" className="focus:outline-none"><AITopics /></TabsContent>
          <TabsContent value="aitools" className="focus:outline-none">
            <div className="space-y-8 pb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  AI-Powered Tools
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Interactive tools powered by Gemini 2.5 Flash to help you build, analyze, and test prompts in real-time
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PromptBuilder />
                <PromptAnalyzer />
              </div>
              <PromptTester />
            </div>
          </TabsContent>
          <TabsContent value="videos" className="focus:outline-none"><Videos /></TabsContent>
          <TabsContent value="resources" className="focus:outline-none"><Resources /></TabsContent>
        </Tabs>
      </div>

      <LearningPaths />
      
      <CommunitySection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
