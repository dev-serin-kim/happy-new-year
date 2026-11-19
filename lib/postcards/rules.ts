export const STAMPS = ['red', 'cream', 'night', 'silver'] as const
export type StampKey = (typeof STAMPS)[number]

export const MESSAGE_MAX = 300
export const NICKNAME_MAX = 10
export const REPLY_MAX = 300

export type PostcardDraft = {
  message: string
  nickname: string
  stamp: string | null
  isPublic: boolean
  birthday: string
}

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// Character count as Postgres char_length sees it (code points).
export const charCount = (value: string) => Array.from(value).length

export const isStampKey = (value: unknown): value is StampKey =>
  typeof value === 'string' && (STAMPS as readonly string[]).includes(value)

export function isValidBirthday(value: string): boolean {
  if (!/^\d{4}$/.test(value)) return false
  const month = Number(value.slice(0, 2))
  const day = Number(value.slice(2))
  return month >= 1 && month <= 12 && day >= 1 && day <= DAYS_IN_MONTH[month - 1]
}

export function validateDraft(draft: PostcardDraft): string[] {
  const errors: string[] = []
  const nickname = draft.nickname.trim()

  if (!draft.message.trim()) errors.push('덕담을 적어 주세요')
  else if (charCount(draft.message) > MESSAGE_MAX) errors.push('덕담은 300자까지 적을 수 있어요')

  if (!nickname) errors.push('닉네임을 적어 주세요')
  else if (charCount(nickname) > NICKNAME_MAX) errors.push('닉네임은 10자까지 적을 수 있어요')

  if (!isStampKey(draft.stamp)) errors.push('우표를 골라 주세요')

  if (!draft.isPublic && !isValidBirthday(draft.birthday)) {
    errors.push('생일을 월일 4자리로 적어 주세요 (예: 0315)')
  }

  return errors
}
