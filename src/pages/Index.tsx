
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
import { Videos } from "@/components/Videos";
import { Footer } from "@/components/Footer";
import { StatsCounter } from "@/components/StatsCounter";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Certifications } from "@/components/Certifications";
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
  MessageSquare, 
  Search, 
  BookOpen, 
  Trophy, 
  Users, 
  Code, 
  Atom, 
  Sparkles,
  Target,
  Lightbulb,
  Rocket,
  Settings,
  Play,
  X
} from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("techniques");
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
      icon: Brain,
      title: "AI Chat Assistant",
      description: "Get instant help with your prompts and AI questions from our intelligent assistant",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: "Prompt Analyzer",
      description: "Analyze and optimize your prompts for better AI responses and performance",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Advanced Techniques",
      description: "Master zero-shot, few-shot, chain-of-thought, and other cutting-edge prompting methods",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Lightbulb,
      title: "Practical Examples",
      description: "Learn from real-world examples and templates for various AI applications",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Trophy,
      title: "Best Practices",
      description: "Industry-proven strategies for consistent and reliable AI interactions",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Zap,
      title: "Interactive Features",
      description: "Hands-on tools and generators to practice and refine your prompting skills",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Code,
      title: "Coding & Development",
      description: "Specialized prompts for programming, debugging, and software development",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: Atom,
      title: "Quantum Computing",
      description: "Explore the intersection of AI and quantum computing technologies",
      color: "from-pink-500 to-rose-500"
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
    toast.success(`Playing: ${video.title}`, {
      description: "Loading video tutorial"
    });
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
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
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
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {currentVideo.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {currentVideo.description}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={closeVideo} className="hover:bg-slate-200 dark:hover:bg-slate-700">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1&rel=0&modestbranding=1&start=0&title=ZEPHORYX%20AI%20LAB`}
                className="w-full h-full"
                allowFullScreen
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={`ZEPHORYX AI LAB - ${currentVideo.title}`}
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
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover all the powerful tools, techniques, and resources available on ZEPHORYX AI LAB. 
              From prompt analysis to quantum computing, we have everything you need to master AI.
            </p>
            
            {/* Fixed Video Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {homeVideos.map((video) => (
                <Card key={video.id} className="group hover:shadow-2xl transition-all duration-500 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105 hover:-translate-y-2 cursor-pointer" onClick={() => handleVideoPlay(video)}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-2xl transform scale-0 group-hover:scale-100 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoPlay(video);
                        }}
                      >
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                    <Badge className="absolute top-3 right-3 bg-black/80 text-white font-semibold px-2 py-1">
                      {video.duration}
                    </Badge>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 font-medium">
                        HD Quality
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        Tutorial
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoPlay(video);
                        }}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Watch
                      </Button>
                    </div>
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
                <Card className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
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
          <TabsList className="flex justify-center mb-12 gap-3 bg-muted/30 dark:bg-muted/10 rounded-full shadow-sm flex-wrap p-3 border border-border/50 backdrop-blur-sm">
            <TabsTrigger value="techniques" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              🎯 Techniques
            </TabsTrigger>
            <TabsTrigger value="examples" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              💡 Examples
            </TabsTrigger>
            <TabsTrigger value="bestpractices" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              🏆 Best Practices
            </TabsTrigger>
            <TabsTrigger value="features" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              ⚡ Features
            </TabsTrigger>
            <TabsTrigger value="ai" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              🤖 AI
            </TabsTrigger>
            <TabsTrigger value="genai" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              🎨 Gen AI
            </TabsTrigger>
            <TabsTrigger value="quantum" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              ⚛️ Quantum
            </TabsTrigger>
            <TabsTrigger value="coding" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              💻 Coding
            </TabsTrigger>
            <TabsTrigger value="aitools" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              🔧 AI Tools
            </TabsTrigger>
            <TabsTrigger value="videos" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              🎥 Videos
            </TabsTrigger>
            <TabsTrigger value="resources" className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground hover:text-foreground">
              📚 Resources
            </TabsTrigger>
          </TabsList>
          <TabsContent value="techniques" className="focus:outline-none">
            <ExpandedTechniques />
          </TabsContent>
          <TabsContent value="examples" className="focus:outline-none">
            <Examples />
          </TabsContent>
          <TabsContent value="bestpractices" className="focus:outline-none">
            <EnhancedBestPractices />
          </TabsContent>
          <TabsContent value="features" className="focus:outline-none">
            <EnhancedInteractiveFeatures />
          </TabsContent>
          <TabsContent value="ai" className="focus:outline-none">
            <AITopics />
          </TabsContent>
          <TabsContent value="genai" className="focus:outline-none">
            <GenAITopics />
          </TabsContent>
          <TabsContent value="quantum" className="focus:outline-none">
            <QuantumTopics />
          </TabsContent>
          <TabsContent value="coding" className="focus:outline-none">
            <CodingTopics />
          </TabsContent>
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
          <TabsContent value="videos" className="focus:outline-none">
            <Videos />
          </TabsContent>
          <TabsContent value="resources" className="focus:outline-none">
            <Resources />
          </TabsContent>
        </Tabs>
      </div>

      <LearningPaths />
      <Certifications />
      <CommunitySection />
      <StatsCounter />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
