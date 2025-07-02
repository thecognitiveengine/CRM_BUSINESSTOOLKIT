import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authService } from '../src/services/authService';

// 🆕 PRODUCTION-GRADE AUTHENTICATION TESTING
// Mock Supabase auth
vi.mock('../src/utils/supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(() => ({
        data: {
          user: { id: '123', email: 'test@example.com' },
          session: { access_token: 'token' }
        },
        error: null
      })),
      signInWithPassword: vi.fn(() => ({
        data: {
          user: { id: '123', email: 'test@example.com' },
          session: { access_token: 'token' }
        },
        error: null
      })),
      signOut: vi.fn(() => ({ error: null })),
      getUser: vi.fn(() => ({
        data: { user: { id: '123', email: 'test@example.com' } }
      })),
      getSession: vi.fn(() => ({
        data: { session: { access_token: 'token' } }
      })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      })),
      resetPasswordForEmail: vi.fn(() => ({ error: null })),
      updateUser: vi.fn(() => ({ error: null }))
    }
  }
}));

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Sign Up', () => {
    it('should sign up a new user successfully', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const metadata = { company_name: 'Test Company' };

      const result = await authService.signUp(email, password, metadata);
      
      expect(result.user).toBeTruthy();
      expect(result.user?.email).toBe(email);
      expect(result.session).toBeTruthy();
      expect(result.error).toBeUndefined();
    });

    it('should handle sign up errors', async () => {
      // Mock error response
      const mockError = new Error('Email already exists');
      vi.mocked(require('../src/utils/supabaseClient').supabase.auth.signUp)
        .mockResolvedValueOnce({ data: null, error: mockError });

      const result = await authService.signUp('test@example.com', 'password123');
      
      expect(result.user).toBeNull();
      expect(result.session).toBeNull();
      expect(result.error).toBe('Email already exists');
    });
  });

  describe('Sign In', () => {
    it('should sign in a user successfully', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      const result = await authService.signIn(email, password);
      
      expect(result.user).toBeTruthy();
      expect(result.user?.email).toBe(email);
      expect(result.session).toBeTruthy();
      expect(result.error).toBeUndefined();
    });

    it('should handle sign in errors', async () => {
      const mockError = new Error('Invalid credentials');
      vi.mocked(require('../src/utils/supabaseClient').supabase.auth.signInWithPassword)
        .mockResolvedValueOnce({ data: null, error: mockError });

      const result = await authService.signIn('test@example.com', 'wrongpassword');
      
      expect(result.user).toBeNull();
      expect(result.session).toBeNull();
      expect(result.error).toBe('Invalid credentials');
    });
  });

  describe('Sign Out', () => {
    it('should sign out successfully', async () => {
      const result = await authService.signOut();
      expect(result.error).toBeUndefined();
    });

    it('should handle sign out errors', async () => {
      const mockError = new Error('Sign out failed');
      vi.mocked(require('../src/utils/supabaseClient').supabase.auth.signOut)
        .mockResolvedValueOnce({ error: mockError });

      const result = await authService.signOut();
      expect(result.error).toBe('Sign out failed');
    });
  });

  describe('Get Current User', () => {
    it('should get current user successfully', async () => {
      const user = await authService.getCurrentUser();
      
      expect(user).toBeTruthy();
      expect(user?.id).toBe('123');
      expect(user?.email).toBe('test@example.com');
    });

    it('should return null when no user is logged in', async () => {
      vi.mocked(require('../src/utils/supabaseClient').supabase.auth.getUser)
        .mockResolvedValueOnce({ data: { user: null } });

      const user = await authService.getCurrentUser();
      expect(user).toBeNull();
    });
  });

  describe('Password Reset', () => {
    it('should send password reset email successfully', async () => {
      const result = await authService.resetPassword('test@example.com');
      expect(result.error).toBeUndefined();
    });

    it('should handle password reset errors', async () => {
      const mockError = new Error('Email not found');
      vi.mocked(require('../src/utils/supabaseClient').supabase.auth.resetPasswordForEmail)
        .mockResolvedValueOnce({ error: mockError });

      const result = await authService.resetPassword('nonexistent@example.com');
      expect(result.error).toBe('Email not found');
    });
  });

  describe('Update Password', () => {
    it('should update password successfully', async () => {
      const result = await authService.updatePassword('newpassword123');
      expect(result.error).toBeUndefined();
    });

    it('should handle password update errors', async () => {
      const mockError = new Error('Password too weak');
      vi.mocked(require('../src/utils/supabaseClient').supabase.auth.updateUser)
        .mockResolvedValueOnce({ error: mockError });

      const result = await authService.updatePassword('weak');
      expect(result.error).toBe('Password too weak');
    });
  });
});