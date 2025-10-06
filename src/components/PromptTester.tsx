import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, PlayCircle } from "lucide-react";
import { toast } from "sonner";

export const PromptTester = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const testPrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to test");
      return;
    }

    setLoading(true);
    setResponse("");
    
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/prompt-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            action: "test",
            prompt: prompt,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to test prompt");
      }

      const data = await res.json();
      setResponse(data.result);
      toast.success("Test complete!");
    } catch (error) {
      console.error("Test error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to test prompt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-primary" />
          Real-Time Prompt Tester
        </CardTitle>
        <CardDescription>
          Test your prompts with live AI responses powered by Gemini 2.5 Flash
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="font-semibold mb-2 block">Test Your Prompt:</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt to see how AI responds..."
            className="min-h-[120px]"
          />
        </div>

        <Button onClick={testPrompt} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <PlayCircle className="w-4 h-4 mr-2" />
              Test Prompt
            </>
          )}
        </Button>

        {response && (
          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge>AI Response</Badge>
            </div>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
