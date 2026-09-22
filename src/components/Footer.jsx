export function Footer({
  onNavigateToLogin,
  onNavigateSection,
  onNavigateToSpecs,
  onNavigateToHome,
  currentPage = 'home',
}) {
  function handleHomeClick() {
    if (currentPage === 'specs') {
      if (onNavigateToHome) onNavigateToHome('home');
      else window.location.hash = '#home';
    } else if (onNavigateSection) {
      onNavigateSection('home');
    } else {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleAboutClick() {
    if (currentPage === 'specs') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onNavigateToSpecs) {
      onNavigateToSpecs();
    } else {
      window.location.hash = '#about';
    }
  }

  function handleFeaturesClick() {
    if (currentPage === 'specs') {
      if (onNavigateToHome) onNavigateToHome('features');
      else window.location.hash = '#features';
    } else if (onNavigateSection) {
      onNavigateSection('features');
    } else {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleHowItWorksClick() {
    if (currentPage === 'specs') {
      if (onNavigateToHome) onNavigateToHome('how-it-works');
      else window.location.hash = '#how-it-works';
    } else if (onNavigateSection) {
      onNavigateSection('how-it-works');
    } else {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <a
              href="#home"
              className="landing-brand"
              onClick={(e) => {
                e.preventDefault();
                handleHomeClick();
              }}
              aria-label="ENKRYX Home"
            >
              <span className="brand-mark" aria-hidden="true">E</span>
              <span>ENKRYX</span>
            </a>
            <p className="footer-tagline">Software &amp; Web Solutions</p>
            <p className="footer-subtext">Simple systems. Reliable execution.</p>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  className="footer-nav-link"
                  onClick={handleHomeClick}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-link"
                  onClick={handleAboutClick}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-link"
                  onClick={handleFeaturesClick}
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-link"
                  onClick={handleHowItWorksClick}
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">System</h4>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  className="footer-nav-link"
                  onClick={() => onNavigateToLogin?.()}
                >
                  Access System Portal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-link"
                  onClick={() => onNavigateToLogin?.('admin')}
                >
                  Admin Login
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-link"
                  onClick={() => onNavigateToLogin?.('employee')}
                >
                  Employee Login
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">External</h4>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="#home"
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleHomeClick();
                  }}
                >
                  ENKRYX official website
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ENKRYX. All rights reserved.</p>
          <p>Task Management &amp; Deliverable Verification Platform</p>
        </div>
      </div>
    </footer>
  );
}
