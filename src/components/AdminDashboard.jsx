const overview = [
  { label: 'Total Employees', value: '24', detail: 'Active team members', tone: 'primary', icon: '◉' },
  { label: 'Total Tasks', value: '38', detail: 'Across all workspaces', tone: 'slate', icon: '□' },
  { label: 'Pending Tasks', value: '12', detail: 'Awaiting completion', tone: 'warning', icon: '◌' },
  { label: 'Completed Tasks', value: '26', detail: 'Completed this month', tone: 'success', icon: '✓' },
];

const today = [
  { name: 'Aisha Rahman', initials: 'AR', task: 'Homepage content audit', status: 'Pending', color: 'coral' },
  { name: 'Nabil Hasan', initials: 'NH', task: 'Client feedback revisions', status: 'Completed', color: 'blue' },
  { name: 'Sadia Islam', initials: 'SI', task: 'September campaign assets', status: 'Pending', color: 'violet' },
  { name: 'Mahin Chowdhury', initials: 'MC', task: 'Analytics report review', status: 'Completed', color: 'green' },
];

function StatCard({ item, onClick }) {
  const isClickable = Boolean(onClick);
  return (
    <article
      className={`stat-card stat-${item.tone}${isClickable ? ' is-clickable' : ''}`}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      <div className="stat-icon" aria-hidden="true">{item.icon}</div>
      <p className="stat-label">{item.label}</p>
      <p className="stat-value">{item.value}</p>
      <p className="stat-detail">{item.detail}</p>
    </article>
  );
}

function EmployeeStatus({ person }) {
  const completed = person.status === 'Completed';
  return <li className="employee-status"><span className={`person-avatar avatar-${person.color}`} aria-hidden="true">{person.initials}</span><span className="employee-task"><strong>{person.name}</strong><span>{person.task}</span></span><span className={`badge ${completed ? 'badge-completed' : 'badge-pending'}`}><span className="badge-dot" aria-hidden="true" />{person.status}</span></li>;
}

export function AdminDashboard({ onNavigate }) {
  return <>
    <section className="dashboard-heading" aria-labelledby="page-title"><div><p className="eyebrow">Dashboard</p><h1 id="page-title">Good morning, Admin.</h1><p className="lead">Here’s a concise view of your team’s work today.</p></div><p className="date-label">Today <span aria-hidden="true">·</span> 03 September</p></section>
    <section className="stat-grid" aria-label="Task overview">
      {overview.map((item) => {
        let handleClick;
        if (onNavigate) {
          if (item.label === 'Total Employees') handleClick = () => onNavigate('Employees');
          else if (item.label === 'Total Tasks' || item.label === 'Pending Tasks') handleClick = () => onNavigate('Tasks');
          else if (item.label === 'Completed Tasks') handleClick = () => onNavigate('Task History');
        }
        return <StatCard item={item} key={item.label} onClick={handleClick} />;
      })}
    </section>
    <section className="dashboard-grid">
      <section className="card status-card" aria-labelledby="today-status-title"><div className="section-heading"><div><p className="card-kicker">Today’s work</p><h2 id="today-status-title">Today’s Task Status</h2></div><a className="text-link" href="#main-content">View all <span aria-hidden="true">→</span></a></div><ul className="employee-status-list">{today.map((person) => <EmployeeStatus person={person} key={person.name} />)}</ul></section>
      <aside className="dashboard-aside"><section className="card progress-card" aria-labelledby="progress-title"><p className="card-kicker">Daily progress</p><h2 id="progress-title">68% complete</h2><div className="progress-track" aria-label="68 percent of today’s tasks completed"><span /></div><p>8 of 12 tasks scheduled for today are complete.</p></section><section className="empty-state" aria-labelledby="empty-title"><span className="empty-icon" aria-hidden="true">⌁</span><div><h2 id="empty-title">Nothing needs review</h2><p>There are no overdue tasks to address right now.</p></div></section></aside>
    </section>
  </>;
}
