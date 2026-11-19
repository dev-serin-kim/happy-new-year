import { describe, expect, it } from 'vitest'

import { isValidBirthday, validateDraft, type PostcardDraft } from '@/lib/postcards/rules'

const complete: PostcardDraft = {
  message: '새해 복 많이 받아',
  nickname: '하늘이',
  stamp: 'red',
  isPublic: true,
  birthday: '',
}

describe('엽서 쓰기 입력 검증', () => {
  it('모든 항목이 있는 공개 엽서는 보낼 수 있다', () => {
    expect(validateDraft(complete)).toEqual([])
  })

  it('빠진 덕담, 닉네임, 우표를 각각 알려 준다', () => {
    expect(validateDraft({ ...complete, message: '  ', nickname: '', stamp: null })).toEqual([
      '덕담을 적어 주세요',
      '닉네임을 적어 주세요',
      '우표를 골라 주세요',
    ])
  })

  it('덕담 300자, 닉네임 10자를 넘으면 보내지 않는다', () => {
    expect(validateDraft({ ...complete, message: '가'.repeat(300), nickname: '가'.repeat(10) })).toEqual([])
    expect(validateDraft({ ...complete, message: '가'.repeat(301) })).toEqual(['덕담은 300자까지 적을 수 있어요'])
    expect(validateDraft({ ...complete, nickname: '가'.repeat(11) })).toEqual(['닉네임은 10자까지 적을 수 있어요'])
  })

  it('네 가지 우표가 아니면 우표를 골라 달라고 한다', () => {
    expect(validateDraft({ ...complete, stamp: 'gold' })).toEqual(['우표를 골라 주세요'])
  })

  it('비공개 엽서는 실제 월일 네 자리 생일이 있어야 한다', () => {
    const birthdayError = ['생일을 월일 4자리로 적어 주세요 (예: 0315)']
    expect(validateDraft({ ...complete, isPublic: false, birthday: '0315' })).toEqual([])
    expect(validateDraft({ ...complete, isPublic: false, birthday: '' })).toEqual(birthdayError)
    expect(validateDraft({ ...complete, isPublic: false, birthday: '0230' })).toEqual(birthdayError)
  })

  it('공개 엽서는 생일을 보지 않는다', () => {
    expect(validateDraft({ ...complete, birthday: '9999' })).toEqual([])
  })
})

describe('생일 MMDD', () => {
  it.each(['0101', '0229', '0315', '1231', '0430'])('%s는 있는 날짜다', (v) => {
    expect(isValidBirthday(v)).toBe(true)
  })
  it.each(['0230', '0431', '1301', '0001', '0100', '315', '03155', '03a5', ''])('%s는 거부한다', (v) => {
    expect(isValidBirthday(v)).toBe(false)
  })
})
