
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, TrendingUp } from 'lucide-react';
import { EnhancedLeaderboard } from './EnhancedLeaderboard';

export const Leaderboard = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              XP Leaderboard
            </CardTitle>
          </div>
          <CardDescription className="text-lg">
            Compete with learners worldwide and climb the ranks!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Join the Competition
          </Button>
        </CardContent>
      </Card>
      
      <EnhancedLeaderboard />
    </div>
  );
};
