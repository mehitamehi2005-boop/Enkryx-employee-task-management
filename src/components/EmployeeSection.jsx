export function EmployeeSection({ onNavigateToLogin }) {
  const employeeFeatures = [
    'View assigned tasks',
    'Track task status',
    'Submit work',
    'Add submission URLs',
    'Monitor completed work',
  ];

  return (
    <section className="landing-section" style={{ background: '#ffffff', borderTop: '1px solid var(--line, #dce5e8)' }} aria-labelledby="employee-workspace-title">
      <div className="landing-container">
        <div className="split-section-grid reversed">
          <div className="split-content">
            <p className="section-eyebrow">EMPLOYEE WORKSPACE</p>
            <h2 id="employee-workspace-title" className="section-title text-left">
              YOUR PERSONALIZED QUEUE
            </h2>
            <p className="section-lead text-left" style={{ margin: '0 0 24px' }}>
              Employees get a focused workspace where assigned tasks, deadlines, and submissions are easy to understand and manage.
            </p>

            <ul className="split-checklist">
              {employeeFeatures.map((item) => (
                <li key={item} className="checklist-item">
                  <span className="checklist-icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="split-btn"
              onClick={() => onNavigateToLogin?.('employee')}
            >
              Login as Employee
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="split-visual" aria-hidden="true">
            <div className="portal-preview-card">
              <div className="portal-preview-header">
                <div>
                  <p className="portal-preview-kicker">Personal Workspace</p>
                  <h3 className="portal-preview-title">Assigned Deliverables</h3>
                </div>
                <span className="portal-stat-pill">Today: 1 Pending</span>
              </div>

              <div className="portal-preview-list">
                <div className="portal-item-row">
                  <div className="portal-item-info">
                    <strong>Homepage Responsive Refactor</strong>
                    <span>Assigned: Today • Target: Pending Submission</span>
                  </div>
                  <span className="mockup-badge mockup-badge-pending">Pending</span>
                </div>

                <div className="employee-submit-mockup">
                  <div className="submit-mockup-label">Deliverable Link Submission</div>
                  <div className="submit-mockup-input">
                    <span>https://github.com/enkryx/web-portal</span>
                    <strong style={{ color: 'var(--primary, #155e75)' }}>Submit Work</strong>
                  </div>
                </div>

                <div className="portal-item-row" style={{ marginTop: '8px' }}>
                  <div className="portal-item-info">
                    <strong>RLS Security Verification</strong>
                    <span>Completed &amp; Verified in Task History</span>
                  </div>
                  <span className="mockup-badge mockup-badge-completed">Submitted ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
