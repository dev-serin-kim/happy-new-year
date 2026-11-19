'use server'

import { revalidatePath } from 'next/cache'

import { charCount, REPLY_MAX } from '@/lib/postcards/rules'
import { createClient } from '@/lib/supabase/server'

import { isMailboxOwnerEmail } from './owner'
import { createMailboxClient, isMailboxOwner } from './session'

const DENIED = '세린만 할 수 있어요'

export async function openMailbox(email: string, password: string): Promise<{ ok: boolean }> {
  if (!email || !password) return { ok: false }
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
  if (error || !isMailboxOwnerEmail(data.user?.email, process.env.MAILBOX_EMAIL)) {
    if (!error) await supabase.auth.signOut()
    return { ok: false }
  }
  return { ok: true }
}

export async function saveReply(id: string, reply: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isMailboxOwner())) return { ok: false, error: DENIED }
  const text = typeof reply === 'string' ? reply.trim() : ''
  if (!text) return { ok: false, error: '답장을 적어 주세요' }
  if (charCount(text) > REPLY_MAX) return { ok: false, error: '답장은 300자까지 적을 수 있어요' }

  const { data, error } = await createMailboxClient()
    .from('postcards')
    .update({ reply: text, replied_at: new Date().toISOString() })
    .eq('id', id)
    .select('id')
  if (error || !data?.length) return { ok: false, error: '답장을 저장하지 못했어요' }
  revalidatePath('/', 'layout')
  return { ok: true }
}

export async function discardPostcard(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isMailboxOwner())) return { ok: false, error: DENIED }
  const { error } = await createMailboxClient().from('postcards').delete().eq('id', id)
  if (error) return { ok: false, error: '엽서를 버리지 못했어요' }
  revalidatePath('/', 'layout')
  return { ok: true }
}
