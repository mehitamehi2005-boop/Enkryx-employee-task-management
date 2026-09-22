import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function LoginPage({ onBack, roleHint }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eyebrowText = roleHint === 'admin'
    ? 'Admin Management Portal'
    : roleHint === 'employee'
    ? 'Employee Workspace'
    : 'Employee task management';

  const subtitleText = roleHint === 'admin'
    ? 'Sign in with your administrator credentials.'
    : roleHint === 'employee'
    ? 'Sign in with your employee credentials.'
    : 'Sign in to access your workspace.';

  async function handleSubmit(event) {
    event.preventDefault();
    if (!supabase) {
      setError('Supabase is not configured. Add your project URL and anon key to .env.local.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError(signInError.message);
    setIsSubmitting(false);
  }

  return (
    <main className="auth-page">
      <section className="login-panel" aria-labelledby="login-title">
        {onBack && (
          <button
            type="button"
            className="back-to-home-link"
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary, #155e75)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '600',
              padding: '0 0 16px',
              fontFamily: 'inherit',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </button>
        )}

        <a
          className="brand login-brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onBack ? onBack() : (window.location.hash = '#home');
          }}
          aria-label="ENKRYX Home"
        >
          <span className="brand-mark" aria-hidden="true">E</span>
          <span>ENKRYX</span>
        </a>

        <div className="login-copy">
          <p className="eyebrow">{eyebrowText}</p>
          <h1 id="login-title">Welcome back.</h1>
          <p>{subtitleText}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email address</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@enkryx.com"
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button
            className="button button-primary login-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="login-help">Use the email and password provided by your administrator.</p>
      </section>

      <aside className="auth-aside">
        <div>
          <p className="eyebrow">ENKRYX workspace</p>
          <h2>Work with clarity, every day.</h2>
          <p>A calm place for teams to organize their most important work.</p>
        </div>
        <div className="auth-decoration" aria-hidden="true">
          <span /><span /><span />
        </div>
      </aside>
    </main>
  );
}
