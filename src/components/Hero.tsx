
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles, Brain, Trophy, Star, Award, Crown } from "lucide-react";

export const Hero = () => {
  const leaderboard = [
    { rank: 1, name: "Alex Chen", xp: 12500, level: "AI Master", badge: "🏆", color: "text-yellow-600" },
    { rank: 2, name: "Sarah Kim", xp: 11200, level: "Prompt Expert", badge: "🥈", color: "text-gray-500" },
    { rank: 3, name: "Mike Johnson", xp: 9800, level: "Code Wizard", badge: "🥉", color: "text-amber-600" },
    { rank: 4, name: "Emily Davis", xp: 8500, level: "Tech Innovator", badge: "⭐", color: "text-blue-600" },
    { rank: 5, name: "David Park", xp: 7200, level: "AI Enthusiast", badge: "💎", color: "text-purple-600" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e2e8f0" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-8 h-8 bg-blue-500 rounded-full opacity-20"></div>
      </div>
      <div className="absolute bottom-20 right-20 animate-pulse">
        <div className="w-12 h-12 bg-purple-500 rounded-full opacity-15"></div>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* Main Content */}
        <div className="lg:col-span-2 text-center lg:text-left space-y-8">
          <div className="space-y-6">
            <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <Sparkles className="w-4 h-4" />
              Meet Your AI Expert
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Clavis
              </span>
              <br />
              <span className="text-slate-800 dark:text-slate-100">
                the AI Expert
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Master the art of artificial intelligence with advanced prompting techniques, 
              cutting-edge AI tools, and expert guidance for next-generation technology.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Brain className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              <Trophy className="w-5 h-5 mr-2" />
              View Leaderboard
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">1M+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">AI Prompts Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">50+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">AI Tools Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">99%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
        
        {/* Leaderboard */}
        <div className="lg:col-span-1">
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  XP Leaderboard
                </CardTitle>
              </div>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Top AI learners this month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <div className="text-2xl">{user.badge}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                      {user.name}
                    </div>
                    <div className={`text-sm font-medium ${user.color}`}>
                      {user.level}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800 dark:text-slate-100">
                      {user.xp.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">XP</div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-slate-200 dark:border-slate-600">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  <Award className="w-4 h-4 mr-2" />
                  Join Competition
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
