
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  Bot,
  User,
  Sparkles,
  Lightbulb,
  Code,
  HelpCircle
} from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const message = userMessage.toLowerCase();
    
    // AI responses based on context
    if (message.includes('prompt') || message.includes('engineering')) {
      return "Great question about prompt engineering! 🎯 Here are some key tips:\n\n• Be specific and detailed in your requests\n• Provide context and examples when helpful\n• Use clear structure and formatting\n• Iterate and refine based on results\n\nWould you like me to help you craft a specific prompt or explain any technique in detail?";
    }
    
    if (message.includes('ai') && (message.includes('topic') || message.includes('learn'))) {
      return "I can help you explore AI topics! 🤖 Our platform covers:\n\n🧠 Machine Learning fundamentals\n🔬 Neural Networks & Deep Learning\n⚖️ AI Ethics and responsible AI\n👁️ Computer Vision applications\n💬 Natural Language Processing\n🏥 AI in Healthcare\n\nWhich area interests you most? I can provide resources and learning paths!";
    }
    
    if (message.includes('code') || message.includes('programming')) {
      return "Let's talk coding! 💻 I can help with:\n\n🐍 Python for AI/ML\n⚛️ JavaScript/React development\n🔧 API integration\n📊 Data structures\n🛠️ Best practices\n\nWhat programming challenge are you working on? Share your code and I'll provide guidance!";
    }
    
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello there! 👋 I'm your AI assistant, ready to help you with:\n\n✨ Prompt engineering techniques\n🤖 AI and machine learning concepts\n💻 Coding and development\n📚 Learning resources\n\nWhat would you like to explore today?";
    }
    
    if (message.includes('help')) {
      return "I'm here to help! 🚀 I can assist you with:\n\n🎯 **Prompt Engineering**: Crafting effective AI prompts\n🧠 **AI Topics**: Machine learning, neural networks, ethics\n💻 **Coding**: Python, JavaScript, best practices\n📖 **Learning**: Resources, tutorials, examples\n🔧 **Tools**: Interactive features and templates\n\nJust ask me anything specific you'd like to know!";
    }
    
    if (message.includes('example') || message.includes('show me')) {
      return "Here's a practical example! 💡\n\n**Good AI Prompt:**\n\"Create a Python function that validates email addresses using regex. Include error handling, test cases, and clear documentation. Make it suitable for a beginner to understand.\"\n\n**Why it works:**\n• Specific task (email validation)\n• Technology specified (Python, regex)\n• Requirements listed (error handling, tests, docs)\n• Target audience defined (beginner)\n\nWant me to show examples for other topics?";
    }
    
    // Default responses
    const responses = [
      "That's an interesting question! 🤔 Let me help you with that. Could you provide more specific details about what you're trying to achieve?",
      "I'd love to help you explore that topic further! 🌟 What specific aspect would you like to dive deeper into?",
      "Great point! 💡 Based on what you're asking, I think we should consider a few different approaches. What's your current experience level with this topic?",
      "Excellent question! 🎯 This touches on some important concepts. Would you like me to explain the fundamentals first, or jump into advanced techniques?",
      "I can definitely help with that! 🚀 To give you the most relevant advice, could you tell me more about your specific use case or goal?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
      const aiResponse = await generateAIResponse(inputMessage);
      
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
    { icon: Lightbulb, label: "Prompt Tips", message: "Give me tips for better prompt engineering" },
    { icon: Code, label: "Code Help", message: "Help me with coding best practices" },
    { icon: Sparkles, label: "AI Topics", message: "What AI topics should I learn?" },
    { icon: HelpCircle, label: "Get Started", message: "How do I get started with AI?" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`w-96 h-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`}>
        <CardHeader className="pb-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">AI Assistant</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs opacity-90">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1 h-6 w-6"
              >
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-white hover:bg-white/20 p-1 h-6 w-6"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Welcome! I'm your AI Assistant
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Ask me about prompt engineering, AI topics, coding, or anything else!
                </p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputMessage(action.message)}
                      className="text-xs p-2 h-auto flex flex-col items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    >
                      <action.icon className="w-3 h-3" />
                      {action.label}
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
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                      <div className={`text-xs mt-1 opacity-70 ${message.type === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg rounded-bl-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                  placeholder="Ask me anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping}
                  className="flex-1 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isTyping || !inputMessage.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
```

Now I'll create a floating chat button component:

<lov-write file_path="src/components/ChatFloatingButton.tsx">
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { AIChatAssistant } from './AIChatAssistant';

export const ChatFloatingButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {!isChatOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
        </Button>
      )}
      
      <AIChatAssistant isOpen={isChatOpen} onToggle={toggleChat} />
    </>
  );
};
```

Finally, I'll update the main App component to include the floating chat button:

<lov-write file_path="src/App.tsx">
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ChatFloatingButton } from "@/components/ChatFloatingButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="prompt-engineering-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatFloatingButton />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
```
