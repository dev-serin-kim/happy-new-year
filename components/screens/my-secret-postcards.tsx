'use client'

import Link from 'next/link'

import { FlipPostcard } from '@/components/postcard/flip-postcard'
import { buttonVariants } from '@/components/ui/button'
import { longDate } from '@/lib/postcards/format'
import type { SecretPostcard } from '@/lib/postcards/types'

// The friend's private postcards and Serin's replies, opened from the secret box.
export function MySecretPostcards({
  nickname,
  postcards,
  onBack,
}: {
  nickname: string
  postcards: SecretPostcard[]
  onBack: () => void
}) {
  return (
    <main className="app">
      <div className="topbar">
        <button type="button" className="back" onClick={onBack} aria-label="뒤로">
          ←
        </button>
        <h1>{nickname} 님의 비밀 엽서</h1>
      </div>
      <p className="lead" style={{ margin: '0 0 18px', fontSize: 13 }}>
        엽서를 누르면 뒤집혀서 세린의 답장이 보여요.
      </p>
      <div className="stack" style={{ gap: 26 }}>
        {postcards.map((p, i) => (
          <div key={p.id} className="rise" style={{ animationDelay: `${i * 100}ms` }}>
            <FlipPostcard
              card={{ ...p, isPublic: false }}
              reply={p.reply}
              meta={
                <div className="flip-meta">
                  <span>{longDate(p.createdAt)}에 보냄</span>
                  {p.reply ? (
                    <span className="chip chip-red">답장 도착</span>
                  ) : (
                    <span className="chip chip-line">답장 기다리는 중</span>
                  )}
                </div>
              }
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 30 }}>
        <Link href="/write" className={buttonVariants({ variant: 'postal-secondary', size: 'postal-sm' })}>
          <b>엽서 한 장 더 쓰기</b>
          <span>→</span>
        </Link>
      </div>
    </main>
  )
}
