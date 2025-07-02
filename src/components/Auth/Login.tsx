import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // 🟢 Corrige le chemin selon ton projet

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
      // Redirige où tu veux après login
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="aurora-card rounded-lg p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold aurora-gradient-text">Connexion</h1>
            <p className="aurora-text-secondary text-sm">Accède à ton espace</p>
          </div>

          {/* ERREUR */}
          {error && (
            <div className="mb-6 aurora-card rounded-lg p-4"
                 style={{ background: 'rgba(220, 20, 60, 0.1)', border: '1px solid rgba(220, 20, 60, 0.3)' }}>
              <span className="aurora-text-primary text-sm">{error}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium aurora-text-primary mb-2">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg aurora-input"
                placeholder="Ex: hello@exemple.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium aurora-text-primary mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg aurora-input"
                placeholder="Ton mot de passe"
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
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* LIEN VERS REGISTER */}
          <div className="mt-6 text-center">
            <p className="text-sm aurora-text-secondary">
              Pas encore de compte ?{' '}
              <a href="/register" className="aurora-text-primary hover:underline">
                Crée ton compte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
