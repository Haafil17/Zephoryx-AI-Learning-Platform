
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles, Brain, Trophy, Zap, Rocket, User, BookOpen, Code, Star, Award, Target } from "lucide-react";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [username, setUsername] = useState("");
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    "💡 Master zero-shot prompting for instant results",
    "🎯 Use specific examples to guide AI behavior", 
    "🧠 Break complex tasks into simple steps",
    "⚡ Set clear constraints for better outputs",
    "🔄 Iterate and refine your prompts"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTabNavigation = (tabValue: string) => {
    const tab = document.querySelector(`[value="${tabValue}"]`);
    if (tab) {
      (tab as HTMLElement).click();
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
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-yellow-500/15 rounded-full blur-2xl animate-bounce"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-70 shadow-2xl shadow-cyan-500/50 flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-20 right-20 animate-pulse">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60 shadow-2xl shadow-pink-500/50 flex items-center justify-center">
          <Zap className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute top-1/2 left-20 animate-ping">
        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full opacity-50 flex items-center justify-center">
          <Star className="w-4 h-4 text-white" />
        </div>
      </div>
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
        {/* Main Header */}
        <div className="space-y-8">
          <div className="space-y-6">
            <Badge className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-200 border-2 border-cyan-500/40 backdrop-blur-sm shadow-2xl shadow-cyan-500/30 text-lg font-bold">
              <Sparkles className="w-6 h-6 animate-spin" />
              <span>Your AI Mastery Journey Starts Here</span>
              <Award className="w-6 h-6 animate-pulse" />
            </Badge>
            
            <h1 className="text-7xl md:text-9xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                Clavis
              </span>
              <br />
              <span className="text-white drop-shadow-2xl text-5xl md:text-7xl font-light">
                AI Expert Platform
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-100 max-w-5xl mx-auto leading-relaxed drop-shadow-lg font-medium">
              Transform into an <span className="text-cyan-300 font-bold bg-cyan-300/10 px-3 py-1 rounded-lg">AI Virtuoso</span> with 
              cutting-edge prompting techniques, advanced AI methodologies, and expert guidance for 
              <span className="text-purple-300 font-bold bg-purple-300/10 px-3 py-1 rounded-lg"> next-generation technology mastery</span>.
            </p>

            {/* Rotating Tips */}
            <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/50 max-w-2xl mx-auto">
              <div className="text-lg text-cyan-200 font-semibold animate-fade-in">
                {tips[currentTip]}
              </div>
            </div>
          </div>

          {/* Enhanced Username Input */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-cyan-400 transition-colors" />
              <Input
                type="text"
                placeholder="Enter your username to begin your AI journey"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-12 pr-6 py-6 w-96 text-xl bg-slate-800/70 border-2 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500/70 focus:ring-cyan-500/40 rounded-2xl backdrop-blur-sm shadow-2xl"
              />
            </div>
            {username && (
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-cyan-500/30">
                <p className="text-cyan-200 font-bold text-lg">Welcome aboard, {username}! 🚀 Ready to master AI?</p>
              </div>
            )}
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Button 
              size="lg" 
              onClick={() => handleTabNavigation("techniques")}
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-6 text-lg font-bold shadow-2xl hover:shadow-3xl shadow-cyan-500/40 transition-all duration-300 border-2 border-cyan-500/40 rounded-2xl"
            >
              <Brain className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Master Techniques
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleTabNavigation("examples")}
              className="group border-3 border-purple-500/60 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 hover:text-purple-100 px-8 py-6 text-lg font-bold transition-all duration-300 backdrop-blur-sm shadow-2xl shadow-purple-500/30 rounded-2xl"
            >
              <Code className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Explore Examples
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleTabNavigation("bestpractices")}
              className="group border-3 border-green-500/60 bg-green-500/20 hover:bg-green-500/30 text-green-200 hover:text-green-100 px-8 py-6 text-lg font-bold transition-all duration-300 backdrop-blur-sm shadow-2xl shadow-green-500/30 rounded-2xl"
            >
              <Trophy className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Best Practices
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleTabNavigation("ai")}
              className="group border-3 border-orange-500/60 bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 hover:text-orange-100 px-8 py-6 text-lg font-bold transition-all duration-300 backdrop-blur-sm shadow-2xl shadow-orange-500/30 rounded-2xl"
            >
              <Rocket className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              AI Universe
            </Button>
          </div>
          
          {/* Enhanced Stats with Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-transparent border-2 border-cyan-500/30 backdrop-blur-sm shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-cyan-300 drop-shadow-lg animate-pulse">750K+</div>
              <div className="text-lg text-slate-200 font-semibold mt-2">AI Enthusiasts</div>
              <div className="text-sm text-slate-400">Worldwide Community</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-purple-500/20 to-transparent border-2 border-purple-500/30 backdrop-blur-sm shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-purple-300 drop-shadow-lg animate-pulse">2.5M+</div>
              <div className="text-lg text-slate-200 font-semibold mt-2">Prompts Mastered</div>
              <div className="text-sm text-slate-400">Success Stories</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-pink-500/20 to-transparent border-2 border-pink-500/30 backdrop-blur-sm shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-pink-300 drop-shadow-lg animate-pulse">150+</div>
              <div className="text-lg text-slate-200 font-semibold mt-2">AI Tools & Techniques</div>
              <div className="text-sm text-slate-400">Comprehensive Coverage</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-green-500/20 to-transparent border-2 border-green-500/30 backdrop-blur-sm shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-green-300 drop-shadow-lg animate-pulse">99.8%</div>
              <div className="text-lg text-slate-200 font-semibold mt-2">Success Rate</div>
              <div className="text-sm text-slate-400">Proven Results</div>
            </div>
          </div>

          {/* Enhanced Learning Paths */}
          <div className="pt-16">
            <h3 className="text-4xl font-bold text-white mb-12 drop-shadow-lg">Your AI Mastery Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-blue-500/20 to-transparent border-2 border-blue-500/30 backdrop-blur-sm shadow-2xl hover:scale-105 transition-all duration-300">
                <BookOpen className="w-16 h-16 text-blue-300 mb-6 mx-auto animate-pulse" />
                <h4 className="text-2xl font-bold text-white mb-4">Prompt Engineering Mastery</h4>
                <p className="text-slate-200 text-lg leading-relaxed">Master advanced techniques for crafting effective AI prompts that deliver consistent, high-quality results</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-blue-500/20 text-blue-200 border-blue-500/30">Zero-Shot</Badge>
                  <Badge className="bg-blue-500/20 text-blue-200 border-blue-500/30">Few-Shot</Badge>
                  <Badge className="bg-blue-500/20 text-blue-200 border-blue-500/30">Chain-of-Thought</Badge>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-b from-purple-500/20 to-transparent border-2 border-purple-500/30 backdrop-blur-sm shadow-2xl hover:scale-105 transition-all duration-300">
                <Brain className="w-16 h-16 text-purple-300 mb-6 mx-auto animate-pulse" />
                <h4 className="text-2xl font-bold text-white mb-4">AI Technologies Deep Dive</h4>
                <p className="text-slate-200 text-lg leading-relaxed">Explore machine learning, neural networks, generative AI, and cutting-edge applications across industries</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30">Machine Learning</Badge>
                  <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30">Neural Networks</Badge>
                  <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30">GenAI</Badge>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-transparent border-2 border-cyan-500/30 backdrop-blur-sm shadow-2xl hover:scale-105 transition-all duration-300">
                <Target className="w-16 h-16 text-cyan-300 mb-6 mx-auto animate-pulse" />
                <h4 className="text-2xl font-bold text-white mb-4">Practical Implementation</h4>
                <p className="text-slate-200 text-lg leading-relaxed">Learn hands-on with real-world projects, industry tools, and emerging technologies like quantum computing</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-500/30">Real Projects</Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-500/30">Industry Tools</Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-500/30">Quantum Computing</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};
