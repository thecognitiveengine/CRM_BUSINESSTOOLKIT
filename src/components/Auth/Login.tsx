// Module OEM: Login.tsx (no other modules modified)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // 🟢 Chemin d'origine, OEM respecté
import './Login.css'; // 🎨 Ajout du fichier CSS pour styles

// =========================================
// Login.tsx (OEM-compliant, Cognitive Nexus Branding, Production Grade - EN only)
// =========================================
// 🔒 Respecte toutes les directives OEM :
// - Texte uniquement en anglais
// - Centrage complet du conteneur et du texte
// - Effet pulsé sur le titre
// - Aucune logique changée, aucun ajout non-autorisé

const Login: React.FC = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // === HANDLE SUBMIT ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
    } else {
      // OEM behavior: navigate to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* === HEADER === */}
        <header className="login-header">
          <h1 className="app-title">Cognitive Nexus</h1>
          <p className="app-subtitle">Access your dashboard</p>
        </header>

        {/* === ERROR MESSAGE === */}
        {error && (
          <div className="error-box">
            <span>{error}</span>
          </div>
        )}

        {/* === LOGIN FORM === */}
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* === REGISTER LINK === */}
        <footer className="login-footer">
          <p>
            No account? <a href="/register">Create one</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;

/* Login.css (OEM-compliant, only styles added below) */

/* Container centered full-screen */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--aurora-section-bg);
  padding: 1rem;
  text-align: center;
}

/* Card styling */
.login-card {
  width: 100%;
  max-width: 400px;
  background: var(--aurora-bg-light);
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Header */
.login-header {
  margin-bottom: 1.5rem;
}

/* Pulsing glow animation */
@keyframes pulseGlow {
  0% { text-shadow: 0 0 8px rgba(102, 204, 238, 0.5); }
  50% { text-shadow: 0 0 16px rgba(102, 204, 238, 0.9); }
  100% { text-shadow: 0 0 8px rgba(102, 204, 238, 0.5); }
}

.app-title {
  font-size: 2.25rem;
  font-weight: bold;
  margin: 0;
  animation: pulseGlow 2s ease-in-out infinite;
  color: var(--aurora-text-primary);
}

.app-subtitle {
  margin-top: 0.5rem;
  color: var(--aurora-text-secondary);
  font-size: 0.875rem;
}

/* Error box */
.error-box {
  background: rgba(220, 20, 60, 0.1);
  border: 1px solid rgba(220, 20, 60, 0.3);
  border-radius: 0.25rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

/* Form styles */
.login-form {
  display: flex;
  flex-direction: column;
}

.login-form label {
  text-align: left;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--aurora-text-primary);
}

.login-form input {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--aurora-border);
  border-radius: 0.375rem;
  font-size: 1rem;
}

.login-form button {
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.375rem;
  background: var(--aurora-glow-vibrant);
  color: var(--aurora-bg-dark);
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.login-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.login-form button:not(:disabled):hover {
  box-shadow: 0 4px 12px rgba(102, 204, 238, 0.5);
}

/* Footer */
.login-footer {
  margin-top: 1.5rem;
}

.login-footer a {
  color: var(--aurora-text-primary);
  text-decoration: underline;
  font-weight: 500;
}
