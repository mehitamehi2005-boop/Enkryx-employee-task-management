-- ENKRYX Employee Task Management System
-- Run through the Supabase migration workflow. Supabase's auth.users table
-- remains the source of authentication identities; public.employees stores
-- application-specific employee data.

create type public.employee_role as enum ('admin', 'employee');
create type public.task_status as enum ('Pending', 'Completed');

create table public.employees (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  email text not null unique,
  role public.employee_role not null default 'employee',
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) > 0),
  description text,
  assigned_employee_id uuid not null references public.employees (id) on delete restrict,
  assigned_date date not null default current_date,
  status public.task_status not null default 'Pending',
  work_url text,
  completion_date date,
  constraint tasks_completion_matches_status check (
    (status = 'Pending' and completion_date is null)
    or (status = 'Completed' and completion_date is not null)
  )
);

-- Supports employee task lists, dashboard status counts, and today's work.
create index tasks_employee_status_assigned_date_idx
  on public.tasks (assigned_employee_id, status, assigned_date desc);

create index tasks_assigned_date_status_idx
  on public.tasks (assigned_date, status);

alter table public.employees enable row level security;
alter table public.tasks enable row level security;

-- Kept private from API clients; it is used only by the policies below.
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.employees
    where id = auth.uid()
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Employees can see only their profile; administrators can see every employee.
create policy "employees can read their own profile"
  on public.employees for select to authenticated
  using (id = auth.uid());

create policy "admins can read all employees"
  on public.employees for select to authenticated
  using (public.is_admin());

-- Employee creation, role assignment, and profile administration are performed
-- by a trusted server or the Supabase service role, never by a browser client.
create policy "admins can manage employees"
  on public.employees for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Employees see only assigned tasks. Completed rows are never removed by this schema.
create policy "employees can read assigned tasks"
  on public.tasks for select to authenticated
  using (assigned_employee_id = auth.uid());

create policy "admins can read all tasks"
  on public.tasks for select to authenticated
  using (public.is_admin())
;

create policy "admins can create tasks"
  on public.tasks for insert to authenticated
  with check (public.is_admin());

create policy "admins can update all tasks"
  on public.tasks for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Let employees record progress only on tasks assigned to them. Column grants
-- prevent changing assignment, title, description, or assigned date.
create policy "employees can update assigned task progress"
  on public.tasks for update to authenticated
  using (assigned_employee_id = auth.uid())
  with check (assigned_employee_id = auth.uid());

-- An employee may only record progress on an assigned task. Administrators
-- retain full task-management capability through their RLS policy.
create function public.enforce_employee_task_updates()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if not public.is_admin() and (
    new.title is distinct from old.title
    or new.description is distinct from old.description
    or new.assigned_employee_id is distinct from old.assigned_employee_id
    or new.assigned_date is distinct from old.assigned_date
  ) then
    raise exception 'Employees may update only task status, work URL, and completion date';
  end if;

  return new;
end;
$$;

create trigger enforce_employee_task_updates
  before update on public.tasks
  for each row execute function public.enforce_employee_task_updates();

revoke all on public.employees from anon, authenticated;
grant select, insert, update, delete on public.employees to authenticated;

revoke all on public.tasks from anon, authenticated;
grant select, insert, update on public.tasks to authenticated;
