import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // OEM: context provider for auth state
// ReactBits imports for UI components and backgrounds
import { Card, Input, Button, Typography } from 'reactbits';
import { ParticlesBackground } from 'reactbits/lib/Backgrounds/Particles';

// =========================================
// Login.tsx
// Production-Grade, Fully Annotated, ReactBits + Aurora Styles
// =========================================

const Login: React.FC = () => {
  // Auth and navigation hooks
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  // Local component state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  /**
   * handleSubmit
   * - Prevents default form behavior
   * - Calls signIn from AuthContext
   * - On success: navigates to /dashboard
   * - On failure: displays error
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
    <div className="min-h-screen flex items-center justify-center relative bg-[var(--aurora-bg-dark)]">
      {/* Animated particle background */}
      <ParticlesBackground className="absolute inset-0 z-0" />

      <div className="w-full max-w-md relative z-10">
        <Card className="aurora-card bg-[var(--aurora-section-bg)] rounded-lg p-8 shadow-2xl backdrop-blur-md">
          {/* HEADER */}
          <header className="text-center mb-8">
            <Typography variant="h4" className="aurora-gradient-text font-bold">
              Sign in to Cognitive Nexus
            </Typography>
            <Typography variant="body2" className="aurora-text-secondary mt-2">
              Welcome back! Access your secure workspace.
            </Typography>
          </header>

          {/* ERROR MESSAGE */}
          {error && (
            <Card className="mb-6 p-4 border border-red-300 bg-red-100/20">
              <Typography variant="body2" className="text-red-600">
                {error}
              </Typography>
            </Card>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <Typography variant="subtitle2" className="block mb-1 aurora-text-primary">
                Email address
              </Typography>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full aurora-input focus:ring-2 focus:ring-aurora-glow-vibrant"
              />
            </div>

            {/* Password Field */}
            <div>
              <Typography variant="subtitle2" className="block mb-1 aurora-text-primary">
                Password
              </Typography>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full aurora-input focus:ring-2 focus:ring-aurora-glow-accent-green"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              variant="gradient"
              className="w-full py-3 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* REGISTER LINK */}
          <footer className="mt-6 text-center">
            <Typography variant="body2" className="aurora-text-secondary">
              Don't have an account?{' '}
              <Typography
                variant="body2"
                as="a"
                href="/register"
                className="aurora-text-primary hover:underline"
              >
                Sign up
              </Typography>
            </Typography>
          </footer>
        </Card>
      </div>
    </div>
  );
};

export default Login;
