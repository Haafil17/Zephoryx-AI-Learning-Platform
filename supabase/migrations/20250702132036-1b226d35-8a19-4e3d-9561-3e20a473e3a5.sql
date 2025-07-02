
-- Enable RLS on profiles table if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 100,
  difficulty TEXT NOT NULL DEFAULT 'beginner',
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user lesson progress table
CREATE TABLE public.user_lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  xp_earned INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS on new tables
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies for lessons (public read access)
CREATE POLICY "Anyone can view lessons" 
  ON public.lessons 
  FOR SELECT 
  USING (true);

-- RLS policies for user lesson progress
CREATE POLICY "Users can view their own progress" 
  ON public.user_lesson_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
  ON public.user_lesson_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
  ON public.user_lesson_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Insert some sample lessons
INSERT INTO public.lessons (title, description, content, xp_reward, difficulty, category) VALUES
('Introduction to Prompt Engineering', 'Learn the basics of crafting effective prompts', 'Prompt engineering is the art and science of crafting effective instructions for AI models...', 100, 'beginner', 'prompt-engineering'),
('Advanced Prompt Techniques', 'Master advanced prompting strategies', 'Learn about chain-of-thought, few-shot learning, and more...', 200, 'intermediate', 'prompt-engineering'),
('AI Ethics and Best Practices', 'Understanding responsible AI use', 'Learn about ethical considerations when working with AI...', 150, 'beginner', 'ai-ethics'),
('Machine Learning Fundamentals', 'Core ML concepts explained', 'Understand the basics of machine learning algorithms...', 250, 'intermediate', 'machine-learning'),
('Neural Networks Deep Dive', 'Advanced neural network concepts', 'Explore deep learning and neural network architectures...', 300, 'advanced', 'machine-learning');

-- Update XP calculation trigger for profiles
CREATE OR REPLACE FUNCTION update_user_xp()
RETURNS TRIGGER AS $$
BEGIN
  -- Update user's total XP when they complete a lesson
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
$$ LANGUAGE plpgsql;

-- Create trigger for XP updates
CREATE TRIGGER on_lesson_completed
  AFTER INSERT ON public.user_lesson_progress
  FOR EACH ROW EXECUTE FUNCTION update_user_xp();
