import { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import '../styles/specs.css';

export function ProgramSpecsPage({ onNavigateToHome, onNavigateToLogin }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  function toggleFaq(index) {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }

  const faqItems = [
    {
      q: 'What is the ENKRYX system?',
      a: 'ENKRYX is a dedicated task management and deliverable tracking system created for the ENKRYX Youth Program. It provides structured, accountable software workflows connecting team administrators and employees in a unified digital workspace.',
    },
    {
      q: 'Who can access the system?',
      a: 'Access is divided strictly into two roles: Administrators, who oversee operations, provision staff, and assign deliverables; and Employees, who receive assignments, track personal queues, and submit completed work deliverables.',
    },
    {
      q: 'What can administrators do?',
      a: 'Administrators can provision and manage employee profiles securely via serverless Edge Functions, create tasks with deadlines and target assignments, monitor workload status, and audit all submitted deliverables in the organization-wide archive.',
    },
    {
      q: 'What can employees do?',
      a: 'Employees get a distraction-free personalized workspace displaying today’s schedule, pending tasks, and completion metrics. They can submit deliverables with live URLs and inspect their personal completed task history.',
    },
    {
      q: 'How are task submissions handled?',
      a: 'Employees submit deliverables by attaching verifiable external links (such as GitHub pull requests, Figma files, Google Drive assets, or live website URLs). Submitting automatically transitions the task to Completed, stamps the completion date, and logs it for administrative review.',
    },
    {
      q: 'What technology powers the system?',
      a: 'The frontend is engineered with React 19 and bundled with Vite. The backend utilizes Supabase (PostgreSQL 15) with strict Row-Level Security (RLS) policies, session management, and serverless Deno Edge Functions.',
    },
  ];

  return (
    <div className="specs-page">
      <Navbar
        currentPage="specs"
        onNavigateToHome={onNavigateToHome}
        onNavigateToLogin={onNavigateToLogin}
      />

      <main id="specs-main">
        {/* 1. PAGE HERO */}
        <section className="specs-hero" aria-labelledby="specs-hero-heading">
          <div className="landing-container">
            <div className="specs-hero-grid">
              <div className="specs-hero-content">
                <div className="hero-eyebrow">
                  <span className="hero-eyebrow-dot" aria-hidden="true" />
                  <span>ENKRYX YOUTH PROGRAM</span>
                </div>

                <h1 id="specs-hero-heading" className="hero-title">
                  PROGRAM SPECS &amp; SYSTEM OVERVIEW
                </h1>

                <p className="hero-lead">
                  A structured task management system designed to keep assignments, submissions, employees, and administrative oversight connected in one reliable workspace.
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
                    onClick={() => onNavigateToHome?.()}
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>

              <div className="specs-hero-visual" aria-hidden="true">
                <div className="specs-architecture-mini">
                  <div className="specs-arch-top">
                    <p className="specs-arch-kicker">Core System Engine</p>
                    <span className="specs-status-chip">
                      <span className="dot" />
                      <span>Operational</span>
                    </span>
                  </div>

                  <div className="specs-arch-pipeline">
                    <div className="specs-pipeline-node">
                      <div>
                        <strong>PostgreSQL Database</strong>
                        <span>Row-Level Security &amp; Isolation</span>
                      </div>
                      <span className="mockup-badge mockup-badge-completed">Secured</span>
                    </div>

                    <div className="specs-pipeline-node">
                      <div>
                        <strong>Supabase Auth &amp; Edge API</strong>
                        <span>Encrypted Credentials &amp; Provisioning</span>
                      </div>
                      <span className="mockup-badge mockup-badge-progress">Active</span>
                    </div>

                    <div className="specs-pipeline-node">
                      <div>
                        <strong>Multi-Workspace UI</strong>
                        <span>Admin Oversight • Employee Execution</span>
                      </div>
                      <span className="mockup-badge mockup-badge-completed">Synchronized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHAT IS ENKRYX? (3 PILLARS) */}
        <section className="landing-section" aria-labelledby="what-is-title">
          <div className="landing-container">
            <header className="section-header">
              <p className="section-eyebrow">SYSTEM PHILOSOPHY</p>
              <h2 id="what-is-title" className="section-title">
                BUILT FOR CLEARER WORK.
              </h2>
              <p className="section-lead">
                ENKRYX provides a structured digital environment where administrators can organize work and employees can clearly understand and complete assigned tasks.
              </p>
            </header>

            <div className="pillars-grid">
              <article className="pillar-card">
                <p className="pillar-number">01</p>
                <h3 className="pillar-title">Organize</h3>
                <p className="pillar-desc">
                  Centralize tasks, employees, deadlines, and work requirements in a single authenticated source of truth.
                </p>
              </article>

              <article className="pillar-card">
                <p className="pillar-number">02</p>
                <h3 className="pillar-title">Execute</h3>
                <p className="pillar-desc">
                  Give employees a focused workspace for completing assigned work with clear priorities and submission guidelines.
                </p>
              </article>

              <article className="pillar-card">
                <p className="pillar-number">03</p>
                <h3 className="pillar-title">Verify</h3>
                <p className="pillar-desc">
                  Allow administrators to review submissions, inspect deliverable URLs, and maintain transparent accountability.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 3. CORE SYSTEM CAPABILITIES */}
        <section className="landing-section" style={{ background: '#ffffff', borderTop: '1px solid var(--line, #dce5e8)' }} aria-labelledby="core-cap-title">
          <div className="landing-container">
            <header className="section-header">
              <p className="section-eyebrow">FEATURE BREAKDOWN</p>
              <h2 id="core-cap-title" className="section-title">
                THE SYSTEM, AT A GLANCE.
              </h2>
              <p className="section-lead">
                Engineered from the ground up to support high-accountability team productivity without unnecessary complexity.
              </p>
            </header>

            <div className="capabilities-grid-6">
              <div className="cap-spec-card">
                <div className="cap-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="cap-spec-title">Role-Based Access</h3>
                <p className="cap-spec-desc">Different user roles receive the appropriate workspace and permissions.</p>
              </div>

              <div className="cap-spec-card">
                <div className="cap-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <h3 className="cap-spec-title">Task Assignment</h3>
                <p className="cap-spec-desc">Administrators can create and assign structured work to employees.</p>
              </div>

              <div className="cap-spec-card">
                <div className="cap-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3 className="cap-spec-title">Task Tracking</h3>
                <p className="cap-spec-desc">Track task status and progress from assignment through completion.</p>
              </div>

              <div className="cap-spec-card">
                <div className="cap-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <h3 className="cap-spec-title">Submission Management</h3>
                <p className="cap-spec-desc">Employees can submit completed work and relevant URLs through the workspace.</p>
              </div>

              <div className="cap-spec-card">
                <div className="cap-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3 className="cap-spec-title">Audit &amp; Verification</h3>
                <p className="cap-spec-desc">Administrators can review submitted work and verify completion.</p>
              </div>

              <div className="cap-spec-card">
                <div className="cap-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <h3 className="cap-spec-title">Centralized Workspace</h3>
                <p className="cap-spec-desc">Keep operational task information organized in one system.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ROLE ARCHITECTURE (TWO WORKSPACES) */}
        <section className="landing-section" aria-labelledby="role-arch-title">
          <div className="landing-container">
            <header className="section-header">
              <p className="section-eyebrow">ROLE SEPARATION</p>
              <h2 id="role-arch-title" className="section-title">
                ONE SYSTEM. TWO WORKSPACES.
              </h2>
              <p className="section-lead">
                Every team member experiences a purpose-built interface tuned directly to their operational responsibilities.
              </p>
            </header>

            <div className="roles-comparison-grid">
              {/* ADMIN */}
              <article className="role-spec-card">
                <div className="role-spec-header">
                  <p className="role-kicker">Administrative Tier</p>
                  <h3 className="role-spec-title">Admin Management Portal</h3>
                  <p className="role-spec-desc">
                    Designed for people responsible for managing the team and monitoring work.
                  </p>
                </div>

                <ul className="role-capabilities-list">
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Manage employees</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Create tasks</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Assign tasks</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Set task details/deadlines</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Monitor progress</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Review submissions</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Verify completed work</span>
                  </li>
                </ul>

                <div className="role-btn-wrap">
                  <button
                    type="button"
                    className="split-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => onNavigateToLogin?.('admin')}
                  >
                    Login as Admin
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </article>

              {/* EMPLOYEE */}
              <article className="role-spec-card">
                <div className="role-spec-header">
                  <p className="role-kicker">Execution Tier</p>
                  <h3 className="role-spec-title">Employee Workspace</h3>
                  <p className="role-spec-desc">
                    Designed to give each employee a focused view of their assigned responsibilities.
                  </p>
                </div>

                <ul className="role-capabilities-list">
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>View assigned tasks</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Review task requirements</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Track task status</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Submit completed work</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Add submission URLs</span>
                  </li>
                  <li className="role-cap-item">
                    <span className="check" aria-hidden="true">✓</span>
                    <span>Monitor completed work</span>
                  </li>
                </ul>

                <div className="role-btn-wrap">
                  <button
                    type="button"
                    className="split-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => onNavigateToLogin?.('employee')}
                  >
                    Login as Employee
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 5. TASK LIFECYCLE (5-STAGE WORKFLOW) */}
        <section className="landing-section lifecycle-section" aria-labelledby="lifecycle-title">
          <div className="landing-container">
            <header className="section-header">
              <p className="section-eyebrow">WORKFLOW PROGRESSION</p>
              <h2 id="lifecycle-title" className="section-title">
                FROM ASSIGNMENT TO VERIFICATION.
              </h2>
              <p className="section-lead">
                Every unit of work moves through five explicit stages to maintain traceability and eliminate lost deliverables.
              </p>
            </header>

            <div className="lifecycle-track">
              <div className="lifecycle-step-card">
                <span className="lifecycle-num">01</span>
                <h3 className="lifecycle-step-title">Assigned</h3>
                <p className="lifecycle-step-desc">Administrator creates and assigns the task.</p>
              </div>

              <div className="lifecycle-step-card">
                <span className="lifecycle-num">02</span>
                <h3 className="lifecycle-step-title">In Progress</h3>
                <p className="lifecycle-step-desc">Employee works on the assigned task.</p>
              </div>

              <div className="lifecycle-step-card">
                <span className="lifecycle-num">03</span>
                <h3 className="lifecycle-step-title">Submitted</h3>
                <p className="lifecycle-step-desc">Employee submits completed work and any required URL.</p>
              </div>

              <div className="lifecycle-step-card">
                <span className="lifecycle-num">04</span>
                <h3 className="lifecycle-step-title">Reviewed</h3>
                <p className="lifecycle-step-desc">Administrator reviews the submitted work.</p>
              </div>

              <div className="lifecycle-step-card">
                <span className="lifecycle-num">05</span>
                <h3 className="lifecycle-step-title">Verified</h3>
                <p className="lifecycle-step-desc">Completed work is verified and recorded.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. SUBMISSION SYSTEM */}
        <section className="landing-section" aria-labelledby="submission-system-title">
          <div className="landing-container">
            <div className="submission-showcase-grid">
              <div>
                <p className="section-eyebrow">DELIVERABLE TRACKING</p>
                <h2 id="submission-system-title" className="section-title text-left">
                  STRUCTURED SUBMISSIONS.
                </h2>
                <p className="section-lead text-left" style={{ margin: '0 0 20px' }}>
                  The system supports organized work submissions, ensuring tangible deliverables—from pull requests to canvas designs—are linked directly to the task record.
                </p>
                <p className="section-lead text-left" style={{ margin: '0 0 28px' }}>
                  When an employee submits their deliverable link, the task status updates in real time, locks the completion timestamp, and notifies administrators of the completed work.
                </p>
                <button
                  type="button"
                  className="split-btn"
                  onClick={() => onNavigateToLogin?.('employee')}
                >
                  Explore Submission Workspace
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              <div aria-hidden="true">
                <div className="sample-submission-card">
                  <div className="sample-card-header">
                    <h3 className="sample-card-title">Verified Submission Record</h3>
                    <span className="mockup-badge mockup-badge-completed">Recorded ✓</span>
                  </div>

                  <div className="sample-fields-list">
                    <div className="sample-field-row">
                      <span className="sample-field-label">Task</span>
                      <span className="sample-field-val">Landing Page Implementation</span>
                    </div>

                    <div className="sample-field-row">
                      <span className="sample-field-label">Employee</span>
                      <span className="sample-field-val">Employee Workspace</span>
                    </div>

                    <div className="sample-field-row">
                      <span className="sample-field-label">Submission</span>
                      <span className="sample-field-val">URL submitted</span>
                    </div>

                    <div className="sample-field-row">
                      <span className="sample-field-label">Status</span>
                      <span className="mockup-badge mockup-badge-progress">Submitted</span>
                    </div>

                    <div className="sample-url-box">
                      https://github.com/enkryx/saas-frontend/pull/42
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. SECURITY / ROLE CONTROL */}
        <section className="landing-section" style={{ background: '#ffffff', borderTop: '1px solid var(--line, #dce5e8)' }} aria-labelledby="security-title">
          <div className="landing-container">
            <div className="security-callout-card">
              <header className="section-header text-left" style={{ marginBottom: '24px' }}>
                <p className="section-eyebrow">GOVERNANCE &amp; PERMISSIONS</p>
                <h2 id="security-title" className="section-title">
                  ACCESS SHOULD MATCH RESPONSIBILITY.
                </h2>
                <p className="section-lead text-left" style={{ maxWidth: '820px' }}>
                  ENKRYX implements role-based workspace separation to ensure users only see functionality and data appropriate to their designated responsibilities.
                </p>
              </header>

              <div className="security-points-grid">
                <div className="security-point">
                  <h3 className="security-point-title">Admin Boundary</h3>
                  <p className="security-point-desc">Administrators access management functions, team rosters, and task creation.</p>
                </div>

                <div className="security-point">
                  <h3 className="security-point-title">Employee Scope</h3>
                  <p className="security-point-desc">Employees access their assigned workspace without visibility into peer tasks.</p>
                </div>

                <div className="security-point">
                  <h3 className="security-point-title">Least Privilege</h3>
                  <p className="security-point-desc">Users only see functionality appropriate to their role; admin routes are guarded.</p>
                </div>

                <div className="security-point">
                  <h3 className="security-point-title">Supabase Auth</h3>
                  <p className="security-point-desc">Authentication and session state are managed through Supabase credentials.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TECHNICAL FOUNDATION */}
        <section className="landing-section" aria-labelledby="tech-title">
          <div className="landing-container">
            <header className="section-header">
              <p className="section-eyebrow">SYSTEM ARCHITECTURE</p>
              <h2 id="tech-title" className="section-title">
                BUILT ON A MODERN FOUNDATION.
              </h2>
              <p className="section-lead">
                Built strictly with battle-tested web standards for speed, security, and effortless reliability across devices.
              </p>
            </header>

            <div className="tech-stack-grid">
              <article className="tech-spec-card">
                <span className="tech-spec-badge">Frontend</span>
                <h3 className="tech-spec-title">React</h3>
                <p className="tech-spec-desc">Component-based frontend architecture.</p>
              </article>

              <article className="tech-spec-card">
                <span className="tech-spec-badge">Tooling</span>
                <h3 className="tech-spec-title">Vite</h3>
                <p className="tech-spec-desc">Fast modern development and build tooling.</p>
              </article>

              <article className="tech-spec-card">
                <span className="tech-spec-badge">Backend</span>
                <h3 className="tech-spec-title">Supabase</h3>
                <p className="tech-spec-desc">Backend services, authentication, and database infrastructure.</p>
              </article>

              <article className="tech-spec-card">
                <span className="tech-spec-badge">Interface</span>
                <h3 className="tech-spec-title">Responsive Web</h3>
                <p className="tech-spec-desc">Designed for desktop, tablet, and mobile environments.</p>
              </article>
            </div>
          </div>
        </section>

        {/* 9. SYSTEM WORKFLOW VISUAL (LARGE ARCHITECTURE DIAGRAM) */}
        <section className="landing-section" style={{ background: '#ffffff', borderTop: '1px solid var(--line, #dce5e8)' }} aria-labelledby="workflow-diagram-title">
          <div className="landing-container">
            <header className="section-header">
              <p className="section-eyebrow">TRACEABLE PIPELINE</p>
              <h2 id="workflow-diagram-title" className="section-title">
                SYSTEM WORKFLOW VISUAL
              </h2>
              <p className="section-lead">
                A birds-eye view of how requirements transform into verified deliverables through the ENKRYX platform.
              </p>
            </header>

            <div className="architecture-diagram-container">
              <div className="workflow-flow-grid" aria-label="End-to-End Workflow Diagram">
                {/* Node 1 */}
                <div className="workflow-node highlight">
                  <span className="workflow-node-role">Admin</span>
                  <h3 className="workflow-node-title">Creates Task</h3>
                  <p className="workflow-node-desc">Sets requirements &amp; scope</p>
                </div>

                <div className="workflow-connector" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>

                {/* Node 2 */}
                <div className="workflow-node">
                  <span className="workflow-node-role">Admin</span>
                  <h3 className="workflow-node-title">Assigns Employee</h3>
                  <p className="workflow-node-desc">Direct allocation via dropdown</p>
                </div>

                <div className="workflow-connector" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>

                {/* Node 3 */}
                <div className="workflow-node highlight">
                  <span className="workflow-node-role">Employee</span>
                  <h3 className="workflow-node-title">Completes Task</h3>
                  <p className="workflow-node-desc">Work conducted in focus</p>
                </div>

                <div className="workflow-connector" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>

                {/* Node 4 */}
                <div className="workflow-node">
                  <span className="workflow-node-role">Employee</span>
                  <h3 className="workflow-node-title">Submits Work</h3>
                  <p className="workflow-node-desc">Verifiable URL attached</p>
                </div>

                <div className="workflow-connector" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>

                {/* Node 5 */}
                <div className="workflow-node highlight">
                  <span className="workflow-node-role">Admin</span>
                  <h3 className="workflow-node-title">Reviews &amp; Verifies</h3>
                  <p className="workflow-node-desc">Audited &amp; permanently logged</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. INTERACTIVE FAQ */}
        <section className="landing-section faq-section" aria-labelledby="faq-title">
          <div className="landing-container">
            <header className="section-header">
              <p className="section-eyebrow">COMMON QUESTIONS</p>
              <h2 id="faq-title" className="section-title">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="section-lead">
                Find quick answers to common questions regarding roles, workflows, and system access.
              </p>
            </header>

            <div className="faq-accordion-wrap">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={item.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="faq-chevron" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer-panel">
                        <p style={{ margin: 0 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <section className="final-cta-section" aria-labelledby="specs-cta-title">
          <div className="landing-container">
            <div className="cta-card">
              <h2 id="specs-cta-title" className="cta-title">
                READY TO ENTER THE WORKSPACE?
              </h2>
              <p className="cta-lead">
                Access the ENKRYX system and move from assigned work to verified completion.
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
      </main>

      <Footer
        currentPage="specs"
        onNavigateToHome={onNavigateToHome}
        onNavigateToLogin={onNavigateToLogin}
      />
    </div>
  );
}
