export function HeroSection({ onNavigateToLogin, onExploreSpecs }) {
  return (
    <section id="home" className="landing-hero" aria-labelledby="hero-heading">
      <div className="landing-container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              <span>ENKRYX Youth Program • Software &amp; Task Management</span>
            </div>

            <h1 id="hero-heading" className="hero-title">
              YOUR IDEA DESERVES A PROPER SYSTEM.
            </h1>

            <p className="hero-lead">
              We design and build simple, reliable software that keeps your business moving. No bloat, no friction—just clean execution.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => onNavigateToLogin?.()}
              >
                Access System Portal
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                type="button"
                className="btn-hero-secondary"
                onClick={() => {
                  if (onExploreSpecs) {
                    onExploreSpecs();
                  } else {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Explore Program Specs
              </button>
            </div>
          </div>

          <div className="hero-mockup-wrapper" aria-hidden="true">
            <div className="hero-mockup-card">
              <div className="mockup-topbar">
                <div className="mockup-dots">
                  <span className="mockup-dot" />
                  <span className="mockup-dot" />
                  <span className="mockup-dot" />
                </div>
                <div className="mockup-status-pill">
                  <span className="pulse-dot" />
                  <span>System Active • 99.98% Uptime</span>
                </div>
              </div>

              <div className="mockup-body">
                <div className="mockup-header-row">
                  <h3 className="mockup-header-title">Active Workload Queue</h3>
                  <span className="mockup-metric-badge">3 Tasks In Progress</span>
                </div>

                <div className="mockup-task-item">
                  <div className="mockup-task-top">
                    <span className="mockup-task-title">API Authentication &amp; RLS Policies</span>
                    <span className="mockup-badge mockup-badge-completed">Completed</span>
                  </div>
                  <div className="mockup-task-bottom">
                    <span>Assigned: Alex Vance</span>
                    <span>Verified ✓</span>
                  </div>
                </div>

                <div className="mockup-task-item">
                  <div className="mockup-task-top">
                    <span className="mockup-task-title">Client Portal UI Specifications</span>
                    <span className="mockup-badge mockup-badge-progress">In Review</span>
                  </div>
                  <div className="mockup-task-bottom">
                    <span>Assigned: Elena Rostova</span>
                    <span>Submission Link: Attached ↗</span>
                  </div>
                </div>

                <div className="mockup-task-item">
                  <div className="mockup-task-top">
                    <span className="mockup-task-title">Milestone Q3 Deliverables Audit</span>
                    <span className="mockup-badge mockup-badge-pending">Pending</span>
                  </div>
                  <div className="mockup-task-bottom">
                    <span>Assigned: Marcus Chen</span>
                    <span>Target: Today</span>
                  </div>
                </div>

                <div className="mockup-audit-footer">
                  <span><strong>Audit Trail:</strong> Verified via Supabase</span>
                  <span>100% Accountable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
