import { supabase } from '../utils/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

// 🆕 FIXED: Complete authentication service
export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: any;
}

export interface AuthResponse {
  user: AuthUser | null;
  session: Session | null;
  error?: string;
}

class AuthService {
  // 🆕 FIXED: Sign up with email and password
  async signUp(email: string, password: string, metadata?: any): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        return { user: null, session: null, error: error.message };
      }

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email!,
          user_metadata: data.user.user_metadata
        } : null,
        session: data.session
      };
    } catch (error) {
      return { 
        user: null, 
        session: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // 🆕 FIXED: Sign in with email and password
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { user: null, session: null, error: error.message };
      }

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email!,
          user_metadata: data.user.user_metadata
        } : null,
        session: data.session
      };
    } catch (error) {
      return { 
        user: null, 
        session: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // 🆕 FIXED: Sign out
  async signOut(): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error: error.message };
      }
      return {};
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // 🆕 FIXED: Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      return {
        id: user.id,
        email: user.email!,
        user_metadata: user.user_metadata
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // 🆕 FIXED: Get current session
  async getCurrentSession(): Promise<Session | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Error getting current session:', error);
      return null;
    }
  }

  // 🆕 FIXED: Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  // 🆕 FIXED: Reset password
  async resetPassword(email: string): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // 🆕 FIXED: Update password
  async updatePassword(newPassword: string): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export const authService = new AuthService();
export default authService;