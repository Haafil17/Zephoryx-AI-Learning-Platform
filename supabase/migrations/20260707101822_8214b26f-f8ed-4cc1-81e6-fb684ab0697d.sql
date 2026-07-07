-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;

-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  level TEXT DEFAULT 'AI Beginner',
  phone_number TEXT,
  blocked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role helper function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles FOR SELECT
TO authenticated
USING ((auth.uid() = id) OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can update any profile"
ON public.profiles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- User roles policies
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Knowledge base
CREATE TABLE public.knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  embedding vector(768),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT ON public.knowledge_base TO authenticated, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.knowledge_base TO service_role;

ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view knowledge base"
ON public.knowledge_base FOR SELECT
USING (true);

CREATE POLICY "Admins can insert knowledge"
ON public.knowledge_base FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update knowledge"
ON public.knowledge_base FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete knowledge"
ON public.knowledge_base FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.match_knowledge_base(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  category text,
  similarity float
)
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    knowledge_base.id,
    knowledge_base.title,
    knowledge_base.content,
    knowledge_base.category,
    1 - (knowledge_base.embedding <=> query_embedding) AS similarity
  FROM knowledge_base
  WHERE 1 - (knowledge_base.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- Lessons
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  xp_reward INTEGER NOT NULL DEFAULT 100,
  difficulty TEXT NOT NULL DEFAULT 'beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

GRANT SELECT ON public.lessons TO authenticated, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lessons TO service_role;

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lessons"
ON public.lessons FOR SELECT
USING (true);

CREATE POLICY "Admins can insert lessons"
ON public.lessons FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update lessons"
ON public.lessons FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete lessons"
ON public.lessons FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- User lesson progress
CREATE TABLE public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

GRANT SELECT, INSERT, UPDATE ON public.user_lesson_progress TO authenticated;
GRANT ALL ON public.user_lesson_progress TO service_role;

ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

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

-- Subscription plans
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  features JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

GRANT SELECT ON public.subscription_plans TO authenticated, anon;
GRANT ALL ON public.subscription_plans TO service_role;

ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view subscription plans"
ON public.subscription_plans FOR SELECT
USING (true);

-- Subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active',
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

GRANT SELECT, INSERT, UPDATE ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
ON public.subscriptions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
ON public.subscriptions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can create own free subscription"
ON public.subscriptions FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND status = 'active'
  AND plan_id IN (SELECT id FROM public.subscription_plans WHERE name = 'free')
);

CREATE POLICY "Users can update own free subscription"
ON public.subscriptions FOR UPDATE
TO authenticated
USING (
  auth.uid() = user_id
  AND plan_id IN (SELECT id FROM public.subscription_plans WHERE name = 'free')
)
WITH CHECK (
  auth.uid() = user_id
  AND status = 'active'
  AND plan_id IN (SELECT id FROM public.subscription_plans WHERE name = 'free')
);

-- Usage tracking
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  reset_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

GRANT SELECT, INSERT, UPDATE ON public.usage_tracking TO authenticated;
GRANT ALL ON public.usage_tracking TO service_role;

ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

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

-- Certifications
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

GRANT SELECT ON public.certifications TO authenticated, anon;
GRANT ALL ON public.certifications TO service_role;

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view certifications"
ON public.certifications FOR SELECT USING (true);

CREATE POLICY "Admins can insert certifications"
ON public.certifications FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update certifications"
ON public.certifications FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete certifications"
ON public.certifications FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- User certifications
CREATE TABLE public.user_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  certificate_number TEXT NOT NULL DEFAULT ('ZEPH-' || upper(substr(gen_random_uuid()::text, 1, 8))),
  UNIQUE(user_id, certification_id)
);

GRANT SELECT, INSERT ON public.user_certifications TO authenticated;
GRANT SELECT ON public.user_certifications TO anon;
GRANT ALL ON public.user_certifications TO service_role;

ALTER TABLE public.user_certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own certifications"
ON public.user_certifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all user certifications"
ON public.user_certifications FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can earn certifications"
ON public.user_certifications FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can verify certificates by number"
ON public.user_certifications FOR SELECT
TO anon, authenticated
USING (true);

-- API keys
CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  revoked BOOLEAN NOT NULL DEFAULT false,
  last_used_at TIMESTAMPTZ,
  request_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.api_keys TO authenticated;
GRANT ALL ON public.api_keys TO service_role;

ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view api keys"
ON public.api_keys FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert api keys"
ON public.api_keys FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update api keys"
ON public.api_keys FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete api keys"
ON public.api_keys FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_api_keys_hash ON public.api_keys(key_hash) WHERE revoked = false;

-- AI Lab tables
CREATE TABLE public.mentor_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  goal text DEFAULT 'Become an AI Engineer',
  strengths jsonb DEFAULT '[]'::jsonb,
  weaknesses jsonb DEFAULT '[]'::jsonb,
  interests jsonb DEFAULT '[]'::jsonb,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mentor_profiles TO authenticated;
