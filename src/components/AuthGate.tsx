import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AuthButton } from './AuthButton';
import { Shield, Brain, Sparkles, BookOpen, Zap } from 'lucide-react';

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, signOut } = useAuth();
  const [blocked, setBlocked] = useState(false);
  const [checkingBlock, setCheckingBlock] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkBlocked = async () => {
      setCheckingBlock(true);
      const { data } = await supabase
        .from('profiles')
        .select('blocked')
        .eq('id', user.id)
        .single();
      if (data?.blocked) {
        setBlocked(true);
        await signOut();
      }
      setCheckingBlock(false);
    };
    checkBlocked();

    const interval = setInterval(checkBlocked, 30000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading || checkingBlock) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-red-950 dark:via-rose-950 dark:to-pink-950 p-4">
        <div className="max-w-md text-center space-y-6 bg-card p-8 rounded-2xl shadow-2xl border border-destructive/20">
          <Shield className="w-16 h-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold text-destructive">Account Blocked</h1>
          <p className="text-muted-foreground">Your account has been blocked by an administrator. Please contact support for assistance.</p>
          <p className="text-xs text-muted-foreground">Email: support@zephoryx.com</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        {/* Hero Landing for Unauthenticated */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <div className="max-w-2xl text-center space-y-8">
            {/* Logo / Brand */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Zephoryx AI Lab
              </h1>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              The ultimate AI learning platform. Master prompt engineering, agentic AI, RAG, deep learning, and 20+ cutting-edge topics.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
              {[
                { icon: BookOpen, label: '22+ Topics', desc: 'Comprehensive' },
                { icon: Sparkles, label: 'AI Tools', desc: 'Interactive' },
                { icon: Zap, label: 'Certifications', desc: 'Earn badges' },
                { icon: Shield, label: 'Community', desc: 'Leaderboard' },
              ].map((f, i) => (
                <div key={i} className="bg-card/80 rounded-xl p-4 shadow-md border border-border/30 text-center">
                  <f.icon className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-sm font-bold text-foreground">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Auth Form */}
            <div className="bg-card/90 backdrop-blur-md rounded-2xl shadow-2xl border border-border/50 p-6 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-2">Sign in to continue</h2>
              <p className="text-sm text-muted-foreground mb-4">Create a free account or sign in to access all content.</p>
              <AuthButton />
            </div>

            <p className="text-xs text-muted-foreground">
              © 2026 Zephoryx AI Lab. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
