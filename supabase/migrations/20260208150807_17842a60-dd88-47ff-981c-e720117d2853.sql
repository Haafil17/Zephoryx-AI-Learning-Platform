-- Create subscription_plans table
CREATE TABLE public.subscription_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  features JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on subscription_plans
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- Anyone can view subscription plans
CREATE POLICY "Anyone can view subscription plans"
ON public.subscription_plans
FOR SELECT
USING (true);

-- Insert the 4 subscription plans
INSERT INTO public.subscription_plans (name, display_name, price, features) VALUES
('free', 'Free', 0, '{
  "prompt_analyzer": 2,
  "chat_assistant": 3,
  "prompt_tester": 2,
  "video_limit": 3,
  "knowledge_base": false,
  "prompt_templates": 5,
  "techniques_guide": "preview",
  "export_prompts": false,
  "save_history_days": 0,
  "api_access": false,
  "certificate": false,
  "early_access": false
}'::jsonb),
('basic', 'Basic', 799, '{
  "prompt_analyzer": 10,
  "chat_assistant": 15,
  "prompt_tester": 10,
  "video_limit": 10,
  "knowledge_base": "limited",
  "prompt_templates": 20,
  "techniques_guide": "basic",
  "export_prompts": false,
  "save_history_days": 7,
  "api_access": false,
  "certificate": false,
  "early_access": false
}'::jsonb),
('premium', 'Premium', 1999, '{
  "prompt_analyzer": 50,
  "chat_assistant": 50,
  "prompt_tester": 40,
  "video_limit": -1,
  "knowledge_base": true,
  "prompt_templates": 100,
  "techniques_guide": "all",
  "export_prompts": true,
  "save_history_days": 30,
  "api_access": false,
  "certificate": false,
  "early_access": false
}'::jsonb),
('elite', 'Elite', 5199, '{
  "prompt_analyzer": -1,
  "chat_assistant": -1,
  "prompt_tester": -1,
  "video_limit": -1,
  "knowledge_base": true,
  "prompt_templates": -1,
  "techniques_guide": "advanced",
  "export_prompts": true,
  "save_history_days": -1,
  "api_access": true,
  "certificate": true,
  "early_access": true
}'::jsonb);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '1 month'),
  payment_provider TEXT,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own subscription
CREATE POLICY "Users can view own subscription"
ON public.subscriptions
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own subscription (for free plan signup)
CREATE POLICY "Users can create own subscription"
ON public.subscriptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own subscription
CREATE POLICY "Users can update own subscription"
ON public.subscriptions
FOR UPDATE
USING (auth.uid() = user_id);

-- Create usage_tracking table
CREATE TABLE public.usage_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, feature, date)
);

-- Enable RLS on usage_tracking
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage
CREATE POLICY "Users can view own usage"
ON public.usage_tracking
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own usage
CREATE POLICY "Users can insert own usage"
ON public.usage_tracking
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own usage
CREATE POLICY "Users can update own usage"
ON public.usage_tracking
FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to auto-assign free plan to new users
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  free_plan_id UUID;
BEGIN
  -- Get the free plan ID
  SELECT id INTO free_plan_id FROM public.subscription_plans WHERE name = 'free';
  
  -- Create a free subscription for the new user
  INSERT INTO public.subscriptions (user_id, plan_id, status, current_period_end)
  VALUES (NEW.id, free_plan_id, 'active', 'infinity');
  
  RETURN NEW;
END;
$$;

-- Create trigger to auto-assign free plan
CREATE TRIGGER on_auth_user_created_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_subscription();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_subscription_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_subscription_updated_at();

CREATE TRIGGER update_usage_tracking_updated_at
  BEFORE UPDATE ON public.usage_tracking
  FOR EACH ROW EXECUTE FUNCTION public.update_subscription_updated_at();