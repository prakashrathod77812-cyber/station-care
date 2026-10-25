-- Apply this migration in the Supabase SQL editor or with the Supabase CLI.
-- All application tables have RLS enabled; never put the service-role key in this app.

create type public.app_role as enum ('member', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'member',
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid not null default auth.uid() references auth.users(id) on delete restrict,
  station text not null check (char_length(station) between 1 and 120),
  adults integer not null check (adults between 0 and 100),
  children integer not null check (children between 0 and 100),
  description text not null check (char_length(description) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid not null default auth.uid() references auth.users(id) on delete restrict,
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null check (char_length(phone) between 7 and 32),
  city text not null check (char_length(city) between 1 and 120),
  reason text not null check (char_length(reason) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table public.ngo_applications (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid not null default auth.uid() references auth.users(id) on delete restrict,
  name text not null check (char_length(name) between 1 and 160),
  contact_name text not null check (char_length(contact_name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  coverage_area text not null check (char_length(coverage_area) between 1 and 240),
  created_at timestamptz not null default now()
);

create index reports_submitted_by_idx on public.reports(submitted_by);
create index volunteer_applications_submitted_by_idx on public.volunteer_applications(submitted_by);
create index ngo_applications_submitted_by_idx on public.ngo_applications(submitted_by);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.reports enable row level security;
alter table public.volunteer_applications enable row level security;
alter table public.ngo_applications enable row level security;

create policy "users can read their profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);
create policy "admins can manage profiles"
  on public.profiles for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "users can create reports"
  on public.reports for insert to authenticated
  with check ((select auth.uid()) = submitted_by);
create policy "users can read their reports"
  on public.reports for select to authenticated
  using ((select auth.uid()) = submitted_by);
create policy "admins can manage reports"
  on public.reports for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "users can create volunteer applications"
  on public.volunteer_applications for insert to authenticated
  with check ((select auth.uid()) = submitted_by);
create policy "users can read their volunteer applications"
  on public.volunteer_applications for select to authenticated
  using ((select auth.uid()) = submitted_by);
create policy "admins can manage volunteer applications"
  on public.volunteer_applications for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "users can create NGO applications"
  on public.ngo_applications for insert to authenticated
  with check ((select auth.uid()) = submitted_by);
create policy "users can read their NGO applications"
  on public.ngo_applications for select to authenticated
  using ((select auth.uid()) = submitted_by);
create policy "admins can manage NGO applications"
  on public.ngo_applications for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- After your first account is created, promote it manually in the SQL editor:
-- update public.profiles set role = 'admin' where id = '<auth-user-uuid>';
