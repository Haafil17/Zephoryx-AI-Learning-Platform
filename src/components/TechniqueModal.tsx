
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TechniqueModalProps {
  technique: {
    icon: any;
    title: string;
    description: string;
    example: string;
    level: string;
    color: string;
    detailedDescription: string;
    useCases: string[];
    tips: string[];
    moreExamples: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TechniqueModal = ({ technique, isOpen, onClose }: TechniqueModalProps) => {
  const [copiedExample, setCopiedExample] = useState<number | null>(null);

  const levelColors = {
    "Beginner": "bg-green-100 text-green-800",
    "Intermediate": "bg-yellow-100 text-yellow-800",
    "Advanced": "bg-red-100 text-red-800"
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedExample(index);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedExample(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  if (!technique) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-full ${technique.color} bg-opacity-20`}>
              <technique.icon className={`w-8 h-8 ${technique.color.replace('bg-', 'text-')}`} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-slate-800 mb-2">
                {technique.title}
              </DialogTitle>
              <Badge className={levelColors[technique.level as keyof typeof levelColors]}>
                {technique.level}
              </Badge>
            </div>
          </div>
          <DialogDescription className="text-base text-slate-600 mb-6">
            {technique.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Detailed Description */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">What is {technique.title}?</h3>
            <p className="text-slate-600 leading-relaxed">{technique.detailedDescription}</p>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">When to Use</h3>
            <ul className="space-y-2">
              {technique.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600">
                  <span className="text-indigo-600 font-bold">•</span>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Examples</h3>
            <div className="space-y-4">
              {technique.moreExamples.map((example, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 relative group">
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">
                    {example}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(example, index)}
                  >
                    {copiedExample === index ? (
                      <span className="text-green-600 text-xs">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Pro Tips</h3>
            <div className="bg-indigo-50 rounded-lg p-4">
              <ul className="space-y-2">
                {technique.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-indigo-800">
                    <span className="text-indigo-600 font-bold">💡</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
