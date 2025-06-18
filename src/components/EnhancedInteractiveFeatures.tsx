
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const EnhancedInteractiveFeatures = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [promptText, setPromptText] = useState("");
  const [promptScore, setPromptScore] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const { toast } = useToast();

  const features = [
    {
      id: "prompt-analyzer",
      icon: Calculator,
      title: "AI Prompt Analyzer",
      description: "Analyze and score your prompts based on clarity, specificity, and structure",
      category: "tools",
      popularity: 5,
      isNew: true,
      interactive: true
    },
    {
      id: "smart-suggestions",
      icon: Lightbulb,
      title: "Smart Prompt Suggestions",
      description: "AI-powered recommendations for improving your prompts in real-time",
      category: "smart",
      popularity: 5,
      isNew: true,
      interactive: true
    },
    {
      id: "chat-simulator",
      icon: MessageSquare,
      title: "Interactive Chat Simulator",
      description: "Practice with live examples and see how different prompts perform",
      category: "practice",
      popularity: 5,
      isNew: true,
      interactive: true
    },
    {
      id: "template-library",
      icon: FileText,
      title: "Professional Template Library",
      description: "Access 100+ professionally crafted prompt templates for various use cases",
      category: "templates",
      popularity: 4,
      isNew: false,
      interactive: true
    },
    {
      id: "code-generator",
      icon: Code,
      title: "Code Generation Assistant",
      description: "Specialized prompts for generating, debugging, and explaining code",
      category: "development",
      popularity: 5,
      isNew: false,
      interactive: true
    },
    {
      id: "creative-writer",
      icon: Palette,
      title: "Creative Writing Studio",
      description: "Unleash creativity with prompts designed for storytelling and content creation",
      category: "creative",
      popularity: 4,
      isNew: true,
      interactive: true
    }
  ];

  const promptTemplates = {
    "business": {
      title: "Business Analysis",
      template: "Analyze the following business scenario and provide strategic recommendations:\n\nScenario: [DESCRIBE SITUATION]\n\nConsider:\n- Market conditions\n- Competitive landscape\n- Financial implications\n- Risk assessment\n\nProvide actionable insights and next steps."
    },
    "creative": {
      title: "Creative Writing",
      template: "Write a compelling [STORY TYPE] with the following elements:\n\nSetting: [TIME AND PLACE]\nMain Character: [CHARACTER DESCRIPTION]\nConflict: [CENTRAL PROBLEM]\nTone: [MOOD/STYLE]\n\nMake it engaging and original, focusing on vivid descriptions and character development."
    },
    "technical": {
      title: "Technical Documentation",
      template: "Create comprehensive technical documentation for:\n\nTopic: [TECHNICAL SUBJECT]\nAudience: [TARGET USERS]\nFormat: [DOCUMENTATION TYPE]\n\nInclude:\n- Clear explanations\n- Step-by-step instructions\n- Code examples (if applicable)\n- Troubleshooting tips"
    },
    "educational": {
      title: "Educational Content",
      template: "Design an educational lesson plan for:\n\nSubject: [TOPIC]\nLevel: [BEGINNER/INTERMEDIATE/ADVANCED]\nDuration: [TIME FRAME]\nObjectives: [LEARNING GOALS]\n\nInclude:\n- Key concepts\n- Interactive activities\n- Assessment methods\n- Additional resources"
    }
  };

  const categories = [
    { id: "all", name: "All Features", count: features.length },
    { id: "smart", name: "AI-Powered", count: features.filter(f => f.category === "smart").length },
    { id: "tools", name: "Analysis Tools", count: features.filter(f => f.category === "tools").length },
    { id: "practice", name: "Practice", count: features.filter(f => f.category === "practice").length },
    { id: "templates", name: "Templates", count: features.filter(f => f.category === "templates").length },
    { id: "development", name: "Development", count: features.filter(f => f.category === "development").length },
    { id: "creative", name: "Creative", count: features.filter(f => f.category === "creative").length }
  ];

  const filteredFeatures = selectedCategory === "all" 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  const analyzePrompt = () => {
    if (!promptText.trim()) {
      toast({
        title: "Enter a prompt",
        description: "Please enter a prompt to analyze",
        variant: "destructive"
      });
      return;
    }

    // Simple scoring algorithm
    let score = 0;
    const words = promptText.split(' ');
    
    // Length scoring
    if (words.length >= 10) score += 20;
    if (words.length >= 20) score += 10;
    
    // Specificity scoring
    if (promptText.includes('specific') || promptText.includes('detailed')) score += 15;
    if (promptText.includes('example') || promptText.includes('format')) score += 15;
    
    // Clarity scoring
    if (promptText.includes('please') || promptText.includes('could you')) score += 10;
    if (promptText.includes('?')) score += 10;
    
    // Context scoring
    if (promptText.includes('context') || promptText.includes('background')) score += 15;
    if (promptText.includes('audience') || promptText.includes('purpose')) score += 15;
    
    // Constraint scoring
    if (promptText.includes('limit') || promptText.includes('within')) score += 10;
    if (promptText.includes('style') || promptText.includes('tone')) score += 10;

    const finalScore = Math.min(100, Math.max(0, score));
    setPromptScore(finalScore);
    
    toast({
      title: "Analysis Complete!",
      description: `Your prompt scored ${finalScore}/100`,
      variant: finalScore >= 70 ? "default" : "destructive"
    });
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    
    const newHistory = [...chatHistory, { type: 'user' as const, message: chatInput }];
    setChatHistory(newHistory);
    
    // Simulate AI response with different responses based on input
    setTimeout(() => {
      let response = "";
      if (chatInput.toLowerCase().includes("hello") || chatInput.toLowerCase().includes("hi")) {
        response = "Hello! I'm your AI assistant. How can I help you with prompt engineering today?";
      } else if (chatInput.toLowerCase().includes("prompt")) {
        response = "Great question about prompting! Here are some key principles: Be specific, provide context, set clear expectations, and include examples when helpful.";
      } else if (chatInput.toLowerCase().includes("help")) {
        response = "I'm here to help! You can ask me about prompt engineering techniques, best practices, or try different prompting strategies.";
      } else {
        const responses = [
          "That's an interesting prompt! Here's how I would approach it: First, I'd break down the task into smaller components...",
          "Great question! Let me provide a detailed response based on best practices...",
          "I can help you with that. Consider these key points when crafting your prompt...",
          "Excellent prompt structure! Here's my analysis and suggestions for improvement..."
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }
      
      setChatHistory(prev => [...prev, { type: 'ai', message: response }]);
    }, 1000);
    
    setChatInput("");
  };

  const copyTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
    toast({
      title: "Template Copied!",
      description: "The template has been copied to your clipboard",
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

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Interactive AI Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover powerful interactive tools designed to accelerate your AI mastery with hands-on experience
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
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analyzer">Analyzer</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        if (feature.interactive) {
                          toast({
                            title: "Feature Activated!",
                            description: `${feature.title} is now ready to use`,
                          });
                        }
                      }}
                    >
                      {feature.interactive ? "Try Interactive Feature" : "Learn More"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analyzer" className="space-y-6">
            <Card className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  Prompt Effectiveness Analyzer
                </CardTitle>
                <CardDescription>
                  Enter your prompt below and get an instant analysis with improvement suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your prompt here... (e.g., 'Please write a detailed analysis of climate change impacts on agriculture')"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="min-h-32 bg-white dark:bg-slate-900"
                />
                <Button onClick={analyzePrompt} className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Analyze Prompt
                </Button>
                {promptScore !== null && (
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      {promptScore >= 70 ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                      )}
                      <span className="font-semibold text-lg">Score: {promptScore}/100</span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {promptScore >= 70 
                        ? "Excellent prompt structure! Your prompt includes good specificity and context." 
                        : "Consider adding more context, specific examples, and clear formatting requirements to improve your prompt."}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  Interactive Chat Simulator
                </CardTitle>
                <CardDescription>
                  Practice your prompting skills with our AI simulator. Try different prompting techniques!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 min-h-64 max-h-64 overflow-y-auto bg-slate-50 dark:bg-slate-900">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                      Start a conversation by typing a prompt below. Try asking about prompting techniques!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatHistory.map((message, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-500 text-white ml-8'
                              : 'bg-white dark:bg-slate-800 mr-8 border'
                          }`}
                        >
                          <div className="text-sm font-medium mb-1">
                            {message.type === 'user' ? 'You' : 'AI Assistant'}
                          </div>
                          {message.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your prompt here... (e.g., 'What are the best prompting techniques?')"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                    className="bg-white dark:bg-slate-900"
                  />
                  <Button onClick={handleChatSubmit} className="bg-indigo-600 hover:bg-indigo-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(promptTemplates).map(([key, template]) => (
                <Card key={key} className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-indigo-600 dark:text-indigo-400">{template.title}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyTemplate(template.template)}
                        className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
                      <pre className="text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-300">{template.template}</pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-indigo-600" />
                  Code Generation Assistant
                </CardTitle>
                <CardDescription>
                  Specialized tools for code-related prompts and generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Code className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Advanced code generation tools are coming soon! This will include:
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-2 text-slate-600 dark:text-slate-400">
                    <li>• Syntax highlighting and analysis</li>
                    <li>• Code debugging assistance</li>
                    <li>• Programming language prompts</li>
                    <li>• Code review and optimization</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creative" className="space-y-6">
            <Card className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-indigo-600" />
                  Creative Writing Studio
                </CardTitle>
                <CardDescription>
                  Unleash your creativity with specialized writing prompts and tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Palette className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Creative writing tools are coming soon! This will include:
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-2 text-slate-600 dark:text-slate-400">
                    <li>• Story and character generators</li>
                    <li>• Creative prompt suggestions</li>
                    <li>• Writing style analysis</li>
                    <li>• Content structure tools</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
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
