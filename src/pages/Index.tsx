
import { Hero } from "@/components/Hero";
import { Techniques } from "@/components/Techniques";
import { Examples } from "@/components/Examples";
import { BestPractices } from "@/components/BestPractices";
import { Resources } from "@/components/Resources";
import { InteractiveFeatures } from "@/components/InteractiveFeatures";
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
          <TabsList className="flex justify-center mb-8 gap-4 bg-white/80 dark:bg-slate-900/70 rounded-xl shadow-lg">
            <TabsTrigger value="techniques" className="px-6 py-3 text-base font-medium">
              Techniques
            </TabsTrigger>
            <TabsTrigger value="examples" className="px-6 py-3 text-base font-medium">
              Examples
            </TabsTrigger>
            <TabsTrigger value="bestpractices" className="px-6 py-3 text-base font-medium">
              Best Practices
            </TabsTrigger>
            <TabsTrigger value="features" className="px-6 py-3 text-base font-medium">
              Features
            </TabsTrigger>
            <TabsTrigger value="resources" className="px-6 py-3 text-base font-medium">
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
