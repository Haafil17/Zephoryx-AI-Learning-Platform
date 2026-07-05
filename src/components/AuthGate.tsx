import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AuthButton } from './AuthButton';
import { motion } from 'framer-motion';
import {
  Shield, Brain, Sparkles, BookOpen, Zap, Target, Code2, GitBranch,
  Trophy, Map, Users, Rocket, MessageSquare, LineChart, GraduationCap,
  Lightbulb, CheckCircle2, ArrowRight, Bot, Layers, Compass,
} from 'lucide-react';

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, signOut } = useAuth();
  const [blocked, setBlocked] = useState(false);
  const [checkingBlock, setCheckingBlock] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkBlocked = async () => {
      setCheckingBlock(true);
      const { data } = await supabase
        .from('profiles')
        .select('blocked')
        .eq('id', user.id)
        .single();
      if (data?.blocked) {
        setBlocked(true);
        await signOut();
      }
      setCheckingBlock(false);
    };
    checkBlocked();
    const interval = setInterval(checkBlocked, 30000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading || checkingBlock) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-red-950 dark:via-rose-950 dark:to-pink-950 p-4">
        <div className="max-w-md text-center space-y-6 bg-card p-8 rounded-2xl shadow-2xl border border-destructive/20">
          <Shield className="w-16 h-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold text-destructive">Account Blocked</h1>
          <p className="text-muted-foreground">Your account has been blocked by an administrator. Please contact support for assistance.</p>
          <p className="text-xs text-muted-foreground">Email: support@zephoryx.com</p>
        </div>
      </div>
    );
  }

  if (!user) return <Landing />;
  return <>{children}</>;
};

