import type { StampKey } from '@/lib/postcards/rules'

import { createMailboxClient } from './session'
import type { MailboxPostcard } from './types'

const COLUMNS = 'id, nickname, message, stamp, is_public, reply, read_at, created_at'

type Row = {
  id: string
  nickname: string
  message: string
  stamp: StampKey
  is_public: boolean
  reply: string | null
  read_at: string | null
  created_at: string
}

const toPostcard = (row: Row): MailboxPostcard => ({
  id: row.id,
  nickname: row.nickname,
  message: row.message,
  stamp: row.stamp,
  isPublic: row.is_public,
  reply: row.reply,
  isNew: row.read_at === null,
  createdAt: row.created_at,
})

// Callers must have checked isMailboxOwner().
export async function listMailbox(): Promise<MailboxPostcard[]> {
  const { data, error } = await createMailboxClient()
    .from('postcards')
    .select(COLUMNS)
    .order('created_at', { ascending: false })
    .returns<Row[]>()
  if (error) throw error
  return data.map(toPostcard)
}

// Opening a postcard clears its NEW mark. Returns the postcard as it was
// before opening, or null when it no longer exists.
export async function openMailboxPostcard(id: string): Promise<MailboxPostcard | null> {
  const client = createMailboxClient()
  const { data, error } = await client.from('postcards').select(COLUMNS).eq('id', id).maybeSingle<Row>()
  if (error) throw error
  if (!data) return null
  if (data.read_at === null) {
    await client.from('postcards').update({ read_at: new Date().toISOString() }).eq('id', id)
  }
  return toPostcard(data)
}
