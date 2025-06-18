
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Crown, Award, User } from 'lucide-react';

const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1: return '🏆';
    case 2: return '🥈';
    case 3: return '🥉';
    case 4: return '⭐';
    case 5: return '💎';
    default: return '🔸';
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return 'text-yellow-400';
    case 2: return 'text-slate-300';
    case 3: return 'text-orange-400';
    case 4: return 'text-blue-400';
    case 5: return 'text-green-400';
    default: return 'text-slate-400';
  }
};

// Sample leaderboard data since we removed authentication
const sampleLeaderboard = [
  { id: '1', full_name: 'Alex Chen', xp: 15200, level: 'AI Master' },
  { id: '2', full_name: 'Sarah Johnson', xp: 12800, level: 'Advanced AI' },
  { id: '3', full_name: 'Mike Rodriguez', xp: 10500, level: 'AI Expert' },
  { id: '4', full_name: 'Emma Wilson', xp: 8900, level: 'Intermediate AI' },
  { id: '5', full_name: 'David Kim', xp: 7200, level: 'AI Enthusiast' },
];

export const Leaderboard = () => {
  const handleJoinCompetition = () => {
    // Scroll to username input or show join form
    const usernameInput = document.querySelector('input[placeholder="Enter your username"]');
    if (usernameInput) {
      usernameInput.focus();
    }
  };

  return (
    <Card className="relative bg-slate-900/60 dark:bg-black/60 backdrop-blur-xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">
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
        {sampleLeaderboard.map((leaderUser, index) => {
          const rank = index + 1;
          return (
            <div key={leaderUser.id} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-800/60 to-slate-700/60 hover:from-slate-700/60 hover:to-slate-600/60 transition-all duration-300 border border-slate-600/30 backdrop-blur-sm shadow-lg">
              <div className="text-3xl drop-shadow-lg">{getRankBadge(rank)}</div>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white truncate drop-shadow-sm">
                  {leaderUser.full_name}
                </div>
                <div className={`text-sm font-semibold ${getRankColor(rank)} drop-shadow-sm`}>
                  {leaderUser.level}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white drop-shadow-sm">
                  {leaderUser.xp.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">XP</div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-slate-600/50">
          <Button 
            onClick={handleJoinCompetition}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30 transition-all duration-300"
          >
            <Award className="w-5 h-5 mr-2" />
            Join Competition
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
