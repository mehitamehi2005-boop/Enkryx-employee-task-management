import { useState } from 'react';
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

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function validateWorkUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter a work URL.' };
  }
  let url;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    url = new URL(withProtocol);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return { valid: false, error: 'URL must use HTTP or HTTPS protocol.' };
    }
    if (!url.hostname || !url.hostname.includes('.')) {
      return { valid: false, error: 'Please enter a valid website URL.' };
    }
    return { valid: true, url: url.href };
  } catch {
    return { valid: false, error: 'Please enter a valid URL (e.g. GitHub, Figma, Google Drive, or live website).' };
  }
}

export function MyTasksPage({ tasks = [], isLoading = false, error = '', onRefresh, employeeId }) {
  const [filter, setFilter] = useState('All');
  const [submittingTaskId, setSubmittingTaskId] = useState(null);
  const [workUrl, setWorkUrl] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Pending') return task.status === 'Pending';
    if (filter === 'Completed') return task.status === 'Completed';
    return true;
  });

  function startSubmission(task) {
    setSubmittingTaskId(task.id);
    setWorkUrl('');
    setSubmitError('');
    setSubmitSuccess('');
  }

  function cancelSubmission() {
    setSubmittingTaskId(null);
    setWorkUrl('');
    setSubmitError('');
  }

  async function submitWork(event, task) {
    event.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    // Security check: Verify task ownership
    if (employeeId && task.assigned_employee_id && task.assigned_employee_id !== employeeId) {
      setSubmitError('Unauthorized: You can only submit work for tasks assigned to you.');
      return;
    }

    const validation = validateWorkUrl(workUrl);
    if (!validation.valid) {
      setSubmitError(validation.error);
      return;
    }

    if (!supabase) {
      setSubmitError('Supabase is not configured. Add your project settings to .env.local.');
      return;
    }

    setIsSubmitting(true);
    try {
      const todayDate = getTodayString();
      let query = supabase
        .from('tasks')
        .update({
          work_url: validation.url,
          status: 'Completed',
          completion_date: todayDate,
        })
        .eq('id', task.id);

      if (employeeId) {
        query = query.eq('assigned_employee_id', employeeId);
      }

      const { error: updateError } = await query;

      if (updateError) {
        setSubmitError(updateError.message);
      } else {
        setSubmittingTaskId(null);
        setWorkUrl('');
        setSubmitSuccess(`Work for “${task.title}” was submitted successfully.`);
        if (onRefresh) await onRefresh();
      }
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit work.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="my-tasks-page" aria-labelledby="my-tasks-title">
      <header className="dashboard-heading">
        <div>
          <p className="eyebrow">Personal workspace</p>
          <h1 id="my-tasks-title">My Tasks</h1>
          <p className="lead">All assignments assigned to you. Submit work URL when tasks are complete.</p>
        </div>
        <div className="section-actions">
          {onRefresh && (
            <button
              type="button"
              className="button button-secondary button-sm"
              onClick={onRefresh}
              disabled={isLoading}
              aria-label="Refresh tasks list"
            >
              Refresh
            </button>
          )}
          <span className="count-label">
            {isLoading ? 'Loading…' : `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`}
          </span>
        </div>
      </header>

      <section className="card my-tasks-card">
        <div className="tasks-filter-bar">
          <div className="filter-tabs" role="tablist" aria-label="Task status filter">
            <button
              type="button"
              className={`filter-tab${filter === 'All' ? ' is-active' : ''}`}
              onClick={() => { setFilter('All'); setSubmitSuccess(''); }}
              role="tab"
              aria-selected={filter === 'All'}
            >
              All ({tasks.length})
            </button>
            <button
              type="button"
              className={`filter-tab${filter === 'Pending' ? ' is-active' : ''}`}
              onClick={() => { setFilter('Pending'); setSubmitSuccess(''); }}
              role="tab"
              aria-selected={filter === 'Pending'}
            >
              Pending ({pendingCount})
            </button>
            <button
              type="button"
              className={`filter-tab${filter === 'Completed' ? ' is-active' : ''}`}
              onClick={() => { setFilter('Completed'); setSubmitSuccess(''); }}
              role="tab"
              aria-selected={filter === 'Completed'}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        {submitSuccess && <p className="form-success" role="status">{submitSuccess}</p>}

        {error && (
          <div className="table-error-banner" role="alert">
            <p>{error}</p>
            {onRefresh && (
              <button type="button" className="button button-secondary button-sm" onClick={onRefresh}>
                Retry
              </button>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="table-loading" aria-live="polite">
            <span className="loading-mark" aria-hidden="true" />
            <span>Loading your tasks…</span>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✓</span>
            <div>
              <h2>{tasks.length === 0 ? 'No tasks assigned yet' : `No ${filter.toLowerCase()} tasks`}</h2>
              <p>
                {tasks.length === 0
                  ? 'You currently have no tasks assigned to you. New work will appear here when an administrator assigns it.'
                  : `You don’t have any ${filter.toLowerCase()} tasks right now.`}
              </p>
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="tasks-table my-tasks-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Assigned Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => {
                  const isCompleted = task.status === 'Completed';
                  const isSubmittingThis = submittingTaskId === task.id;

                  return (
                    <tr key={task.id} className={isSubmittingThis ? 'is-active-submission' : ''}>
                      <td data-label="Task" className="task-title-cell">
                        <strong>{task.title}</strong>
                        {task.description && <span className="task-desc-preview">{task.description}</span>}
                        {isCompleted && task.work_url && (
                          <span className="work-url-cell">
                            <a
                              href={task.work_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="work-url-link"
                              title={task.work_url}
                            >
                              Work link <span aria-hidden="true">↗</span>
                            </a>
                          </span>
                        )}
                      </td>
                      <td data-label="Assigned Date">{formatDate(task.assigned_date)}</td>
                      <td data-label="Status">
                        <span className={`badge ${isCompleted ? 'badge-completed' : 'badge-pending'}`}>
                          <span className="badge-dot" aria-hidden="true" />
                          {task.status}
                        </span>
                      </td>
                      <td data-label="Action" className="task-action-cell">
                        {!isCompleted ? (
                          isSubmittingThis ? (
                            <form className="submit-work-tray" onSubmit={(e) => submitWork(e, task)} noValidate>
                              <label className="field-compact">
                                <span className="sr-only">Work URL</span>
                                <input
                                  type="url"
                                  className="work-url-input"
                                  value={workUrl}
                                  onChange={(e) => { setWorkUrl(e.target.value); setSubmitError(''); }}
                                  placeholder="https://github.com/... or Figma link"
                                  disabled={isSubmitting}
                                  required
                                  autoFocus
                                />
                              </label>
                              <div className="submit-tray-actions">
                                <button
                                  type="submit"
                                  className="button button-primary button-sm"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? 'Submitting…' : 'Submit'}
                                </button>
                                <button
                                  type="button"
                                  className="button button-secondary button-sm"
                                  onClick={cancelSubmission}
                                  disabled={isSubmitting}
                                >
                                  Cancel
                                </button>
                              </div>
                              {submitError && <p className="form-error tray-error" role="alert">{submitError}</p>}
                            </form>
                          ) : (
                            <button
                              type="button"
                              className="button button-primary button-sm"
                              onClick={() => startSubmission(task)}
                            >
                              Submit Work
                            </button>
                          )
                        ) : (
                          <span className="completed-check" aria-label="Completed">
                            <span aria-hidden="true">✓</span> Submitted
                          </span>
                        )}
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
