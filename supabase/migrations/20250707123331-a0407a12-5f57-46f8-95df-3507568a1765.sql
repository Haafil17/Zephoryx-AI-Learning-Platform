-- Disable email confirmation for faster testing
-- This is typically done through the Supabase dashboard, but we can create a note here

-- Note: To disable email confirmation, go to:
-- Supabase Dashboard > Authentication > Settings > Email Confirmation
-- Set "Enable email confirmations" to OFF

-- For now, we'll create a simple notification table to track this requirement
CREATE TABLE IF NOT EXISTS public.auth_settings_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO public.auth_settings_notes (note) 
VALUES ('Remember to disable email confirmation in Supabase Auth settings for faster testing');