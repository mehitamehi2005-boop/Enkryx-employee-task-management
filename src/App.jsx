import { useEffect, useState } from 'react';
import { AppShell } from './components/AppShell';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { ProgramSpecsPage } from './components/ProgramSpecsPage';
import { supabase } from './lib/supabase';

function LoadingScreen({ message = 'Restoring your session…' }) {
  return <main className="auth-page status-page"><div className="loading-card"><span className="loading-mark" aria-hidden="true" /><p>{message}</p></div></main>;
}

function RoleError({ message, onLogout }) {
  return <main className="auth-page status-page"><section className="login-panel role-error"><a className="brand login-brand" href="#role-error"><span className="brand-mark" aria-hidden="true">E</span><span>ENKRYX</span></a><h1 id="role-error">Workspace unavailable</h1><p>{message}</p><button className="button button-primary" type="button" onClick={onLogout}>Sign out</button></section></main>;
}

export function App() {
  const [session, setSession] = useState(undefined);
  const [employee, setEmployee] = useState(undefined);
  const [roleError, setRoleError] = useState('');
  const [publicView, setPublicView] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#login' || hash === '#admin-login' || hash === '#employee-login') {
      return 'login';
    }
    if (hash === '#about' || hash === '#specs' || hash === '#program-specs') {
      return 'specs';
    }
    return 'landing';
  });
  const [roleHint, setRoleHint] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#admin-login') return 'admin';
    if (hash === '#employee-login') return 'employee';
    return undefined;
  });

  useEffect(() => {
    if (!supabase) { setSession(null); return undefined; }

    let active = true;
    async function restoreSession() {
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;
      if (error) setRoleError(error.message);
      setSession(data.session);
    }
    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setRoleError('');
      setEmployee(undefined);
      setSession(nextSession);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!session || !supabase) return;
    let active = true;
    async function loadEmployee() {
      setEmployee(undefined);
      const { data, error } = await supabase.from('employees').select('id, name, email, role').eq('id', session.user.id).single();
      if (!active) return;
      if (error || !data) { setRoleError(error?.message || 'Your employee profile could not be found.'); return; }
      setEmployee(data);
    }
    loadEmployee();
    return () => { active = false; };
  }, [session]);

  useEffect(() => {
    function handleHashChange() {
      if (session) return;
      const hash = window.location.hash.toLowerCase();
      if (hash === '#login') {
        setPublicView('login');
        setRoleHint(undefined);
      } else if (hash === '#admin-login') {
        setPublicView('login');
        setRoleHint('admin');
      } else if (hash === '#employee-login') {
        setPublicView('login');
        setRoleHint('employee');
      } else if (hash === '#about' || hash === '#specs' || hash === '#program-specs') {
        setPublicView('specs');
        setRoleHint(undefined);
      } else if (
        hash === '' ||
        hash === '#home' ||
        hash === '#features' ||
        hash === '#how-it-works'
      ) {
        setPublicView('landing');
      }
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [session]);

  function handleNavigateToLogin(hint) {
    setRoleHint(hint);
    setPublicView('login');
    const hash = hint ? `#${hint}-login` : '#login';
    try {
      window.history.pushState(null, '', window.location.pathname + hash);
    } catch {
      window.location.hash = hash;
    }
  }

  function handleNavigateToSpecs() {
    setPublicView('specs');
    setRoleHint(undefined);
    try {
      window.history.pushState(null, '', window.location.pathname + '#about');
    } catch {
      window.location.hash = '#about';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNavigateToHome(sectionId) {
    setPublicView('landing');
    setRoleHint(undefined);
    const targetHash = sectionId ? `#${sectionId}` : '#home';
    try {
      window.history.pushState(null, '', window.location.pathname + targetHash);
    } catch {
      window.location.hash = targetHash;
    }
    if (sectionId && sectionId !== 'home') {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleBackToLanding() {
    setPublicView('landing');
    setRoleHint(undefined);
    try {
      window.history.pushState(null, '', window.location.pathname + '#home');
    } catch {
      window.location.hash = '#home';
    }
  }

  async function handleLogout() {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // proceed with local state cleanup
      }
    }
    setEmployee(undefined);
    setRoleError('');
    setSession(null);
    setPublicView('landing');
    setRoleHint(undefined);
    try {
      window.history.replaceState(null, '', window.location.pathname + '#home');
    } catch {
      // ignore history manipulation failures
    }
  }

  if (session === undefined) return <LoadingScreen />;
  if (roleError) return <RoleError message={roleError} onLogout={handleLogout} />;
  if (!session) {
    if (publicView === 'login') {
      return (
        <LoginPage
          onBack={handleBackToLanding}
          roleHint={roleHint}
        />
      );
    }
    if (publicView === 'specs') {
      return (
        <ProgramSpecsPage
          onNavigateToHome={handleNavigateToHome}
          onNavigateToLogin={handleNavigateToLogin}
        />
      );
    }
    return (
      <LandingPage
        onNavigateToLogin={handleNavigateToLogin}
        onNavigateToSpecs={handleNavigateToSpecs}
      />
    );
  }
  if (employee === undefined) return <LoadingScreen message="Loading your workspace…" />;
  if (employee.role === 'admin') return <AppShell employee={employee} onLogout={handleLogout} />;
  if (employee.role === 'employee') return <EmployeeDashboard employee={employee} onLogout={handleLogout} />;
  return <RoleError message="Access denied. Your account does not have an authorized role." onLogout={handleLogout} />;
}
