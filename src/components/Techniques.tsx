
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, MessageSquare, Layers, Lightbulb, RefreshCw, CheckCircle } from "lucide-react";

export const Techniques = () => {
  const techniques = [
    {
      icon: Target,
      title: "Zero-Shot Prompting",
      description: "Direct task instruction without examples",
      example: "Translate 'Hello World' to French.",
      level: "Beginner",
      color: "bg-green-500"
    },
    {
      icon: MessageSquare,
      title: "Few-Shot Prompting",
      description: "Provide examples to guide the AI's response",
      example: "English: Hello → French: Bonjour\nEnglish: Thank you → French: Merci\nEnglish: Goodbye → French: ?",
      level: "Beginner",
      color: "bg-blue-500"
    },
    {
      icon: Layers,
      title: "Chain-of-Thought",
      description: "Break down complex reasoning into steps",
      example: "Let's think step by step: First, identify the problem...",
      level: "Intermediate",
      color: "bg-yellow-500"
    },
    {
      icon: Lightbulb,
      title: "Role-Based Prompting",
      description: "Assign specific roles or personas to the AI",
      example: "You are an expert data scientist. Analyze this dataset...",
      level: "Intermediate",
      color: "bg-purple-500"
    },
    {
      icon: RefreshCw,
      title: "Iterative Refinement",
      description: "Continuously improve prompts based on results",
      example: "Please elaborate on point 2 from your previous response...",
      level: "Advanced",
      color: "bg-red-500"
    },
    {
      icon: CheckCircle,
      title: "Constitutional AI",
      description: "Set principles and constraints for AI behavior",
      example: "Follow these principles: 1) Be helpful 2) Be harmless 3) Be honest...",
      level: "Advanced",
      color: "bg-indigo-500"
    }
  ];

  const levelColors = {
    "Beginner": "bg-green-100 text-green-800",
    "Intermediate": "bg-yellow-100 text-yellow-800",
    "Advanced": "bg-red-100 text-red-800"
  };

  return (
    <section id="techniques" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Core Techniques
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Master these fundamental prompt engineering techniques to unlock the full potential of AI systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techniques.map((technique, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${technique.color} bg-opacity-20`}>
                    <technique.icon className={`w-6 h-6 ${technique.color.replace('bg-', 'text-')}`} />
                  </div>
                  <Badge className={levelColors[technique.level as keyof typeof levelColors]}>
                    {technique.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {technique.title}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {technique.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm text-slate-700">
                  {technique.example}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
