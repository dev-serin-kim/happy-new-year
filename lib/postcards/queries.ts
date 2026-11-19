import { createClient } from '@/lib/supabase/server'

import type { StampKey } from './rules'
import type { SecretPostcard, WallPostcard } from './types'

type WallRow = {
  id: string
  is_public: boolean
  stamp: StampKey
  created_at: string
  nickname: string | null
  message: string | null
  reply: string | null
}

export async function getPostcardCounts() {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('postcard_counts').single<{ total: number; public_count: number }>()
  if (error) throw error
  return { total: Number(data.total), publicCount: Number(data.public_count) }
}

export async function getWallPostcards(): Promise<WallPostcard[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('wall_postcards')
  if (error) throw error
  return ((data ?? []) as WallRow[]).map((row) =>
    row.is_public
      ? {
          id: row.id,
          isPublic: true,
          stamp: row.stamp,
          createdAt: row.created_at,
          nickname: row.nickname ?? '',
          message: row.message ?? '',
          reply: row.reply,
        }
      : { id: row.id, isPublic: false, stamp: row.stamp, createdAt: row.created_at },
  )
}

type SecretRow = { id: string; stamp: StampKey; created_at: string; nickname: string; message: string; reply: string | null }

export async function findSecretPostcards(nickname: string, birthday: string): Promise<SecretPostcard[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .rpc('open_secret_box', { p_nickname: nickname, p_birthday: birthday })
  if (error) throw error
  return ((data ?? []) as SecretRow[]).map((row) => ({
    id: row.id,
    stamp: row.stamp,
    createdAt: row.created_at,
    nickname: row.nickname,
    message: row.message,
    reply: row.reply,
  }))
}
