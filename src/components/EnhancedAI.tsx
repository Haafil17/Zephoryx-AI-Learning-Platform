
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Minimize2, 
  Maximize2,
  Bot,
  User,
  Sparkles,
  Lightbulb,
  Code,
  HelpCircle,
  BookOpen,
  Trophy,
  Brain,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ContextualAIProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const EnhancedAI: React.FC<ContextualAIProps> = ({ isMinimized, onToggleMinimize }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const websiteKnowledge = {
    techniques: [
      "Chain-of-Thought prompting for step-by-step reasoning",
      "Few-shot learning with examples",
      "Role-based prompting for specific contexts",
      "Temperature control for creativity vs precision",
      "Prompt templates for consistency"
    ],
    features: [
      "Interactive prompt builder with real-time preview",
      "XP system for completing lessons and challenges",
      "Leaderboard to compete with other learners",
      "Comprehensive AI topics covering ML, ethics, and more",
      "Dark/light mode for comfortable learning"
    ],
    topics: [
      "Machine Learning fundamentals and neural networks",
      "AI Ethics and responsible AI development",
      "Natural Language Processing and transformers",
      "Computer Vision and image recognition",
      "Generative AI and large language models",
      "Quantum computing basics and applications"
    ]
  };

  const generateContextualResponse = async (userMessage: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const message = userMessage.toLowerCase();
    
    // Enhanced responses with website knowledge
    if (message.includes('lesson') || message.includes('xp') || message.includes('learn')) {
      return `🎓 I see you're interested in learning! Our platform offers:\n\n• **Structured lessons** on AI topics with XP rewards\n• Complete lessons to earn XP and climb the leaderboard\n• Topics range from prompt engineering to quantum computing\n• Track your progress and compete with other learners\n\nWould you like me to recommend some lessons based on your interests?`;
    }
    
    if (message.includes('leaderboard') || message.includes('rank') || message.includes('compete')) {
      return `🏆 The XP Leaderboard is where top learners shine! Here's how it works:\n\n• Earn XP by completing lessons and challenges\n• Your rank is based on total XP earned\n• Levels range from 'AI Beginner' to 'AI Master'\n• See where you stand among other learners\n• Climb higher by completing more advanced lessons\n\nReady to start earning XP and climbing the ranks?`;
    }

    if (message.includes('prompt') || message.includes('engineering')) {
      const techniques = websiteKnowledge.techniques.join('\n• ');
      return `🎯 Excellent question about prompt engineering! Our platform covers:\n\n• ${techniques}\n\n**Pro tip:** Start with our "Introduction to Prompt Engineering" lesson to build a solid foundation. Each technique you master will help you communicate more effectively with AI models.\n\nWhich technique interests you most?`;
    }
    
    if (message.includes('ai') && (message.includes('topic') || message.includes('subject'))) {
      const topics = websiteKnowledge.topics.slice(0, 4).join('\n• ');
      return `🤖 Our AI curriculum is comprehensive! We cover:\n\n• ${topics}\n• And much more!\n\nEach topic has beginner to advanced lessons with hands-on examples. You'll earn XP as you progress and can track your learning journey.\n\nWhat area of AI excites you most?`;
    }
    
    if (message.includes('feature') || message.includes('tool')) {
      const features = websiteKnowledge.features.slice(0, 3).join('\n• ');
      return `⚡ Our platform is packed with interactive features:\n\n• ${features}\n\nThese tools make learning engaging and help you apply what you've learned immediately. The XP system gamifies your learning journey!\n\nWhich feature would you like to explore first?`;
    }

    if (message.includes('dark') || message.includes('light') || message.includes('theme')) {
      return `🌓 Great question about themes! You can toggle between dark and light modes using the theme switcher in the top navigation. \n\n• **Dark mode**: Perfect for late-night learning sessions\n• **Light mode**: Great for daytime study\n• Your preference is automatically saved\n\nThe interface adapts beautifully to both themes, making your learning experience comfortable anytime!`;
    }
    
    if (message.includes('start') || message.includes('begin') || message.includes('new')) {
      return `🚀 Welcome to your AI learning journey! Here's how to get started:\n\n1. **Sign up** to track your progress and earn XP\n2. **Browse lessons** - start with beginner-friendly topics\n3. **Complete lessons** to earn XP and unlock achievements\n4. **Check the leaderboard** to see your ranking\n5. **Explore different AI topics** at your own pace\n\nI recommend starting with "Introduction to Prompt Engineering" - it's perfect for beginners and earns you 100 XP!\n\nReady to begin?`;
    }

    if (message.includes('help') || message.includes('stuck') || message.includes('problem')) {
      return `🆘 I'm here to help! Here are some common solutions:\n\n• **Can't see lessons?** Make sure you're signed in\n• **XP not updating?** Refresh the page after completing a lesson\n• **Leaderboard issues?** Your rank updates in real-time\n• **Theme problems?** Try clearing your browser cache\n\nFor technical issues, check the console logs or ask me specific questions about any feature. What exactly are you experiencing?`;
    }

    // Enhanced default responses with more personality
    const contextualResponses = [
      `🎓 That's a fascinating question! Based on our platform's content, I'd suggest exploring our lessons on that topic. You'll find structured learning paths with practical examples and earn XP as you progress. What specific aspect interests you most?`,
      
      `💡 Great thinking! Our AI learning platform has interactive features that can help you dive deeper into that. Have you checked out our lessons section? You can earn XP and compete on the leaderboard while learning!`,
      
      `🤖 Interesting point! This connects well with several topics we cover - from prompt engineering to AI ethics. I'd recommend starting with our beginner lessons and working your way up. Each lesson is designed to build on the previous one!`,
      
      `⚡ That's exactly the kind of curiosity that makes great AI practitioners! Our platform has comprehensive resources on that topic. Plus, you'll earn XP for each lesson completed. Want me to suggest a learning path?`,
      
      `🌟 Excellent question! The beauty of our learning platform is that it covers everything from basics to advanced topics. You can start at any level and the XP system helps track your progress. What's your current experience level?`
    ];
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await generateContextualResponse(inputMessage);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Sorry, I encountered an error. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: BookOpen, label: "Start Learning", message: "How do I start learning AI on this platform?" },
    { icon: Trophy, label: "Earn XP", message: "How can I earn XP and climb the leaderboard?" },
    { icon: Lightbulb, label: "Prompt Tips", message: "Give me advanced prompt engineering tips" },
    { icon: Brain, label: "AI Topics", message: "What AI topics can I learn about here?" },
    { icon: Code, label: "Coding Help", message: "Help me with AI programming concepts" },
    { icon: HelpCircle, label: "Platform Guide", message: "How do I use all the features on this platform?" }
  ];

  return (
    <Card className={`w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-800 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-20' : 'h-[600px]'}`}>
      <CardHeader className="pb-2 px-4 py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">AI Learning Assistant</CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm opacity-90">Ready to help you learn</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMinimize}
            className="text-white hover:bg-white/20 p-2 h-8 w-8"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[520px]">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-3">
                Your AI Learning Companion
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
                I'm here to help you navigate our learning platform, answer questions about AI topics, and guide your learning journey!
              </p>
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(action.message)}
                    className="text-xs p-3 h-auto flex flex-col items-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-700"
                  >
                    <action.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-center">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-purple-200 dark:border-purple-700'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-line">{message.content}</div>
                    <div className={`text-xs mt-2 opacity-70 ${message.type === 'user' ? 'text-purple-100' : 'text-slate-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg rounded-bl-sm border border-purple-200 dark:border-purple-700">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me about AI, lessons, XP, or anything else..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                className="flex-1 bg-white dark:bg-slate-900 border-purple-300 dark:border-purple-600 focus:border-purple-500 dark:focus:border-purple-400"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
