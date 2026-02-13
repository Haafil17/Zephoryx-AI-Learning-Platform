
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
  HelpCircle,
  BookOpen,
  Zap,
  Target,
  Brain,
  Atom,
  Palette
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
  position: { x: number; y: number };
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ isOpen, onToggle, position }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; offsetX: number; offsetY: number }>({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
  });
  const [chatPosition, setChatPosition] = useState(position);

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
    
    // Enhanced AI responses with deep knowledge of the website
    if (message.includes('technique') || message.includes('prompt engineering')) {
      return "🎯 **Prompt Engineering Techniques Available:**\n\n**Advanced Techniques:**\n• **Chain-of-Thought**: Break down complex problems step by step\n• **Few-Shot Learning**: Provide examples to guide responses\n• **Role-Based Prompting**: Define specific roles (teacher, analyst, etc.)\n• **Temperature Control**: Adjust creativity vs consistency\n• **System Instructions**: Set behavioral guidelines\n\n**Interactive Features:**\n• Prompt Builder Tool\n• Template Generator\n• A/B Testing Framework\n• Performance Analytics\n\nWhich technique would you like to explore in detail?";
    }
    
    if (message.includes('example') || message.includes('template')) {
      return "💡 **Prompt Templates & Examples:**\n\n**1. Analysis Template:**\n\"Analyze [topic] considering [criteria]. Provide structured insights with evidence and recommendations.\"\n\n**2. Creative Writing:**\n\"Write a [type] about [subject] in the style of [author/genre]. Focus on [specific elements].\"\n\n**3. Problem Solving:**\n\"Break down [problem] into components. For each component, suggest solutions with pros/cons.\"\n\n**4. Code Generation:**\n\"Create [language] code for [functionality]. Include error handling, comments, and best practices.\"\n\n**Interactive Tools Available:**\n• Template Customizer\n• Prompt Analyzer\n• Performance Tracker\n\nWant me to help you customize any template?";
    }
    
    if (message.includes('best practice') || message.includes('tips')) {
      return "🏆 **Advanced Best Practices:**\n\n**Prompt Structure:**\n• Clear context setting\n• Specific task definition\n• Expected output format\n• Quality criteria\n\n**Advanced Techniques:**\n• Iterative refinement\n• Context window optimization\n• Token efficiency\n• Response formatting\n\n**Quality Assurance:**\n• A/B testing different approaches\n• Performance metrics tracking\n• Consistency validation\n• Error pattern analysis\n\n**Website Features:**\n• Interactive prompt builder\n• Real-time optimization suggestions\n• Community prompt sharing\n• Performance analytics dashboard\n\nWhich aspect would you like to dive deeper into?";
    }
    
    if (message.includes('ai topic') || message.includes('machine learning') || message.includes('neural')) {
      return "🤖 **AI & Machine Learning Topics:**\n\n**Core Concepts:**\n• Machine Learning Fundamentals\n• Neural Networks & Deep Learning\n• Natural Language Processing\n• Computer Vision\n• Reinforcement Learning\n\n**Advanced Topics:**\n• Transformer Architecture\n• Attention Mechanisms\n• Transfer Learning\n• Fine-tuning Strategies\n• Model Optimization\n\n**Practical Applications:**\n• Chatbot Development\n• Image Recognition\n• Sentiment Analysis\n• Recommendation Systems\n\n**Interactive Features:**\n• AI concept visualizer\n• Code playground\n• Model comparison tools\n\nWhat specific AI topic interests you most?";
    }
    
    if (message.includes('gen ai') || message.includes('generative') || message.includes('creative')) {
      return "🎨 **Generative AI Mastery:**\n\n**Core Technologies:**\n• GPT Models & Applications\n• DALL-E & Image Generation\n• Stable Diffusion Techniques\n• Audio Generation (Music, Voice)\n• Video Generation & Editing\n\n**Creative Applications:**\n• Content Creation Workflows\n• Art & Design Integration\n• Marketing Material Generation\n• Educational Content Development\n\n**Advanced Techniques:**\n• Prompt Chaining\n• Style Transfer\n• Fine-tuning for Specific Domains\n• Multi-modal Generation\n\n**Tools & Platforms:**\n• API Integration\n• Workflow Automation\n• Quality Control Systems\n\nWhich generative AI application would you like to explore?";
    }
    
    if (message.includes('quantum') || message.includes('computing')) {
      return "⚛️ **Quantum Computing & AI:**\n\n**Quantum Fundamentals:**\n• Quantum Bits (Qubits)\n• Superposition & Entanglement\n• Quantum Gates & Circuits\n• Quantum Algorithms\n\n**Quantum AI Applications:**\n• Quantum Machine Learning\n• Optimization Problems\n• Cryptography & Security\n• Simulation & Modeling\n\n**Practical Learning:**\n• Quantum Programming (Qiskit, Cirq)\n• Hybrid Classical-Quantum Algorithms\n• Real Hardware Access\n• Industry Applications\n\n**Interactive Features:**\n• Quantum circuit simulator\n• Algorithm visualizer\n• Performance comparisons\n\nWhat aspect of quantum computing interests you?";
    }
    
    if (message.includes('coding') || message.includes('programming') || message.includes('development')) {
      return "💻 **Coding & Development:**\n\n**Languages & Frameworks:**\n• Python for AI/ML\n• JavaScript & React\n• TypeScript Best Practices\n• API Development\n• Database Integration\n\n**AI Development Tools:**\n• TensorFlow & PyTorch\n• Hugging Face Transformers\n• OpenAI API Integration\n• Model Deployment\n\n**Best Practices:**\n• Code Quality & Testing\n• Performance Optimization\n• Security Considerations\n• Documentation Standards\n\n**Interactive Features:**\n• Code playground\n• Debugging assistant\n• Performance analyzer\n• Project templates\n\nWhat coding challenge can I help you with?";
    }
    
    if (message.includes('feature') || message.includes('tool') || message.includes('interactive')) {
      return "⚡ **Interactive Features Available:**\n\n**Prompt Engineering Tools:**\n• Advanced Prompt Builder\n• Template Generator\n• A/B Testing Framework\n• Performance Analytics\n• Optimization Suggestions\n\n**Learning Resources:**\n• Interactive Tutorials\n• Code Playground\n• Project Templates\n• Community Examples\n\n**AI Topic Explorers:**\n• Concept Visualizers\n• Algorithm Simulators\n• Model Comparisons\n• Real-world Applications\n\n**Navigation Tips:**\n• Use the tabs at the top to switch between topics\n• Each section has interactive elements\n• Try the hands-on examples\n• Join community discussions\n\nWhich feature would you like to try first?";
    }
    
    if (message.includes('navigate') || message.includes('how to use') || message.includes('website')) {
      return "🧭 **Website Navigation Guide:**\n\n**Main Sections:**\n• **🎯 Techniques** - Core prompt engineering methods\n• **💡 Examples** - Real-world prompt templates\n• **🏆 Best Practices** - Expert tips and strategies\n• **⚡ Features** - Interactive tools and builders\n• **🤖 AI Topics** - Machine learning fundamentals\n• **🎨 Gen AI** - Generative AI applications\n• **⚛️ Quantum** - Quantum computing concepts\n• **💻 Coding** - Programming and development\n• **📚 Resources** - Additional learning materials\n\n**Pro Tips:**\n• Each tab contains interactive elements\n• Use the search functionality to find specific topics\n• Try the hands-on examples and tools\n• Dark/Light mode toggle in the top right\n\nWhat section would you like to explore first?";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('start')) {
      return "👋 **Welcome to ZEPHORYX AI LAB!**\n\nI'm your intelligent assistant with deep knowledge of this entire platform. I can help you with:\n\n🎯 **Prompt Engineering**: Advanced techniques, templates, and optimization\n🤖 **AI & ML**: Machine learning, neural networks, and applications\n🎨 **Generative AI**: Creative applications and content generation\n⚛️ **Quantum Computing**: Quantum algorithms and AI applications\n💻 **Coding**: Programming, development, and best practices\n⚡ **Interactive Tools**: Builders, analyzers, and simulators\n\n**Quick Start:**\n• Ask me about any topic on this website\n• Request specific examples or templates\n• Get personalized learning recommendations\n• Explore interactive features and tools\n\nWhat would you like to explore today?";
    }
    
    if (message.includes('dark mode') || message.includes('theme')) {
      return "🌙 **Theme & Dark Mode:**\n\nI notice you mentioned dark mode clarity! The website supports both light and dark themes with improved contrast:\n\n**Theme Features:**\n• Toggle button in the top-right corner\n• Automatic system preference detection\n• Improved readability in both modes\n• Better contrast ratios\n• Eye-friendly color schemes\n\n**If dark mode isn't clear enough:**\n• Try refreshing the page\n• Check your browser's zoom level\n• Ensure you're using the latest version\n\n**Accessibility Features:**\n• High contrast options\n• Readable font sizes\n• Clear visual hierarchy\n\nLet me know if you need help with any theme-related issues!";
    }
    
    // Default responses with more context - direct and relevant
    const contextualResponses = [
      "I can help you with that topic. 🤔 This platform covers prompt engineering, AI/ML fundamentals, generative AI applications, quantum computing, and coding resources. What specific information are you looking for?",
      
      "Based on your question, I can guide you to the relevant content. 🌟 Would you like to know about techniques, see examples, learn best practices, or explore any of our AI topics?",
      
      "Let me help you find what you need. 🎯 This website has sections on prompt engineering techniques, practical examples, AI fundamentals, generative AI, quantum computing, and development guides. Which area relates to your question?",
      
      "I'm here to assist. 💡 Could you clarify which topic you're interested in? I have access to content on prompting methods, AI concepts, creative applications, quantum computing, or coding tutorials.",
      
      "I can provide guidance on that. 🚀 To give you the most relevant information, could you specify whether you're interested in learning techniques, seeing examples, or exploring a specific AI topic area?"
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
    { icon: Target, label: "Techniques", message: "Show me advanced prompt engineering techniques" },
    { icon: Lightbulb, label: "Examples", message: "Give me practical prompt examples and templates" },
    { icon: Brain, label: "AI Topics", message: "Explain machine learning and AI concepts" },
    { icon: Palette, label: "Gen AI", message: "Help me with generative AI applications" },
    { icon: Atom, label: "Quantum", message: "Teach me about quantum computing and AI" },
    { icon: Code, label: "Coding", message: "Help me with programming and development" },
    { icon: Zap, label: "Features", message: "Show me the interactive tools and features" },
    { icon: BookOpen, label: "Navigate", message: "How do I navigate and use this website?" }
  ];

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - chatPosition.x,
      offsetY: e.clientY - chatPosition.y
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = Math.abs(moveEvent.clientX - dragRef.current.startX);
      const deltaY = Math.abs(moveEvent.clientY - dragRef.current.startY);
      
      if (deltaX > 5 || deltaY > 5) {
        setIsDragging(true);
      }

      setChatPosition({
        x: moveEvent.clientX - dragRef.current.offsetX,
        y: moveEvent.clientY - dragRef.current.offsetY
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setTimeout(() => setIsDragging(false), 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    setChatPosition(position);
  }, [position]);

  // Show the chat when isOpen is true
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        left: `${chatPosition.x}px`,
        top: `${chatPosition.y}px`,
        zIndex: 50
      }}
    >
      <Card className={`w-96 bg-white/95 dark:bg-slate-900/98 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-700/80 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
        <CardHeader 
          onMouseDown={handleHeaderMouseDown}
          className="pb-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white cursor-move"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">ZEPHORYX Assistant</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs opacity-90">Full Website Knowledge</span>
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
          <CardContent className="p-0 flex flex-col h-[436px]">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                  Welcome to ZEPHORYX AI LAB!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  I have complete knowledge of this platform - from prompt engineering to quantum computing!
                </p>
                <div className="grid grid-cols-2 gap-2 w-full max-h-48 overflow-y-auto">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputMessage(action.message)}
                      className="text-xs p-2 h-auto flex flex-col items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50"
                    >
                      <action.icon className="w-3 h-3" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800/70 dark:to-indigo-800/70 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 dark:bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                      <div className={`text-xs mt-1 opacity-70 ${message.type === 'user' ? 'text-blue-100 dark:text-blue-200' : 'text-slate-500 dark:text-slate-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800/70 dark:to-indigo-800/70 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg rounded-bl-sm border border-slate-200 dark:border-slate-700">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about this website..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping}
                  className="flex-1 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isTyping || !inputMessage.trim()}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3"
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
