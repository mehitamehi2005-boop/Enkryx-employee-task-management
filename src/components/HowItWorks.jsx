export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Understand the requirement, users, workflow, and desired outcome.',
    },
    {
      num: '02',
      title: 'Plan & Assign',
      desc: 'Break the work into clear tasks, responsibilities, and milestones.',
    },
    {
      num: '03',
      title: 'Build & Submit',
      desc: 'Develop the solution and submit work through a structured workflow.',
    },
    {
      num: '04',
      title: 'Archive & Verify',
      desc: 'Review completed work, verify submissions, and maintain an accountable record.',
    },
  ];

  return (
    <section id="how-it-works" className="landing-section how-it-works-section" aria-labelledby="how-it-works-title">
      <div className="landing-container">
        <header className="section-header">
          <p className="section-eyebrow">HOW WE WORK</p>
          <h2 id="how-it-works-title" className="section-title">
            A SIMPLE PROCESS. A BETTER RESULT.
          </h2>
          <p className="section-lead">
            Every software project and team workflow follows a disciplined, traceable progression to guarantee delivery and quality.
          </p>
        </header>

        <div className="process-timeline">
          {steps.map((step) => (
            <div key={step.num} className="process-step-card">
              <div className="step-badge">
                Stage {step.num}
              </div>
              <h3 className="step-card-title">{step.title}</h3>
              <p className="step-card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
