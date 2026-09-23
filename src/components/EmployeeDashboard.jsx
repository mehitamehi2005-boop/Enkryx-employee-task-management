import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MyTasksPage } from './MyTasksPage';
import { MyTaskHistoryPage } from './MyTaskHistoryPage';

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTodayDisplay() {
  return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short' }).format(new Date());
}

const EMPLOYEE_ROUTE_MAP = {
  '#dashboard': 'Dashboard',
  '#my-tasks': 'MyTasks',
  '#task-history': 'TaskHistory',
};

const EMPLOYEE_HASH_MAP = {
  Dashboard: '#dashboard',
  MyTasks: '#my-tasks',
  TaskHistory: '#task-history',
};

export function EmployeeDashboard({ employee, name, onLogout }) {
  const effectiveEmployee = employee || (name ? { name, role: 'employee' } : undefined);
  if (effectiveEmployee?.role && effectiveEmployee.role !== 'employee') return null;

  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    return EMPLOYEE_ROUTE_MAP[hash] || 'Dashboard';
  });
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const firstName = effectiveEmployee?.name?.split(' ')[0] || 'there';
  const employeeId = effectiveEmployee?.id;

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.toLowerCase();
      if (EMPLOYEE_ROUTE_MAP[hash]) {
        setActivePage(EMPLOYEE_ROUTE_MAP[hash]);
      } else if (hash && hash !== '#employee-content') {
        // Intercept and block navigation to admin routes
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

  function navigateTo(page) {
    setActivePage(page);
    if (EMPLOYEE_HASH_MAP[page]) {
      window.location.hash = EMPLOYEE_HASH_MAP[page];
    }
  }

  const loadTasks = useCallback(async () => {
    if (!supabase || !employeeId) {
      if (!supabase) setError('Supabase is not configured. Add your project settings to .env.local.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const { data, error: loadError } = await supabase
        .from('tasks')
        .select('id, title, description, assigned_date, status, completion_date, work_url')
        .eq('assigned_employee_id', employeeId)
        .order('assigned_date', { ascending: false });

      if (loadError) {
        setError(loadError.message);
      } else {
        setTasks(data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load tasks.');
    } finally {
      setIsLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const todayString = getTodayString();
  const pendingTasks = tasks.filter((t) => t.status === 'Pending');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');
  const todayTasks = tasks.filter((t) => t.assigned_date === todayString);

  return (
    <div className="employee-page">
      <header className="employee-header">
        <div className="employee-header-left">
          <a className="brand employee-brand" href="#employee-content" aria-label="ENKRYX employee workspace">
            <img src="/enkryx-logo.jpeg" alt="ENKRYX" className="brand-logo" />
          </a>
          <nav className="employee-nav" aria-label="Employee primary navigation">
            <button
              type="button"
              className={`employee-nav-link${activePage === 'Dashboard' ? ' is-active' : ''}`}
              onClick={() => navigateTo('Dashboard')}
              aria-current={activePage === 'Dashboard' ? 'page' : undefined}
            >
              Dashboard
            </button>
            <button
              type="button"
              className={`employee-nav-link${activePage === 'MyTasks' ? ' is-active' : ''}`}
              onClick={() => navigateTo('MyTasks')}
              aria-current={activePage === 'MyTasks' ? 'page' : undefined}
            >
              My Tasks
            </button>
            <button
              type="button"
              className={`employee-nav-link${activePage === 'TaskHistory' ? ' is-active' : ''}`}
              onClick={() => navigateTo('TaskHistory')}
              aria-current={activePage === 'TaskHistory' ? 'page' : undefined}
            >
              Task History
            </button>
          </nav>
        </div>

        <div className="employee-header-actions">
          <div className="employee-profile-pill">
            <div className="avatar avatar-sm" aria-label="Profile">
              {effectiveEmployee?.name ? effectiveEmployee.name.charAt(0) : 'E'}
            </div>
            <div className="employee-pill-text">
              <strong>{effectiveEmployee?.name || 'Employee'}</strong>
              <span>Team member</span>
            </div>
          </div>
          {onLogout && (
            <button
              className="button button-secondary button-sm"
              type="button"
              onClick={onLogout}
              aria-label="Sign out"
            >
              Sign out
            </button>
          )}
        </div>
      </header>

      <main className="employee-content" id="employee-content">
        {activePage === 'MyTasks' ? (
          <MyTasksPage
            tasks={tasks}
            isLoading={isLoading}
            error={error}
            onRefresh={loadTasks}
            employeeId={employeeId}
          />
        ) : activePage === 'TaskHistory' ? (
          <MyTaskHistoryPage
            tasks={tasks}
            isLoading={isLoading}
            error={error}
            onRefresh={loadTasks}
          />
        ) : (
          <>
            <header className="dashboard-heading">
              <div>
                <p className="eyebrow">Employee workspace</p>
                <h1>Welcome, {firstName}.</h1>
                <p className="lead">Here is your daily task overview and current work status.</p>
              </div>
              <p className="date-label">Today <span aria-hidden="true">·</span> {formatTodayDisplay()}</p>
            </header>

            <section className="stat-grid" aria-label="Task statistics">
              <article
                className="stat-card stat-warning is-clickable"
                onClick={() => navigateTo('MyTasks')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigateTo('MyTasks')}
                aria-label="View pending tasks"
              >
                <div className="stat-icon" aria-hidden="true">◌</div>
                <p className="stat-label">Total Pending Tasks</p>
                <p className="stat-value">{isLoading ? '…' : pendingTasks.length}</p>
                <p className="stat-detail">Awaiting completion</p>
              </article>

              <article
                className="stat-card stat-success is-clickable"
                onClick={() => navigateTo('TaskHistory')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigateTo('TaskHistory')}
                aria-label="View task history"
              >
                <div className="stat-icon" aria-hidden="true">✓</div>
                <p className="stat-label">Total Completed Tasks</p>
                <p className="stat-value">{isLoading ? '…' : completedTasks.length}</p>
                <p className="stat-detail">Finished assignments</p>
              </article>

              <article
                className="stat-card stat-primary is-clickable"
                onClick={() => navigateTo('MyTasks')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigateTo('MyTasks')}
                aria-label="View today’s tasks"
              >
                <div className="stat-icon" aria-hidden="true">◉</div>
                <p className="stat-label">Today’s Tasks</p>
                <p className="stat-value">{isLoading ? '…' : todayTasks.length}</p>
                <p className="stat-detail">Scheduled for today</p>
              </article>
            </section>

            <section className="card today-tasks-card" aria-labelledby="today-tasks-title">
              <div className="section-heading">
                <div>
                  <p className="card-kicker">Schedule</p>
                  <h2 id="today-tasks-title">Today’s Tasks</h2>
                </div>
                <button
                  type="button"
                  className="text-link button-reset"
                  onClick={() => navigateTo('MyTasks')}
                >
                  View all my tasks <span aria-hidden="true">→</span>
                </button>
              </div>

              {error && (
                <div className="table-error-banner" role="alert">
                  <p>{error}</p>
                  <button type="button" className="button button-secondary button-sm" onClick={loadTasks}>
                    Retry
                  </button>
                </div>
              )}

              {isLoading ? (
                <div className="table-loading" aria-live="polite">
                  <span className="loading-mark" aria-hidden="true" />
                  <span>Loading today’s tasks…</span>
                </div>
              ) : todayTasks.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon" aria-hidden="true">✓</span>
                  <div>
                    <h2>No tasks scheduled for today</h2>
                    <p>You’re all caught up for today! You can review all your work in the My Tasks view.</p>
                  </div>
                </div>
              ) : (
                <ul className="today-task-list">
                  {todayTasks.map((task) => {
                    const isCompleted = task.status === 'Completed';
                    return (
                      <li key={task.id} className="today-task-item">
                        <div className="today-task-info">
                          <strong>{task.title}</strong>
                          {task.description && <span>{task.description}</span>}
                        </div>
                        <span className={`badge ${isCompleted ? 'badge-completed' : 'badge-pending'}`}>
                          <span className="badge-dot" aria-hidden="true" />
                          {task.status}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

