// ✅ Ton AuthContext.tsx final multi-tenant

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, type AuthUser } from '../services/authService';
import type { Session } from '@supabase/supabase-js';
import { useProfile } from '../hooks/useProfile';

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  profile: any;
  role: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error?: string }>;
  signOut: () => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const { profile, loading: profileLoading } = useProfile(user?.id || null);

  const role = user?.user_metadata?.role || profile?.role || 'member';

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentSession = await authService.getCurrentSession();
        const currentUser = await authService.getCurrentUser();
        setSession(currentSession);
        setUser(currentUser);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = authService.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            user_metadata: session.user.user_metadata
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await authService.signIn(email, password);
    setLoading(false);
    return result.error ? { error: result.error } : {};
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    setLoading(true);
    const result = await authService.signUp(email, password, metadata);
    setLoading(false);
    return result.error ? { error: result.error } : {};
  };

  const signOut = async () => {
    setLoading(true);
    const result = await authService.signOut();
    setLoading(false);
    return result.error ? { error: result.error } : {};
  };

  const resetPassword = async (email: string) => authService.resetPassword(email);
  const updatePassword = async (newPassword: string) => authService.updatePassword(newPassword);

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      role,
      loading: loading || profileLoading,
      signIn,
      signUp,
      signOut,
      resetPassword,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
