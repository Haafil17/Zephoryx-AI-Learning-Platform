
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Zap, Trophy, Target, BookOpen } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton } from "./AuthButton";

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const changeTab = (tabValue: string) => {
    const event = new CustomEvent('changeTab', { detail: tabValue });
    window.dispatchEvent(event);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:bg-purple-600"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:bg-yellow-600"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:bg-pink-600"></div>
      </div>

      {/* Header with improved design */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/30 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Learning Hub
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Master AI & Prompt Engineering</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 rounded-full px-6 py-3 backdrop-blur-sm border border-white/30 dark:border-slate-600/30">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme</span>
            <ThemeToggle />
          </div>
          <AuthButton />
        </div>
      </header>

      {/* Hero content with enhanced design */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-6 py-2 text-lg shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Interactive AI Learning Platform
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400 leading-tight">
              Master AI & Prompt Engineering
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Learn cutting-edge AI techniques, earn XP, compete on leaderboards, and get personalized guidance from our AI assistant
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-slate-600/30 shadow-xl hover:scale-105 transition-all duration-300">
              <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Interactive Lessons</h3>
              <p className="text-slate-600 dark:text-slate-300">Complete lessons and earn 100-300 XP each</p>
            </div>
            
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-slate-600/30 shadow-xl hover:scale-105 transition-all duration-300">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">XP Leaderboard</h3>
              <p className="text-slate-600 dark:text-slate-300">Compete globally and climb the ranks</p>
            </div>
            
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-slate-600/30 shadow-xl hover:scale-105 transition-all duration-300">
              <Zap className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
              <p className="text-slate-600 dark:text-slate-300">Get personalized learning help</p>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => changeTab('lessons')}
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg shadow-2xl shadow-blue-500/30 hover:scale-105 transition-all duration-300"
            >
              <BookOpen className="w-6 h-6 mr-2" />
              Start Learning
            </Button>
            
            <Button 
              onClick={() => changeTab('leaderboard')}
              variant="outline" 
              size="lg"
              className="border-2 border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 px-8 py-4 text-lg shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Trophy className="w-6 h-6 mr-2" />
              View Leaderboard
            </Button>
          </div>

          {/* Getting started guide */}
          <div className="mt-12 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 dark:border-slate-600/30 shadow-2xl max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
              <Target className="w-6 h-6 text-green-500" />
              Getting Started:
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <p className="font-semibold">Create Account</p>
                  <p className="text-slate-600 dark:text-slate-300">Sign up with email or Google to start earning XP</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <p className="font-semibold">Complete Lessons</p>
                  <p className="text-slate-600 dark:text-slate-300">Learn AI concepts and earn 100-300 XP per lesson</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <p className="font-semibold">Climb Leaderboard</p>
                  <p className="text-slate-600 dark:text-slate-300">Compete with learners worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</span>
                <div>
                  <p className="font-semibold">Get AI Help</p>
                  <p className="text-slate-600 dark:text-slate-300">Use our AI assistant for personalized guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
