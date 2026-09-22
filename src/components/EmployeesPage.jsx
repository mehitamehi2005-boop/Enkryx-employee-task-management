import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function formatCreatedDate(value) {
  if (!value) return '—';
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '—';
    return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  } catch {
    return '—';
  }
}

export function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [tableError, setTableError] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const loadEmployees = useCallback(async () => {
    if (!supabase) {
      setTableError('Supabase is not configured. Add your project settings to .env.local.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setTableError('');
    try {
      const { data, error: loadError } = await supabase
        .from('employees')
        .select('id, name, email, role, created_at')
        .order('created_at', { ascending: false });

      if (loadError) {
        setTableError(loadError.message);
      } else {
        setEmployees(data || []);
      }
    } catch (err) {
      setTableError(err.message || 'Failed to load employees.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (formError) setFormError('');
    if (success) setSuccess('');
  }

  async function createEmployee(event) {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    setFormError('');
    setSuccess('');

    if (!name) {
      setFormError('Enter the employee’s full name.');
      return;
    }
    if (!email) {
      setFormError('Enter an email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Enter a valid email address.');
      return;
    }
    if (!form.password) {
      setFormError('Enter a temporary password.');
      return;
    }
    if (form.password.length < 8) {
      setFormError('Password must contain at least 8 characters.');
      return;
    }
    if (!supabase) {
      setFormError('Supabase is not configured. Add your project settings to .env.local.');
      return;
    }

    setIsCreating(true);
    try {
      const { data, error: createError } = await supabase.functions.invoke('create-employee', {
        body: { name, email, password: form.password },
      });

      if (createError) {
        let message = createError.message;
        if (createError.context) {
          try {
            const errorBody = await createError.context.json();
            if (errorBody?.error) message = errorBody.error;
          } catch {
            // context.json parse failed, keep default message
          }
        }
        setFormError(message);
      } else if (data?.error) {
        setFormError(data.error);
      } else if (data?.employee) {
        setForm({ name: '', email: '', password: '' });
        setSuccess(`${data.employee.name} was added as an employee.`);
        await loadEmployees();
      } else {
        setFormError('An unexpected error occurred while creating the employee.');
      }
    } catch (err) {
      setFormError(err.message || 'Failed to communicate with the server.');
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <section className="employees-page" aria-labelledby="employees-title">
      <header className="dashboard-heading employees-heading">
        <div>
          <p className="eyebrow">Administration</p>
          <h1 id="employees-title">Employees</h1>
          <p className="lead">Create employee accounts and view your current team.</p>
        </div>
      </header>
      <div className="employees-layout">
        <section className="card employee-table-card" aria-labelledby="team-list-title">
          <div className="section-heading">
            <div>
              <p className="card-kicker">Team directory</p>
              <h2 id="team-list-title">All employees</h2>
            </div>
            <div className="section-actions">
              <button
                type="button"
                className="button button-secondary button-sm"
                onClick={loadEmployees}
                disabled={isLoading}
                aria-label="Refresh employee list"
              >
                Refresh
              </button>
              <span className="count-label">
                {isLoading ? 'Loading…' : `${employees.length} ${employees.length === 1 ? 'member' : 'members'}`}
              </span>
            </div>
          </div>

          {tableError && (
            <div className="table-error-banner" role="alert">
              <p>{tableError}</p>
              <button type="button" className="button button-secondary button-sm" onClick={loadEmployees}>
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="table-loading" aria-live="polite">
              <span className="loading-mark" aria-hidden="true" />
              <span>Loading employees…</span>
            </div>
          ) : employees.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">+</span>
              <div>
                <h2>No employees yet</h2>
                <p>Create the first employee account using the form.</p>
              </div>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="employees-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Role</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((person) => (
                    <tr key={person.id}>
                      <td data-label="Employee">
                        <strong>{person.name}</strong>
                        <span>{person.email}</span>
                      </td>
                      <td data-label="Role">
                        <span className={`badge ${person.role === 'admin' ? 'badge-admin' : 'badge-completed'} role-badge`}>
                          {person.role}
                        </span>
                      </td>
                      <td data-label="Created">{formatCreatedDate(person.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="card create-employee-card" aria-labelledby="create-employee-title">
          <p className="card-kicker">New account</p>
          <h2 id="create-employee-title">Create Employee</h2>
          <p className="form-intro">An employee login and matching profile will be created securely.</p>
          <form className="create-employee-form" onSubmit={createEmployee} noValidate>
            <label className="field">
              <span>Full name</span>
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Employee name"
                disabled={isCreating}
                autoComplete="name"
                required
              />
            </label>
            <label className="field">
              <span>Email address</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="employee@enkryx.com"
                disabled={isCreating}
                autoComplete="email"
                required
              />
            </label>
            <label className="field">
              <span>Temporary password</span>
              <input
                name="password"
                type="password"
                minLength={8}
                value={form.password}
                onChange={updateField}
                placeholder="Minimum 8 characters"
                disabled={isCreating}
                autoComplete="new-password"
                required
              />
            </label>
            <label className="field">
              <span>Role</span>
              <input value="Employee" disabled aria-label="Role: Employee" />
            </label>
            {formError && <p className="form-error" role="alert">{formError}</p>}
            {success && <p className="form-success" role="status">{success}</p>}
            <button className="button button-primary" type="submit" disabled={isCreating}>
              {isCreating ? 'Creating account…' : 'Create employee'}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}
