
import { Hero } from "@/components/Hero";
import { Techniques } from "@/components/Techniques";
import { Examples } from "@/components/Examples";
import { BestPractices } from "@/components/BestPractices";
import { Resources } from "@/components/Resources";
import { InteractiveFeatures } from "@/components/InteractiveFeatures";
import { AITopics } from "@/components/AITopics";
import { GenAITopics } from "@/components/GenAITopics";
import { QuantumTopics } from "@/components/QuantumTopics";
import { CodingTopics } from "@/components/CodingTopics";
import { Footer } from "@/components/Footer";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Tabs defaultValue="techniques" className="w-full">
          <TabsList className="flex justify-center mb-8 gap-2 bg-white/80 dark:bg-slate-900/70 rounded-xl shadow-lg flex-wrap">
            <TabsTrigger value="techniques" className="px-4 py-3 text-sm font-medium">
              Techniques
            </TabsTrigger>
            <TabsTrigger value="examples" className="px-4 py-3 text-sm font-medium">
              Examples
            </TabsTrigger>
            <TabsTrigger value="bestpractices" className="px-4 py-3 text-sm font-medium">
              Best Practices
            </TabsTrigger>
            <TabsTrigger value="features" className="px-4 py-3 text-sm font-medium">
              Features
            </TabsTrigger>
            <TabsTrigger value="ai" className="px-4 py-3 text-sm font-medium">
              AI
            </TabsTrigger>
            <TabsTrigger value="genai" className="px-4 py-3 text-sm font-medium">
              Gen AI
            </TabsTrigger>
            <TabsTrigger value="quantum" className="px-4 py-3 text-sm font-medium">
              Quantum
            </TabsTrigger>
            <TabsTrigger value="coding" className="px-4 py-3 text-sm font-medium">
              Coding
            </TabsTrigger>
            <TabsTrigger value="resources" className="px-4 py-3 text-sm font-medium">
              Resources
            </TabsTrigger>
          </TabsList>
          <TabsContent value="techniques">
            <Techniques />
          </TabsContent>
          <TabsContent value="examples">
            <Examples />
          </TabsContent>
          <TabsContent value="bestpractices">
            <BestPractices />
          </TabsContent>
          <TabsContent value="features">
            <InteractiveFeatures />
          </TabsContent>
          <TabsContent value="ai">
            <AITopics />
          </TabsContent>
          <TabsContent value="genai">
            <GenAITopics />
          </TabsContent>
          <TabsContent value="quantum">
            <QuantumTopics />
          </TabsContent>
          <TabsContent value="coding">
            <CodingTopics />
          </TabsContent>
          <TabsContent value="resources">
            <Resources />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
