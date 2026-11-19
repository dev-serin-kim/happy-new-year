import { createClient as createAdminClient } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/server'

import { isMailboxOwnerEmail } from './owner'

// True only when the signed-in account is Serin's (MAILBOX_EMAIL).
export async function isMailboxOwner() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  return isMailboxOwnerEmail(data?.claims?.email, process.env.MAILBOX_EMAIL)
}

// Service-role client for Serin's mailbox. API roles have no access to the
// postcards table, so call this only after isMailboxOwner() passes.
export function createMailboxClient() {
  return createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
