
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Send, X, Minimize2, Maximize2, Bot, User, Sparkles,
  Lightbulb, Code, BookOpen, Zap, Target, Brain, Atom,
  Palette, Trash2, Loader2, GraduationCap
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useDifficulty } from "@/contexts/DifficultyContext";
import { Badge } from "@/components/ui/badge";

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
  const [userProfile, setUserProfile] = useState<{ xp: number; level: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; offsetX: number; offsetY: number }>({
    startX: 0, startY: 0, offsetX: 0, offsetY: 0
  });
  const [chatPosition, setChatPosition] = useState(position);
  const { user } = useAuth();
  const { difficulty } = useDifficulty();

  // Fetch user profile for context
  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('xp, level').eq('id', user.id).single()
      .then(({ data }) => { if (data) setUserProfile({ xp: data.xp || 0, level: data.level || 'AI Beginner' }); });
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendToAI = async (userMessage: string): Promise<string> => {
    const { data, error } = await supabase.functions.invoke('prompt-ai', {
      body: { action: 'test', prompt: userMessage }
    });

    if (error) throw new Error(error.message || 'Failed to get AI response');
    if (data?.error) throw new Error(data.error);
    return data?.result || 'Sorry, I could not generate a response.';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const msg = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await sendToAI(msg);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }]);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      if (errMsg.includes('429') || errMsg.includes('Rate limit')) {
        toast.error("Rate limit exceeded. Please wait a moment.");
      } else if (errMsg.includes('402') || errMsg.includes('Payment')) {
        toast.error("AI credits exhausted. Please add credits.");
      } else {
        toast.error("Failed to get response. Please try again.");
      }
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
    { icon: Target, label: "Techniques", message: "What are the best prompt engineering techniques?" },
    { icon: Lightbulb, label: "Examples", message: "Give me practical prompt examples" },
    { icon: Brain, label: "AI Topics", message: "Explain key AI and machine learning concepts" },
    { icon: Palette, label: "Gen AI", message: "How do generative AI models work?" },
    { icon: Atom, label: "Quantum", message: "What is quantum computing and how does it relate to AI?" },
    { icon: Code, label: "Coding", message: "Help me with AI coding best practices" },
    { icon: Zap, label: "RAG", message: "How does Retrieval-Augmented Generation work?" },
    { icon: BookOpen, label: "Fine-Tuning", message: "Explain LLM fine-tuning techniques like LoRA and QLoRA" }
  ];

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    dragRef.current = {
      startX: e.clientX, startY: e.clientY,
      offsetX: e.clientX - chatPosition.x,
      offsetY: e.clientY - chatPosition.y
    };
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = Math.abs(moveEvent.clientX - dragRef.current.startX);
      const deltaY = Math.abs(moveEvent.clientY - dragRef.current.startY);
      if (deltaX > 5 || deltaY > 5) setIsDragging(true);
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

  useEffect(() => { setChatPosition(position); }, [position]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', left: `${chatPosition.x}px`, top: `${chatPosition.y}px`, zIndex: 50 }}>
      <Card className={`w-96 bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
        <CardHeader 
          onMouseDown={handleHeaderMouseDown}
          className="pb-2 px-4 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground cursor-move rounded-t-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">ZEPHORYX Assistant</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs opacity-90">Powered by Gemini 2.5 Flash</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="text-primary-foreground hover:bg-primary-foreground/20 p-1 h-6 w-6">
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggle} className="text-primary-foreground hover:bg-primary-foreground/20 p-1 h-6 w-6">
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[436px]">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">ZEPHORYX AI Assistant</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ask me anything about AI, prompt engineering, RAG, fine-tuning, and more!
                </p>
                <div className="grid grid-cols-2 gap-2 w-full max-h-48 overflow-y-auto">
                  {quickActions.map((action, index) => (
                    <Button key={index} variant="outline" size="sm"
                      onClick={() => setInputMessage(action.message)}
                      className="text-xs p-2 h-auto flex flex-col items-center gap-1 hover:bg-primary/5"
                    >
                      <action.icon className="w-3 h-3" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'ai' && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-md' 
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3 h-3 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <Sparkles className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-md px-3 py-2 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            <div className="p-3 border-t border-border">
              {messages.length > 0 && (
                <div className="flex justify-end mb-2">
                  <Button variant="ghost" size="sm" onClick={() => setMessages([])} className="text-xs text-muted-foreground h-6 px-2">
                    <Trash2 className="w-3 h-3 mr-1" /> Clear
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask anything about AI..."
                  className="flex-1 text-sm h-9"
                  disabled={isTyping}
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} size="sm" className="h-9 w-9 p-0">
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
