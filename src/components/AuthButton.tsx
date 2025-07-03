
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthButton = () => {
  const { user, signInWithGoogle, signOut, loading } = useAuth();
  const navigate = useNavigate();

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
        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || 'User'} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="text-white font-medium">{user.user_metadata?.full_name || 'User'}</div>
            <div className="text-slate-300 text-xs">{user.email}</div>
          </div>
        </div>
        <Button 
          onClick={signOut}
          variant="outline"
          size="sm"
          className="border-red-400/50 bg-red-500/10 hover:bg-red-500/20 text-red-200 hover:text-red-100 border-2"
        >
          <LogOut className="w-4 h-4 mr-1" />
          Sign Out
        </Button>
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is already handled in the auth context with toast
      // Fallback to email auth page
      navigate('/auth');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button 
        onClick={handleGoogleSignIn}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign in with Google
      </Button>
      <Button 
        onClick={() => navigate('/auth')}
        variant="outline"
        className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
      >
        Email Login
      </Button>
    </div>
  );
};
