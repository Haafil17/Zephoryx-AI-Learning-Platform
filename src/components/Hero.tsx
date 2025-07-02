
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthButton } from '@/components/AuthButton';
import { 
  Sparkles, 
  Brain, 
  Zap, 
  Target, 
  BookOpen, 
  Trophy,
  Users,
  TrendingUp,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

export const Hero = () => {
  const handleGetStarted = () => {
    const event = new CustomEvent('changeTab', { detail: 'lessons' });
    window.dispatchEvent(event);
  };

  const handleViewLeaderboard = () => {
    const event = new CustomEvent('changeTab', { detail: 'leaderboard' });
    window.dispatchEvent(event);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-20 h-20 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -top-8 left-20 w-20 h-20 bg-cyan-200 dark:bg-cyan-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Learning Hub
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Master AI with Interactive Learning</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="scale-125">
            <ThemeToggle />
          </div>
          <AuthButton />
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24">
        <div className="text-center mb-16">
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400">
            <Zap className="w-4 h-4 mr-2" />
            Interactive AI Learning Platform
          </Badge>
          
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-slate-200 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
            Master AI &<br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Earn XP
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Learn prompt engineering, AI fundamentals, and advanced techniques through 
            interactive lessons. <span className="font-semibold text-blue-600 dark:text-blue-400">Earn XP, climb leaderboards,</span> and 
            compete with learners worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Learning
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={handleViewLeaderboard}
              variant="outline" 
              size="lg" 
              className="border-2 border-slate-300 dark:border-slate-600 px-8 py-4 text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105"
            >
              <Trophy className="w-5 h-5 mr-2" />
              View Leaderboard
            </Button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-white/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Interactive Lessons</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Structured learning paths with hands-on examples and real-world applications
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-white/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-purple-300 dark:hover:border-purple-600">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">XP & Achievements</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Earn experience points, unlock achievements, and track your learning progress
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-white/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-green-300 dark:hover:border-green-600">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Global Leaderboard</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Compete with learners worldwide and see where you rank globally
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-white/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-orange-300 dark:hover:border-orange-600">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">AI Assistant</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Get personalized help and guidance from our intelligent learning assistant
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">50+</div>
            <div className="text-slate-600 dark:text-slate-400 font-medium">Interactive Lessons</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400">10K+</div>
            <div className="text-slate-600 dark:text-slate-400 font-medium">Active Learners</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">95%</div>
            <div className="text-slate-600 dark:text-slate-400 font-medium">Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400">24/7</div>
            <div className="text-slate-600 dark:text-slate-400 font-medium">AI Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};
