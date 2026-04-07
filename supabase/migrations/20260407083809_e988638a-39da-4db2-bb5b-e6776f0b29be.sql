
-- Add INSERT policy for profiles (needed for signup)
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Insert lessons for all topic tabs that don't have lessons yet
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