const scrollToAuth = () => {
  document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const Landing: React.FC = () => {
  const usps = [
    { icon: Brain, title: 'AI That Learns How You Learn', desc: 'Adapts pace, depth, and examples to your actual understanding — not a one-size-fits-all curriculum.' },
    { icon: Bot, title: 'AI Mentor With Memory', desc: 'Remembers every lesson, mistake, project, and goal so guidance is personal, not generic.' },
    { icon: Rocket, title: 'Build Instead of Watch', desc: 'Every lesson ends in a real project — expense trackers, chatbots, recommendation engines.' },
    { icon: Compass, title: 'AI Project Coach', desc: 'Breaks big ambitions ("build Netflix") into realistic weekly milestones you can actually ship.' },
    { icon: Lightbulb, title: 'Hints Before Answers', desc: 'Guides you through hint → hint → explanation → solution so you actually learn, not copy.' },
    { icon: LineChart, title: 'Skill Graph, Not Certificates', desc: 'See exactly where you stand across Python, ML, Deep Learning, Transformers, RAG, Agents.' },
    { icon: Map, title: 'AI Career Planner', desc: '12-month roadmap toward AI Engineer — updated as your skills, goals, and progress evolve.' },
    { icon: MessageSquare, title: 'AI Interview Simulator', desc: 'Mock ML interviews, live coding, system design, and resume review with real feedback.' },
    { icon: CheckCircle2, title: 'AI Project Evaluator', desc: 'Upload a project — get scored on architecture, code quality, docs, security, and deployment.' },
    { icon: Layers, title: 'Explains at Any Level', desc: 'Same topic, five depths: age 12, high school, college, professional, researcher. One click.' },
    { icon: Code2, title: 'AI Pair Programmer', desc: 'A senior dev beside you — points out mistakes, suggests improvements, explains decisions.' },
    { icon: GitBranch, title: 'AI Portfolio Builder', desc: 'Every project ships GitHub-ready, resume-ready, and deployable — proof of what you can build.' },
  ];

  const topics = [
    'Prompt Engineering', 'Agentic AI', 'RAG Systems', 'LLM Fine-tuning',
    'Deep Learning', 'Transformers', 'MLOps', 'Computer Vision',
    'NLP', 'Embeddings', 'Memory Systems', 'AI Guardrails',
  ];

  const mustHaves = [
    { icon: Brain, title: 'AI Personal Mentor', desc: 'Remembers your strengths, weaknesses, goals, and past work.' },
    { icon: Rocket, title: 'Project-Based Learning', desc: 'Every lesson ends with a real project that reinforces concepts.' },
    { icon: Code2, title: 'AI Code Review & Debugging', desc: 'Explanations and feedback — not just "correct" or "incorrect".' },
    { icon: Map, title: 'Adaptive Learning Roadmap', desc: 'The path adjusts to your progress and areas of difficulty.' },
    { icon: Trophy, title: 'AI Portfolio Builder', desc: 'Completed projects become a polished portfolio for employers.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950 text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Zephoryx AI Lab
            </span>
          </div>
          <button
            onClick={scrollToAuth}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-all text-sm"
          >
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-4 pt-20 pb-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }} transition={{ duration: 22, repeat: Infinity }}
            className="absolute top-10 left-10 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-20" />
          <motion.div animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }} transition={{ duration: 26, repeat: Infinity }}
            className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-20" />
          <motion.div animate={{ x: [0, 30, -30, 0], y: [0, -20, 30, 0] }} transition={{ duration: 28, repeat: Infinity }}
            className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl opacity-20" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-300/40 text-indigo-800 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" /> The AI That Learns How You Learn
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
            Become an AI Engineer<br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              by building real projects
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We don't measure how many videos you watched. We measure <span className="font-bold text-foreground">what you can build.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button onClick={scrollToAuth}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
              Start Building Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#usps" className="px-8 py-4 rounded-xl border-2 border-border font-semibold hover:bg-card/60 transition-all">
              See what makes it different
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10">
            {[
              { n: '22+', l: 'Technical Topics' },
              { n: 'AI', l: 'Personal Mentor' },
              { n: '5', l: 'Skill Levels' },
              { n: '∞', l: 'Real Projects' },
            ].map((s) => (
              <div key={s.l} className="bg-card/60 backdrop-blur rounded-2xl p-5 border border-border/40">
                <div className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{s.n}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="px-4 py-20 bg-background/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">The real problem with online learning</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              People don't fail because they don't have courses. They fail because of this:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "They don't know what to learn next.",
              "They forget everything a week later.",
              "They never build real projects.",
              "They get no real feedback.",
              "They quit halfway through.",
              "They can't connect theory to practice.",
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-5 bg-card rounded-xl border border-border/50">
                <div className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold shrink-0">✕</div>
                <p className="text-foreground font-medium">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USPs */}
      <section id="usps" className="px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm font-semibold mb-4">
              What makes Zephoryx different
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">12 things no other platform does</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Coursera gives videos. Udemy gives courses. We give you an AI mentor that builds you into an engineer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usps.map((u, i) => (
              <motion.div key={u.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <u.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{u.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Visual */}
      <section className="px-4 py-24 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 dark:from-indigo-950/50 dark:to-purple-950/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Every lesson ends with a project</h2>
          <p className="text-lg text-muted-foreground mb-14 max-w-2xl mx-auto">Learning by doing is stickier. Here's how it flows:</p>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { c: 'Python Variables', p: 'Expense Tracker' },
              { c: 'Functions', p: 'Calculator' },
              { c: 'Pandas', p: 'Cricket Analysis' },
              { c: 'ML Basics', p: 'House Price Predictor' },
              { c: 'Transformers', p: 'AI Chatbot' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-4 bg-card rounded-2xl border border-border/50 shadow-md">
                <div className="text-xs uppercase text-muted-foreground font-semibold">Learn</div>
                <div className="font-bold mb-3">{s.c}</div>
                <ArrowRight className="w-4 h-4 mx-auto text-primary mb-2 rotate-90 md:rotate-0" />
                <div className="text-xs uppercase text-purple-600 font-semibold">Build</div>
                <div className="font-bold text-primary">{s.p}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="px-4 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Cover the full AI stack</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            From foundations to frontier — 22+ deeply technical topics, grounded in research and real practice.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className="px-5 py-2.5 bg-card border border-border/60 rounded-full font-semibold text-sm hover:border-primary hover:text-primary transition-all cursor-default">
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Must-haves */}
      <section className="px-4 py-24 bg-background/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-4">
              The core 5
            </div>
            <h2 className="text-4xl md:text-5xl font-black">Everything you need to actually get hired</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {mustHaves.map((m, i) => (
              <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border/50 hover:shadow-2xl hover:-translate-y-1 transition-all">
                <m.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">{m.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="px-4 py-24">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
          <GraduationCap className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            "We don't measure how many videos you watched.<br />We measure what you can build."
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            The AI mentor that helps you become an AI engineer — by shipping real projects, not by endlessly watching videos.
          </p>
        </motion.div>
      </section>

      {/* Auth CTA */}
      <section id="auth-section" className="px-4 py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Start your journey</h2>
            <p className="text-muted-foreground">Free to sign up. Start building today.</p>
          </div>
          <div className="bg-card/90 backdrop-blur-md rounded-2xl shadow-2xl border border-border/50 p-8">
            <AuthButton />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">
            © 2026 Zephoryx AI Lab · Founded by Haafil Mohammed
          </p>
        </div>
      </section>
    </div>
  );
};
