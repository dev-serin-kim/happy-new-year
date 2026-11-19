-- Profiles: one row per Auth user, owner-only access.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Owners can read and update only their own row. Rows are created by the
-- trigger below, so there is no insert or delete policy for API roles.
create policy "Owners can view their profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Owners can update their profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Table privileges: signed-in users may read, but write only display_name.
-- email, created_at and updated_at can never be written through the API.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name) on public.profiles to authenticated;

-- The database, not application code, moves updated_at forward.
create function public.set_profile_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  new.created_at = old.created_at;
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_profile_updated_at();

-- Create the profile when an Auth user is created. The email is copied once
-- here and is not kept in sync afterwards. created_at and updated_at both use
-- the transaction time, so they are equal at creation.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

-- SECURITY DEFINER functions in public are callable by default; only the Auth
-- service needs to run this one.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
grant execute on function public.handle_new_user() to supabase_auth_admin;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
