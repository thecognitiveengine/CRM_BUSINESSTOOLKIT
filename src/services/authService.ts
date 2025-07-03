import { supabase } from '../utils/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

// 🆕 FIXED: Complete authentication service with better error handling
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
      console.log('Attempting sign up for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        return { user: null, session: null, error: error.message };
      }

      console.log('Sign up successful:', !!data.user);

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email!,
          user_metadata: data.user.user_metadata
        } : null,
        session: data.session
      };
    } catch (error) {
      console.error('Sign up exception:', error);
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
      console.log('Attempting sign in for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Sign in error:', error);
        
        // Provide more helpful error messages
        let errorMessage = error.message;
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in.';
        }
        
        return { user: null, session: null, error: errorMessage };
      }

      console.log('Sign in successful:', !!data.user);

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email!,
          user_metadata: data.user.user_metadata
        } : null,
        session: data.session
      };
    } catch (error) {
      console.error('Sign in exception:', error);
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
      console.log('Attempting sign out');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        return { error: error.message };
      }
      
      console.log('Sign out successful');
      return {};
    } catch (error) {
      console.error('Sign out exception:', error);
      return { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // 🆕 FIXED: Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Get user error:', error);
        return null;
      }
      
      if (!user) return null;

      return {
        id: user.id,
        email: user.email!,
        user_metadata: user.user_metadata
      };
    } catch (error) {
      console.error('Get user exception:', error);
      return null;
    }
  }

  // 🆕 FIXED: Get current session
  async getCurrentSession(): Promise<Session | null> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Get session error:', error);
        return null;
      }
      
      return session;
    } catch (error) {
      console.error('Get session exception:', error);
      return null;
    }
  }

  // 🆕 FIXED: Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, !!session);
      callback(event, session);
    });
  }

  // 🆕 FIXED: Reset password
  async resetPassword(email: string): Promise<{ error?: string }> {
    try {
      console.log('Attempting password reset for:', email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        console.error('Password reset error:', error);
        return { error: error.message };
      }

      console.log('Password reset email sent');
      return {};
    } catch (error) {
      console.error('Password reset exception:', error);
      return { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // 🆕 FIXED: Update password
  async updatePassword(newPassword: string): Promise<{ error?: string }> {
    try {
      console.log('Attempting password update');
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Password update error:', error);
        return { error: error.message };
      }

      console.log('Password updated successfully');
      return {};
    } catch (error) {
      console.error('Password update exception:', error);
      return { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // 🆕 NEW: Test connection method for development
  async testConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Connection test failed:', error);
        return false;
      }
      console.log('Connection test successful');
      return true;
    } catch (error) {
      console.error('Connection test exception:', error);
      return false;
    }
  }
}

export const authService = new AuthService();
export default authService;