-- Postcards: friends send them without signing in, Serin replies.
--
-- API roles (anon, authenticated) get no table privileges at all. Friends go
-- through the SECURITY DEFINER functions below, which never return the
-- content of a private postcard unless nickname and birthday match. Serin's
-- mailbox runs on the Next.js server with the secret key (service_role) after
-- the server checks her email, so no signed-in account can reach it directly.

create table public.postcards (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(nickname) between 1 and 10 and nickname = btrim(nickname)),
  message text not null check (char_length(message) between 1 and 300 and btrim(message) <> ''),
  stamp text not null check (stamp in ('red', 'cream', 'night', 'silver')),
  is_public boolean not null,
  -- bcrypt hash of the MMDD birthday; the raw birthday is never stored.
  birthday_hash text,
  reply text check (reply is null or (char_length(reply) between 1 and 300 and btrim(reply) <> '')),
  replied_at timestamptz,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  constraint postcards_birthday_only_private
    check ((is_public and birthday_hash is null) or (not is_public and birthday_hash is not null))
);

create index postcards_created_at_idx on public.postcards (created_at desc);
create index postcards_private_nickname_idx on public.postcards (nickname) where not is_public;

alter table public.postcards enable row level security;

revoke all on public.postcards from anon, authenticated;

-- A real month-day in MMDD form; 0229 is allowed.
create function public.is_valid_birthday(p_birthday text)
returns boolean
language plpgsql
immutable
set search_path = ''
as $$
begin
  if p_birthday is null or p_birthday !~ '^\d{4}$' then
    return false;
  end if;
  perform make_date(2000, substr(p_birthday, 1, 2)::int, substr(p_birthday, 3, 2)::int);
  return true;
exception when others then
  return false;
end;
$$;

-- Send a postcard. Returns the new id. Friends cannot edit or delete later.
create function public.send_postcard(
  p_nickname text,
  p_message text,
  p_stamp text,
  p_is_public boolean,
  p_birthday text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_id uuid;
begin
  if not p_is_public and not public.is_valid_birthday(p_birthday) then
    raise exception 'invalid birthday' using errcode = '22023';
  end if;

  insert into public.postcards (nickname, message, stamp, is_public, birthday_hash)
  values (
    btrim(p_nickname),
    p_message,
    p_stamp,
    p_is_public,
    case when p_is_public then null else extensions.crypt(p_birthday, extensions.gen_salt('bf')) end
  )
  returning id into new_id;

  return new_id;
end;
$$;

-- Every postcard, newest first. Private postcards come back without
-- nickname, message, or reply.
create function public.wall_postcards()
returns table (
  id uuid,
  is_public boolean,
  stamp text,
  created_at timestamptz,
  nickname text,
  message text,
  reply text
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    p.id,
    p.is_public,
    p.stamp,
    p.created_at,
    case when p.is_public then p.nickname end,
    case when p.is_public then p.message end,
    case when p.is_public then p.reply end
  from public.postcards p
  order by p.created_at desc;
$$;

-- Totals for the first screen.
create function public.postcard_counts()
returns table (total bigint, public_count bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select count(*), count(*) filter (where p.is_public)
  from public.postcards p;
$$;

-- Open the secret box: private postcards sent with this nickname and birthday.
create function public.open_secret_box(p_nickname text, p_birthday text)
returns table (
  id uuid,
  stamp text,
  created_at timestamptz,
  nickname text,
  message text,
  reply text
)
language sql
stable
security definer
set search_path = ''
as $$
  select p.id, p.stamp, p.created_at, p.nickname, p.message, p.reply
  from public.postcards p
  where not p.is_public
    and p.nickname = btrim(p_nickname)
    and public.is_valid_birthday(p_birthday)
    and p.birthday_hash = extensions.crypt(p_birthday, p.birthday_hash)
  order by p.created_at desc;
$$;

revoke execute on function public.is_valid_birthday(text) from public, anon, authenticated;
revoke execute on function public.send_postcard(text, text, text, boolean, text) from public;
revoke execute on function public.wall_postcards() from public;
revoke execute on function public.postcard_counts() from public;
revoke execute on function public.open_secret_box(text, text) from public;

grant execute on function public.send_postcard(text, text, text, boolean, text) to anon, authenticated;
grant execute on function public.wall_postcards() to anon, authenticated;
grant execute on function public.postcard_counts() to anon, authenticated;
grant execute on function public.open_secret_box(text, text) to anon, authenticated;
