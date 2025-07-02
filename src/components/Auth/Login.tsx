// Module OEM: Login.tsx (full production-grade, end-to-end code with French removed)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // OEM: import path unchanged

const Login: React.FC = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="aurora-card rounded-lg p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold aurora-gradient-text">
              Cognitive Nexus
            </h1>
            <p className="aurora-text-secondary text-sm">
              Access your dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 aurora-card rounded-lg p-4" style={{ background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.3)' }}>
              <span className="aurora-text-primary text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium aurora-text-primary mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg aurora-input"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium aurora-text-primary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg aurora-input"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading
                  ? 'var(--aurora-section-bg)'
                  : 'linear-gradient(135deg, var(--aurora-glow-vibrant), var(--aurora-glow-accent-green))',
                color: loading ? 'var(--text-secondary)' : 'var(--aurora-bg-dark)',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(102,204,238,0.3)'
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm aurora-text-secondary">
              No account? <a href="/register" className="aurora-text-primary hover:underline">Create one</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
