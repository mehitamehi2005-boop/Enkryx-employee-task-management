# ENKRYX — Employee Task Management System

ENKRYX is a role-based employee task management and deliverable tracking application built with React, Vite, and Supabase. It provides team administrators with tools to provision employee accounts, assign work, and track deliverables, while giving employees a focused workspace to review daily schedules, manage tasks, and submit project URLs.

---

## Main Features

- **Role-Based Access Control (RBAC)**: Distinct interfaces and permissions for Administrators and Employees, enforced at both the client routing level and PostgreSQL database level.
- **Secure Employee Provisioning**: Administrators create new team accounts through a server-side Supabase Edge Function without exposing service-role keys to the browser client.
- **Task Assignment & Allocation**: Administrators create and assign tasks with titles, descriptions, assigned team members, and target dates.
- **Personalized Employee Workspaces**: Employees view their live workload metrics (Total Pending Tasks, Total Completed Tasks, Today's Work) and today's schedule.
- **Inline Work Submission**: Employees submit deliverable URLs (GitHub, Figma, Google Drive, live websites) directly on their pending tasks with client-side URL validation.
- **Task History & Archives**: Completed assignments automatically record completion timestamps and submitted work links, visible in both employee-specific history and organization-wide admin archives.
- **Multi-Layered Security**:
  - PostgreSQL Row-Level Security (RLS) policies on `public.employees` and `public.tasks`.
  - Database trigger enforcing that non-admins cannot mutate task titles, descriptions, assignments, or dates.
  - Client-side route guarding preventing employees from accessing admin views via manual URL hash manipulation.
  - Clean session destruction and state clearing upon sign out.
- **Responsive ENKRYX Design System**: Custom theme with mobile-optimized layout breakpoints, accessible forms, status badges, and loading/error/empty feedback states.

---

## Role-Specific Features

### Administrator Features
- **Operations Overview**: Metric summary cards (Total Employees, Total Tasks, Pending Tasks, Completed Tasks) and daily progress indicators.
- **Team Directory**: View all employees with email, role badges, and registration dates.
- **Account Provisioning**: Form to securely register new employee accounts with temporary passwords via Supabase Edge Function.
- **Task Assignment**: Assign new work to team members with title, description, employee selection, and assigned date (defaults to `Pending`).
- **Organization Task Archive**: Complete history of finished tasks with assigned employee details, completion dates, and direct links to submitted deliverables.

### Employee Features
- **Daily Workspace Dashboard**: Greeting with current date, pending/completed task counters, and a schedule view of today's work.
- **My Tasks View**: Comprehensive directory of all assigned tasks with status filter tabs (`All`, `Pending`, `Completed`).
- **Work Submission**: Expandable inline submission tray on pending tasks to submit work URLs. Automatically transitions tasks to `Completed` with current completion date.
- **Personal Task History**: Archive of all finished tasks with submitted work links and completion dates.

---

## Technologies Used

- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS with custom properties (ENKRYX Design System tokens)
- **Backend / Database**: Supabase (PostgreSQL 15)
- **Authentication**: Supabase Auth (email/password credentials, session persistence)
- **Security**: PostgreSQL Row-Level Security (RLS) & Security Definer functions
- **Serverless**: Supabase Edge Functions (Deno runtime)

---

## Project Structure

```
├── docs/
│   └── database-schema-plan.md     # Database architecture and RLS specifications
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx         # Program specifications section
│   │   ├── AdminDashboard.jsx       # Admin dashboard metrics and today overview
│   │   ├── AdminSection.jsx         # Landing page admin portal feature spotlight
│   │   ├── AdminTaskHistoryPage.jsx # Organization-wide completed task archive
│   │   ├── AppShell.jsx             # Admin shell with primary navigation and topbar
│   │   ├── CapabilityStrip.jsx      # Core capability badges
│   │   ├── EmployeeDashboard.jsx    # Employee workspace, daily schedule, and nav
│   │   ├── EmployeeSection.jsx      # Landing page employee workspace spotlight
│   │   ├── EmployeesPage.jsx        # Admin team directory and account creation
│   │   ├── FeaturesSection.jsx      # SaaS features grid
│   │   ├── FinalCTA.jsx             # Bottom call-to-action block
│   │   ├── Footer.jsx               # Landing page footer with navigation
│   │   ├── HeroSection.jsx          # Public landing page hero with interactive UI mockup
│   │   ├── HowItWorks.jsx           # 4-stage process timeline
│   │   ├── LandingPage.jsx          # Master public landing page component
│   │   ├── LoginPage.jsx            # Authentication form
│   │   ├── MyTaskHistoryPage.jsx    # Employee personal completed task archive
│   │   ├── MyTasksPage.jsx          # Employee task directory and work submission
│   │   ├── Navbar.jsx               # Public responsive navigation header
│   │   ├── ProgramSpecsPage.jsx     # Program specs and system overview deep dive
│   │   └── TasksPage.jsx            # Admin task directory and assignment form
│   ├── lib/
│   │   └── supabase.js              # Supabase browser client initialization
│   ├── styles/
│   │   ├── landing.css              # Public landing page SaaS styling
│   │   ├── specs.css                # Program specs page styling
│   │   └── theme.css                # ENKRYX design system styling and responsive rules
│   ├── App.jsx                      # Root application with role guards and session handling
│   └── main.jsx                     # Application entry point
├── supabase/
│   ├── functions/
│   │   └── create-employee/         # Secure employee account creation Edge Function
│   └── migrations/
│       └── 20260903000000_create_employee_task_schema.sql # Database schema, RLS, and triggers
├── .env.example                     # Environment variable template
├── .gitignore                       # Git ignore configuration
├── package.json                     # Project manifest and scripts
├── vercel.json                      # Static deployment SPA fallback rules
└── README.md                        # Documentation
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Your Supabase project URL (e.g. `https://xyz.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase public anonymous API key |

> **Note**: Service role keys must **never** be added to client environment variables. The service role key is used solely within the server-side Supabase Edge Function runtime.

---

## Supabase Setup Requirements

### 1. Apply Schema Migration
Execute the SQL migration file in your Supabase SQL Editor or via Supabase CLI:
```bash
supabase db push
# or run the contents of supabase/migrations/20260903000000_create_employee_task_schema.sql
```
This creates:
- `public.employees` and `public.tasks` tables
- `employee_role` (`admin`, `employee`) and `task_status` (`Pending`, `Completed`) enums
- `tasks_completion_matches_status` check constraint
- `public.is_admin()` security definer function
- RLS policies on both tables
- Trigger `enforce_employee_task_updates` preventing non-admins from changing task assignments or metadata

### 2. Bootstrap the Administrator Account
Create the initial admin user in Supabase Auth and insert a matching record into `public.employees`:
```sql
-- Replace with your admin's auth.users ID after signing up in Supabase Auth:
insert into public.employees (id, name, email, role)
values ('<auth-user-uuid>', 'Admin Name', 'admin@enkryx.com', 'admin');
```

### 3. Deploy the Edge Function
Deploy the `create-employee` Edge Function to handle account creation:
```bash
supabase functions deploy create-employee
```
*(Default secrets `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are automatically available in the Supabase Edge Function environment).*

---

## Local Setup & Run Instructions

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
1. Clone or navigate to the repository:
   ```bash
   cd c:/Projects
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your local environment file:
   ```bash
   cp .env.example .env.local
   ```
   Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:5173`.

---

## Production Build

To test and compile the production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## Deployment Instructions

### Deploy to Vercel
1. Push the repository to GitHub / GitLab / Bitbucket.
2. Import the repository into [Vercel](https://vercel.com).
3. In the project settings, set Framework Preset to **Vite**.
4. Configure Environment Variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy. The included `vercel.json` ensures all SPA routes resolve correctly to `index.html`.

### Deploy to Netlify or Static Hosting
1. Set the build command to `npm run build`.
2. Set the publish directory to `dist`.
3. Add the required environment variables in the host dashboard.
4. For pushState hosts without hash routing, configure a redirect rule from `/*` to `/index.html` with status `200`.

---

## Live Project Link

`[Live URL: Not yet deployed]` *(Configure remote Supabase project and host on Vercel to activate live URL)*
