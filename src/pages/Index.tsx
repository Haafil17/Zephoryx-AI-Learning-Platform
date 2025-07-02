
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
import { LessonsPage } from "@/components/LessonsPage";
import { EnhancedLeaderboard } from "@/components/EnhancedLeaderboard";
import { EnhancedAI } from "@/components/EnhancedAI";
import { Footer } from "@/components/Footer";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("lessons");
  const [isAIMinimized, setIsAIMinimized] = useState(false);

  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('changeTab', handleTabChange as EventListener);
    return () => window.removeEventListener('changeTab', handleTabChange as EventListener);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex justify-center mb-8 gap-2 bg-white/80 dark:bg-slate-900/70 rounded-xl shadow-lg flex-wrap p-2">
            <TabsTrigger value="lessons" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              🎓 Lessons
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              🏆 Leaderboard
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              🤖 AI Assistant
            </TabsTrigger>
            <TabsTrigger value="techniques" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              🎯 Techniques
            </TabsTrigger>
            <TabsTrigger value="examples" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              💡 Examples
            </TabsTrigger>
            <TabsTrigger value="bestpractices" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              🏆 Best Practices
            </TabsTrigger>
            <TabsTrigger value="features" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              ⚡ Features
            </TabsTrigger>
            <TabsTrigger value="ai" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              🤖 AI
            </TabsTrigger>
            <TabsTrigger value="genai" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              🎨 Gen AI
            </TabsTrigger>
            <TabsTrigger value="quantum" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              ⚛️ Quantum
            </TabsTrigger>
            <TabsTrigger value="coding" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              💻 Coding
            </TabsTrigger>
            <TabsTrigger value="resources" className="px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105">
              📚 Resources
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lessons" className="focus:outline-none">
            <LessonsPage />
          </TabsContent>
          <TabsContent value="leaderboard" className="focus:outline-none">
            <EnhancedLeaderboard />
          </TabsContent>
          <TabsContent value="ai-assistant" className="focus:outline-none">
            <EnhancedAI isMinimized={isAIMinimized} onToggleMinimize={() => setIsAIMinimized(!isAIMinimized)} />
          </TabsContent>
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
