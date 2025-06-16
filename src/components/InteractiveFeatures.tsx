
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Calculator, 
  MessageSquare, 
  FileText,
  Code,
  Palette,
  ChevronRight,
  Star,
  Users,
  Award
} from "lucide-react";
import { useState } from "react";

export const InteractiveFeatures = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const features = [
    {
      icon: Lightbulb,
      title: "Smart Prompt Suggestions",
      description: "AI-powered recommendations for improving your prompts in real-time",
      category: "smart",
      popularity: 5,
      isNew: true
    },
    {
      icon: Calculator,
      title: "Prompt Effectiveness Calculator",
      description: "Analyze and score your prompts based on clarity, specificity, and structure",
      category: "tools",
      popularity: 4,
      isNew: false
    },
    {
      icon: MessageSquare,
      title: "Interactive Chat Examples",
      description: "Practice with live examples and see how different prompts perform",
      category: "practice",
      popularity: 5,
      isNew: true
    },
    {
      icon: FileText,
      title: "Template Library",
      description: "Access 100+ professionally crafted prompt templates for various use cases",
      category: "templates",
      popularity: 4,
      isNew: false
    },
    {
      icon: Code,
      title: "Code Generation Prompts",
      description: "Specialized prompts for generating, debugging, and explaining code",
      category: "development",
      popularity: 5,
      isNew: false
    },
    {
      icon: Palette,
      title: "Creative Writing Prompts",
      description: "Unleash creativity with prompts designed for storytelling and content creation",
      category: "creative",
      popularity: 4,
      isNew: true
    }
  ];

  const categories = [
    { id: "all", name: "All Features", count: features.length },
    { id: "smart", name: "AI-Powered", count: features.filter(f => f.category === "smart").length },
    { id: "tools", name: "Analysis Tools", count: features.filter(f => f.category === "tools").length },
    { id: "practice", name: "Practice", count: features.filter(f => f.category === "practice").length },
    { id: "templates", name: "Templates", count: features.filter(f => f.category === "templates").length }
  ];

  const filteredFeatures = selectedCategory === "all" 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Interactive Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover powerful tools and features designed to accelerate your prompt engineering mastery
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-700 hover:bg-indigo-50"
              } px-4 py-2 rounded-full border transition-all duration-200`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/70 transition-colors">
                    <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    {feature.isNew && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        NEW
                      </Badge>
                    )}
                    {renderStars(feature.popularity)}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900/30"
                >
                  Try Feature
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mt-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Join Thousands of Successful Users</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Our comprehensive prompt engineering guide has helped professionals across industries 
              achieve remarkable results with AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-sm opacity-90">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-90">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-sm opacity-90">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
