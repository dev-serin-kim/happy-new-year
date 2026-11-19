-- This project does not grant table privileges to service_role by default, so
-- Serin's mailbox (server-side, secret key) could not read postcards.
-- Grant only what the mailbox does: list, reply/mark read, and discard.
grant select, update, delete on public.postcards to service_role;
