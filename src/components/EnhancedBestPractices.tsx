
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Lightbulb, Target, Zap, Brain, Trophy } from "lucide-react";

export const EnhancedBestPractices = () => {
  const practices = [
    {
      type: "do",
      icon: CheckCircle,
      title: "Be Specific and Clear",
      description: "Provide clear, detailed instructions with specific requirements and constraints.",
      example: "Write a 200-word summary of renewable energy benefits for a general audience",
      tips: ["Use concrete numbers and metrics", "Define your target audience", "Specify the desired format"]
    },
    {
      type: "do",
      icon: CheckCircle,
      title: "Set Context and Role",
      description: "Define the AI's role and provide relevant context for better responses.",
      example: "You are a financial advisor. Help a 30-year-old plan for retirement with $50k savings...",
      tips: ["Establish expertise level", "Provide background information", "Set the conversation tone"]
    },
    {
      type: "do",
      icon: CheckCircle,
      title: "Use Examples and Templates",
      description: "Provide examples of desired output format and style when possible.",
      example: "Format your response like this: Problem: [X], Solution: [Y], Impact: [Z]",
      tips: ["Show before/after examples", "Include formatting preferences", "Demonstrate style guidelines"]
    },
    {
      type: "do",
      icon: CheckCircle,
      title: "Break Down Complex Tasks",
      description: "Divide large requests into smaller, manageable steps.",
      example: "1. Analyze the data 2. Identify trends 3. Make recommendations 4. Create action plan",
      tips: ["Number your steps clearly", "Set priorities", "Define success criteria"]
    },
    {
      type: "dont",
      icon: XCircle,
      title: "Don't Be Too Vague",
      description: "Avoid ambiguous requests that could be interpreted multiple ways.",
      example: "❌ 'Tell me about AI' → ✅ 'Explain AI applications in healthcare for medical students'",
      tips: ["Avoid general terms", "Be specific about scope", "Define key terms"]
    },
    {
      type: "dont",
      icon: XCircle,
      title: "Don't Skip Error Cases",
      description: "Consider edge cases and specify how to handle unexpected inputs.",
      example: "❌ No error handling → ✅ 'If data is invalid, return an error message'",
      tips: ["Plan for missing data", "Handle invalid inputs", "Provide fallback options"]
    },
    {
      type: "dont",
      icon: XCircle,
      title: "Don't Overload with Information",
      description: "Avoid cramming too many instructions into a single prompt.",
      example: "❌ 10 different requirements → ✅ Focus on 2-3 main objectives",
      tips: ["Prioritize key requirements", "Use separate prompts for different tasks", "Keep instructions focused"]
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Test and Iterate",
      description: "Continuously refine prompts based on results and feedback.",
      example: "Start simple, test with various inputs, then add complexity as needed",
      tips: ["Start with basic versions", "Test edge cases", "Collect feedback regularly"]
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Consider Bias and Ethics",
      description: "Be aware of potential biases in AI responses and ethical implications.",
      example: "Review outputs for fairness and inclusivity across different demographics",
      tips: ["Check for stereotypes", "Ensure inclusive language", "Validate diverse perspectives"]
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Use Prompt Templates",
      description: "Create reusable templates for common tasks and workflows.",
      example: "Template: 'Analyze [TOPIC] for [AUDIENCE] focusing on [ASPECTS]'",
      tips: ["Build a template library", "Version your templates", "Share with team members"]
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Add Constraints and Guardrails",
      description: "Set boundaries to keep responses focused and appropriate.",
      example: "Limit response to 500 words, use professional tone, avoid technical jargon",
      tips: ["Set word limits", "Define tone requirements", "Specify format constraints"]
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Use Chain-of-Thought Prompting",
      description: "Ask the AI to show its reasoning process step by step.",
      example: "Explain your reasoning for each recommendation and show your work",
      tips: ["Ask for step-by-step thinking", "Request justifications", "Encourage detailed analysis"]
    }
  ];

  const advancedTechniques = [
    {
      title: "Few-Shot Learning",
      description: "Provide multiple examples to teach the AI the desired pattern",
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Role-Based Prompting",
      description: "Assign specific roles or personas to get expert-level responses",
      icon: Brain,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Iterative Refinement",
      description: "Build on previous responses to create more sophisticated outputs",
      icon: Zap,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Context Priming",
      description: "Set up the context with relevant background information",
      icon: Trophy,
      color: "from-orange-500 to-red-500"
    }
  ];

  const getCardStyle = (type: string) => {
    switch (type) {
      case "do":
        return "border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20";
      case "dont":
        return "border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20";
      case "warning":
        return "border-l-4 border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20";
      case "tip":
        return "border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20";
      default:
        return "";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "do":
        return "text-green-600 dark:text-green-400";
      case "dont":
        return "text-red-600 dark:text-red-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "tip":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-gray-600";
    }
  };

  return (
    <section id="best-practices" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Enhanced Best Practices
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive guidelines and advanced strategies for mastering prompt engineering
          </p>
        </div>

        {/* Main Practices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {practices.map((practice, index) => (
            <Card key={index} className={`${getCardStyle(practice.type)} hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <practice.icon className={`w-6 h-6 ${getIconColor(practice.type)}`} />
                  <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {practice.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  {practice.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 text-sm text-slate-700 dark:text-slate-300 font-mono">
                  {practice.example}
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">Quick Tips:</h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    {practice.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advanced Techniques Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Advanced Prompting Techniques
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advancedTechniques.map((technique, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 hover:border-purple-300 dark:hover:border-purple-600">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${technique.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <technique.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-100">{technique.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{technique.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Tips Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-8 text-center">Master Class Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-3">Start Simple</h4>
              <p className="text-sm opacity-90">Begin with basic prompts and add complexity gradually based on results</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-3">Measure & Iterate</h4>
              <p className="text-sm opacity-90">Track prompt performance with metrics and continuously improve</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-3">Build Libraries</h4>
              <p className="text-sm opacity-90">Maintain collections of successful prompts for different use cases</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <p className="text-sm opacity-90">Follow AI developments and adapt techniques to new capabilities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
