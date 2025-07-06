
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Brain, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { Leaderboard } from "./Leaderboard";
import { ThemeToggle } from "./ThemeToggle";

export const Hero = () => {
  const [prompt, setPrompt] = useState("");
  
  const handleAnalyze = () => {
    if (prompt.trim()) {
      // Dispatch custom event to change to features tab where prompt analyzer would be
      window.dispatchEvent(new CustomEvent('changeTab', { detail: 'features' }));
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Theme Toggle - Positioned in top right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Main Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Master AI Interactions
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Clavis AI
              </span>
              <br />
              <span className="text-slate-800 dark:text-slate-100">
                Prompt Engineering
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Master the art of AI communication with advanced prompting techniques, 
              real-time analysis, and interactive learning tools.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50">
              <Brain className="w-8 h-8 text-indigo-600" />
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-100">AI Chat</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Smart Assistant</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50">
              <Target className="w-8 h-8 text-purple-600" />
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-100">Analyzer</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Prompt Optimization</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50">
              <Zap className="w-8 h-8 text-pink-600" />
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-100">Interactive</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Hands-on Tools</div>
              </div>
            </div>
          </div>

          {/* Prompt Analyzer Input */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter your prompt to analyze..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 h-14 text-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              />
              <Button 
                onClick={handleAnalyze}
                size="lg" 
                className="h-14 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Analyze Prompt
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Get instant feedback on your prompts with our AI-powered analyzer
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('techniques')}
              className="h-14 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Learning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('features')}
              className="h-14 px-8 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
            >
              Explore Tools
            </Button>
          </div>
        </div>

        {/* Right Column - Leaderboard */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <Leaderboard />
          </div>
        </div>
      </div>
    </section>
  );
};
