-- Fix search_path for handle_new_user_subscription function
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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

-- Fix search_path for update_subscription_updated_at function
CREATE OR REPLACE FUNCTION public.update_subscription_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;