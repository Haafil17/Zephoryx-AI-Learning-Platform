
-- Fix ALL restrictive policies to be permissive

-- profiles table
DROP POLICY IF EXISTS "Authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Authenticated users can view profiles"
ON public.profiles FOR SELECT
TO authenticated
USING ((auth.uid() = id) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- user_roles table
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- auth_settings_notes table
DROP POLICY IF EXISTS "Only admins can manage auth settings" ON public.auth_settings_notes;

CREATE POLICY "Only admins can manage auth settings"
ON public.auth_settings_notes FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- knowledge_base table
DROP POLICY IF EXISTS "Admins can delete knowledge" ON public.knowledge_base;
DROP POLICY IF EXISTS "Admins can insert knowledge" ON public.knowledge_base;
DROP POLICY IF EXISTS "Admins can update knowledge" ON public.knowledge_base;
DROP POLICY IF EXISTS "Anyone can view knowledge base" ON public.knowledge_base;

CREATE POLICY "Anyone can view knowledge base"
ON public.knowledge_base FOR SELECT
USING (true);

CREATE POLICY "Admins can insert knowledge"
ON public.knowledge_base FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update knowledge"
ON public.knowledge_base FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete knowledge"
ON public.knowledge_base FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- lessons table
DROP POLICY IF EXISTS "Admins can delete lessons" ON public.lessons;
DROP POLICY IF EXISTS "Admins can insert lessons" ON public.lessons;
DROP POLICY IF EXISTS "Admins can update lessons" ON public.lessons;
DROP POLICY IF EXISTS "Anyone can view lessons" ON public.lessons;

CREATE POLICY "Anyone can view lessons"
ON public.lessons FOR SELECT
USING (true);

CREATE POLICY "Admins can insert lessons"
ON public.lessons FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update lessons"
ON public.lessons FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete lessons"
ON public.lessons FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- subscription_plans table
DROP POLICY IF EXISTS "Anyone can view subscription plans" ON public.subscription_plans;

CREATE POLICY "Anyone can view subscription plans"
ON public.subscription_plans FOR SELECT
USING (true);

-- subscriptions table
DROP POLICY IF EXISTS "Users can create own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;

CREATE POLICY "Users can view own subscription"
ON public.subscriptions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own subscription"
ON public.subscriptions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
ON public.subscriptions FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- usage_tracking table
DROP POLICY IF EXISTS "Users can insert own usage" ON public.usage_tracking;
DROP POLICY IF EXISTS "Users can update own usage" ON public.usage_tracking;
DROP POLICY IF EXISTS "Users can view own usage" ON public.usage_tracking;

CREATE POLICY "Users can view own usage"
ON public.usage_tracking FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage"
ON public.usage_tracking FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage"
ON public.usage_tracking FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- user_lesson_progress table
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_lesson_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_lesson_progress;
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_lesson_progress;

CREATE POLICY "Users can view their own progress"
ON public.user_lesson_progress FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
ON public.user_lesson_progress FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.user_lesson_progress FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Add phone_number column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone_number text;

-- Allow admin to view all subscriptions
CREATE POLICY "Admins can view all subscriptions"
ON public.subscriptions FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admin to view all profiles
-- (already covered by the profiles SELECT policy above)

-- Update handle_new_user to include phone_number
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, phone_number)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'phone_number'
  );
  RETURN NEW;
END;
$$;
