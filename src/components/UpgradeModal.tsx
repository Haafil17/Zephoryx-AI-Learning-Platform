import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Crown, Sparkles, Zap } from "lucide-react";

interface UpgradeModalProps {
  feature: string;
}

const featureNames: Record<string, string> = {
  prompt_analyzer: "AI Prompt Analyzer",
  chat_assistant: "AI Chat Assistant",
  prompt_tester: "Prompt Tester",
};

export function UpgradeModal({ feature }: UpgradeModalProps) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const featureName = featureNames[feature] || feature;

  const handleUpgrade = () => {
    setOpen(false);
    navigate("/pricing");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="p-8 border-2 border-dashed border-muted rounded-lg text-center cursor-pointer hover:border-primary/50 transition-colors">
          <Zap className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold mb-2">Daily Limit Reached</p>
          <p className="text-muted-foreground mb-4">
            You've used all your {featureName} credits for today.
          </p>
          <Button variant="default">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Continue
          </Button>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Upgrade Your Plan
          </DialogTitle>
          <DialogDescription>
            You've reached your daily limit for {featureName}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Why Upgrade?</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                More daily uses of AI tools
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Access to all video tutorials
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Full knowledge base access
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Export and save your prompts
              </li>
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Maybe Later
            </Button>
            <Button onClick={handleUpgrade} className="gap-2">
              <Crown className="w-4 h-4" />
              View Plans
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
