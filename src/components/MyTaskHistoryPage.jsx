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

export function MyTaskHistoryPage({ tasks = [], isLoading = false, error = '', onRefresh }) {
  const completedTasks = tasks.filter((t) => t.status === 'Completed');

  return (
    <section className="my-task-history-page" aria-labelledby="history-title">
      <header className="dashboard-heading">
        <div>
          <p className="eyebrow">Personal history</p>
          <h1 id="history-title">Task History</h1>
          <p className="lead">Your completed tasks and submitted deliverable links.</p>
        </div>
        <div className="section-actions">
          {onRefresh && (
            <button
              type="button"
              className="button button-secondary button-sm"
              onClick={onRefresh}
              disabled={isLoading}
              aria-label="Refresh task history"
            >
              Refresh
            </button>
          )}
          <span className="count-label">
            {isLoading ? 'Loading…' : `${completedTasks.length} ${completedTasks.length === 1 ? 'task' : 'tasks'}`}
          </span>
        </div>
      </header>

      <section className="card task-history-card">
        <div className="section-heading">
          <div>
            <p className="card-kicker">Completed deliverables</p>
            <h2>Finished tasks archive</h2>
          </div>
        </div>

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
            <span>Loading task history…</span>
          </div>
        ) : completedTasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✓</span>
            <div>
              <h2>No completed tasks yet</h2>
              <p>When you submit work on your pending tasks, they will appear here with your submitted deliverables.</p>
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="tasks-table history-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Assigned Date</th>
                  <th>Work URL</th>
                  <th>Completion Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map((task) => (
                  <tr key={task.id}>
                    <td data-label="Task" className="task-title-cell">
                      <strong>{task.title}</strong>
                      {task.description && <span className="task-desc-preview">{task.description}</span>}
                    </td>
                    <td data-label="Assigned Date">{formatDate(task.assigned_date)}</td>
                    <td data-label="Work URL" className="work-url-cell">
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
