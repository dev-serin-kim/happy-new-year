'use client'

import { useEffect, useRef } from 'react'

import { confetti } from '@/components/postcard/confetti'
import { Letter, LetterPile } from '@/components/postcard/letter-pile'
import { Sheep, WaxSeal } from '@/components/postcard/sheep'
import { Topbar } from '@/components/postcard/topbar'

const SPARK = 'M0-12 C1 -3 3 -1 12 0 C3 1 1 3 0 12 C-1 3 -3 1 -12 0 C-3 -1 -1 -3 0 -12Z'

export function SentScreen({ isPublic, who }: { isPublic: boolean; who: string }) {
  const appRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => confetti(appRef.current), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="app center fill" ref={appRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ textAlign: 'left' }}>
        <Topbar />
      </div>
      <div className="grow" />
      <div className="stamp sent-stamp">
        <div className="stamp-in">
          <span className="fs-word" style={{ fontSize: 12, textAlign: 'left' }}>
            delivered
          </span>
          <Sheep tone="cream" style={{ animation: 'hop .8s .5s ease-out' }} />
          <span className="stamp-num" style={{ fontSize: 24 }}>
            <span>2</span>
            <span>0</span>
            <span>2</span>
            <span>7</span>
          </span>
        </div>
        <svg className="postmark-big" viewBox="0 0 166 120" role="img" aria-label="Happy New Year 소인">
          <defs>
            <filter id="inkRough" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" result="d" />
              <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="3" result="blot" />
              <feColorMatrix in="blot" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.3 1.55" result="mask" />
              <feComposite in="d" in2="mask" operator="in" />
            </filter>
          </defs>
          <g filter="url(#inkRough)">
            <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M114 46 q8 -5 16 0 t16 0 t16 0" />
              <path d="M118 60 q8 -5 16 0 t16 0 t12 0" />
              <path d="M114 74 q8 -5 16 0 t16 0 t16 0" />
            </g>
            <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="2.6" />
            <circle cx="60" cy="60" r="47" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <g fill="currentColor">
              <path transform="translate(60 9.5) scale(.32)" d={SPARK} />
              <path transform="translate(9.5 60) scale(.26)" d={SPARK} />
              <path transform="translate(110.5 60) scale(.26)" d={SPARK} />
            </g>
            <text x="60" y="54" textAnchor="middle" className="pm-hny">
              Happy
            </text>
            <text x="60" y="72" textAnchor="middle" className="pm-hny">
              New Year
            </text>
            <line x1="40" y1="81" x2="80" y2="81" stroke="currentColor" strokeWidth=".9" />
            <text x="60" y="94" textAnchor="middle" className="pm-year">
              2 0 2 7
            </text>
          </g>
        </svg>
      </div>
      <div className="stack" style={{ gap: 10, marginTop: 34 }}>
        <h2 className="big-title rise">엽서가 잘 도착했어요</h2>
        {isPublic ? (
          <p className="lead rise d1">
            모두의 엽서에 걸렸어요.
            <br />
            세린이 답장을 쓰면 엽서를 뒤집어 볼 수 있어요.
          </p>
        ) : (
          <p className="lead rise d1">
            세린이 답장을 쓰면 비밀 우체통에서
            <br />
            <b style={{ color: 'var(--foreground)' }}>{who}</b>로 열어 볼 수 있어요.
          </p>
        )}
      </div>
      <div className="grow" style={{ flex: 1.3 }} />
      <LetterPile className="two">
        {isPublic ? (
          <Letter href="/wall" className="l-open">
            <span className="l-title">모두의 엽서</span>
            <span className="l-sub">방금 보낸 엽서가 걸려 있어요</span>
          </Letter>
        ) : (
          <Letter href="/secret" className="l-secret">
            <span className="l-title">비밀 우체통</span>
            <span className="l-sub">답장이 오면 여기서 열어요</span>
            <WaxSeal className="wax-seal" />
          </Letter>
        )}
      </LetterPile>
    </main>
  )
}
