
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Code, PenTool, BarChart, BookOpen, Microscope } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const Examples = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const examples = [
    {
      icon: Code,
      title: "Code Generation",
      category: "Development",
      prompt: `You are an expert Python developer. Write a function that:
1. Takes a list of numbers as input
2. Returns the sum of all even numbers
3. Includes error handling for invalid inputs
4. Has comprehensive docstring and type hints

Please provide the complete function with examples.`,
      color: "bg-blue-500",
      tags: ["Python", "Functions", "Error Handling"]
    },
    {
      icon: PenTool,
      title: "Creative Writing",
      category: "Content",
      prompt: `Write a compelling product description for an eco-friendly water bottle that:
- Highlights sustainability features
- Appeals to environmentally conscious consumers
- Uses persuasive but authentic language
- Includes specific technical details
- Maintains a friendly, approachable tone

Target audience: Active millennials and Gen-Z consumers.`,
      color: "bg-green-500",
      tags: ["Copywriting", "Sustainability", "Marketing"]
    },
    {
      icon: BarChart,
      title: "Data Analysis",
      category: "Analytics",
      prompt: `As a senior data analyst, examine this sales data and provide:

1. Key trends and patterns
2. Potential causes for any anomalies
3. Actionable recommendations
4. Risk factors to monitor
5. Suggested next steps for investigation

Present findings in a clear, executive-friendly format with supporting evidence.`,
      color: "bg-purple-500",
      tags: ["Data Analysis", "Business Intelligence", "Reporting"]
    },
    {
      icon: BookOpen,
      title: "Educational Content",
      category: "Education",
      prompt: `Create a beginner-friendly explanation of machine learning that:
- Uses analogies and real-world examples
- Avoids technical jargon
- Includes practical applications
- Addresses common misconceptions
- Provides next steps for learning

Target audience: Complete beginners with no technical background.`,
      color: "bg-yellow-500",
      tags: ["Education", "ML Basics", "Beginner-Friendly"]
    },
    {
      icon: Microscope,
      title: "Research Analysis",
      category: "Research",
      prompt: `Analyze the following research paper abstract and provide:
1. Main research question and hypothesis
2. Methodology strengths and limitations
3. Significance of findings
4. Potential applications
5. Suggestions for future research

Use critical thinking and academic rigor in your analysis.`,
      color: "bg-red-500",
      tags: ["Research", "Academic", "Critical Analysis"]
    }
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: "Copied to clipboard!",
      description: "The prompt has been copied to your clipboard.",
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-20 px-4 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Practical Examples
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real-world prompt examples across different domains and use cases
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {examples.map((example, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${example.color} bg-opacity-20`}>
                    <example.icon className={`w-6 h-6 ${example.color.replace('bg-', 'text-')}`} />
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                    {example.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                  {example.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {example.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 relative group/prompt">
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">
                    {example.prompt}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover/prompt:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(example.prompt, index)}
                  >
                    {copiedIndex === index ? (
                      <span className="text-green-600 text-xs">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
