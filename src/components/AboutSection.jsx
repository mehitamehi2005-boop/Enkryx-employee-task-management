export function AboutSection({ onExploreSpecs }) {
  const specs = [
    {
      code: 'SPEC-01',
      title: 'Zero-Trust Role Architecture',
      desc: 'Employees query only their assigned tasks while administrators manage the global registry. Enforced directly at the PostgreSQL database level using Row-Level Security.',
    },
    {
      code: 'SPEC-02',
      title: 'Verifiable Work Deliverables',
      desc: 'Tasks support external links to GitHub pull requests, Figma canvas designs, Google Drive assets, and live URLs, ensuring tangible proof of work for every completion.',
    },
    {
      code: 'SPEC-03',
      title: 'Audited Task Progression',
      desc: 'Immutable completion records, timestamps, and work artifacts provide complete accountability from assignment through management review.',
    },
  ];

  return (
    <section id="about" className="landing-section about-section" aria-labelledby="about-title">
      <div className="landing-container">
        <header className="section-header">
          <p className="section-eyebrow">PROGRAM SPECIFICATIONS</p>
          <h2 id="about-title" className="section-title">
            BUILT FOR ACCOUNTABILITY &amp; SCALE
          </h2>
          <p className="section-lead">
            The ENKRYX Youth Program pairs talent with enterprise software rigor. Every workflow is designed to eliminate ambiguity and deliver verified software assets.
          </p>
        </header>

        <div className="specs-grid">
          {specs.map((spec) => (
            <div key={spec.code} className="spec-card">
              <p className="spec-card-num">{spec.code}</p>
              <h3 className="spec-card-title">{spec.title}</h3>
              <p className="spec-card-desc">{spec.desc}</p>
            </div>
          ))}
        </div>

        {onExploreSpecs && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              type="button"
              className="btn-hero-secondary"
              onClick={onExploreSpecs}
            >
              Explore Complete Program Specs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
