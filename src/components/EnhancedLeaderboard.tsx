
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown } from 'lucide-react';

export const EnhancedLeaderboard = () => {
  return (
    <Card className="relative bg-gradient-to-br from-slate-900/90 via-blue-900/50 to-purple-900/60 backdrop-blur-xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
      
      <CardHeader className="text-center pb-6 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Crown className="w-10 h-10 text-yellow-400 animate-pulse drop-shadow-lg" />
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
            Coming Soon
          </CardTitle>
        </div>
        <CardDescription className="text-slate-300 font-medium text-lg">
          Leaderboard feature will be available in future updates
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
