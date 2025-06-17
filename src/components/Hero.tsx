
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles, Brain, Trophy, Star, Award, Crown, Zap, Rocket, Code2 } from "lucide-react";

export const Hero = () => {
  const leaderboard = [
    { rank: 1, name: "Alex Chen", xp: 12500, level: "AI Master", badge: "🏆", color: "text-cyan-400" },
    { rank: 2, name: "Sarah Kim", xp: 11200, level: "Prompt Expert", badge: "🥈", color: "text-purple-400" },
    { rank: 3, name: "Mike Johnson", xp: 9800, level: "Code Wizard", badge: "🥉", color: "text-pink-400" },
    { rank: 4, name: "Emily Davis", xp: 8500, level: "Tech Innovator", badge: "⭐", color: "text-blue-400" },
    { rank: 5, name: "David Park", xp: 7200, level: "AI Enthusiast", badge: "💎", color: "text-green-400" }
  ];

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
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative z-10">
        {/* Main Content */}
        <div className="lg:col-span-2 text-center lg:text-left space-y-8">
          <div className="space-y-6">
            <Badge className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">Meet Your AI Expert</span>
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                Clavis
              </span>
              <br />
              <span className="text-white drop-shadow-lg">
                the AI Expert
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl leading-relaxed drop-shadow-lg">
              Master the art of <span className="text-cyan-400 font-semibold">artificial intelligence</span> with advanced prompting techniques, 
              cutting-edge AI tools, and expert guidance for <span className="text-purple-400 font-semibold">next-generation technology</span>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl shadow-cyan-500/30 transition-all duration-300 border border-cyan-500/30"
            >
              <Brain className="w-6 h-6 mr-2 group-hover:animate-pulse" />
              Start Learning
              <Zap className="w-4 h-4 ml-2 opacity-70" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="group border-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 px-8 py-4 text-lg font-semibold transition-all duration-300 backdrop-blur-sm shadow-lg shadow-purple-500/20"
            >
              <Trophy className="w-6 h-6 mr-2 group-hover:animate-bounce" />
              View Leaderboard
              <Rocket className="w-4 h-4 ml-2 opacity-70" />
            </Button>
          </div>
          
          {/* Neon Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-cyan-400 drop-shadow-lg animate-pulse">500K+</div>
              <div className="text-sm text-slate-300 font-medium">Active Learners</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-purple-400 drop-shadow-lg animate-pulse">1M+</div>
              <div className="text-sm text-slate-300 font-medium">AI Prompts Created</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-pink-500/10 to-transparent border border-pink-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-pink-400 drop-shadow-lg animate-pulse">50+</div>
              <div className="text-sm text-slate-300 font-medium">AI Tools Covered</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-green-400 drop-shadow-lg animate-pulse">99%</div>
              <div className="text-sm text-slate-300 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
        
        {/* Neon Leaderboard */}
        <div className="lg:col-span-1">
          <Card className="relative bg-slate-900/60 dark:bg-black/60 backdrop-blur-xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">
            {/* Animated border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-50 animate-pulse"></div>
            
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Crown className="w-8 h-8 text-yellow-400 animate-pulse drop-shadow-lg" />
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                  XP Leaderboard
                </CardTitle>
              </div>
              <CardDescription className="text-slate-300 font-medium">
                Top AI learners this month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-800/60 to-slate-700/60 hover:from-slate-700/60 hover:to-slate-600/60 transition-all duration-300 border border-slate-600/30 backdrop-blur-sm shadow-lg">
                  <div className="text-3xl drop-shadow-lg">{user.badge}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white truncate drop-shadow-sm">
                      {user.name}
                    </div>
                    <div className={`text-sm font-semibold ${user.color} drop-shadow-sm`}>
                      {user.level}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white drop-shadow-sm">
                      {user.xp.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">XP</div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-slate-600/50">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-lg shadow-purple-500/30 transition-all duration-300 border border-purple-500/30">
                  <Award className="w-5 h-5 mr-2" />
                  Join Competition
                  <Code2 className="w-4 h-4 ml-2 opacity-70" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
