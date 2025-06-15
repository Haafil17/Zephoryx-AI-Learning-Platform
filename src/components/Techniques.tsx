
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, MessageSquare, Layers, Lightbulb, RefreshCw, CheckCircle } from "lucide-react";
import { useState } from "react";
import { TechniqueModal } from "./TechniqueModal";

export const Techniques = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const techniques = [
    {
      icon: Target,
      title: "Zero-Shot Prompting",
      description: "Direct task instruction without examples",
      example: "Translate 'Hello World' to French.",
      level: "Beginner",
      color: "bg-green-500",
      detailedDescription: "Zero-shot prompting is the most straightforward approach where you simply ask the AI to perform a task without providing any examples. The AI relies entirely on its training data to understand and complete the request. This method works well for common tasks that the AI has likely encountered during training.",
      useCases: [
        "Simple translation tasks",
        "Basic question answering",
        "General knowledge queries",
        "Straightforward text generation",
        "Common coding problems"
      ],
      tips: [
        "Be clear and specific in your instructions",
        "Use simple, direct language",
        "Avoid ambiguous terms",
        "Start with zero-shot before trying more complex approaches"
      ],
      moreExamples: [
        "Translate 'Hello World' to French.",
        "Write a short summary of photosynthesis.",
        "Convert this text to uppercase: hello world",
        "What's the capital of Japan?",
        "Generate a creative name for a coffee shop."
      ]
    },
    {
      icon: MessageSquare,
      title: "Few-Shot Prompting",
      description: "Provide examples to guide the AI's response",
      example: "English: Hello → French: Bonjour\nEnglish: Thank you → French: Merci\nEnglish: Goodbye → French: ?",
      level: "Beginner",
      color: "bg-blue-500",
      detailedDescription: "Few-shot prompting involves providing the AI with a few examples of the desired input-output pattern before asking it to complete a new instance. This technique helps the AI understand the specific format, style, or approach you want, making it particularly effective for tasks that require consistency or specific formatting.",
      useCases: [
        "Pattern recognition tasks",
        "Consistent formatting requirements",
        "Style matching",
        "Complex transformations",
        "Domain-specific terminology"
      ],
      tips: [
        "Use 2-5 examples for best results",
        "Ensure examples are diverse but consistent",
        "Match the complexity of your target task",
        "Use clear separators between examples"
      ],
      moreExamples: [
        "Input: angry\nOutput: 😠\nInput: happy\nOutput: 😊\nInput: sad\nOutput: ?",
        "Product: iPhone\nCategory: Electronics\nProduct: Nike Shoes\nCategory: Footwear\nProduct: Coffee Mug\nCategory: ?",
        "Text: The weather is great!\nSentiment: Positive\nText: I hate mondays\nSentiment: Negative\nText: The movie was okay\nSentiment: ?"
      ]
    },
    {
      icon: Layers,
      title: "Chain-of-Thought",
      description: "Break down complex reasoning into steps",
      example: "Let's think step by step: First, identify the problem...",
      level: "Intermediate",
      color: "bg-yellow-500",
      detailedDescription: "Chain-of-thought prompting encourages the AI to show its reasoning process by thinking through problems step by step. This technique is particularly powerful for complex reasoning tasks, mathematical problems, and logical puzzles where the process is as important as the final answer.",
      useCases: [
        "Mathematical word problems",
        "Logical reasoning tasks",
        "Complex analysis",
        "Multi-step processes",
        "Debugging and troubleshooting"
      ],
      tips: [
        "Use phrases like 'Let's think step by step'",
        "Ask for the reasoning to be shown",
        "Break complex problems into smaller parts",
        "Encourage explicit intermediate steps"
      ],
      moreExamples: [
        "Let's solve this step by step: If a train travels 60 mph for 2 hours, how far does it go?",
        "Think through this logically: Why might a plant's leaves turn yellow?",
        "Let's analyze this systematically: What are the pros and cons of remote work?",
        "Step by step reasoning: How would you debug a website that loads slowly?"
      ]
    },
    {
      icon: Lightbulb,
      title: "Role-Based Prompting",
      description: "Assign specific roles or personas to the AI",
      example: "You are an expert data scientist. Analyze this dataset...",
      level: "Intermediate",
      color: "bg-purple-500",
      detailedDescription: "Role-based prompting involves assigning a specific role, profession, or persona to the AI before asking it to complete a task. This technique leverages the AI's knowledge about how different experts would approach problems, leading to more specialized and contextually appropriate responses.",
      useCases: [
        "Professional advice or analysis",
        "Specialized domain knowledge",
        "Specific writing styles",
        "Expert-level explanations",
        "Industry-specific tasks"
      ],
      tips: [
        "Be specific about the role and expertise level",
        "Include relevant context about the role",
        "Use appropriate professional language",
        "Consider the perspective that role would have"
      ],
      moreExamples: [
        "You are a senior software engineer. Review this code for potential issues.",
        "Act as a financial advisor. What investment strategy would you recommend?",
        "You are a creative writing teacher. Help improve this story's dialogue.",
        "As a marketing expert, create a campaign strategy for this new product.",
        "You are a pediatrician. Explain childhood vaccines to concerned parents."
      ]
    },
    {
      icon: RefreshCw,
      title: "Iterative Refinement",
      description: "Continuously improve prompts based on results",
      example: "Please elaborate on point 2 from your previous response...",
      level: "Advanced",
      color: "bg-red-500",
      detailedDescription: "Iterative refinement is a process of gradually improving your prompts and responses through multiple rounds of interaction. This technique involves analyzing the AI's output, identifying areas for improvement, and refining your approach to get increasingly better results.",
      useCases: [
        "Complex creative projects",
        "Research and analysis",
        "Detailed explanations",
        "Problem-solving sessions",
        "Content development"
      ],
      tips: [
        "Build on previous responses systematically",
        "Ask for specific improvements",
        "Use feedback to guide next prompts",
        "Keep track of what works well"
      ],
      moreExamples: [
        "Please elaborate on point 2 from your previous response with specific examples.",
        "That's helpful, but can you make it more concise and actionable?",
        "Good start! Now add more technical details to the implementation section.",
        "Can you revise this to be more suitable for a beginner audience?",
        "Perfect! Now create a similar analysis for the next topic we discussed."
      ]
    },
    {
      icon: CheckCircle,
      title: "Constitutional AI",
      description: "Set principles and constraints for AI behavior",
      example: "Follow these principles: 1) Be helpful 2) Be harmless 3) Be honest...",
      level: "Advanced",
      color: "bg-indigo-500",
      detailedDescription: "Constitutional AI involves setting explicit principles, rules, or constraints that guide the AI's behavior and responses. This technique helps ensure that the AI's outputs align with specific values, guidelines, or requirements, making it particularly useful for sensitive or high-stakes applications.",
      useCases: [
        "Ethical decision-making scenarios",
        "Content moderation",
        "Educational content creation",
        "Professional communications",
        "Brand-consistent messaging"
      ],
      tips: [
        "Be explicit about your principles",
        "Prioritize conflicting principles clearly",
        "Include both positive and negative constraints",
        "Test edge cases with your principles"
      ],
      moreExamples: [
        "Follow these principles: 1) Be helpful 2) Be harmless 3) Be honest. Now advise on this situation...",
        "Constraints: Keep it professional, avoid jargon, include sources. Write an explanation of...",
        "Guidelines: Be encouraging, focus on learning, avoid criticism. Provide feedback on...",
        "Rules: Stay factual, cite sources, acknowledge uncertainty. Research this topic...",
        "Principles: Respect privacy, be inclusive, avoid bias. Draft a policy on..."
      ]
    }
  ];

  const levelColors = {
    "Beginner": "bg-green-100 text-green-800",
    "Intermediate": "bg-yellow-100 text-yellow-800",
    "Advanced": "bg-red-100 text-red-800"
  };

  const handleCardClick = (technique: any) => {
    setSelectedTechnique(technique);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTechnique(null);
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
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/70 backdrop-blur-sm border-0 shadow-lg cursor-pointer"
              onClick={() => handleCardClick(technique)}
            >
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
                <div className="mt-4 text-center">
                  <span className="text-indigo-600 text-sm font-medium group-hover:underline">
                    Click to learn more →
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <TechniqueModal 
        technique={selectedTechnique}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
