
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Crown, Award, User, Trophy, Zap, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardUser {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  xp: number;
  level: string;
}

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

const getLevelColor = (level: string) => {
  switch (level) {
    case 'AI Master': return 'bg-gradient-to-r from-purple-500 to-pink-500';
    case 'Advanced AI': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    case 'AI Expert': return 'bg-gradient-to-r from-green-500 to-emerald-500';
    case 'Intermediate AI': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    case 'AI Enthusiast': return 'bg-gradient-to-r from-indigo-500 to-purple-500';
    default: return 'bg-gradient-to-r from-slate-500 to-gray-500';
  }
};

export const EnhancedLeaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url, xp, level')
        .order('xp', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      const leaderboardData = data || [];
      setLeaderboard(leaderboardData);

      // Find current user's rank
      if (user) {
        const userIndex = leaderboardData.findIndex(profile => profile.id === user.id);
        setUserRank(userIndex >= 0 ? userIndex + 1 : null);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentUser = user ? leaderboard.find(profile => profile.id === user.id) : null;

  return (
    <Card className="relative bg-gradient-to-br from-slate-900/90 via-blue-900/50 to-purple-900/60 backdrop-blur-xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
      
      <CardHeader className="text-center pb-6 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Crown className="w-10 h-10 text-yellow-400 animate-pulse drop-shadow-lg" />
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
            XP Leaderboard
          </CardTitle>
        </div>
        <CardDescription className="text-slate-300 font-medium text-lg">
          Top AI learners this month
        </CardDescription>
        
        {currentUser && userRank && (
          <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{getRankBadge(userRank)}</div>
                <div>
                  <p className="text-white font-semibold">Your Rank: #{userRank}</p>
                  <p className="text-slate-300 text-sm">{currentUser.xp.toLocaleString()} XP</p>
                </div>
              </div>
              <Badge className={`text-white ${getLevelColor(currentUser.level)} border-0`}>
                {currentUser.level}
              </Badge>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        {leaderboard.map((leaderUser, index) => {
          const rank = index + 1;
          const isCurrentUser = user?.id === leaderUser.id;
          
          return (
            <div 
              key={leaderUser.id} 
              className={`flex items-center gap-4 p-5 rounded-xl transition-all duration-300 border backdrop-blur-sm shadow-lg hover:scale-[1.02] ${
                isCurrentUser 
                  ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-400/50 ring-2 ring-blue-400/30' 
                  : 'bg-gradient-to-r from-slate-800/60 to-slate-700/60 hover:from-slate-700/60 hover:to-slate-600/60 border-slate-600/30'
              }`}
            >
              <div className="text-4xl drop-shadow-lg animate-bounce" style={{animationDelay: `${index * 0.1}s`}}>
                {getRankBadge(rank)}
              </div>
              
              <Avatar className="w-12 h-12 ring-2 ring-white/20">
                <AvatarImage src={leaderUser.avatar_url || ''} alt={leaderUser.full_name || 'User'} />
                <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold">
                  {leaderUser.full_name ? leaderUser.full_name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-bold text-white truncate drop-shadow-sm text-lg">
                    {leaderUser.full_name || 'Anonymous User'}
                    {isCurrentUser && <span className="text-blue-400 ml-2">(You)</span>}
                  </div>
                  {rank <= 3 && <Crown className="w-4 h-4 text-yellow-400" />}
                </div>
                <Badge className={`text-white ${getLevelColor(leaderUser.level)} border-0 text-xs px-2 py-1`}>
                  {leaderUser.level}
                </Badge>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 font-bold text-white drop-shadow-sm text-xl">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  {leaderUser.xp.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  XP
                </div>
              </div>
            </div>
          );
        })}
        
        {!user && (
          <div className="pt-6 border-t border-slate-600/50">
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 text-lg py-6"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Sign Up to Join the Competition
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
