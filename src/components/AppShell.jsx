import { useEffect, useState } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { AdminTaskHistoryPage } from './AdminTaskHistoryPage';
import { EmployeesPage } from './EmployeesPage';
import { TasksPage } from './TasksPage';

const navigation = ['Dashboard', 'Employees', 'Tasks', 'Today’s Work', 'Task History'];

const pageTitles = {
  Dashboard: 'Operations overview',
  Employees: 'Employee management',
  Tasks: 'Task management',
  'Today’s Work': 'Today’s schedule',
  'Task History': 'Task archive',
};

const ROUTE_MAP = {
  '#dashboard': 'Dashboard',
  '#employees': 'Employees',
  '#tasks': 'Tasks',
  '#task-history': 'Task History',
};

const PAGE_HASH_MAP = {
  Dashboard: '#dashboard',
  Employees: '#employees',
  Tasks: '#tasks',
  'Task History': '#task-history',
};

/** Shared ENKRYX application frame. Navigation is guarded by administrator role. */
export function AppShell({ employee, onLogout }) {
  if (employee?.role !== 'admin') return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    return ROUTE_MAP[hash] || 'Dashboard';
  });

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.toLowerCase();
      if (ROUTE_MAP[hash]) {
        setActivePage(ROUTE_MAP[hash]);
      } else if (hash && hash !== '#main-content') {
        setActivePage('Dashboard');
        try {
          window.history.replaceState(null, '', window.location.pathname + '#dashboard');
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function navigate(page) {
    setActivePage(page);
    setIsMenuOpen(false);
    if (PAGE_HASH_MAP[page]) {
      window.location.hash = PAGE_HASH_MAP[page];
    }
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar${isMenuOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
        <a className="brand" href="#main-content" aria-label="ENKRYX dashboard">
          <img src="/enkryx-logo.jpeg" alt="ENKRYX" className="brand-logo" />
        </a>
        <nav className="navigation">
          <p className="navigation-label">Administration</p>
          {navigation.map((item) => (
            <button className={`nav-link${activePage === item ? ' is-active' : ''}`} type="button" key={item}
              aria-current={activePage === item ? 'page' : undefined} onClick={() => navigate(item)}>
              <span className="nav-dot" aria-hidden="true" />{item}
            </button>
          ))}
        </nav>
        <button className="nav-link logout-link" type="button" onClick={onLogout}>
          <span className="logout-symbol" aria-hidden="true">↗</span>Logout
        </button>
        <div className="sidebar-footer"><span className="status-dot" aria-hidden="true" />System ready</div>
      </aside>
      <div className="page-frame">
        <header className="topbar">
          <button className="menu-button" type="button" aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
            <span /><span /><span />
          </button>
          <div className="topbar-copy">
            <p className="eyebrow">Admin workspace</p>
            <p className="topbar-title">{pageTitles[activePage] || 'Operations overview'}</p>
          </div>
          <div className="admin-profile"><div className="profile-copy"><strong>{employee.name}</strong><span>Administrator</span></div><div className="avatar" aria-label="Admin profile">{employee.name.charAt(0)}</div></div>
        </header>
        <main className="content" id="main-content">
          {activePage === 'Employees' ? (
            <EmployeesPage />
          ) : activePage === 'Tasks' ? (
            <TasksPage />
          ) : activePage === 'Task History' ? (
            <AdminTaskHistoryPage />
          ) : (
            <AdminDashboard onNavigate={navigate} />
          )}
        </main>
      </div>
    </div>
  );
}
