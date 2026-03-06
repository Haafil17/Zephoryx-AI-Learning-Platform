
-- Certifications table
CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  required_xp INTEGER NOT NULL DEFAULT 500,
  badge_color TEXT NOT NULL DEFAULT 'blue',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User certifications (earned certs)
CREATE TABLE public.user_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  certificate_number TEXT NOT NULL DEFAULT ('ZEPH-' || upper(substr(gen_random_uuid()::text, 1, 8))),
  UNIQUE(user_id, certification_id)
);

-- Enable RLS
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_certifications ENABLE ROW LEVEL SECURITY;

-- Certifications: anyone can view, admins manage
CREATE POLICY "Anyone can view certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Admins can insert certifications" ON public.certifications FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update certifications" ON public.certifications FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete certifications" ON public.certifications FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- User certifications: users see own, admins see all
CREATE POLICY "Users can view own certifications" ON public.user_certifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all user certifications" ON public.user_certifications FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can earn certifications" ON public.user_certifications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed some certifications
INSERT INTO public.certifications (title, description, category, required_xp, badge_color) VALUES
  ('AI Fundamentals', 'Demonstrated understanding of core AI concepts and prompt engineering basics', 'fundamentals', 200, 'blue'),
  ('Prompt Engineering Pro', 'Mastered advanced prompting techniques including chain-of-thought and few-shot learning', 'prompting', 500, 'purple'),
  ('Generative AI Specialist', 'Expert-level knowledge in generative AI models and applications', 'genai', 1000, 'pink'),
  ('Quantum Computing Explorer', 'Completed quantum computing fundamentals and AI intersection topics', 'quantum', 800, 'cyan'),
  ('AI Developer', 'Proficient in using AI for coding, debugging, and software development', 'coding', 600, 'green'),
  ('AI Master', 'Achieved mastery across all AI learning domains on ZEPHORYX AI LAB', 'master', 2000, 'gold');
