# AI Lab — Run this SQL

Open Lovable Cloud → SQL Editor and paste ALL of the SQL below, then run it. After that the AI Lab tab will be fully functional.

```sql
-- Mentor profile
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

INSERT INTO public.lab_projects (slug, topic, title, brief, difficulty, language, starter_code) VALUES
('expense-tracker','Python Variables','Expense Tracker','Build a CLI expense tracker that stores expenses in a JSON file with add/list/total commands.','beginner','python','# Track expenses\nexpenses = []\n'),
('calculator','Functions','Calculator','Build a calculator module with add/sub/mul/div functions and a REPL loop.','beginner','python','def add(a,b):\n    return a+b\n'),
('cricket-analysis','Pandas','Cricket Data Analysis','Load a cricket CSV, compute top run scorers, batting averages, and plot with matplotlib.','intermediate','python','import pandas as pd\n'),
('house-prices','Machine Learning','House Price Predictor','Train a linear regression model on a housing dataset, evaluate with RMSE, and predict.','intermediate','python','from sklearn.linear_model import LinearRegression\n'),
('ai-chatbot','Transformers','AI Chatbot','Build a chatbot using an LLM API with conversation memory and a simple system prompt.','advanced','python','import os\n'),
('rag-qa','RAG Systems','RAG Q&A over PDFs','Ingest a PDF, chunk + embed, store in a vector DB, and answer questions with retrieval-augmented generation.','advanced','python','# RAG pipeline\n'),
('agent-todo','Agentic AI','Agentic Todo Assistant','Build an agent with tool use (add_task, list_tasks, mark_done) using function-calling.','advanced','python','# Agent with tools\n');
```
