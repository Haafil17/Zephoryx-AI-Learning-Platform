import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Brain, Copy, Trash2, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "What are the best prompting techniques for AI?",
  "Explain chain-of-thought prompting",
  "How do I improve AI response quality?",
  "What is prompt engineering?"
];

export const PromptTester = () => {
  const { user } = useAuth();
  const { canUseFeature, trackUsage, getRemainingUses } = useSubscription();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const remaining = getRemainingUses("prompt_tester");
  const isUnlimited = remaining === -1;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a message");
      return;
    }

    // Non-logged in users can't use tester
    if (!user) {
      toast.error("Please sign in to use the Prompt Tester");
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }

    // Check usage limits
    if (!canUseFeature("prompt_tester")) {
      toast.error("You've reached your daily limit. Upgrade for more!");
      return;
    }

    // Track usage before making the API call
    const tracked = await trackUsage("prompt_tester");
    if (!tracked) {
      toast.error("Unable to track usage. Please try again.");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: prompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("prompt-ai", {
        body: {
          action: "test",
          prompt: prompt,
        },
      });

      if (error) {
        throw error;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.result,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process request");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
    toast.success("Chat cleared");
  };

  const useSuggestedPrompt = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <Card className="shadow-lg h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <CardTitle>ZEPHORYX AI Assistant</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <Badge 
                variant={!isUnlimited && remaining <= 1 ? "destructive" : remaining <= 3 ? "secondary" : "outline"}
                className="text-xs"
              >
                {isUnlimited ? "Unlimited" : `${remaining} uses left`}
              </Badge>
            )}
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <CardDescription>
          Get instant answers about AI, prompting techniques, and more
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4 min-h-0">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 py-8">
            <div className="text-center space-y-2">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg">Start a conversation</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Try one of these prompts or ask your own question
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {SUGGESTED_PROMPTS.map((suggestion, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="h-auto py-3 px-4 text-left justify-start whitespace-normal"
                  onClick={() => useSuggestedPrompt(suggestion)}
                >
                  <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{suggestion}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.role === "assistant" && (
                        <Brain className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1 space-y-2">
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => copyToClipboard(message.content, idx)}
                          >
                            {copiedIndex === idx ? (
                              <>
                                <Check className="w-3 h-3 mr-1" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 mr-1" />
                                Copy
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="max-w-[80%] rounded-lg p-4 bg-muted">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}

        <div className="space-y-2 pt-4 border-t">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask a question about AI, prompting techniques..."
            className="min-h-[80px] resize-none"
            disabled={loading}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Press Enter to send, Shift+Enter for new line
            </p>
            <Button onClick={sendMessage} disabled={loading || !prompt.trim()}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
