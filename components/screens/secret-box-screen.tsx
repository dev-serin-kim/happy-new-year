'use client'

import Link from 'next/link'
import { useRef, useState, useTransition } from 'react'

import { WaxSeal } from '@/components/postcard/sheep'
import { Topbar } from '@/components/postcard/topbar'
import { Button } from '@/components/ui/button'
import { motionDelay, replayClass } from '@/lib/motion'
import { openSecretBox } from '@/lib/postcards/actions'
import { NICKNAME_MAX } from '@/lib/postcards/rules'
import type { SecretPostcard } from '@/lib/postcards/types'

import { MySecretPostcards } from './my-secret-postcards'

const OPEN_MS = 1000

export function SecretBoxScreen() {
  const [nickname, setNickname] = useState('')
  const [birthday, setBirthday] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [opening, setOpening] = useState(false)
  const [opened, setOpened] = useState<{ nickname: string; postcards: SecretPostcard[] } | null>(null)
  const [pending, startTransition] = useTransition()
  const envRef = useRef<HTMLDivElement>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pending || opening) return
    startTransition(async () => {
      const postcards = await openSecretBox(nickname, birthday)
      if (postcards.length === 0) {
        setNotFound(true)
        replayClass(envRef.current, 'denied')
        return
      }
      setOpening(true)
      setTimeout(() => {
        setOpening(false)
        setOpened({ nickname: nickname.trim(), postcards })
      }, motionDelay(OPEN_MS))
    })
  }

  const edit = (setter: (v: string) => void) => (value: string) => {
    setter(value)
    setNotFound(false)
  }

  if (opened) {
    return <MySecretPostcards nickname={opened.nickname} postcards={opened.postcards} onBack={() => setOpened(null)} />
  }

  return (
    <main className="app fill">
      <Topbar title="비밀 우체통" />
      <p className="lead" style={{ margin: '0 0 10px' }}>
        비공개로 보낼 때 적은 닉네임과 생일로
        <br />
        봉투를 열 수 있어요.
      </p>
      <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="grow" style={{ flex: 0.7 }} />
        <div className={opening ? 'lk-env opening' : 'lk-env'} ref={envRef}>
          <svg className="env-back-art" viewBox="0 0 340 230" preserveAspectRatio="none" aria-hidden="true">
            <rect width="340" height="230" fill="#efe4cf" />
            <path d="M0 0 L168 124 Q170 126 172 124 L340 0 L340 230 L0 230 Z" fill="#e8dcc4" />
            <path d="M0 230 L160 112 Q170 105 180 112 L340 230 Z" fill="#e3d6bc" />
            <path d="M0 230 L160 112 Q170 105 180 112 L340 230" fill="none" stroke="rgb(29 24 22 / 10%)" strokeWidth="1.2" />
            <path d="M0 0 L0 230 M340 0 L340 230" stroke="rgb(29 24 22 / 8%)" />
          </svg>
          <svg className="env-flap-art" viewBox="0 0 340 140" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0 L340 0 L186 126 Q170 138 154 126 Z" fill="#f4ebd9" />
            <path d="M0 0 L154 126 Q170 138 186 126 L340 0" fill="none" stroke="rgb(29 24 22 / 16%)" strokeWidth="1.2" />
          </svg>
          <WaxSeal className="lk-wax" />
          <div className="lk-label">
            <label className="lk-row">
              <span>NAME</span>
              <input
                className="line-input"
                maxLength={NICKNAME_MAX}
                placeholder="닉네임"
                autoComplete="off"
                value={nickname}
                onChange={(e) => edit(setNickname)(e.target.value)}
              />
            </label>
            <label className="lk-row">
              <span>BIRTHDAY</span>
              <input
                className="line-input"
                inputMode="numeric"
                maxLength={4}
                placeholder="0315"
                autoComplete="off"
                value={birthday}
                onChange={(e) => edit(setBirthday)(e.target.value.replace(/\D/g, ''))}
              />
            </label>
          </div>
        </div>
        <div className="err-line" role="alert" style={{ marginTop: 14 }}>
          {notFound && '이 닉네임과 생일로 보낸 비공개 엽서가 없어요. 보낼 때 적은 그대로인지 확인해 주세요.'}
        </div>
        <div className="grow" />
        <div>
          <Button type="submit" variant="postal" size="postal" disabled={pending || opening}>
            <b>봉투 열기</b>
            <span>→</span>
          </Button>
        </div>
        <p className="lead center" style={{ marginTop: 18, fontSize: 12.5 }}>
          공개로 보낸 엽서의 답장은{' '}
          <Link href="/wall" style={{ color: 'var(--foreground)', textDecoration: 'underline' }}>
            모두의 엽서
          </Link>
          에서 바로 볼 수 있어요.
        </p>
      </form>
    </main>
  )
}
