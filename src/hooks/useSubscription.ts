import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface SubscriptionPlan {
  id: string;
  name: string;
  display_name: string;
  price: number;
  features: {
    prompt_analyzer: number;
    chat_assistant: number;
    prompt_tester: number;
    video_limit: number;
    knowledge_base: boolean | string;
    prompt_templates: number;
    techniques_guide: string;
    export_prompts: boolean;
    save_history_days: number;
    api_access: boolean;
    certificate: boolean;
    early_access: boolean;
  };
}

interface UsageData {
  feature: string;
  count: number;
  date: string;
}

export function useSubscription() {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<string>("free");
  const [planDetails, setPlanDetails] = useState<SubscriptionPlan | null>(null);
  const [usage, setUsage] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setCurrentPlan("free");
      setPlanDetails(null);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch user's subscription with plan details
      const { data: subscription, error: subError } = await supabase
        .from("subscriptions")
        .select(`
          *,
          subscription_plans (*)
        `)
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (subError && subError.code !== "PGRST116") {
        console.error("Error fetching subscription:", subError);
      }

      if (subscription?.subscription_plans) {
        const plan = subscription.subscription_plans as unknown as SubscriptionPlan;
        setCurrentPlan(plan.name);
        setPlanDetails(plan);
      } else {
        // User has no subscription, fetch free plan details
        const { data: freePlan } = await supabase
          .from("subscription_plans")
          .select("*")
          .eq("name", "free")
          .single();

        if (freePlan) {
          setCurrentPlan("free");
          setPlanDetails(freePlan as unknown as SubscriptionPlan);
        }
      }

      // Fetch today's usage
      const today = new Date().toISOString().split("T")[0];
      const { data: usageData } = await supabase
        .from("usage_tracking")
        .select("feature, count")
        .eq("user_id", user.id)
        .eq("date", today);

      if (usageData) {
        const usageMap: Record<string, number> = {};
        usageData.forEach((item: UsageData) => {
          usageMap[item.feature] = item.count;
        });
        setUsage(usageMap);
      }
    } catch (error) {
      console.error("Error in fetchSubscription:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const getFeatureLimit = useCallback((feature: string): number => {
    if (!planDetails?.features) return 0;
    
    const featureKey = feature as keyof typeof planDetails.features;
    const limit = planDetails.features[featureKey];
    
    if (typeof limit === "number") {
      return limit; // -1 means unlimited
    }
    return 0;
  }, [planDetails]);

  const getRemainingUses = useCallback((feature: string): number => {
    const limit = getFeatureLimit(feature);
    if (limit === -1) return -1; // Unlimited
    
    const used = usage[feature] || 0;
    return Math.max(0, limit - used);
  }, [getFeatureLimit, usage]);

  const canUseFeature = useCallback((feature: string): boolean => {
    const remaining = getRemainingUses(feature);
    return remaining === -1 || remaining > 0;
  }, [getRemainingUses]);

  const trackUsage = useCallback(async (feature: string): Promise<boolean> => {
    if (!user) return false;
    
    if (!canUseFeature(feature)) {
      return false;
    }

    const today = new Date().toISOString().split("T")[0];
    const currentCount = usage[feature] || 0;

    try {
      const { error } = await supabase
        .from("usage_tracking")
        .upsert(
          {
            user_id: user.id,
            feature,
            count: currentCount + 1,
            date: today,
          },
          {
            onConflict: "user_id,feature,date",
          }
        );

      if (error) {
        console.error("Error tracking usage:", error);
        return false;
      }

      // Update local state
      setUsage((prev) => ({
        ...prev,
        [feature]: currentCount + 1,
      }));

      return true;
    } catch (error) {
      console.error("Error in trackUsage:", error);
      return false;
    }
  }, [user, usage, canUseFeature]);

  const hasFeatureAccess = useCallback((feature: string): boolean | string => {
    if (!planDetails?.features) return false;
    
    const featureKey = feature as keyof typeof planDetails.features;
    const value = planDetails.features[featureKey];
    
    // Convert numeric values to boolean (non-zero means access)
    if (typeof value === "number") {
      return value !== 0;
    }
    return value;
  }, [planDetails]);

  return {
    currentPlan,
    planDetails,
    usage,
    isLoading,
    getFeatureLimit,
    getRemainingUses,
    canUseFeature,
    trackUsage,
    hasFeatureAccess,
    refetch: fetchSubscription,
  };
}
