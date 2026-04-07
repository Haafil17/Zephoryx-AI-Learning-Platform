
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
import { MemorySystemsTopics } from "@/components/MemorySystemsTopics";
import { AIComparisonTopics } from "@/components/AIComparisonTopics";
import { AIEthicsTopics } from "@/components/AIEthicsTopics";
import { EmbeddingsTopics } from "@/components/EmbeddingsTopics";
import { TransformersTopics } from "@/components/TransformersTopics";
import { Videos } from "@/components/Videos";
import { Footer } from "@/components/Footer";
import { ChatFloatingButton } from "@/components/ChatFloatingButton";
import { AIModelComparison } from "@/components/AIModelComparison";
import { Newsletter } from "@/components/Newsletter";
import { LearningPaths } from "@/components/LearningPaths";
import { CommunitySection } from "@/components/CommunitySection";
import { PromptBuilder } from "@/components/PromptBuilder";
import { PromptAnalyzer } from "@/components/PromptAnalyzer";
import { PromptTester } from "@/components/PromptTester";
import { SkillTree } from "@/components/SkillTree";
import { DifficultyToggle } from "@/components/DifficultyToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent } from
"@/components/ui/tabs";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Code,
  Sparkles,
  Play,
  X,
  Database,
  Plug,
  Network,
  Shield,
  Bot,
  Eye,
  FileText,
  Rocket,
  Settings } from
"lucide-react";
import { toast } from "sonner";

const features = [
{ icon: Sparkles, title: "Prompt Engineering", color: "from-amber-500 to-orange-500" },
{ icon: Bot, title: "Agentic AI", color: "from-indigo-500 to-violet-500" },
{ icon: Database, title: "RAG & Retrieval", color: "from-emerald-500 to-teal-500" },
{ icon: Plug, title: "MCP Protocol", color: "from-violet-500 to-purple-500" },
{ icon: Network, title: "Orchestrators", color: "from-orange-500 to-red-500" },
{ icon: Shield, title: "Guardrails", color: "from-red-500 to-rose-500" },
{ icon: Brain, title: "Gen AI & Models", color: "from-purple-500 to-pink-500" },
{ icon: Code, title: "Coding & Quantum", color: "from-teal-500 to-blue-500" },
{ icon: Settings, title: "Fine-Tuning", color: "from-orange-500 to-red-500" },
{ icon: FileText, title: "NLP", color: "from-sky-500 to-blue-500" },
{ icon: Eye, title: "Computer Vision", color: "from-violet-500 to-fuchsia-500" },
{ icon: Rocket, title: "MLOps", color: "from-lime-500 to-green-500" },
{ icon: Brain, title: "Deep Learning", color: "from-rose-500 to-pink-500" }];


