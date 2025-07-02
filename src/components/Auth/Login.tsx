// Module OEM: Login.tsx (full production-grade, end-to-end code with separate CSS)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // OEM: import path unchanged
import './Login.css'; // OEM: CSS for styling only

/**
 * Login Component
 * - English-only text
 * - Centered layout
 * - Error and loading states
 * - OEM: no logic changes
 */
const Login: React.FC = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Handle form submit
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
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-title">Cognitive Nexus</h1>
          {error && <div className="login-error">{error}</div>}

          <label htmlFor="email" className="login-label">Email Address</label>
          <input
            id="email"
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="password" className="login-label">Password</label>
          <input
            id="password"
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

/* ================= Login.css ================= */

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--page-bg, #f5f5f5);
}

.login-card {
  background: var(--card-bg, #fff);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 360px;
  text-align: center;
}

.login-title {
  margin-bottom: 1rem;
  font-size: 1.75rem;
  color: var(--text-primary, #333);
}

.login-error {
  background: rgba(220,20,60,0.1);
  color: var(--error-color, #dc143c);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-secondary, #555);
  text-align: left;
}

.login-input {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--input-border, #ccc);
  border-radius: 4px;
  font-size: 1rem;
}

.login-button {
  padding: 0.75rem;
  font-size: 1rem;
  background: var(--primary, #4a90e2);
  color: var(--button-text, #fff);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-button:not(:disabled):hover {
  background: var(--primary-hover, #357ab8);
}
