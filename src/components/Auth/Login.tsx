import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sparkles, AlertCircle, Mail } from 'lucide-react';

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

  const getErrorMessage = (error: string) => {
    if (error.includes('Invalid login credentials')) {
      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="font-medium">Invalid credentials</span>
          </div>
          <p className="text-sm">
            The email or password you entered is incorrect. Please check your credentials and try again.
          </p>
          <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-start space-x-2">
              <Mail className="w-4 h-4 text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-300 mb-1">Don't have an account?</p>
                <Link 
                  to="/register" 
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Create a new account here
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (error.includes('Email not confirmed')) {
      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-yellow-400" />
            <span className="font-medium">Email not confirmed</span>
          </div>
          <p className="text-sm">
            Please check your email and click the confirmation link before signing in.
          </p>
        </div>
      );
    }
    
    return error;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="aurora-card rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold aurora-gradient-text mb-2">
              Cognitive Nexus
            </h1>
            <p className="aurora-text-secondary text-sm">
              Access your business intelligence dashboard
            </p>
          </div>

          {/* Enhanced Error Display */}
          {error && (
            <div className="mb-6 aurora-card rounded-lg p-4"
                 style={{ background: 'rgba(220, 20, 60, 0.1)', border: '1px solid rgba(220, 20, 60, 0.3)' }}>
              <div className="aurora-text-primary text-sm">
                {getErrorMessage(error)}
              </div>
            </div>
          )}

          {/* Form */}
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

            {/* Sign In Button */}
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

          {/* Enhanced Register Link */}
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 aurora-text-secondary" style={{ background: 'var(--aurora-section-bg)' }}>
                  or
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <Link 
                to="/register"
                className="inline-flex items-center justify-center w-full py-2 px-4 rounded-lg border border-gray-600 aurora-text-primary hover:border-gray-500 transition-colors duration-200"
              >
                <span className="text-sm">Create a new account</span>
              </Link>
            </div>
            
            <p className="text-xs aurora-text-secondary mt-3">
              New to Cognitive Nexus? Sign up to get started with your business intelligence dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;