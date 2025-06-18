
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Target, Layers, Zap, Brain, Code, Lightbulb, Workflow } from "lucide-react";

export const ExpandedTechniques = () => {
  const techniques = [
    {
      title: "Zero-Shot Prompting",
      description: "Get AI to perform tasks without any examples, using clear instructions and context.",
      icon: MessageSquare,
      level: "Beginner",
      color: "from-green-500 to-emerald-500",
      example: "Translate the following English text to French: 'Hello, how are you today?'",
      useCases: ["Quick translations", "Simple classifications", "Basic text generation"],
      tips: [
        "Be specific about the desired output format",
        "Provide clear context and constraints",
        "Use action words like 'translate', 'summarize', 'explain'"
      ]
    },
    {
      title: "Few-Shot Prompting",
      description: "Provide examples to guide AI behavior and establish patterns for consistent outputs.",
      icon: Target,
      level: "Intermediate",
      color: "from-blue-500 to-cyan-500",
      example: "Examples:\nPositive: 'I love this product!' → Sentiment: Positive\nNegative: 'This is terrible.' → Sentiment: Negative\nNow classify: 'The service was okay.'",
      useCases: ["Pattern recognition", "Style mimicking", "Complex classifications"],
      tips: [
        "Use 2-5 diverse examples",
        "Ensure examples cover edge cases",
        "Maintain consistent formatting across examples"
      ]
    },
    {
      title: "Chain-of-Thought (CoT)",
      description: "Guide AI through step-by-step reasoning to improve accuracy in complex problem-solving.",
      icon: Layers,
      level: "Advanced",
      color: "from-purple-500 to-indigo-500",
      example: "Solve this step by step:\nProblem: If a store has 150 apples and sells 60% of them, how many are left?\nStep 1: Calculate 60% of 150\nStep 2: Subtract from original amount\nStep 3: State the final answer",
      useCases: ["Mathematical problems", "Logical reasoning", "Complex analysis"],
      tips: [
        "Break down complex problems into smaller steps",
        "Ask for reasoning before the final answer",
        "Use phrases like 'think step by step' or 'show your work'"
      ]
    },
    {
      title: "Role-Based Prompting",
      description: "Assign specific roles or personas to AI for specialized knowledge and perspective.",
      icon: Brain,
      level: "Intermediate",
      color: "from-orange-500 to-red-500",
      example: "You are a financial advisor with 20 years of experience. A 30-year-old client asks about retirement planning. Provide comprehensive advice considering their age and goals.",
      useCases: ["Expert consultations", "Creative writing", "Professional advice"],
      tips: [
        "Define the role clearly with relevant expertise",
        "Specify the context and audience",
        "Include relevant background information"
      ]
    },
    {
      title: "Template-Based Prompting",
      description: "Create reusable prompt structures for consistent results across similar tasks.",
      icon: Code,
      level: "Beginner",
      color: "from-teal-500 to-green-500",
      example: "Template: Analyze [TOPIC] for [AUDIENCE] focusing on [ASPECTS]. Provide [FORMAT] with [LENGTH] words.\n\nFilled: Analyze climate change for teenagers focusing on practical solutions. Provide bullet points with 200 words.",
      useCases: ["Content creation", "Analysis tasks", "Standardized reporting"],
      tips: [
        "Create placeholders for variable elements",
        "Test templates with different inputs",
        "Document successful template variations"
      ]
    },
    {
      title: "Iterative Refinement",
      description: "Progressively improve outputs through multiple rounds of feedback and adjustment.",
      icon: Workflow,
      level: "Advanced",
      color: "from-pink-500 to-purple-500",
      example: "First draft: Write a product description\nRefinement 1: Make it more compelling and add benefits\nRefinement 2: Adjust tone for millennial audience\nFinal: Optimize for SEO keywords",
      useCases: ["Content optimization", "Creative projects", "Problem solving"],
      tips: [
        "Start with a basic version",
        "Provide specific feedback for improvements",
        "Build complexity gradually"
      ]
    },
    {
      title: "Constraint-Based Prompting",
      description: "Use specific limitations and boundaries to control AI output format and content.",
      icon: Zap,
      level: "Intermediate",
      color: "from-yellow-500 to-orange-500",
      example: "Write a product review in exactly 100 words, using a positive tone, including at least 3 specific features, and ending with a rating out of 5 stars.",
      useCases: ["Content formatting", "Social media posts", "Structured responses"],
      tips: [
        "Set clear word or character limits",
        "Specify required elements",
        "Define tone and style constraints"
      ]
    },
    {
      title: "Meta-Prompting",
      description: "Have AI help create and improve prompts for better performance on specific tasks.",
      icon: Lightbulb,
      level: "Expert",
      color: "from-indigo-500 to-blue-500",
      example: "Help me create a better prompt for generating creative product names. My current prompt is: 'Give me product names.' What improvements would you suggest?",
      useCases: ["Prompt optimization", "Task analysis", "Performance improvement"],
      tips: [
        "Ask AI to analyze your current prompts",
        "Request specific improvement suggestions",
        "Test AI-suggested modifications"
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Advanced": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Expert": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Advanced Prompting Techniques
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Master these proven techniques to unlock the full potential of AI. From basic prompts to advanced strategies, 
            learn how to communicate effectively with AI systems and achieve consistent, high-quality results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {techniques.map((technique, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 hover:border-purple-300 dark:hover:border-purple-600 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${technique.color}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${technique.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <technique.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={getLevelColor(technique.level)}>
                    {technique.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  {technique.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  {technique.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Example */}
                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Example:</h4>
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 text-sm text-slate-700 dark:text-slate-300 font-mono leading-relaxed">
                    {technique.example}
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Best For:</h4>
                  <div className="flex flex-wrap gap-2">
                    {technique.useCases.map((useCase, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Pro Tips:</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    {technique.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Reference Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-6 text-center">Quick Reference Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold mb-2">Be Specific</h4>
              <p className="text-sm opacity-90">Clear, detailed instructions yield better results</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-semibold mb-2">Use Examples</h4>
              <p className="text-sm opacity-90">Show the AI what you want with concrete examples</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔄</div>
              <h4 className="font-semibold mb-2">Iterate</h4>
              <p className="text-sm opacity-90">Refine prompts based on results and feedback</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold mb-2">Set Constraints</h4>
              <p className="text-sm opacity-90">Use boundaries to control output format and length</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
