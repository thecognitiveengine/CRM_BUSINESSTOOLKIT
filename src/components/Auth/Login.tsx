import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // OEM: Auth context path

// =========================================
// Login.tsx (Production Grade, English Only, Annotated)
// =========================================
// 🔒 OEM directives:
// - Strictly English text
// - No logic changes, only UI text updates
// - Fully annotated

const Login: React.FC = () => {
  // Hooks for authentication and navigation
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  // Local state: email, password, error message
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  /**
   * handleSubmit
   * - Prevent form default
   * - Call signIn with email/password
   * - On error: display message
   * - On success: redirect to dashboard
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--aurora-bg-dark)]">
      {/* Container for centering */}
      <div className="w-full max-w-md">
        {/* Card with Aurora styling */}
        <div className="aurora-card bg-[var(--aurora-section-bg)] rounded-lg p-8 shadow-lg">
          {/* Header: Title and subtitle */}
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold aurora-gradient-text">Sign in to Cognitive Nexus</h1>
            <p className="aurora-text-secondary text-sm mt-2">Welcome back! Access your secure workspace.</p>
          </header>

          {/* Error alert */}
          {error && (
            <div className="mb-6 p-4 rounded-lg border border-red-300 bg-red-100/20">
              <p className="aurora-text-primary text-sm">{error}</p>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium aurora-text-primary mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg aurora-input focus:ring-2 focus:ring-aurora-glow-vibrant"
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium aurora-text-primary mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-lg aurora-input focus:ring-2 focus:ring-aurora-glow-accent-green"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold aurora-button-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Footer: Register link */}
          <footer className="mt-6 text-center">
            <p className="text-sm aurora-text-secondary">
              Don't have an account?{' '}
              <a href="/register" className="aurora-text-primary hover:underline">
                Sign up
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
