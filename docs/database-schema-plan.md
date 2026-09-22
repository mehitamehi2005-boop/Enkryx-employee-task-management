# ENKRYX database schema plan

## Scope

This plan defines only the initial Supabase/PostgreSQL data model. Authentication flows, UI, and application behavior are intentionally out of scope.

## Tables

### `public.employees`

One row per staff member. Its `id` is the matching `auth.users.id` supplied by Supabase Auth, so the authenticated user's ID can be used directly in row-level security policies.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key; foreign key to `auth.users(id)` |
| `name` | `text` | Required employee display name |
| `email` | `text` | Required and unique |
| `role` | `employee_role` | `admin` or `employee`; defaults to `employee` |
| `created_at` | `timestamptz` | Creation timestamp |

### `public.tasks`

Stores both active and completed work. A task is never moved to a separate history table: `status` and `completion_date` make the history queryable without losing data. The initial client-facing permissions intentionally do not allow task deletion.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key |
| `title` | `text` | Required |
| `description` | `text` | Optional task detail |
| `assigned_employee_id` | `uuid` | Required foreign key to `employees.id` |
| `assigned_date` | `date` | Required; defaults to the current date |
| `status` | `task_status` | `Pending` or `Completed`; defaults to `Pending` |
| `work_url` | `text` | Optional submitted work link |
| `completion_date` | `date` | Required only when status is `Completed` |

The completion-status constraint requires a completion date for completed work and requires it to be absent while pending. This keeps task-history and dashboard data consistent.

## Relationship and access model

`employees (1) -> tasks (many)` through `tasks.assigned_employee_id`. Deleting an employee is restricted while tasks reference that employee, preserving task history.

Row-level security is enabled on both tables:

- Employees can read their own profile and only tasks assigned to their authenticated ID.
- Employees can update only `status`, `work_url`, and `completion_date` on their own tasks.
- Admins can read all employees and create, read, and update all tasks.
- Employee creation and role assignment are intentionally reserved for trusted server/service-role operations so a client cannot grant itself administrator access.

## Dashboard and today's work

The two task indexes support the common queries:

- employee dashboard counts by `assigned_employee_id` and `status`;
- today's work filtered by `assigned_date = current_date`, optionally grouped by status;
- completed-task history filtered by employee and `status = 'Completed'`.

The planned migration is `supabase/migrations/20260903000000_create_employee_task_schema.sql`.
