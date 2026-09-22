import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function formatDate(value) {
  if (!value) return '—';
  try {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) return '—';
    return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  } catch {
    return '—';
  }
}

export function AdminTaskHistoryPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadHistory = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured. Add your project settings to .env.local.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const { data, error: loadError } = await supabase
        .from('tasks')
        .select(`
          id,
          title,
          description,
          assigned_employee_id,
          assigned_date,
          status,
          completion_date,
          work_url,
          employees:assigned_employee_id (id, name, email)
        `)
        .eq('status', 'Completed')
        .order('completion_date', { ascending: false });

      if (loadError) {
        setError(loadError.message);
      } else {
        setTasks(data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load completed task history.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <section className="admin-task-history-page" aria-labelledby="admin-history-title">
      <header className="dashboard-heading">
        <div>
          <p className="eyebrow">Administration</p>
          <h1 id="admin-history-title">Task History</h1>
          <p className="lead">Archive of all completed tasks and submitted deliverable links across the organization.</p>
        </div>
        <div className="section-actions">
          <button
            type="button"
            className="button button-secondary button-sm"
            onClick={loadHistory}
            disabled={isLoading}
            aria-label="Refresh completed task history"
          >
            Refresh
          </button>
          <span className="count-label">
            {isLoading ? 'Loading…' : `${tasks.length} ${tasks.length === 1 ? 'completed task' : 'completed tasks'}`}
          </span>
        </div>
      </header>

      <section className="card task-history-card">
        <div className="section-heading">
          <div>
            <p className="card-kicker">Completed work</p>
            <h2>All finished tasks</h2>
          </div>
        </div>

        {error && (
          <div className="table-error-banner" role="alert">
            <p>{error}</p>
            <button type="button" className="button button-secondary button-sm" onClick={loadHistory}>
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="table-loading" aria-live="polite">
            <span className="loading-mark" aria-hidden="true" />
            <span>Loading task archive…</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✓</span>
            <div>
              <h2>No completed tasks yet</h2>
              <p>When team members finish their assignments and submit deliverables, they will appear in this archive.</p>
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="tasks-table history-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Assigned Employee</th>
                  <th>Assigned Date</th>
                  <th>Submitted Work URL</th>
                  <th>Completion Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const employeeName = task.employees?.name || 'Unassigned';
                  const employeeEmail = task.employees?.email || '';

                  return (
                    <tr key={task.id}>
                      <td data-label="Task" className="task-title-cell">
                        <strong>{task.title}</strong>
                        {task.description && <span className="task-desc-preview">{task.description}</span>}
                      </td>
                      <td data-label="Assigned Employee" className="task-employee-cell">
                        <strong>{employeeName}</strong>
                        {employeeEmail && <span>{employeeEmail}</span>}
                      </td>
                      <td data-label="Assigned Date">{formatDate(task.assigned_date)}</td>
                      <td data-label="Submitted Work URL" className="work-url-cell">
                        {task.work_url ? (
                          <a
                            href={task.work_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="work-url-link"
                            title={task.work_url}
                          >
                            View Deliverable <span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <span className="empty-value">—</span>
                        )}
                      </td>
                      <td data-label="Completion Date">{formatDate(task.completion_date)}</td>
                      <td data-label="Status">
                        <span className="badge badge-completed">
                          <span className="badge-dot" aria-hidden="true" />
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
