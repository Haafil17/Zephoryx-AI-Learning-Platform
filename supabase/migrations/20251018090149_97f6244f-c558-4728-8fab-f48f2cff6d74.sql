-- Fix knowledge_base RLS policies - restrict write operations to admins only
DROP POLICY IF EXISTS "Authenticated users can insert knowledge" ON public.knowledge_base;
DROP POLICY IF EXISTS "Authenticated users can update knowledge" ON public.knowledge_base;
DROP POLICY IF EXISTS "Authenticated users can delete knowledge" ON public.knowledge_base;

CREATE POLICY "Admins can insert knowledge" ON public.knowledge_base
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update knowledge" ON public.knowledge_base
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete knowledge" ON public.knowledge_base
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add missing policies for lessons table - allow admins to manage lessons
CREATE POLICY "Admins can insert lessons" ON public.lessons
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update lessons" ON public.lessons
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete lessons" ON public.lessons
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix SECURITY DEFINER functions - add fixed search_path to prevent SQL injection
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_user_xp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles 
  SET xp = COALESCE(xp, 0) + NEW.xp_earned,
      level = CASE 
        WHEN COALESCE(xp, 0) + NEW.xp_earned >= 2000 THEN 'AI Master'
        WHEN COALESCE(xp, 0) + NEW.xp_earned >= 1500 THEN 'Advanced AI'
        WHEN COALESCE(xp, 0) + NEW.xp_earned >= 1000 THEN 'AI Expert'
        WHEN COALESCE(xp, 0) + NEW.xp_earned >= 500 THEN 'Intermediate AI'
        WHEN COALESCE(xp, 0) + NEW.xp_earned >= 200 THEN 'AI Enthusiast'
        ELSE 'AI Beginner'
      END,
      updated_at = now()
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;