const homeVideos = [
{ id: "getting-started", title: "Getting Started with AI Prompting", thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop&crop=center", duration: "4:32", embedId: "kWmX3pd1f10" },
{ id: "advanced-techniques", title: "Advanced Prompting Techniques", thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=225&fit=crop&crop=center", duration: "8:15", embedId: "aircAruvnKk" },
{ id: "real-examples", title: "Real-World AI Applications", thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop&crop=center", duration: "12:45", embedId: "yR4hNBNS6yc" }];


const tabs = [
{ value: "prompting", label: "✍️ Prompting" },
{ value: "agentic", label: "🤖 Agentic" },
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
{ value: "finetuning", label: "🔧 Fine-Tuning" },
{ value: "nlp", label: "📝 NLP" },
{ value: "vision", label: "👁️ Vision" },
{ value: "mlops", label: "🚀 MLOps" },
{ value: "deeplearning", label: "🧬 Deep Learning" },
{ value: "ai", label: "📘 AI Basics" },
{ value: "memory", label: "🧠 Memory Systems" },
{ value: "comparisons", label: "⚖️ Comparisons" },
{ value: "transformers", label: "⚡ Transformers" },
{ value: "embeddings", label: "📐 Embeddings" },
{ value: "ethics", label: "🛡️ Ethics" },
{ value: "aitools", label: "🛠️ Tools" },
{ value: "videos", label: "🎥 Videos" },
{ value: "resources", label: "📚 Resources" }];


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

  const currentVideo = homeVideos.find((v) => v.id === playingVideoId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Hero />

      {/* Video Modal */}
      {playingVideoId && currentVideo &&
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-border">
            <div className="flex justify-between items-center p-4 border-b border-border bg-muted/50">
              <h3 className="text-lg font-bold text-foreground">{currentVideo.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setPlayingVideoId(null)}>
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
              title={currentVideo.title} />
            
            </div>
          </div>
        </div>
      }

      {/* Compact Features + Videos Row */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">
            Everything You Need to Master AI
          </h2>

          {/* Features as compact icon cards */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 mb-8">
            {features.map((feature, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02, duration: 0.3 }}>
              
                <Card className="group bg-card/80 border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-3 text-center py-[12px]">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-1.5`}>
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{feature.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Inline video row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {homeVideos.map((video) =>
            <Card key={video.id} className="group cursor-pointer flex flex-row items-center p-3 gap-3 bg-card/90 border-0 shadow-sm hover:shadow-lg transition-all" onClick={() => {setPlayingVideoId(video.id);toast.success(`Playing: ${video.title}`);}}>
                <div className="relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm text-foreground truncate">{video.title}</h4>
                  <p className="text-xs text-muted-foreground">{video.duration}</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* AI Tools - compact */}
      <section className="py-8 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 text-center">
            🛠️ AI-Powered Tools
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PromptAnalyzer />
            <PromptTester />
          </div>
        </div>
      </section>

      {/* Skill Tree */}
      <div id="skill-tree">
        <SkillTree onNavigate={(tab) => setActiveTab(tab)} />
      </div>

      {/* Sticky Tabs with Difficulty Toggle */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md py-2 -mx-4 px-4 border-b border-border/30">
            <div className="flex justify-center mb-2">
              <DifficultyToggle />
            </div>
            <TabsList className="flex justify-center gap-1 bg-muted/30 dark:bg-muted/10 rounded-2xl flex-wrap p-2 border border-border/50">
              {tabs.map((tab) =>
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
                
                  {tab.label}
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <div className="pt-6 pb-8">
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
            <TabsContent value="finetuning" className="focus:outline-none"><LLMFineTuningTopics /></TabsContent>
            <TabsContent value="nlp" className="focus:outline-none"><NLPTopics /></TabsContent>
            <TabsContent value="vision" className="focus:outline-none"><ComputerVisionTopics /></TabsContent>
            <TabsContent value="mlops" className="focus:outline-none"><MLOpsTopics /></TabsContent>
            <TabsContent value="deeplearning" className="focus:outline-none"><DeepLearningTopics /></TabsContent>
            <TabsContent value="ai" className="focus:outline-none"><AITopics /></TabsContent>
            <TabsContent value="memory" className="focus:outline-none"><MemorySystemsTopics /></TabsContent>
            <TabsContent value="comparisons" className="focus:outline-none"><AIComparisonTopics /></TabsContent>
            <TabsContent value="transformers" className="focus:outline-none"><TransformersTopics /></TabsContent>
            <TabsContent value="embeddings" className="focus:outline-none"><EmbeddingsTopics /></TabsContent>
            <TabsContent value="ethics" className="focus:outline-none"><AIEthicsTopics /></TabsContent>
            <TabsContent value="aitools" className="focus:outline-none">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PromptBuilder />
                  <PromptAnalyzer />
                </div>
                <PromptTester />
              </div>
            </TabsContent>
            <TabsContent value="videos" className="focus:outline-none"><Videos /></TabsContent>
            <TabsContent value="resources" className="focus:outline-none"><Resources /></TabsContent>
          </div>
        </Tabs>
      </div>

      <AIModelComparison />
      <LearningPaths />
      <CommunitySection />
      <Newsletter />
      <Footer />
      <ChatFloatingButton />
    </div>);

};

export default Index;