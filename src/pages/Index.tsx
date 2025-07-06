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
import { Footer } from "@/components/Footer";
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
  Settings
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("techniques");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Hero />
      
      {/* Features Overview Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Everything You Need to Master AI
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Discover all the powerful tools, techniques, and resources available on Clavis AI. 
              From prompt analysis to quantum computing, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
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
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex justify-center mb-12 gap-4 bg-white/95 dark:bg-slate-800/95 rounded-3xl shadow-2xl flex-wrap p-6 border-2 border-indigo-100 dark:border-slate-700 min-h-[120px]">
            <TabsTrigger value="techniques" className="px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg min-w-[140px]">
              🎯 Techniques
            </TabsTrigger>
            <TabsTrigger value="examples" className="px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg min-w-[140px]">
              💡 Examples
            </TabsTrigger>
            <TabsTrigger value="bestpractices" className="px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg min-w-[160px]">
              🏆 Best Practices
            </TabsTrigger>
            <TabsTrigger value="features" className="px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg min-w-[140px]">
              ⚡ Features
            </TabsTrigger>
            <TabsTrigger value="ai" className="px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg min-w-[120px]">
              🤖 AI
            </TabsTrigger>
            <TabsTrigger value="genai" className="px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg min-w-[130px]">
              🎨 Gen AI
            </TabsTrigger>
            <TabsTrigger value="quantum" className="px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg min-w-[140px]">
              ⚛️ Quantum
            </TabsTrigger>
            <TabsTrigger value="coding" className="px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg min-w-[130px]">
              💻 Coding
            </TabsTrigger>
            <TabsTrigger value="resources" className="px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg min-w-[150px]">
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
          <TabsContent value="resources" className="focus:outline-none">
            <Resources />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
