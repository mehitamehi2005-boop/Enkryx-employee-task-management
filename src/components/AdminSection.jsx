export function AdminSection({ onNavigateToLogin }) {
  const adminFeatures = [
    'Manage employees',
    'Create and assign tasks',
    'Monitor task progress',
    'Review submissions',
    'Maintain accountability',
  ];

  return (
    <section className="landing-section" aria-labelledby="admin-portal-title">
      <div className="landing-container">
        <div className="split-section-grid">
          <div className="split-content">
            <p className="section-eyebrow">ADMIN MANAGEMENT PORTAL</p>
            <h2 id="admin-portal-title" className="section-title text-left">
              FULL CONTROL &amp; AUDIT
            </h2>
            <p className="section-lead text-left" style={{ margin: '0 0 24px' }}>
              Administrators can manage employees, assign work, monitor task progress, and review submitted work from one centralized workspace.
            </p>

            <ul className="split-checklist">
              {adminFeatures.map((item) => (
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
              onClick={() => onNavigateToLogin?.('admin')}
            >
              Login as Admin
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
                  <p className="portal-preview-kicker">Administration Control</p>
                  <h3 className="portal-preview-title">Team Operations &amp; Dispatch</h3>
                </div>
                <span className="portal-stat-pill">12 Active Members</span>
              </div>

              <div className="portal-preview-list">
                <div className="portal-item-row">
                  <div className="portal-item-info">
                    <strong>DevOps Security Audit</strong>
                    <span>Assigned to: Marcus Chen • High Priority</span>
                  </div>
                  <span className="mockup-badge mockup-badge-completed">Verified</span>
                </div>

                <div className="portal-item-row">
                  <div className="portal-item-info">
                    <strong>Landing Page Implementation</strong>
                    <span>Assigned to: Sarah Connor • In Review</span>
                  </div>
                  <span className="mockup-badge mockup-badge-progress">Review</span>
                </div>

                <div className="portal-item-row">
                  <div className="portal-item-info">
                    <strong>New Member Onboarding</strong>
                    <span>Secure Edge Function Provisioning</span>
                  </div>
                  <span className="mockup-badge mockup-badge-pending">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
