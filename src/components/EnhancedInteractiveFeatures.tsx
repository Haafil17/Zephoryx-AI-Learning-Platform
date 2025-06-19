import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Award,
  Zap,
  Brain,
  Target,
  Sparkles,
  Copy,
  CheckCircle,
  AlertCircle,
  Send,
  RotateCcw,
  TrendingUp,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const EnhancedInteractiveFeatures = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [promptText, setPromptText] = useState("");
  const [promptScore, setPromptScore] = useState<number | null>(null);
  const [promptAnalysis, setPromptAnalysis] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string, timestamp: string}>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const { toast } = useToast();

  const features = [
    {
      id: "prompt-analyzer",
      icon: Calculator,
      title: "AI Prompt Analyzer",
      description: "Real-time analysis and scoring of your prompts with detailed feedback",
      category: "tools",
      popularity: 5,
      isNew: true,
      interactive: true
    },
    {
      id: "smart-suggestions",
      icon: Lightbulb,
      title: "Smart Prompt Optimizer",
      description: "AI-powered suggestions to improve your prompts instantly",
      category: "smart",
      popularity: 5,
      isNew: true,
      interactive: true
    },
    {
      id: "chat-simulator",
      icon: MessageSquare,
      title: "Interactive AI Chat",
      description: "Practice with live AI responses and test different prompting strategies",
      category: "practice",
      popularity: 5,
      isNew: true,
      interactive: true
    },
    {
      id: "template-library",
      icon: FileText,
      title: "Professional Templates",
      description: "Copy and customize 100+ proven prompt templates",
      category: "templates",
      popularity: 4,
      isNew: false,
      interactive: true
    }
  ];

  const promptTemplates = {
    "business": {
      title: "Business Strategy Analysis",
      category: "Business",
      template: `Analyze the following business scenario and provide strategic recommendations:

Scenario: [DESCRIBE YOUR BUSINESS SITUATION]

Please consider:
• Market conditions and trends
• Competitive landscape analysis
• Financial implications and ROI
• Risk assessment and mitigation
• Implementation timeline

Provide actionable insights with specific next steps and success metrics.`,
      useCase: "Strategic planning, market analysis, business decisions"
    },
    "creative": {
      title: "Creative Writing Assistant",
      category: "Creative",
      template: `Create a compelling [STORY TYPE] with these elements:

Setting: [TIME AND PLACE]
Main Character: [CHARACTER DESCRIPTION]
Central Conflict: [MAIN PROBLEM]
Tone: [MOOD/ATMOSPHERE]
Target Audience: [INTENDED READERS]

Focus on:
• Vivid, sensory descriptions
• Character development and dialogue
• Plot progression and pacing
• Emotional engagement

Make it original and captivating.`,
      useCase: "Creative writing, storytelling, content creation"
    },
    "technical": {
      title: "Technical Documentation",
      category: "Technical",
      template: `Create comprehensive technical documentation for:

Subject: [TECHNICAL TOPIC]
Audience: [TARGET USERS - Beginner/Intermediate/Advanced]
Format: [GUIDE/API DOCS/TUTORIAL/REFERENCE]

Include:
• Clear explanations of concepts
• Step-by-step instructions
• Code examples with comments
• Common pitfalls and solutions
• Additional resources and references

Use simple language and logical structure.`,
      useCase: "Documentation, tutorials, technical guides"
    },
    "educational": {
      title: "Learning Content Creator",
      category: "Education",
      template: `Design an educational lesson plan for:

Subject: [TOPIC]
Level: [BEGINNER/INTERMEDIATE/ADVANCED]
Duration: [TIME ALLOCATION]
Learning Objectives: [SPECIFIC GOALS]

Include:
• Key concepts and definitions
• Interactive activities and exercises
• Real-world examples and applications
• Assessment methods and rubrics
• Additional learning resources

Make it engaging and practical.`,
      useCase: "Teaching, training materials, educational content"
    },
    "analysis": {
      title: "Data Analysis Prompt",
      category: "Analysis",
      template: `Analyze the following data/information:

Data Source: [DESCRIBE YOUR DATA]
Analysis Goal: [WHAT YOU WANT TO DISCOVER]
Context: [BACKGROUND INFORMATION]

Please provide:
• Key patterns and trends
• Statistical insights
• Correlations and relationships
• Actionable recommendations
• Visual representation suggestions
• Limitations and considerations

Present findings clearly with evidence-based conclusions.`,
      useCase: "Data analysis, research, insights generation"
    },
    "marketing": {
      title: "Marketing Campaign Builder",
      category: "Marketing",
      template: `Create a marketing campaign strategy for:

Product/Service: [WHAT YOU'RE PROMOTING]
Target Audience: [DEMOGRAPHICS & PSYCHOGRAPHICS]
Budget Range: [AVAILABLE RESOURCES]
Campaign Goals: [SPECIFIC OBJECTIVES]
Timeline: [DURATION]

Develop:
• Core messaging and value propositions
• Channel selection and rationale
• Creative concepts and themes
• Success metrics and KPIs
• Timeline and milestones

Make it compelling and results-driven.`,
      useCase: "Marketing strategy, campaigns, brand messaging"
    }
  };

  const categories = [
    { id: "all", name: "All Features", count: features.length },
    { id: "tools", name: "Analysis Tools", count: features.filter(f => f.category === "tools").length },
    { id: "smart", name: "AI-Powered", count: features.filter(f => f.category === "smart").length },
    { id: "practice", name: "Practice", count: features.filter(f => f.category === "practice").length },
    { id: "templates", name: "Templates", count: features.filter(f => f.category === "templates").length }
  ];

  const filteredFeatures = selectedCategory === "all" 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  const analyzePrompt = async () => {
    if (!promptText.trim()) {
      toast({
        title: "Enter a prompt",
        description: "Please enter a prompt to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Enhanced scoring algorithm
    let score = 0;
    let feedback = [];
    const words = promptText.split(' ');
    const sentences = promptText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Length scoring (0-20 points)
    if (words.length >= 15) {
      score += 20;
      feedback.push("✅ Good length - detailed enough for clear instructions");
    } else if (words.length >= 10) {
      score += 15;
      feedback.push("⚠️ Moderate length - consider adding more context");
    } else {
      score += 5;
      feedback.push("❌ Too short - add more details and context");
    }
    
    // Specificity scoring (0-25 points)
    const specificityKeywords = ['specific', 'detailed', 'example', 'format', 'step-by-step', 'exactly', 'precisely'];
    const foundSpecificity = specificityKeywords.filter(keyword => promptText.toLowerCase().includes(keyword));
    if (foundSpecificity.length >= 2) {
      score += 25;
      feedback.push("✅ Excellent specificity with clear requirements");
    } else if (foundSpecificity.length >= 1) {
      score += 15;
      feedback.push("⚠️ Some specificity - consider adding more precise requirements");
    } else {
      score += 5;
      feedback.push("❌ Lacks specificity - be more precise about what you want");
    }
    
    // Context scoring (0-20 points)
    const contextKeywords = ['context', 'background', 'purpose', 'audience', 'goal', 'objective'];
    const foundContext = contextKeywords.filter(keyword => promptText.toLowerCase().includes(keyword));
    if (foundContext.length >= 2) {
      score += 20;
      feedback.push("✅ Rich context provided");
    } else if (foundContext.length >= 1) {
      score += 15;
      feedback.push("⚠️ Some context - consider adding more background");
    } else {
      score += 5;
      feedback.push("❌ Missing context - add background information");
    }
    
    // Structure scoring (0-20 points)
    if (sentences.length >= 3 && promptText.includes('\n')) {
      score += 20;
      feedback.push("✅ Well-structured with clear formatting");
    } else if (sentences.length >= 2) {
      score += 15;
      feedback.push("⚠️ Basic structure - consider using bullet points or sections");
    } else {
      score += 5;
      feedback.push("❌ Poor structure - break into clear sections");
    }
    
    // Politeness and clarity (0-15 points)
    const politenessKeywords = ['please', 'could you', 'would you', 'help me', 'thank you'];
    const foundPoliteness = politenessKeywords.filter(keyword => promptText.toLowerCase().includes(keyword));
    if (foundPoliteness.length >= 1) {
      score += 15;
      feedback.push("✅ Polite and professional tone");
    } else {
      score += 5;
      feedback.push("⚠️ Consider adding polite language");
    }

    const finalScore = Math.min(100, Math.max(0, score));
    setPromptScore(finalScore);
    setPromptAnalysis(feedback.join('\n'));
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete!",
      description: `Your prompt scored ${finalScore}/100`,
    });
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const newHistory = [...chatHistory, { type: 'user' as const, message: chatInput, timestamp }];
    setChatHistory(newHistory);
    setIsChatting(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Enhanced AI responses based on input analysis
    let response = "";
    const input = chatInput.toLowerCase();
    
    if (input.includes("hello") || input.includes("hi")) {
      response = "Hello! 👋 I'm your AI assistant specializing in prompt engineering. I can help you craft better prompts, explain techniques, or discuss AI best practices. What would you like to explore today?";
    } else if (input.includes("prompt") && input.includes("better")) {
      response = "Great question about improving prompts! Here are key strategies:\n\n🎯 Be specific about your desired outcome\n📝 Provide context and background\n💡 Include examples when helpful\n🔧 Use clear formatting and structure\n✅ Set constraints and expectations\n\nTry the prompt analyzer above to get detailed feedback!";
    } else if (input.includes("technique")) {
      response = "Excellent! Here are some powerful prompting techniques:\n\n🔗 **Chain-of-Thought**: Ask the AI to show its reasoning\n🎭 **Role Playing**: Have the AI adopt a specific persona\n📊 **Few-Shot Learning**: Provide examples of desired output\n🎯 **Zero-Shot**: Direct instructions without examples\n🔄 **Iterative Refinement**: Build on previous responses\n\nWhich technique interests you most?";
    } else if (input.includes("example")) {
      response = "Here's a great example transformation:\n\n❌ **Bad**: \"Write about AI\"\n\n✅ **Good**: \"Write a 500-word article about AI's impact on healthcare for medical professionals. Include 3 specific examples of current AI applications, benefits, challenges, and future potential. Use a professional but accessible tone.\"\n\nSee how the improved version is specific, contextual, and structured?";
    } else if (input.includes("help") || input.includes("stuck")) {
      response = "I'm here to help! 🚀 Here's what I can assist with:\n\n📝 Analyzing and improving your prompts\n🎯 Teaching advanced prompting techniques\n💡 Providing examples and templates\n🔧 Troubleshooting prompt issues\n📚 Explaining AI concepts and best practices\n\nWhat specific challenge are you facing?";
    } else if (input.includes("score") || input.includes("analyze")) {
      response = "The prompt analyzer above uses these criteria:\n\n📏 **Length**: Adequate detail without being verbose\n🎯 **Specificity**: Clear, precise requirements\n📖 **Context**: Background and purpose\n🏗️ **Structure**: Well-organized format\n💬 **Tone**: Professional and clear communication\n\nTry analyzing your prompt to get a detailed breakdown and improvement suggestions!";
    } else {
      const responses = [
        "That's an interesting question! Let me break this down for you:\n\n🔍 First, consider your specific goal\n📋 Then, structure your request clearly\n🎯 Add relevant context and constraints\n✨ Finally, specify your desired format\n\nWould you like me to help you craft a prompt for this?",
        "Great point! Here's my analysis:\n\n💡 This relates to several key prompting principles\n🎯 Focus on clarity and specificity\n📊 Consider your audience and purpose\n🔧 Use appropriate formatting and structure\n\nWhat specific aspect would you like to explore further?",
        "Excellent question! Let me provide some insights:\n\n🧠 This touches on important AI interaction concepts\n📝 Consider using structured approaches\n🎪 Role-playing can be very effective here\n💎 Remember: specificity leads to better results\n\nWould you like me to demonstrate with an example?",
        "I love this question! Here's how I'd approach it:\n\n🎯 Start with a clear objective\n📖 Provide necessary context\n🔧 Use specific formatting requirements\n✅ Include success criteria\n\nShall we work through this together step by step?"
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }
    
    setChatHistory(prev => [...prev, { type: 'ai', message: response, timestamp: new Date().toLocaleTimeString() }]);
    setIsChatting(false);
    setChatInput("");
  };

  const copyTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
    toast({
      title: "Template Copied!",
      description: "The template has been copied to your clipboard",
    });
  };

  const clearChat = () => {
    setChatHistory([]);
    toast({
      title: "Chat Cleared",
      description: "Conversation history has been reset",
    });
  };

  const resetAnalyzer = () => {
    setPromptText("");
    setPromptScore(null);
    setPromptAnalysis("");
    toast({
      title: "Analyzer Reset",
      description: "Ready for a new prompt analysis",
    });
  };

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 60) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  const switchToTab = (tabValue: string) => {
    // Use React state to handle tab switching instead of DOM manipulation
    const tabTrigger = document.querySelector(`[value="${tabValue}"]`) as HTMLButtonElement;
    if (tabTrigger) {
      tabTrigger.click();
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Interactive AI Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Hands-on tools to master prompt engineering with real-time feedback and AI interaction
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
              } px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Interactive Features */}
        <Tabs defaultValue="analyzer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Analyzer
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer" className="space-y-6">
            <Card className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-indigo-200 dark:border-indigo-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                    Advanced Prompt Analyzer
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetAnalyzer}
                    className="hover:bg-indigo-50"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
                <CardDescription>
                  Get detailed analysis and scoring of your prompts with actionable improvement suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Enter your prompt for analysis:
                  </label>
                  <Textarea
                    placeholder="Example: 'Write a comprehensive guide about renewable energy for high school students. Include solar, wind, and hydroelectric power with real-world examples, benefits, challenges, and future prospects. Use clear explanations and engaging language suitable for teenagers.'"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="min-h-32 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500"
                  />
                  <div className="text-xs text-slate-500 flex justify-between">
                    <span>{promptText.split(' ').filter(w => w.length > 0).length} words</span>
                    <span>{promptText.length} characters</span>
                  </div>
                </div>
                
                <Button 
                  onClick={analyzePrompt} 
                  disabled={isAnalyzing || !promptText.trim()}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing Prompt...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Analyze Prompt
                    </>
                  )}
                </Button>
                
                {promptScore !== null && (
                  <div className="space-y-4 p-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getScoreIcon(promptScore)}
                        <span className={`font-bold text-2xl ${getScoreColor(promptScore)}`}>
                          {promptScore}/100
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-indigo-600">
                          {promptScore >= 80 ? "Excellent" : promptScore >= 60 ? "Good" : "Needs Improvement"}
                        </span>
                      </div>
                    </div>
                    
                    <Progress value={promptScore} className="w-full h-3" />
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">Detailed Analysis:</h4>
                      <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line bg-white dark:bg-slate-900 p-4 rounded-lg border">
                        {promptAnalysis}
                      </div>
                    </div>
                    
                    {promptScore < 80 && (
                      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">💡 Quick Tips:</h5>
                        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                          <li>• Add more specific details about your desired outcome</li>
                          <li>• Provide context and background information</li>
                          <li>• Use clear formatting with bullet points or sections</li>
                          <li>• Include examples or constraints when helpful</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    Interactive AI Assistant
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearChat}
                    className="hover:bg-green-50"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear Chat
                  </Button>
                </div>
                <CardDescription>
                  Practice prompting techniques with live AI responses. Ask about techniques, get examples, or test your prompts!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-slate-200 dark:border-slate-700 rounded-lg p-4 min-h-80 max-h-80 overflow-y-auto bg-slate-50 dark:bg-slate-900">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-slate-500 dark:text-slate-400 py-8 space-y-4">
                      <Brain className="w-12 h-12 mx-auto opacity-50" />
                      <div>
                        <p className="font-medium">Start a conversation!</p>
                        <p className="text-sm">Try asking about prompting techniques, examples, or best practices.</p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setChatInput("What are the best prompting techniques?")}
                          className="text-xs"
                        >
                          Prompting techniques
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setChatInput("Show me a good prompt example")}
                          className="text-xs"
                        >
                          Show examples
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setChatInput("How can I make my prompts better?")}
                          className="text-xs"
                        >
                          Improve prompts
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatHistory.map((message, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-indigo-500 text-white ml-8 rounded-br-sm'
                              : 'bg-white dark:bg-slate-800 mr-8 border-2 border-slate-200 dark:border-slate-700 rounded-bl-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">
                              {message.type === 'user' ? '👤 You' : '🤖 AI Assistant'}
                            </div>
                            <div className="text-xs opacity-70">
                              {message.timestamp}
                            </div>
                          </div>
                          <div className="whitespace-pre-line">{message.message}</div>
                        </div>
                      ))}
                      {isChatting && (
                        <div className="bg-white dark:bg-slate-800 mr-8 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-4 rounded-bl-sm">
                          <div className="flex items-center gap-2 text-sm font-medium mb-2">
                            🤖 AI Assistant
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about prompting techniques, examples, or best practices..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isChatting && handleChatSubmit()}
                    disabled={isChatting}
                    className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus:border-green-500"
                  />
                  <Button 
                    onClick={handleChatSubmit} 
                    disabled={isChatting || !chatInput.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                  >
                    {isChatting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(promptTemplates).map(([key, template]) => (
                <Card key={key} className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-purple-600 dark:text-purple-400 text-lg">
                          {template.title}
                        </CardTitle>
                        <Badge variant="outline" className="mt-2">
                          {template.category}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyTemplate(template.template)}
                        className="hover:bg-purple-50 dark:hover:bg-purple-900/30 border-purple-300"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <strong>Use case:</strong> {template.useCase}
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto">
                      <pre className="text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-300 font-mono">
                        {template.template}
                      </pre>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Target className="w-3 h-3" />
                      Professional template • Proven results • Copy and customize
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overview" className="space-y-8">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredFeatures.map((feature, index) => (
                <Card key={feature.id} className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105 h-full">
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
                      onClick={() => {
                        // Switch to the appropriate tab based on feature
                        if (feature.id === "prompt-analyzer") {
                          switchToTab("analyzer");
                        } else if (feature.id === "chat-simulator") {
                          switchToTab("chat");
                        } else if (feature.id === "template-library") {
                          switchToTab("templates");
                        }
                        toast({
                          title: "Feature Activated!",
                          description: `${feature.title} is now ready to use`,
                        });
                      }}
                    >
                      Try Interactive Feature
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Success Stories */}
        <div className="mt-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Join Thousands of Successful Users</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Our comprehensive prompt engineering platform has helped professionals across industries 
              achieve remarkable results with AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-sm opacity-90">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">98%</div>
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
