'use server'

import { createClient } from '@/lib/supabase/server'

import { findSecretPostcards } from './queries'
import { isValidBirthday, validateDraft, type PostcardDraft } from './rules'
import type { SecretPostcard } from './types'

export async function sendPostcard(draft: PostcardDraft): Promise<{ ok: true } | { ok: false; errors: string[] }> {
  const errors = validateDraft(draft)
  if (errors.length) return { ok: false, errors }

  const supabase = await createClient()
  const { error } = await supabase.rpc('send_postcard', {
    p_nickname: draft.nickname.trim(),
    p_message: draft.message,
    p_stamp: draft.stamp,
    p_is_public: draft.isPublic,
    p_birthday: draft.isPublic ? null : draft.birthday,
  })
  if (error) return { ok: false, errors: ['엽서를 보내지 못했어요. 잠시 뒤 다시 시도해 주세요'] }
  return { ok: true }
}

export async function openSecretBox(nickname: string, birthday: string): Promise<SecretPostcard[]> {
  if (typeof nickname !== 'string' || typeof birthday !== 'string') return []
  if (!nickname.trim() || !isValidBirthday(birthday)) return []
  return findSecretPostcards(nickname, birthday)
}
