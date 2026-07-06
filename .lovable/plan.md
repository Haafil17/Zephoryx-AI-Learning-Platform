Implementing all 16 USPs in one go would take weeks and bloat the app. I'll ship the 5 must-haves you explicitly called out, plus the Skill Graph (which powers the mentor's context). Everything lives inside the signed-in app as a new "AI Lab" section — the landing page stays as-is.

## What I'll build (this pass)

**1. AI Personal Mentor (memory-based)**
- New `mentor_profiles` table: strengths, weaknesses, goals, past mistakes (JSONB arrays)
- `mentor_events` table: every completed lesson, project, error, question
- New `AIMentor` chat panel that loads the profile + recent events into the system prompt of `prompt-ai` → mentor genuinely remembers the user across sessions
- Hint-ladder mode: mentor gives Hint 1 → Hint 2 → Hint 3 → Explanation → Solution (never leads with the answer)

**2. Project-Based Learning**
- New `projects` table (topic_id, title, brief, starter_code, rubric_json, difficulty)
- Seed one project per major topic (Expense Tracker, Calculator, Cricket Analysis, House Price Predictor, AI Chatbot, etc.)
- `ProjectsPanel` component: browse projects, mark in-progress/submitted, opens the mentor scoped to that project

**3. AI Code Review & Debugging**
- New `submissions` table (project_id, user_id, code, review_json, score)
- New `review-code` edge function: sends code + rubric to Gemini, returns structured JSON {architecture, code_quality, docs, performance, security, ui, deployment, overall, explanation, suggestions[]}
- `CodeReview` component with a code editor (textarea + mono font), submit button, and scored rubric UI

**4. Adaptive Learning Roadmap**
- New `roadmaps` table: goal (e.g. "AI Engineer"), 12-month plan JSON, current_week
- New `generate-roadmap` edge function: takes goal + current skill graph → returns weekly plan
- `RoadmapPanel`: timeline UI, auto-updates the current week's focus based on mentor_events

**5. AI Portfolio Builder**
- New `portfolio_items` table (submission_id, github_ready_readme, resume_bullet, live_url, tags)
- New `build-portfolio` edge function: turns a graded submission into README + resume bullet
- Public read-only portfolio page: `/portfolio/:username`

**6. Skill Graph (foundation for the mentor)**
- New `skill_scores` table (user_id, skill, score 0-100, updated_at)
- Auto-updates when a lesson is completed or a project graded
- `SkillGraph` component: horizontal bars for Python, NumPy, Pandas, ML, DL, Transformers, RAG, Agents, MLOps

## Where it lives in the UI
New top-level tab **"AI Lab"** in the signed-in app with sub-tabs: `Mentor` · `Projects` · `Code Review` · `Roadmap` · `Skill Graph` · `Portfolio`. Existing pages untouched.

## Technical section
- All tables in `public` with `GRANT SELECT, INSERT, UPDATE, DELETE ... TO authenticated;` + `service_role`, RLS `auth.uid() = user_id`
- Reuse the existing `prompt-ai` edge function for mentor chat by adding a `mentor` action that pulls profile+events from DB before calling Gemini
- New edge functions: `review-code`, `generate-roadmap`, `build-portfolio` — each JWT-verified, service-role DB writes
- Model: `google/gemini-3-flash-preview` via Lovable AI Gateway (per project memory)
- Structured output via AI SDK `Output.object` with small schemas (no `.min/.max`); clamp in code
- All new UI uses existing tokens, Space Grotesk / DM Sans, framer-motion (per memory)

## Explicitly NOT in this pass (say the word to add)
Interview simulator, project coach week-planner, "explain at any level" toggle (partially exists via difficulty modes), pair programmer inline in editor, daily companion emails, knowledge map graph viz, real-company challenge dataset — these are big enough to be their own passes.

Approve and I'll build it. Or tell me to drop/add specific items.