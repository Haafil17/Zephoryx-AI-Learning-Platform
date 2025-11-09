import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, PlayCircle, Brain, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const PromptTester = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const testPrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to test");
      return;
    }

    setLoading(true);
    setResponse("");
    setSources([]);
    
    try {
      const { data, error } = await supabase.functions.invoke("prompt-ai", {
        body: {
          action: "rag",
          prompt: prompt,
        },
      });

      if (error) {
        throw error;
      }

      setResponse(data.result);
      if (data.sources) {
        setSources(data.sources);
      }
      toast.success("AI search complete!");
    } catch (error) {
      console.error("Test error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AIONYX AI Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about AI, prompting techniques, and get answers based on our complete knowledge base
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="font-semibold mb-2 block">
            Ask a Question:
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a question about AI, prompting techniques, or any topic in our knowledge base..."
            className="min-h-[120px]"
          />
        </div>

        <Button onClick={testPrompt} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Ask AI Assistant
            </>
          )}
        </Button>

        {response && (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge>AI Response</Badge>
              </div>
              <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                {response}
              </div>
            </div>

            {sources.length > 0 && (
              <div className="p-4 border rounded-lg space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Sources Used ({sources.length})
                </h4>
                <div className="space-y-2">
                  {sources.map((source, idx) => (
                    <div key={idx} className="text-sm p-2 bg-muted rounded">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{source.title}</span>
                        <Badge variant="outline">{source.category}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Similarity: {(source.similarity * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
