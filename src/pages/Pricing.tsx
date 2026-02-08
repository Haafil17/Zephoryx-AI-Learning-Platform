import { Check, X, Sparkles, Zap, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";

const plans = [
  {
    name: "free",
    displayName: "Free",
    price: 0,
    description: "Get started with AI prompt engineering",
    icon: Zap,
    features: [
      { name: "AI Prompt Analyzer", value: "2/day", included: true },
      { name: "AI Chat Assistant", value: "3/day", included: true },
      { name: "Prompt Tester", value: "2/day", included: true },
      { name: "Video Tutorials", value: "3 videos", included: true },
      { name: "Knowledge Base", value: "No access", included: false },
      { name: "Prompt Templates", value: "5 basic", included: true },
      { name: "Techniques Guide", value: "Preview only", included: true },
      { name: "Export Prompts", value: "", included: false },
      { name: "Save History", value: "", included: false },
      { name: "API Access", value: "", included: false },
      { name: "Certificate", value: "", included: false },
      { name: "Early Access", value: "", included: false },
    ],
  },
  {
    name: "basic",
    displayName: "Basic",
    price: 799,
    description: "For regular learners",
    icon: Star,
    features: [
      { name: "AI Prompt Analyzer", value: "10/day", included: true },
      { name: "AI Chat Assistant", value: "15/day", included: true },
      { name: "Prompt Tester", value: "10/day", included: true },
      { name: "Video Tutorials", value: "10 videos", included: true },
      { name: "Knowledge Base", value: "Limited", included: true },
      { name: "Prompt Templates", value: "20", included: true },
      { name: "Techniques Guide", value: "Basic", included: true },
      { name: "Export Prompts", value: "", included: false },
      { name: "Save History", value: "7 days", included: true },
      { name: "API Access", value: "", included: false },
      { name: "Certificate", value: "", included: false },
      { name: "Early Access", value: "", included: false },
    ],
  },
  {
    name: "premium",
    displayName: "Premium",
    price: 1999,
    description: "For serious AI practitioners",
    icon: Sparkles,
    popular: true,
    features: [
      { name: "AI Prompt Analyzer", value: "50/day", included: true },
      { name: "AI Chat Assistant", value: "50/day", included: true },
      { name: "Prompt Tester", value: "40/day", included: true },
      { name: "Video Tutorials", value: "All videos", included: true },
      { name: "Knowledge Base", value: "Full access", included: true },
      { name: "Prompt Templates", value: "100", included: true },
      { name: "Techniques Guide", value: "All", included: true },
      { name: "Export Prompts", value: "", included: true },
      { name: "Save History", value: "30 days", included: true },
      { name: "API Access", value: "", included: false },
      { name: "Certificate", value: "", included: false },
      { name: "Early Access", value: "", included: false },
    ],
  },
  {
    name: "elite",
    displayName: "Elite",
    price: 5199,
    description: "For AI professionals & enterprises",
    icon: Crown,
    features: [
      { name: "AI Prompt Analyzer", value: "Unlimited", included: true },
      { name: "AI Chat Assistant", value: "Unlimited", included: true },
      { name: "Prompt Tester", value: "Unlimited", included: true },
      { name: "Video Tutorials", value: "All videos", included: true },
      { name: "Knowledge Base", value: "Full access", included: true },
      { name: "Prompt Templates", value: "All + Custom", included: true },
      { name: "Techniques Guide", value: "All + Advanced", included: true },
      { name: "Export Prompts", value: "", included: true },
      { name: "Save History", value: "Unlimited", included: true },
      { name: "API Access", value: "", included: true },
      { name: "Certificate", value: "", included: true },
      { name: "Early Access", value: "", included: true },
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const { currentPlan, isLoading } = useSubscription();

  const handleSelectPlan = (planName: string) => {
    if (planName === "free") {
      navigate("/");
      return;
    }
    
    // For paid plans, show coming soon message
    toast.info("Payment integration coming soon! Contact us for early access.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-8">
          ← Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of AI prompt engineering with our flexible pricing plans
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === plan.name;
            
            return (
              <Card 
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.popular 
                    ? "border-primary shadow-lg shadow-primary/20 scale-105" 
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    plan.popular ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <Icon className={`w-6 h-6 ${plan.popular ? "text-primary" : "text-foreground"}`} />
                  </div>
                  <CardTitle className="text-2xl">{plan.displayName}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? "Free" : `₹${plan.price.toLocaleString()}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  
                  <ul className="space-y-3 flex-1 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.name}
                          {feature.value && (
                            <span className="text-muted-foreground ml-1">
                              ({feature.value})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    disabled={isCurrentPlan || isLoading}
                    onClick={() => handleSelectPlan(plan.name)}
                  >
                    {isCurrentPlan ? "Current Plan" : plan.price === 0 ? "Get Started" : "Subscribe"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ or additional info */}
        <div className="text-center mt-16 text-muted-foreground">
          <p>All plans include access to our learning community.</p>
          <p className="mt-2">Need a custom plan? <a href="mailto:contact@zephoryx.com" className="text-primary hover:underline">Contact us</a></p>
        </div>
      </div>
    </div>
  );
}
