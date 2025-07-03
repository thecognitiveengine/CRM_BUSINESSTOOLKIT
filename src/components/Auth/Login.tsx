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
    
    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="aurora-card rounded-lg p-8">
          {/* 🆕 FIXED: Centered title without French, keeping Aurora theme */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold aurora-gradient-text mb-2">
              Cognitive Nexus
            </h1>
            <p className="aurora-text-secondary text-sm">
              Access your business intelligence dashboard
            </p>
          </div>

          {/* 🆕 FIXED: Error Display with Aurora theme */}
          {error && (
            <div className="mb-6 aurora-card rounded-lg p-4"
                 style={{ background: 'rgba(220, 20, 60, 0.1)', border: '1px solid rgba(220, 20, 60, 0.3)' }}>
              <span className="aurora-text-primary text-sm">{error}</span>
            </div>
          )}

          {/* 🆕 FIXED: Form with Aurora inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium aurora-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg aurora-input"
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
                className="w-full px-4 py-3 rounded-lg aurora-input"
                placeholder="********"
                required
              />
            </div>

            {/* 🆕 ENHANCED: Aurora button with star border animation */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group star-border-button"
              style={{ 
                background: loading 
                  ? 'var(--aurora-section-bg)'
                  : 'linear-gradient(135deg, var(--aurora-glow-vibrant), var(--aurora-glow-accent-green))',
                color: loading ? 'var(--text-secondary)' : 'var(--aurora-bg-dark)',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(102, 204, 238, 0.3)'
              }}
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              </div>
            </button>
          </form>

          {/* 🆕 FIXED: Register Link with Aurora theme */}
          <div className="mt-6 text-center">
            <p className="text-sm aurora-text-secondary">
              No account?{' '}
              <a href="/register" className="aurora-text-primary hover:underline">
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