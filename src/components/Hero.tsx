
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Zap, Target } from "lucide-react";
import { useState } from "react";
import { UsernameSection } from "./UsernameSection";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton } from "./AuthButton";
import aionyxLogo from "@/assets/aionyx-logo.png";

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartLearning = () => {
    // Dispatch custom event to change to techniques tab
    window.dispatchEvent(new CustomEvent('changeTab', { detail: 'techniques' }));
    // Scroll to tabs section
    setTimeout(() => {
      const tabsSection = document.querySelector('[role="tablist"]');
      if (tabsSection) {
        tabsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleExploreTools = () => {
    // Dispatch custom event to change to features tab
    window.dispatchEvent(new CustomEvent('changeTab', { detail: 'features' }));
    // Scroll to tabs section
    setTimeout(() => {
      const tabsSection = document.querySelector('[role="tablist"]');
      if (tabsSection) {
        tabsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Auth and Theme Toggle - Positioned in top right */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <AuthButton />
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
            
            <div className="flex items-center justify-center lg:justify-start gap-6 mb-4">
              <img src={aionyxLogo} alt="AIONYX Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AIONYX
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
                <div className="font-semibold text-slate-800 dark:text-slate-100">Techniques</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Advanced Methods</div>
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={handleStartLearning}
              className="h-14 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Learning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleExploreTools}
              className="h-14 px-8 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
            >
              Explore Tools
            </Button>
          </div>
        </div>

        {/* Right Column - Username Section */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <UsernameSection />
          </div>
        </div>
      </div>
    </section>
  );
};
