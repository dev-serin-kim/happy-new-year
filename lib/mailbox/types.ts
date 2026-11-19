import type { StampKey } from '@/lib/postcards/rules'

export type MailboxPostcard = {
  id: string
  nickname: string
  message: string
  stamp: StampKey
  isPublic: boolean
  reply: string | null
  isNew: boolean
  createdAt: string
}
