export function FinalCTA({ onNavigateToLogin }) {
  return (
    <section className="final-cta-section" aria-labelledby="cta-heading">
      <div className="landing-container">
        <div className="cta-card">
          <h2 id="cta-heading" className="cta-title">
            READY TO WORK WITH A BETTER SYSTEM?
          </h2>
          <p className="cta-lead">
            Access the ENKRYX workspace and keep your work organized from assignment to completion.
          </p>
          <button
            type="button"
            className="btn-cta-primary"
            onClick={() => onNavigateToLogin?.()}
          >
            Access System Portal
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
