
-- Insert admin role for haafil006@gmail.com
INSERT INTO public.user_roles (user_id, role) 
VALUES ('7dbf53ea-eb3f-4aa3-8db0-515f550122a5', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Delete all existing subscription plans
DELETE FROM public.subscriptions;
DELETE FROM public.subscription_plans;

-- Insert single plan: ₹1,299/month with all features
INSERT INTO public.subscription_plans (name, display_name, price, features)
VALUES ('pro', 'Pro - All Access', 1299, '{
  "prompt_analyzer": -1,
  "prompt_tester": -1,
  "chat_assistant": -1,
  "prompt_templates": -1,
  "video_limit": -1,
  "save_history_days": -1,
  "techniques_guide": "all",
  "knowledge_base": true,
  "export_prompts": true,
  "api_access": true,
  "certificate": true,
  "early_access": true
}'::jsonb);

-- Also keep a free plan for new signups (limited)
INSERT INTO public.subscription_plans (name, display_name, price, features)
VALUES ('free', 'Free', 0, '{
  "prompt_analyzer": 3,
  "prompt_tester": 3,
  "chat_assistant": 3,
  "prompt_templates": 5,
  "video_limit": 3,
  "save_history_days": 0,
  "techniques_guide": "preview",
  "knowledge_base": false,
  "export_prompts": false,
  "api_access": false,
  "certificate": false,
  "early_access": false
}'::jsonb);

-- Update the handle_new_user_subscription function to use new free plan
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  free_plan_id UUID;
BEGIN
  SELECT id INTO free_plan_id FROM public.subscription_plans WHERE name = 'free';
  IF free_plan_id IS NOT NULL THEN
    INSERT INTO public.subscriptions (user_id, plan_id, status, current_period_end)
    VALUES (NEW.id, free_plan_id, 'active', 'infinity');
  END IF;
  RETURN NEW;
END;
$function$;
