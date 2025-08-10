import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../utils/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string;
  user_metadata?: any;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error?: string }>;
  signOut: () => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        user_metadata: session.user.user_metadata
      } : null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ? {
          id: session.user.id,
          email: session.user.email!,
          user_metadata: session.user.user_metadata
        } : null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Test connection before attempting sign in
      const connectionTest = await fetch(import.meta.env.VITE_SUPABASE_URL + '/rest/v1/', {
        method: 'HEAD',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY
        }
      }).catch(() => null);
      
      if (!connectionTest) {
        return { error: 'Unable to connect to authentication service. Please check your internet connection and try again.' };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        return { error: error.message };
      }
      
      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          return { error: 'Network connection failed. Please check your internet connection and try again.' };
        }
        return { error: error.message };
      }
      return { error: 'An unexpected error occurred during sign in' };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      // Test connection before attempting sign up
      const connectionTest = await fetch(import.meta.env.VITE_SUPABASE_URL + '/rest/v1/', {
        method: 'HEAD',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY
        }
      }).catch(() => null);
      
      if (!connectionTest) {
        return { error: 'Unable to connect to authentication service. Please check your internet connection and try again.' };
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) {
        return { error: error.message };
      }
      
      return {};
    } catch (error) {
      console.error('Sign up error:', error);
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          return { error: 'Network connection failed. Please check your internet connection and try again.' };
        }
        return { error: error.message };
      }
      return { error: 'An unexpected error occurred during sign up' };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error: error.message };
      }
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};