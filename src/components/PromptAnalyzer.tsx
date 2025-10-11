import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const PromptAnalyzer = () => {
  const [prompt, setPrompt] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to analyze");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("prompt-ai", {
        body: {
          action: "analyze",
          prompt: prompt,
        },
      });

      if (error) {
        throw error;
      }

      setAnalysis(data.result);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze prompt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI-Powered Prompt Analyzer
        </CardTitle>
        <CardDescription>
          Get expert feedback and suggestions to improve your prompts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="font-semibold mb-2 block">Your Prompt:</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Paste your prompt here for analysis..."
            className="min-h-[120px]"
          />
        </div>

        <Button onClick={analyzePrompt} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Prompt"
          )}
        </Button>

        {analysis && (
          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">AI Analysis</Badge>
            </div>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap">
              {analysis}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
