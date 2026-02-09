import { ReactNode } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { UpgradeModal } from "./UpgradeModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, LogIn, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UsageGateProps {
  feature: string;
  children: ReactNode;
  showCounter?: boolean;
  title?: string;
  description?: string;
}

export function UsageGate({ feature, children, showCounter = true, title, description }: UsageGateProps) {
  const { user } = useAuth();
  const { getRemainingUses, canUseFeature, isLoading, currentPlan } = useSubscription();
  const navigate = useNavigate();

  // If not logged in, show login prompt with preview
  if (!user) {
    return (
      <div className="relative">
        <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">
              {title || "Sign in to Access"}
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              {description || "Create a free account to use this feature and track your progress"}
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => {
                  // Trigger auth modal by dispatching custom event
                  window.dispatchEvent(new CustomEvent('openAuthModal'));
                }}
                className="gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In / Sign Up
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/pricing")}
                className="gap-2"
              >
                <Crown className="w-4 h-4" />
                View Plans
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Free tier includes limited daily uses • Upgrade anytime for more
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const remaining = getRemainingUses(feature);
  const canUse = canUseFeature(feature);
  const isUnlimited = remaining === -1;

  return (
    <div className="relative">
      {showCounter && !isUnlimited && canUse && (
        <div className="flex justify-end mb-2">
          <Badge 
            variant={remaining <= 1 ? "destructive" : remaining <= 3 ? "secondary" : "outline"}
            className="text-xs"
          >
            {remaining} uses left today
          </Badge>
        </div>
      )}
      
      {showCounter && isUnlimited && (
        <div className="flex justify-end mb-2">
          <Badge variant="default" className="text-xs bg-gradient-to-r from-primary to-accent">
            Unlimited ({currentPlan})
          </Badge>
        </div>
      )}
      
      {!canUse ? (
        <UpgradeModal feature={feature} />
      ) : (
        children
      )}
    </div>
  );
}
