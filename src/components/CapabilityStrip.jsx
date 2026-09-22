export function CapabilityStrip() {
  const capabilities = [
    {
      title: '100% Role Security',
      subtitle: 'Strict admin vs employee isolation',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      title: 'Real-Time Task Audit',
      subtitle: 'Transparent dispatch to completion',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      title: 'Multi-URL Submissions',
      subtitle: 'GitHub, Figma, Drive & live apps',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
    {
      title: 'Supabase Backend Ready',
      subtitle: 'PostgreSQL with Row-Level Security',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="capability-strip" aria-label="Core Capabilities">
      <div className="landing-container">
        <div className="capability-grid">
          {capabilities.map((cap) => (
            <div key={cap.title} className="capability-item">
              <div className="capability-icon-wrap">
                {cap.icon}
              </div>
              <div className="capability-text">
                <strong>{cap.title}</strong>
                <span>{cap.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
