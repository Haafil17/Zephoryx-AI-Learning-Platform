import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Crown, Award, User, Edit2, Check, X } from 'lucide-react';
import { useUsername } from '@/hooks/useUsername';
import { toast } from 'sonner';

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
  const { username, setUsername, clearUsername } = useUsername();
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);

  const handleEditUsername = () => {
    setTempUsername(username);
    setIsEditing(true);
  };

  const handleSaveUsername = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim());
      setIsEditing(false);
      toast.success('Username saved!');
    } else {
      toast.error('Please enter a valid username');
    }
  };

  const handleCancelEdit = () => {
    setTempUsername(username);
    setIsEditing(false);
  };

  const handleClearUsername = () => {
    clearUsername();
    setIsEditing(false);
    setTempUsername('');
    toast.success('Username cleared!');
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

        {/* Username Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-lg border border-slate-600/50">
          {!isEditing ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-white font-semibold">
                  {username || 'Set your username'}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditUsername}
                className="text-slate-300 hover:text-white"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Enter your username"
                className="bg-slate-700 border-slate-600 text-white"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveUsername}
                  className="text-green-400 hover:text-green-300"
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </Button>
                {username && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearUsername}
                    className="text-orange-400 hover:text-orange-300 ml-auto"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
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
