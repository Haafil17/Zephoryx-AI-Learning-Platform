import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

const techniques = [
  { id: "role", label: "Role", example: "You are an expert [field] with [expertise]" },
  { id: "task", label: "Task", example: "Your task is to [specific action]" },
  { id: "context", label: "Context", example: "Given that [background information]" },
  { id: "format", label: "Format", example: "Provide the response as [structure]" },
  { id: "tone", label: "Tone", example: "Use a [tone] style" },
  { id: "constraints", label: "Constraints", example: "Limit your response to [constraint]" },
  { id: "examples", label: "Examples", example: "For example: [sample]" },
];

export const PromptBuilder = () => {
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [builtPrompt, setBuiltPrompt] = useState("");

  const toggleTechnique = (id: string) => {
    if (selectedTechniques.includes(id)) {
      setSelectedTechniques(selectedTechniques.filter(t => t !== id));
      const technique = techniques.find(t => t.id === id);
      if (technique) {
        setBuiltPrompt(prev => prev.replace(technique.example + "\n\n", ""));
      }
    } else {
      setSelectedTechniques([...selectedTechniques, id]);
      const technique = techniques.find(t => t.id === id);
      if (technique) {
        setBuiltPrompt(prev => prev + technique.example + "\n\n");
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(builtPrompt);
    toast.success("Prompt copied to clipboard!");
  };

  const clearAll = () => {
    setSelectedTechniques([]);
    setBuiltPrompt("");
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Interactive Prompt Builder
        </CardTitle>
        <CardDescription>
          Select prompt engineering techniques to build your perfect prompt
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Select Techniques:</h3>
          <div className="flex flex-wrap gap-2">
            {techniques.map((tech) => (
              <Badge
                key={tech.id}
                variant={selectedTechniques.includes(tech.id) ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => toggleTechnique(tech.id)}
              >
                {tech.label}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Your Prompt:</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={clearAll}>
                Clear All
              </Button>
              <Button size="sm" onClick={copyToClipboard} disabled={!builtPrompt}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
          <Textarea
            value={builtPrompt}
            onChange={(e) => setBuiltPrompt(e.target.value)}
            placeholder="Your prompt will appear here as you select techniques..."
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
};
