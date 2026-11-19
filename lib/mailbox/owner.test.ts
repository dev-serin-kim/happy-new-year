import { expect, it } from 'vitest'

import { isMailboxOwnerEmail } from '@/lib/mailbox/owner'

it('설정한 세린의 이메일로 로그인했을 때만 세린으로 본다', () => {
  expect(isMailboxOwnerEmail('serin@example.com', 'Serin@Example.com ')).toBe(true)
  expect(isMailboxOwnerEmail('friend@example.com', 'serin@example.com')).toBe(false)
  expect(isMailboxOwnerEmail(undefined, 'serin@example.com')).toBe(false)
})

it('세린의 이메일이 설정되지 않았으면 아무도 세린이 아니다', () => {
  expect(isMailboxOwnerEmail('serin@example.com', undefined)).toBe(false)
  expect(isMailboxOwnerEmail('', '')).toBe(false)
})
