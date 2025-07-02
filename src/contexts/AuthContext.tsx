import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, type AuthUser } from '../services/authService';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';

// ✅ Importe ton hook pour charger le profil
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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Hook pour récupérer le profil
  const { profile, loading: profileLoading } = useProfile(user?.id || null);

  // ✅ Role dynamique fusionné
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
      async (event, session) => {
        console.log('Auth state changed:', event, session);
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
    try {
      const result = await authService.signIn(email, password);
      return result.error ? { error: result.error } : {};
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    setLoading(true);
    try {
      const result = await authService.signUp(email, password, metadata);
      return result.error ? { error: result.error } : {};
    } catch (error) {
      return { error: error instanceof
