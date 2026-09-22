import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { CapabilityStrip } from './CapabilityStrip';
import { FeaturesSection } from './FeaturesSection';
import { HowItWorks } from './HowItWorks';
import { AdminSection } from './AdminSection';
import { EmployeeSection } from './EmployeeSection';
import { AboutSection } from './AboutSection';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';
import '../styles/landing.css';

export function LandingPage({ onNavigateToLogin, onNavigateToSpecs }) {
  function handleNavigateSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      try {
        window.history.replaceState(null, '', `#${sectionId}`);
      } catch {
        // ignore
      }
    }
  }

  return (
    <div className="landing-page">
      <Navbar
        currentPage="home"
        onNavigateToLogin={onNavigateToLogin}
        onNavigateSection={handleNavigateSection}
        onNavigateToSpecs={onNavigateToSpecs}
      />

      <main id="main-content">
        <HeroSection
          onNavigateToLogin={onNavigateToLogin}
          onExploreSpecs={onNavigateToSpecs}
        />

        <CapabilityStrip />

        <FeaturesSection />

        <HowItWorks />

        <AdminSection onNavigateToLogin={onNavigateToLogin} />

        <EmployeeSection onNavigateToLogin={onNavigateToLogin} />

        <AboutSection onExploreSpecs={onNavigateToSpecs} />

        <FinalCTA onNavigateToLogin={onNavigateToLogin} />
      </main>

      <Footer
        currentPage="home"
        onNavigateToLogin={onNavigateToLogin}
        onNavigateSection={handleNavigateSection}
        onNavigateToSpecs={onNavigateToSpecs}
      />
    </div>
  );
}
