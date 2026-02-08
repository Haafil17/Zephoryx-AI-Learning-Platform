import { ReactNode } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { UpgradeModal } from "./UpgradeModal";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface UsageGateProps {
  feature: string;
  children: ReactNode;
  showCounter?: boolean;
}

export function UsageGate({ feature, children, showCounter = true }: UsageGateProps) {
  const { user } = useAuth();
  const { getRemainingUses, canUseFeature, isLoading, currentPlan } = useSubscription();

  // If not logged in, show the feature without gating
  if (!user) {
    return <>{children}</>;
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
      {showCounter && !isUnlimited && (
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
