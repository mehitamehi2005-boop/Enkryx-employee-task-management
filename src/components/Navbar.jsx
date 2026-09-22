import { useState } from 'react';

export function Navbar({
  onNavigateToLogin,
  onNavigateSection,
  onNavigateToSpecs,
  onNavigateToHome,
  currentPage = 'home',
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleHomeClick() {
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
    if (currentPage === 'specs') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onNavigateToSpecs) {
      onNavigateToSpecs();
    } else {
      window.location.hash = '#about';
    }
  }

  function handleFeaturesClick() {
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
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
    <header className="landing-navbar">
      <div className="landing-container landing-nav-container">
        <a
          href="#home"
          className="landing-brand"
          onClick={(e) => {
            e.preventDefault();
            handleHomeClick();
          }}
          aria-label="ENKRYX Homepage"
        >
          <span className="brand-mark" aria-hidden="true">E</span>
          <span>ENKRYX</span>
        </a>

        <nav className="landing-nav-links" aria-label="Landing page navigation">
          <a
            href="#home"
            className={`landing-nav-link${currentPage === 'home' ? ' is-active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleHomeClick();
            }}
          >
            Home
          </a>
          <a
            href="#about"
            className={`landing-nav-link${currentPage === 'specs' ? ' is-active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleAboutClick();
            }}
          >
            About
          </a>
          <a
            href="#features"
            className="landing-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleFeaturesClick();
            }}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="landing-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleHowItWorksClick();
            }}
          >
            How It Works
          </a>
        </nav>

        <div className="landing-nav-actions">
          <button
            type="button"
            className="nav-cta-btn"
            onClick={() => onNavigateToLogin?.()}
            aria-label="Access System Portal Login"
          >
            Access System Portal
          </button>

          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu-drawer is-open" aria-label="Mobile navigation">
          <ul className="mobile-nav-links">
            <li>
              <a
                href="#home"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeClick();
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleAboutClick();
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleFeaturesClick();
                }}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleHowItWorksClick();
                }}
              >
                How It Works
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="nav-cta-btn"
            style={{ width: '100%', textAlign: 'center' }}
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToLogin?.();
            }}
          >
            Access System Portal
          </button>
        </div>
      )}
    </header>
  );
}