GRANT ALL ON public.mentor_profiles TO service_role;
ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_profile_all" ON public.mentor_profiles
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.mentor_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind text NOT NULL,
  summary text NOT NULL,
  meta jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX ON public.mentor_events (user_id, created_at DESC);
GRANT SELECT, INSERT ON public.mentor_events TO authenticated;
GRANT ALL ON public.mentor_events TO service_role;
ALTER TABLE public.mentor_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_events_read" ON public.mentor_events
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own_events_insert" ON public.mentor_events
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.lab_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  topic text NOT NULL,
  title text NOT NULL,
  brief text NOT NULL,
  starter_code text DEFAULT '',
  rubric jsonb NOT NULL DEFAULT '["architecture","code_quality","docs","performance","security","ui","deployment"]'::jsonb,
  difficulty text NOT NULL DEFAULT 'beginner',
  language text NOT NULL DEFAULT 'python',
  created_at timestamptz DEFAULT now()
);
GRANT SELECT ON public.lab_projects TO authenticated, anon;
GRANT ALL ON public.lab_projects TO service_role;
ALTER TABLE public.lab_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_read_all" ON public.lab_projects
  FOR SELECT TO authenticated, anon USING (true);

CREATE TABLE public.lab_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.lab_projects(id) ON DELETE CASCADE,
  code text NOT NULL,
  review jsonb DEFAULT '{}'::jsonb,
  score int DEFAULT 0,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX ON public.lab_submissions (user_id, updated_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lab_submissions TO authenticated;
GRANT ALL ON public.lab_submissions TO service_role;
ALTER TABLE public.lab_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_subs_all" ON public.lab_submissions
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.lab_roadmaps (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  goal text NOT NULL DEFAULT 'Become an AI Engineer',
  plan jsonb NOT NULL DEFAULT '[]'::jsonb,
  current_week int NOT NULL DEFAULT 1,
  updated_at timestamptz DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lab_roadmaps TO authenticated;
GRANT ALL ON public.lab_roadmaps TO service_role;
ALTER TABLE public.lab_roadmaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_roadmap_all" ON public.lab_roadmaps
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.lab_portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  submission_id uuid REFERENCES public.lab_submissions(id) ON DELETE SET NULL,
  title text NOT NULL,
  readme text NOT NULL,
  resume_bullet text NOT NULL,
  tags jsonb DEFAULT '[]'::jsonb,
  live_url text,
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX ON public.lab_portfolio (user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lab_portfolio TO authenticated;
GRANT SELECT ON public.lab_portfolio TO anon;
GRANT ALL ON public.lab_portfolio TO service_role;
ALTER TABLE public.lab_portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_portfolio_write" ON public.lab_portfolio
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "public_portfolio_read" ON public.lab_portfolio
  FOR SELECT TO anon, authenticated USING (is_public = true);

CREATE TABLE public.skill_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill text NOT NULL,
  score int NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, skill)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.skill_scores TO authenticated;
GRANT ALL ON public.skill_scores TO service_role;
ALTER TABLE public.skill_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_skills_all" ON public.skill_scores
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Helper functions and triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

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

CREATE TRIGGER on_lesson_progress_xp
  AFTER INSERT ON public.user_lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_user_xp();

CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

CREATE TRIGGER on_auth_user_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_subscription();

CREATE OR REPLACE FUNCTION public.auto_assign_admin_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.email IN ('haafil006@gmail.com', 'syedmusheer982@gmail.com', 'syedmuheer982@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS auto_admin_role_trigger ON public.profiles;
CREATE TRIGGER auto_admin_role_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.auto_assign_admin_role();

-- Seed data
DELETE FROM public.subscriptions;
DELETE FROM public.subscription_plans;

INSERT INTO public.subscription_plans (name, display_name, price, features) VALUES
('pro', 'Pro - All Access', 1299, '{
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
}'::jsonb),
('free', 'Free', 0, '{
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

DELETE FROM public.user_certifications;
DELETE FROM public.certifications;

INSERT INTO public.certifications (title, description, category, required_xp, badge_color) VALUES
('AI Fundamentals', 'Demonstrated understanding of core AI concepts and prompt engineering basics', 'fundamentals', 200, 'blue'),
('Prompt Engineering Pro', 'Mastered advanced prompting techniques including chain-of-thought and few-shot learning', 'prompting', 500, 'purple'),
('Generative AI Specialist', 'Expert-level knowledge in generative AI models and applications', 'genai', 1000, 'pink'),
('Quantum Computing Explorer', 'Completed quantum computing fundamentals and AI intersection topics', 'quantum', 800, 'cyan'),
('AI Developer', 'Proficient in using AI for coding, debugging, and software development', 'coding', 600, 'green'),
('AI Master', 'Achieved mastery across all AI learning domains on ZEPHORYX AI LAB', 'master', 2000, 'gold'),
('ZEPHORYX AI LAB - Monthly Explorer', 'Awarded to dedicated learners who have actively used the ZEPHORYX AI LAB platform for one month. This certificate recognizes your commitment to continuous AI learning across topics including Prompt Engineering, Agentic AI, RAG, MCP, Guardrails, Generative AI, and more.', 'explorer', 0, 'gold');

DELETE FROM public.user_lesson_progress;
DELETE FROM public.lessons;

INSERT INTO public.lessons (title, description, content, category, xp_reward, difficulty) VALUES
('AI Fundamentals', 'Core concepts of artificial intelligence', 'Learn the foundations of AI', 'ai', 100, 'beginner'),
('Prompt Engineering Mastery', 'Master the art of prompting AI models', 'Complete prompt engineering techniques', 'prompting', 100, 'beginner'),
('Agentic AI Systems', 'Autonomous AI agents and frameworks', 'Learn about AI agents', 'agentic', 150, 'intermediate'),
('RAG Systems', 'Retrieval-Augmented Generation', 'Build RAG pipelines', 'rag', 150, 'intermediate'),
('MCP Protocol', 'Model Context Protocol deep dive', 'Understand MCP architecture', 'mcp', 150, 'intermediate'),
('AI Orchestrators', 'Multi-agent coordination systems', 'Learn orchestration patterns', 'orchestrators', 200, 'advanced'),
('AI Guardrails', 'Safety and content filtering', 'Implement AI safety measures', 'guardrails', 150, 'intermediate'),
('Generative AI', 'How generative models work', 'Explore generative AI concepts', 'genai', 100, 'beginner'),
('AI Models Deep Dive', 'LLMs, GPT, Claude, Gemini comparison', 'Compare leading AI models', 'models', 150, 'intermediate'),
('Techniques & Strategies', 'Prompt techniques and strategies', 'Master advanced techniques', 'techniques', 100, 'beginner'),
('Real-World Examples', 'Practical AI application examples', 'Study real-world AI use cases', 'examples', 100, 'beginner'),
('Best Practices', 'AI development best practices', 'Learn industry best practices', 'bestpractices', 100, 'beginner'),
('Coding & Development', 'AI-powered coding tools', 'Use AI for software development', 'coding', 150, 'intermediate'),
('Quantum Computing & AI', 'Quantum computing meets AI', 'Explore quantum AI concepts', 'quantum', 200, 'advanced'),
('LLM Fine-Tuning', 'LoRA, QLoRA, PEFT techniques', 'Fine-tune language models', 'finetuning', 200, 'advanced'),
('NLP & Text Processing', 'Natural language processing fundamentals', 'Master NLP techniques', 'nlp', 150, 'intermediate'),
('Computer Vision', 'Image recognition and generation', 'Learn computer vision', 'vision', 150, 'intermediate'),
('MLOps & Deployment', 'Deploying AI at scale', 'Deploy and monitor AI systems', 'mlops', 200, 'advanced'),
('Deep Learning', 'Neural networks and architectures', 'Understand deep learning', 'deeplearning', 150, 'intermediate'),
('Memory Systems', 'Short-term and long-term AI memory', 'Implement memory systems', 'memory', 150, 'intermediate'),
('AI Comparisons', 'Compare AI tools and approaches', 'Analyze AI model tradeoffs', 'comparisons', 100, 'beginner'),
('Transformers Architecture', 'Attention mechanisms and transformer models', 'Deep dive into transformers', 'transformers', 200, 'advanced'),
('Embeddings & Vectors', 'Vector representations and similarity', 'Master embedding techniques', 'embeddings', 200, 'advanced'),
('AI Ethics', 'Responsible AI development', 'Learn ethical AI practices', 'ethics', 150, 'intermediate');

DELETE FROM public.lab_submissions;
DELETE FROM public.lab_projects;

INSERT INTO public.lab_projects (slug, topic, title, brief, difficulty, language, starter_code) VALUES
('expense-tracker','Python Variables','Expense Tracker','Build a CLI expense tracker that stores expenses in a JSON file with add/list/total commands.','beginner','python','# Track expenses\nexpenses = []\n'),
('calculator','Functions','Calculator','Build a calculator module with add/sub/mul/div functions and a REPL loop.','beginner','python','def add(a,b):\n    return a+b\n'),
('cricket-analysis','Pandas','Cricket Data Analysis','Load a cricket CSV, compute top run scorers, batting averages, and plot with matplotlib.','intermediate','python','import pandas as pd\n'),
('house-prices','Machine Learning','House Price Predictor','Train a linear regression model on a housing dataset, evaluate with RMSE, and predict.','intermediate','python','from sklearn.linear_model import LinearRegression\n'),
('ai-chatbot','Transformers','AI Chatbot','Build a chatbot using an LLM API with conversation memory and a simple system prompt.','advanced','python','import os\n'),
('rag-qa','RAG Systems','RAG Q&A over PDFs','Ingest a PDF, chunk + embed, store in a vector DB, and answer questions with retrieval-augmented generation.','advanced','python','# RAG pipeline\n'),
('agent-todo','Agentic AI','Agentic Todo Assistant','Build an agent with tool use (add_task, list_tasks, mark_done) using function-calling.','advanced','python','# Agent with tools\n');
