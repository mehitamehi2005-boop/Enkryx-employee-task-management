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

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [tasksError, setTasksError] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    employeeId: '',
    assignedDate: getTodayString(),
  });

  const loadTasks = useCallback(async () => {
    if (!supabase) {
      setTasksError('Supabase is not configured. Add your project settings to .env.local.');
      setIsLoadingTasks(false);
      return;
    }
    setIsLoadingTasks(true);
    setTasksError('');
    try {
      const { data, error } = await supabase
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
        .order('assigned_date', { ascending: false });

      if (error) {
        setTasksError(error.message);
      } else {
        setTasks(data || []);
      }
    } catch (err) {
      setTasksError(err.message || 'Failed to load tasks.');
    } finally {
      setIsLoadingTasks(false);
    }
  }, []);

  const loadEmployees = useCallback(async () => {
    if (!supabase) {
      setIsLoadingEmployees(false);
      return;
    }
    setIsLoadingEmployees(true);
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('id, name, email, role')
        .order('name', { ascending: true });

      if (!error && data) {
        setEmployees(data);
      }
    } catch {
      // keep empty employees array on failure
    } finally {
      setIsLoadingEmployees(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
    loadEmployees();
  }, [loadTasks, loadEmployees]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (formError) setFormError('');
    if (success) setSuccess('');
  }

  async function assignTask(event) {
    event.preventDefault();
    const title = form.title.trim();
    const description = form.description.trim();
    const employeeId = form.employeeId;
    const assignedDate = form.assignedDate;

    setFormError('');
    setSuccess('');

    if (!title) {
      setFormError('Please enter a task title.');
      return;
    }
    if (!employeeId) {
      setFormError('Please select an employee to assign this task.');
      return;
    }
    if (!assignedDate) {
      setFormError('Please choose an assigned date.');
      return;
    }
    if (!supabase) {
      setFormError('Supabase is not configured. Add your project settings to .env.local.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title,
          description: description || null,
          assigned_employee_id: employeeId,
          assigned_date: assignedDate,
          status: 'Pending',
        })
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
        .single();

      if (error) {
        setFormError(error.message);
      } else {
        const assignedPerson = employees.find((e) => e.id === employeeId);
        const employeeName = assignedPerson?.name || data?.employees?.name || 'the employee';
        setForm({
          title: '',
          description: '',
          employeeId: '',
          assignedDate: getTodayString(),
        });
        setSuccess(`“${data.title}” was assigned to ${employeeName}.`);
        await loadTasks();
      }
    } catch (err) {
      setFormError(err.message || 'Failed to assign the task.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="tasks-page" aria-labelledby="tasks-title">
      <header className="dashboard-heading tasks-heading">
        <div>
          <p className="eyebrow">Administration</p>
          <h1 id="tasks-title">Tasks</h1>
          <p className="lead">Assign new assignments and monitor team task status.</p>
        </div>
      </header>

      <div className="tasks-layout">
        <section className="card tasks-table-card" aria-labelledby="task-list-title">
          <div className="section-heading">
            <div>
              <p className="card-kicker">Work directory</p>
              <h2 id="task-list-title">All tasks</h2>
            </div>
            <div className="section-actions">
              <button
                type="button"
                className="button button-secondary button-sm"
                onClick={loadTasks}
                disabled={isLoadingTasks}
                aria-label="Refresh tasks list"
              >
                Refresh
              </button>
              <span className="count-label">
                {isLoadingTasks ? 'Loading…' : `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`}
              </span>
            </div>
          </div>

          {tasksError && (
            <div className="table-error-banner" role="alert">
              <p>{tasksError}</p>
              <button type="button" className="button button-secondary button-sm" onClick={loadTasks}>
                Retry
              </button>
            </div>
          )}

          {isLoadingTasks ? (
            <div className="table-loading" aria-live="polite">
              <span className="loading-mark" aria-hidden="true" />
              <span>Loading tasks…</span>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">□</span>
              <div>
                <h2>No tasks assigned yet</h2>
                <p>Create and assign the first task using the assignment form.</p>
              </div>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="tasks-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Assigned To</th>
                    <th>Assigned</th>
                    <th>Status</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => {
                    const isCompleted = task.status === 'Completed';
                    const employeeName = task.employees?.name || 'Unassigned';
                    const employeeEmail = task.employees?.email || '';

                    return (
                      <tr key={task.id}>
                        <td data-label="Task" className="task-title-cell">
                          <strong>{task.title}</strong>
                          {task.description && <span className="task-desc-preview">{task.description}</span>}
                        </td>
                        <td data-label="Assigned To" className="task-employee-cell">
                          <strong>{employeeName}</strong>
                          {employeeEmail && <span>{employeeEmail}</span>}
                        </td>
                        <td data-label="Assigned">{formatDate(task.assigned_date)}</td>
                        <td data-label="Status">
                          <span className={`badge ${isCompleted ? 'badge-completed' : 'badge-pending'}`}>
                            <span className="badge-dot" aria-hidden="true" />
                            {task.status}
                          </span>
                        </td>
                        <td data-label="Completed">{formatDate(task.completion_date)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="card assign-task-card" aria-labelledby="assign-task-title">
          <p className="card-kicker">New assignment</p>
          <h2 id="assign-task-title">Assign Task</h2>
          <p className="form-intro">Create a work assignment for an employee. New tasks default to Pending.</p>

          <form className="assign-task-form" onSubmit={assignTask} noValidate>
            <label className="field">
              <span>Task title</span>
              <input
                name="title"
                value={form.title}
                onChange={updateField}
                placeholder="e.g. Update design system tokens"
                disabled={isSubmitting}
                required
              />
            </label>

            <label className="field">
              <span>Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={updateField}
                placeholder="Details, scope, or helpful references..."
                disabled={isSubmitting}
                rows={3}
              />
            </label>

            <label className="field">
              <span>Assign to employee</span>
              <select
                name="employeeId"
                value={form.employeeId}
                onChange={updateField}
                disabled={isSubmitting || isLoadingEmployees}
                required
              >
                <option value="">
                  {isLoadingEmployees
                    ? 'Loading team members…'
                    : employees.length === 0
                    ? 'No employees available'
                    : 'Select team member…'}
                </option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.email}){emp.role === 'admin' ? ' — Admin' : ''}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Assigned date</span>
              <input
                name="assignedDate"
                type="date"
                value={form.assignedDate}
                onChange={updateField}
                disabled={isSubmitting}
                required
              />
            </label>

            <div className="status-note">
              <span className="badge badge-pending">
                <span className="badge-dot" aria-hidden="true" />
                Default Status: Pending
              </span>
            </div>

            {formError && <p className="form-error" role="alert">{formError}</p>}
            {success && <p className="form-success" role="status">{success}</p>}

            <button
              className="button button-primary"
              type="submit"
              disabled={isSubmitting || isLoadingEmployees || employees.length === 0}
            >
              {isSubmitting ? 'Assigning task…' : 'Assign task'}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}
