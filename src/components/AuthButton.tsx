
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const AuthButton = () => {
  const { user, signInWithGoogle, signOut, loading } = useAuth();

  if (loading) {
    return (
      <Button disabled className="bg-slate-800 text-slate-400">
        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mr-2" />
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 rounded-lg backdrop-blur-sm border border-slate-600/30">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || 'User'} />
            <AvatarFallback className="bg-cyan-500 text-white">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="text-white font-medium">{user.user_metadata?.full_name || 'User'}</div>
            <div className="text-slate-400 text-xs">{user.email}</div>
          </div>
        </div>
        <Button 
          onClick={signOut}
          variant="outline"
          size="sm"
          className="border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200"
        >
          <LogOut className="w-4 h-4 mr-1" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={signInWithGoogle}
      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30"
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign in with Google
    </Button>
  );
};
