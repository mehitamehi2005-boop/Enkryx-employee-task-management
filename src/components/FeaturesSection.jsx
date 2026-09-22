export function FeaturesSection() {
  const features = [
    {
      title: 'Custom Web Development',
      description: 'Modern, responsive web applications designed around real business requirements.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      title: 'SaaS & Task Systems',
      description: 'Structured platforms that help teams assign, track, manage, and complete work.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      title: 'Submission Auditing',
      description: 'Clear submission tracking and verification for accountable workflows.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      title: 'Mobile Responsive',
      description: 'Interfaces designed to remain usable and professional across desktop, tablet, and mobile.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="landing-section" aria-labelledby="features-title">
      <div className="landing-container">
        <header className="section-header">
          <p className="section-eyebrow">WHAT WE BUILD</p>
          <h2 id="features-title" className="section-title">
            EVERYTHING YOU NEED TO SCALE.
          </h2>
          <p className="section-lead">
            ENKRYX focuses on simple, reliable digital systems designed to streamline team operations, eliminate friction, and ensure complete accountability.
          </p>
        </header>

        <div className="features-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon-box">
                {feature.icon}
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
