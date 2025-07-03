
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('Google auth error:', error);
        if (error.message.includes('provider is not enabled')) {
          toast.error('Google authentication is not configured. Please use email/password login or contact support.');
          return;
        }
        throw error;
      }
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast.error('Failed to sign in with Google. Please try email/password login.');
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Email auth error:', error);
        throw error;
      }
      
      if (data.user) {
        toast.success('Welcome back!');
      }
    } catch (error: any) {
      console.error('Email auth error:', error);
      toast.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      
      if (error) {
        console.error('Email signup error:', error);
        throw error;
      }
      
      if (data.user) {
        toast.success('Account created successfully! You can now sign in.');
      }
    } catch (error: any) {
      console.error('Email signup error:', error);
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
      toast.success('Signed out successfully');
      window.location.href = '/';
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  const value = {
    user,
    session,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
