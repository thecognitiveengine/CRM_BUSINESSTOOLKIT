import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    console.log('Login attempt:', { email, hasPassword: !!password });
    
    const { error } = await signIn(email, password);
    if (error) {
      console.error('Login failed:', error);
      setError(error);
    } else {
      console.log('Login successful, navigating to dashboard');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 backdrop-blur-xl border border-white/20 shadow-2xl">
          {/* 🆕 ENHANCED: Centered title without French */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold aurora-gradient-text mb-2">
              Cognitive Nexus
            </h1>
            <p className="aurora-text-secondary text-sm">
              Access your business intelligence dashboard
            </p>
          </div>

          {/* 🆕 ENHANCED: Error Display with glass effect */}
          {error && (
            <div className="mb-6 glass-card-error rounded-lg p-4 backdrop-blur-sm border border-red-500/30">
              <span className="aurora-text-primary text-sm">{error}</span>
            </div>
          )}

          {/* 🆕 ENHANCED: Form with glass inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium aurora-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full px-4 py-3 rounded-lg backdrop-blur-sm border border-white/20 bg-white/10"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium aurora-text-primary mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input w-full px-4 py-3 rounded-lg backdrop-blur-sm border border-white/20 bg-white/10"
                placeholder="********"
                required
              />
            </div>

            {/* 🆕 ENHANCED: Glass button with star border animation */}
            <button
              type="submit"
              disabled={loading}
              className="glass-button-primary w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <div className="star-border absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              </div>
            </button>
          </form>

          {/* 🆕 ENHANCED: Register Link with glass effect */}
          <div className="mt-6 text-center">
            <p className="text-sm aurora-text-secondary">
              No account?{' '}
              <a href="/register" className="aurora-text-primary hover:underline glass-link">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;