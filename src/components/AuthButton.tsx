import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogIn, LogOut, User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a number')
});

export const AuthButton = () => {
  const { user, signIn, signUp, signOut, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) return;
    
    // Validate input
    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    
    setAuthLoading(true);
    const { error } = isSignUp 
      ? await signUp(email, password)
      : await signIn(email, password);
    
    if (error) {
      if (error.message === 'Email not confirmed') {
        toast.error('Please check your email and click the confirmation link to verify your account');
      } else {
        toast.error(error.message);
      }
    } else {
      setShowAuth(false);
      setEmail('');
      setPassword('');
    }
    setAuthLoading(false);
  };

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

  if (showAuth) {
    return (
      <Card className="w-80 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-center">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Button 
              onClick={handleAuth}
              disabled={authLoading || !email || !password}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400"
            >
              {authLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : isSignUp ? (
                <UserPlus className="w-4 h-4 mr-2" />
              ) : (
                <LogIn className="w-4 h-4 mr-2" />
              )}
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
            </Button>
            {!isSignUp && (
              <Button 
                variant="link" 
                onClick={async () => {
                  if (!email) {
                    toast.error('Please enter your email first');
                    return;
                  }
                  const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/`,
                  });
                  if (error) {
                    toast.error(error.message);
                  } else {
                    toast.success('Password reset email sent! Check your inbox.');
                  }
                }}
                className="w-full text-cyan-400 hover:text-cyan-300"
              >
                Forgot password?
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => setShowAuth(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button 
      onClick={() => setShowAuth(true)}
      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30"
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  );
};