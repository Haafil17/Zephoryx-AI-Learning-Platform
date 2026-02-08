import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Loader2, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Target, Zap, Award } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { UsageGate } from "./UsageGate";

interface AnalysisResult {
  score: number;
  clarity: number;
  specificity: number;
  context: number;
  actionability: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  category: string;
  complexity: string;
  optimizedPrompt: string;
  promptExplanation: string;
}

export const PromptAnalyzer = () => {
  const { user } = useAuth();
  const { canUseFeature, trackUsage, getRemainingUses } = useSubscription();
  const [prompt, setPrompt] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [rawAnalysis, setRawAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  
  const remaining = getRemainingUses("prompt_analyzer");
  const isUnlimited = remaining === -1;

  useEffect(() => {
    setCharCount(prompt.length);
    setWordCount(prompt.trim().split(/\s+/).filter(w => w).length);
  }, [prompt]);

  const parseAnalysis = (text: string): AnalysisResult => {
    const scoreMatch = text.match(/score[:\s]+(\d+)/i);
    const clarityMatch = text.match(/clarity[:\s]+(\d+)/i);
    const specificityMatch = text.match(/specificity[:\s]+(\d+)/i);
    const contextMatch = text.match(/context[:\s]+(\d+)/i);
    const actionabilityMatch = text.match(/actionability[:\s]+(\d+)/i);
    
    const strengthsSection = text.match(/strengths?[:\s]+([\s\S]*?)(?=weaknesses?|areas for improvement|improvements?|suggestions?|\n\n|$)/i);
    const weaknessesSection = text.match(/(?:weaknesses?|areas for improvement)[:\s]+([\s\S]*?)(?=improvements?|suggestions?|actionable|rewritten|optimized|$)/i);
    const suggestionsSection = text.match(/(?:improvements?|actionable suggestions?|suggestions?)[:\s]+([\s\S]*?)(?=rewritten|optimized|$)/i);
    
    // Extract optimized prompt - stop at explanation section
    const optimizedSection = text.match(/(?:rewritten|optimized)[^:]*(?:version|prompt)?[:\s]+([\s\S]*?)(?=why this prompt works|explanation|$)/i);
    
    // Extract the explanation section
    const explanationSection = text.match(/(?:why this prompt works|explanation)[:\s]*([\s\S]*?)$/i);

    const extractItems = (section: string | undefined) => {
      if (!section) return [];
      return section.split(/\n/).filter(line => line.trim() && line.match(/^[-•*\d.]/)).map(line => line.replace(/^[-•*\d.\s]+/, '').trim());
    };

    // Clean up the optimized prompt
    let optimizedPrompt = optimizedSection?.[1]?.trim() || "";
    // Remove any trailing explanation text that might have slipped in
    optimizedPrompt = optimizedPrompt.replace(/\n\n(?:why|this|explanation|note)[\s\S]*$/i, '').trim();

    return {
      score: scoreMatch ? parseInt(scoreMatch[1]) : 7,
      clarity: clarityMatch ? parseInt(clarityMatch[1]) : 7,
      specificity: specificityMatch ? parseInt(specificityMatch[1]) : 7,
      context: contextMatch ? parseInt(contextMatch[1]) : 7,
      actionability: actionabilityMatch ? parseInt(actionabilityMatch[1]) : 7,
      strengths: extractItems(strengthsSection?.[1]),
      weaknesses: extractItems(weaknessesSection?.[1]),
      suggestions: extractItems(suggestionsSection?.[1]),
      category: text.match(/category[:\s]+(\w+)/i)?.[1] || "General",
      complexity: text.match(/complexity[:\s]+(\w+)/i)?.[1] || "Medium",
      optimizedPrompt,
      promptExplanation: explanationSection?.[1]?.trim() || ""
    };
  };

  const analyzePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to analyze");
      return;
    }

    if (wordCount < 3) {
      toast.error("Prompt is too short. Please provide more details.");
      return;
    }

    // Check usage limits for logged in users
    if (user && !canUseFeature("prompt_analyzer")) {
      toast.error("You've reached your daily limit. Upgrade for more!");
      return;
    }

    // Track usage before making the API call
    if (user) {
      const tracked = await trackUsage("prompt_analyzer");
      if (!tracked) {
        toast.error("Unable to track usage. Please try again.");
        return;
      }
    }

    setLoading(true);
    setAnalysis(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("prompt-ai", {
        body: {
          action: "analyze",
          prompt: `Analyze this prompt and create a PERFECT optimized version:

"${prompt}"

Provide analysis in this EXACT format:

Score: [1-10 overall]
Clarity: [1-10]
Specificity: [1-10]
Context: [1-10]
Actionability: [1-10]
Category: [General/Technical/Creative/Business/Academic]
Complexity: [Simple/Medium/Complex]

Strengths:
- [specific strength 1]
- [specific strength 2]

Weaknesses:
- [specific weakness 1]
- [specific weakness 2]

Actionable Suggestions:
- [specific improvement 1]
- [specific improvement 2]
- [specific improvement 3]

Optimized Version:
[Write a MASTERCLASS prompt that scores 9-10 on all dimensions. Include: clear role assignment, specific output format, relevant context, constraints, and success criteria. This must have ZERO weaknesses.]

Why This Prompt Works:
[Explain each key element you added: what prompt engineering techniques you used (role prompting, output formatting, constraints, examples, etc.), how you addressed each weakness, and why this structure produces better AI responses. Be specific and educational.]`,
        },
      });

      if (error) throw error;

      setRawAnalysis(data.result);
      const parsed = parseAnalysis(data.result);
      setAnalysis(parsed);
      
      if (parsed.score >= 8) {
        toast.success("Excellent prompt! 🎉");
      } else if (parsed.score >= 6) {
        toast.success("Good prompt with room for improvement");
      } else {
        toast.warning("Prompt needs significant improvements");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze prompt");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 dark:text-green-400";
    if (score >= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return "bg-green-100 dark:bg-green-900/20";
    if (score >= 6) return "bg-yellow-100 dark:bg-yellow-900/20";
    return "bg-red-100 dark:bg-red-900/20";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              Advanced AI Prompt Analyzer
            </CardTitle>
            <CardDescription className="text-base">
              Get comprehensive analysis with scoring, insights, and optimization suggestions
            </CardDescription>
          </div>
          {user && (
            <Badge 
              variant={!isUnlimited && remaining <= 1 ? "destructive" : remaining <= 3 ? "secondary" : "outline"}
              className="text-xs"
            >
              {isUnlimited ? "Unlimited" : `${remaining} uses left today`}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-lg">Your Prompt:</label>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>{charCount} characters</span>
              <span>{wordCount} words</span>
            </div>
          </div>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here for comprehensive AI-powered analysis...&#10;&#10;Example: 'Write a blog post about AI'&#10;&#10;The analyzer will evaluate clarity, specificity, context, and actionability to help you craft better prompts."
            className="min-h-[150px] text-base"
          />
          {prompt && wordCount < 3 && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Prompt seems too short for detailed analysis
            </p>
          )}
        </div>

        <Button 
          onClick={analyzePrompt} 
          disabled={loading || !prompt.trim()} 
          className="w-full h-12 text-lg"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Analyze Prompt
            </>
          )}
        </Button>

        {analysis && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <Separator />
            
            {/* Overall Score */}
            <div className={`p-6 rounded-xl ${getScoreBg(analysis.score)} border-2`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Award className={`w-8 h-8 ${getScoreColor(analysis.score)}`} />
                  <div>
                    <h3 className="text-xl font-bold">Overall Score</h3>
                    <p className="text-sm text-muted-foreground">Based on comprehensive analysis</p>
                  </div>
                </div>
                <div className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}/10
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">{analysis.category}</Badge>
                <Badge variant="outline">{analysis.complexity} Complexity</Badge>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Clarity", value: analysis.clarity, icon: Target },
                { label: "Specificity", value: analysis.specificity, icon: Zap },
                { label: "Context", value: analysis.context, icon: TrendingUp },
                { label: "Actionability", value: analysis.actionability, icon: CheckCircle2 }
              ].map((metric) => (
                <div key={metric.label} className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <metric.icon className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{metric.label}</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(metric.value)}`}>
                      {metric.value}/10
                    </span>
                  </div>
                  <Progress value={metric.value * 10} className="h-2" />
                </div>
              ))}
            </div>

            {/* Strengths */}
            {analysis.strengths.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, idx) => (
                    <li key={idx} className="flex gap-2 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {analysis.weaknesses.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {analysis.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex gap-2 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                      <span className="text-red-600 dark:text-red-400">⚠</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {analysis.suggestions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <TrendingUp className="w-5 h-5" />
                  Actionable Suggestions
                </h3>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex gap-2 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{idx + 1}.</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Optimized Version */}
            {analysis.optimizedPrompt && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5" />
                  ✨ Masterclass Optimized Prompt
                </h3>
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-green-600">Score: 9-10/10</Badge>
                    <Badge variant="outline">Zero Weaknesses</Badge>
                  </div>
                  <p className="text-base leading-relaxed whitespace-pre-wrap font-medium">{analysis.optimizedPrompt}</p>
                  <Button
                    variant="default"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      navigator.clipboard.writeText(analysis.optimizedPrompt);
                      toast.success("Optimized prompt copied!");
                    }}
                  >
                    Copy Optimized Prompt
                  </Button>
                </div>
              </div>
            )}

            {/* Prompt Explanation */}
            {analysis.promptExplanation && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <Target className="w-5 h-5" />
                  Why This Prompt Works
                </h3>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <p className="text-base leading-relaxed whitespace-pre-wrap">{analysis.promptExplanation}</p>
                </div>
              </div>
            )}

            {/* Raw Analysis */}
            <details className="group">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                View Full AI Analysis
              </summary>
              <div className="mt-2 p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap">
                {rawAnalysis}
              </div>
            </details>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
