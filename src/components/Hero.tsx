
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles, Brain, Trophy, Zap, Rocket, User, BookOpen, Code } from "lucide-react";
import { useState } from "react";

export const Hero = () => {
  const [username, setUsername] = useState("");

  const handleStartLearning = () => {
    const techniquesTab = document.querySelector('[data-state="active"][value="techniques"]') || 
                          document.querySelector('[value="techniques"]');
    if (techniquesTab) {
      (techniquesTab as HTMLElement).click();
    }
    // Scroll to content area
    setTimeout(() => {
      const contentArea = document.querySelector('.max-w-7xl');
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleViewExamples = () => {
    const examplesTab = document.querySelector('[value="examples"]');
    if (examplesTab) {
      (examplesTab as HTMLElement).click();
    }
    setTimeout(() => {
      const contentArea = document.querySelector('.max-w-7xl');
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleViewBestPractices = () => {
    const bestPracticesTab = document.querySelector('[value="bestpractices"]');
    if (bestPracticesTab) {
      (bestPracticesTab as HTMLElement).click();
    }
    setTimeout(() => {
      const contentArea = document.querySelector('.max-w-7xl');
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleViewAI = () => {
    const aiTab = document.querySelector('[value="ai"]');
    if (aiTab) {
      (aiTab as HTMLElement).click();
    }
    setTimeout(() => {
      const contentArea = document.querySelector('.max-w-7xl');
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      {/* Floating Neon Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 shadow-lg shadow-cyan-500/50"></div>
      </div>
      <div className="absolute bottom-20 right-20 animate-pulse">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-50 shadow-lg shadow-pink-500/50"></div>
      </div>
      <div className="absolute top-1/2 left-20 animate-ping">
        <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full opacity-40"></div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        {/* Main Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <Badge className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-semibold text-lg">Meet Your AI Expert</span>
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                Clavis
              </span>
              <br />
              <span className="text-white drop-shadow-lg text-4xl md:text-6xl">
                the AI Expert
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Master the art of <span className="text-cyan-400 font-bold">artificial intelligence</span> with advanced prompting techniques, 
              cutting-edge AI tools, and expert guidance for <span className="text-purple-400 font-bold">next-generation technology</span>.
              Learn everything from basic prompts to quantum computing and generative AI.
            </p>
          </div>

          {/* Username Input */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Enter your username to get started"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 pr-4 py-4 w-80 text-lg bg-slate-800/60 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/30"
              />
            </div>
            {username && (
              <p className="text-cyan-300 font-semibold">Welcome, {username}! 👋</p>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Button 
              size="lg" 
              onClick={handleStartLearning}
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-4 text-base font-semibold shadow-lg hover:shadow-xl shadow-cyan-500/30 transition-all duration-300 border border-cyan-500/30"
            >
              <Brain className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Start Learning
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleViewExamples}
              className="group border-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 px-6 py-4 text-base font-semibold transition-all duration-300 backdrop-blur-sm shadow-lg shadow-purple-500/20"
            >
              <Code className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              View Examples
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleViewBestPractices}
              className="group border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-green-300 hover:text-green-200 px-6 py-4 text-base font-semibold transition-all duration-300 backdrop-blur-sm shadow-lg shadow-green-500/20"
            >
              <Trophy className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Best Practices
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleViewAI}
              className="group border-2 border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 hover:text-orange-200 px-6 py-4 text-base font-semibold transition-all duration-300 backdrop-blur-sm shadow-lg shadow-orange-500/20"
            >
              <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              AI Topics
            </Button>
          </div>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-cyan-400 drop-shadow-lg animate-pulse">500K+</div>
              <div className="text-base text-slate-300 font-medium">Active Learners</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-purple-400 drop-shadow-lg animate-pulse">1M+</div>
              <div className="text-base text-slate-300 font-medium">AI Prompts Created</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-pink-500/10 to-transparent border border-pink-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-pink-400 drop-shadow-lg animate-pulse">50+</div>
              <div className="text-base text-slate-300 font-medium">AI Tools Covered</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-green-400 drop-shadow-lg animate-pulse">99%</div>
              <div className="text-base text-slate-300 font-medium">Success Rate</div>
            </div>
          </div>

          {/* What You'll Learn Section */}
          <div className="pt-12">
            <h3 className="text-3xl font-bold text-white mb-8">What You'll Master</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 rounded-xl bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-sm">
                <BookOpen className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
                <h4 className="text-xl font-bold text-white mb-2">Prompt Engineering</h4>
                <p className="text-slate-300">Master advanced techniques for crafting effective AI prompts</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-sm">
                <Brain className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
                <h4 className="text-xl font-bold text-white mb-2">AI Technologies</h4>
                <p className="text-slate-300">Explore machine learning, neural networks, and AI applications</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 backdrop-blur-sm">
                <Zap className="w-12 h-12 text-cyan-400 mb-4 mx-auto" />
                <h4 className="text-xl font-bold text-white mb-2">Cutting-Edge Tools</h4>
                <p className="text-slate-300">Learn the latest AI tools and emerging technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
