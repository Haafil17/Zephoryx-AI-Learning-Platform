
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle, Lightbulb } from "lucide-react";

export const BestPractices = () => {
  const practices = [
    {
      type: "do",
      icon: CheckCircle,
      title: "Be Specific and Clear",
      description: "Provide clear, detailed instructions with specific requirements and constraints.",
      example: "Write a 200-word summary of renewable energy benefits for a general audience"
    },
    {
      type: "do",
      icon: CheckCircle,
      title: "Set Context and Role",
      description: "Define the AI's role and provide relevant context for better responses.",
      example: "You are a financial advisor. Help a 30-year-old plan for retirement..."
    },
    {
      type: "do",
      icon: CheckCircle,
      title: "Use Examples",
      description: "Provide examples of desired output format and style when possible.",
      example: "Format your response like this: Problem: [X], Solution: [Y], Impact: [Z]"
    },
    {
      type: "dont",
      icon: XCircle,
      title: "Don't Be Too Vague",
      description: "Avoid ambiguous requests that could be interpreted multiple ways.",
      example: "❌ 'Tell me about AI' → ✅ 'Explain AI applications in healthcare'"
    },
    {
      type: "dont",
      icon: XCircle,
      title: "Don't Skip Error Cases",
      description: "Consider edge cases and specify how to handle unexpected inputs.",
      example: "❌ No error handling → ✅ 'If data is invalid, return an error message'"
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Test and Iterate",
      description: "Continuously refine prompts based on results and feedback.",
      example: "Start simple, test with various inputs, then add complexity as needed"
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Use Prompt Templates",
      description: "Create reusable templates for common tasks and workflows.",
      example: "Template: 'Analyze [TOPIC] for [AUDIENCE] focusing on [ASPECTS]'"
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Structure Complex Requests",
      description: "Break down complex tasks into numbered steps or sections.",
      example: "1. Summarize the main points 2. Identify key issues 3. Recommend solutions"
    }
  ];

  const getCardStyle = (type: string) => {
    switch (type) {
      case "do":
        return "border-l-4 border-l-green-500 bg-green-50/50";
      case "dont":
        return "border-l-4 border-l-red-500 bg-red-50/50";
      case "warning":
        return "border-l-4 border-l-yellow-500 bg-yellow-50/50";
      case "tip":
        return "border-l-4 border-l-blue-500 bg-blue-50/50";
      default:
        return "";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "do":
        return "text-green-600";
      case "dont":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      case "tip":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Best Practices
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Essential guidelines and proven strategies for effective prompt engineering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practices.map((practice, index) => (
            <Card key={index} className={`${getCardStyle(practice.type)} hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <practice.icon className={`w-6 h-6 ${getIconColor(practice.type)}`} />
                  <CardTitle className="text-lg font-bold text-slate-800">
                    {practice.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-600">
                  {practice.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 rounded-lg p-3 text-sm text-slate-700 font-mono">
                  {practice.example}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Quick Tips for Success</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Start Simple</h4>
              <p className="text-sm opacity-90">Begin with basic prompts and add complexity gradually</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Measure Results</h4>
              <p className="text-sm opacity-90">Track prompt performance and iterate based on outcomes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Document Patterns</h4>
              <p className="text-sm opacity-90">Keep a library of successful prompts for future use</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
