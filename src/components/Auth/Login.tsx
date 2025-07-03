import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 🆕 NEW: Test credentials for development
  const fillTestCredentials = () => {
    setEmail('test@example.com');
    setPassword('testpassword123');
  };

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
        <div className="aurora-card rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold aurora-gradient-text">
              Cognitive Nexus <span className="opacity-70">| Nexus Cognitif</span>
            </h1>
            <p className="aurora-text-secondary text-sm">
              Access your Cognitive Nexus dashboard<br />
              <span className="opacity-60">(Accède à ton espace Nexus Cognitif)</span>
            </p>
          </div>

          {/* Development Helper */}
          {import.meta.env.DEV && (
            <div className="mb-6 aurora-card rounded-lg p-4" 
                 style={{ background: 'rgba(102, 204, 238, 0.1)', border: '1px solid rgba(102, 204, 238, 0.3)' }}>
              <p className="text-xs aurora-text-secondary mb-2">Development Mode:</p>
              <button
                onClick={fillTestCredentials}
                className="text-xs aurora-button-secondary px-3 py-1 rounded"
              >
                Fill Test Credentials
              </button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 aurora-card rounded-lg p-4"
                 style={{ background: 'rgba(220, 20, 60, 0.1)', border: '1px solid rgba(220, 20, 60, 0.3)' }}>
              <span className="aurora-text-primary text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium aurora-text-primary mb-2">
                Email Address / Adresse email
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
                Password / Mot de passe
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading
                  ? 'var(--aurora-section-bg)'
                  : 'linear-gradient(135deg, var(--aurora-glow-vibrant), var(--aurora-glow-accent-green))',
                color: loading ? 'var(--text-secondary)' : 'var(--aurora-bg-dark)',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(102, 204, 238, 0.3)'
              }}
            >
              {loading ? 'Signing in… / Connexion en cours…' : 'Sign in / Se connecter'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm aurora-text-secondary">
              No account? / Pas encore de compte?{' '}
              <a href="/register" className="aurora-text-primary hover:underline">
                Create one / Crée ton compte
              </a>
            </p>
          </div>

          {/* Development Info */}
          {import.meta.env.DEV && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-xs aurora-text-secondary text-center">
                Development Environment<br />
                Create an account first if you don't have one
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;