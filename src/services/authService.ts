import { supabase } from '../utils/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

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
  // Enhanced sign up with better error handling
  async signUp(email: string, password: string, metadata?: any): Promise<AuthResponse> {
    try {
      console.log('🔐 Attempting sign up for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error('❌ Sign up error:', error);
        
        // Provide more helpful error messages
        let errorMessage = error.message;
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead or use a different email address.';
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'Password must be at least 6 characters long.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        
        return { user: null, session: null, error: errorMessage };
      }

      console.log('✅ Sign up successful:', !!data.user);

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email!,
          user_metadata: data.user.user_metadata
        } : null,
        session: data.session
      };
    } catch (error) {
      console.error('💥 Sign up exception:', error);
      return { 
        user: null, 
        session: null, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred during sign up' 
      };
    }
  }

  // Enhanced sign in with detailed debugging
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('🔐 Attempting sign in for:', email);
      console.log('🔗 Using Supabase URL:', supabase.supabaseUrl);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(), // Normalize email
        password
      });

      if (error) {
        console.error('❌ Sign in error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        });
        
        // Provide more helpful error messages based on the specific error
        let errorMessage = error.message;
        
        if (error.message.includes('Invalid login credentials')) {
          // Check if this is a URL mismatch issue
          console.error('🔍 Debugging auth failure:');
          console.error('- Email being used:', email);
          console.error('- Supabase URL:', supabase.supabaseUrl);
          console.error('- This could be a project URL mismatch');
          
          errorMessage = `Authentication failed. Please verify:
1. Your email and password are correct
2. Your Supabase project URL is correct
3. You're using the right environment variables

Email: ${email}
Project URL: ${supabase.supabaseUrl}`;
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in. Check your spam folder if you don\'t see the email.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many sign-in attempts. Please wait a few minutes before trying again.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        
        return { user: null, session: null, error: errorMessage };
      }

      console.log('✅ Sign in successful for user:', data.user?.email);
      console.log('✅ Session created:', !!data.session);

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email!,
          user_metadata: data.user.user_metadata
        } : null,
        session: data.session
      };
    } catch (error) {
      console.error('💥 Sign in exception:', error);
      return { 
        user: null, 
        session: null, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred during sign in' 
      };
    }
  }

  // Sign out
  async signOut(): Promise<{ error?: string }> {
    try {
      console.log('🚪 Attempting sign out');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Sign out error:', error);
        return { error: error.message };
      }
      
      console.log('✅ Sign out successful');
      return {};
    } catch (error) {
      console.error('💥 Sign out exception:', error);
      return { 
        error: error instanceof Error ? error.message : 'An unexpected error occurred during sign out' 
      };
    }
  }

  // Get current user with proper session handling
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        // Handle "Auth session missing!" as expected state, not an error
        if (error.message === 'Auth session missing!') {
          console.log('ℹ️ No active session - user not authenticated');
        } else {
          console.error('❌ Get user error:', error);
        }
        return null;
      }
      
      if (!user) {
        console.log('ℹ️ No user found in session');
        return null;
      }

      console.log('✅ Current user retrieved:', user.email);
      return {
        id: user.id,
        email: user.email!,
        user_metadata: user.user_metadata
      };
    } catch (error) {
      console.error('💥 Get user exception:', error);
      return null;
    }
  }

  // Get current session with proper session handling
  async getCurrentSession(): Promise<Session | null> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        // Handle "Auth session missing!" as expected state, not an error
        if (error.message === 'Auth session missing!') {
          console.log('ℹ️ No active session available');
        } else {
          console.error('❌ Get session error:', error);
        }
        return null;
      }
      
      if (session) {
        console.log('✅ Active session found for:', session.user.email);
      }
      
      return session;
    } catch (error) {
      console.error('💥 Get session exception:', error);
      return null;
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 Auth state change:', event, session ? `User: ${session.user.email}` : 'No session');
      callback(event, session);
    });
  }

  // Reset password
  async resetPassword(email: string): Promise<{ error?: string }> {
    try {
      console.log('🔑 Attempting password reset for:', email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        console.error('❌ Password reset error:', error);
        return { error: error.message };
      }

      console.log('✅ Password reset email sent');
      return {};
    } catch (error) {
      console.error('💥 Password reset exception:', error);
      return { 
        error: error instanceof Error ? error.message : 'An unexpected error occurred during password reset' 
      };
    }
  }

  // Update password
  async updatePassword(newPassword: string): Promise<{ error?: string }> {
    try {
      console.log('🔑 Attempting password update');
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('❌ Password update error:', error);
        return { error: error.message };
      }

      console.log('✅ Password updated successfully');
      return {};
    } catch (error) {
      console.error('💥 Password update exception:', error);
      return { 
        error: error instanceof Error ? error.message : 'An unexpected error occurred during password update' 
      };
    }
  }

  // Test connection method for development
  async testConnection(): Promise<boolean> {
    try {
      console.log('🧪 Testing Supabase connection...');
      
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        // Handle "Auth session missing!" as expected state for connection test
        if (error.message === 'Auth session missing!') {
          console.log('✅ Connection test successful - no active session');
          return true;
        } else {
          console.error('❌ Connection test failed:', error);
          return false;
        }
      }
      console.log('✅ Connection test successful');
      return true;
    } catch (error) {
      console.error('💥 Connection test exception:', error);
      return false;
    }
  }

  // Debug method to check environment
  async debugEnvironment(): Promise<void> {
    console.log('🔍 Environment Debug Info:');
    console.log('- Supabase URL:', supabase.supabaseUrl);
    console.log('- Site URL:', window.location.origin);
    console.log('- Storage Key:', 'cognitive-nexus-auth');
    
    try {
      const { data, error } = await supabase.auth.getSession();
      console.log('- Session check:', error ? error.message : 'OK');
      console.log('- Has session:', !!data.session);
    } catch (e) {
      console.log('- Session check failed:', e);
    }
  }
}

export const authService = new AuthService();
export default authService;