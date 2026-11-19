'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { Letter, LetterPile } from '@/components/postcard/letter-pile'
import { Sheep, Sparkle, WaxSeal } from '@/components/postcard/sheep'
import { replayClass } from '@/lib/motion'

export function HomeScreen({ total, publicCount }: { total: number; publicCount: number }) {
  const stampRef = useRef<HTMLDivElement>(null)

  return (
    <main className="app home">
      <div className="stamp hero-stamp" ref={stampRef} onClick={() => replayClass(stampRef.current, 'hopping')}>
        <div className="stamp-in">
          <div className="fs-row">
            <span className="fs-tag">2027 · 丁未年</span>
            <Link className="fs-owner" href="/mailbox" onClick={(e) => e.stopPropagation()} aria-label="세린의 우체통 열기">
              세린의 우체통 →
            </Link>
          </div>
          <div className="fs-sheep">
            <svg className="hero-art" viewBox="0 0 300 270" role="img" aria-label="here's to new beginnings">
              <path id="heroArc" d="M 28 178 A 122 122 0 0 1 272 178" fill="none" />
              <text className="arc-text">
                <textPath href="#heroArc" startOffset="50%" textAnchor="middle">
                  here’s to new beginnings
                </textPath>
              </text>
              <g className="sheep-cream arc-sheep">
                <svg x="48" y="104" width="204" height="153" viewBox="0 0 240 180">
                  <use href="#sheep" />
                </svg>
              </g>
            </svg>
            <Sparkle style={{ left: '4%', top: '8%', width: 16, height: 16, fill: '#f3ece0' }} />
            <Sparkle style={{ right: '3%', top: '20%', width: 22, height: 22, fill: 'var(--pink)', animationDelay: '1s' }} />
            <Sparkle style={{ left: '10%', bottom: '4%', width: 20, height: 20, fill: 'var(--pink)', animationDelay: '.6s' }} />
            <Sparkle style={{ right: '8%', bottom: '10%', width: 14, height: 14, fill: '#f3ece0', animationDelay: '1.7s' }} />
          </div>
          <div className="hero-meta">
            <span>{total > 0 ? `세린에게 ${total}통 도착` : '첫 엽서를 기다려요'}</span>
          </div>
          <div className="stamp-num" aria-label="2027">
            <span>2</span>
            <span>0</span>
            <span>2</span>
            <span>7</span>
          </div>
        </div>
      </div>

      <LetterPile>
        <Letter href="/secret" className="l-secret">
          <span className="l-title">비밀 우체통</span>
          <span className="l-sub">닉네임과 생일로 답장 열기</span>
          <WaxSeal className="wax-seal" />
        </Letter>
        <Letter href="/wall" className="l-open">
          <span className="l-title">
            모두의 엽서 <span className="l-count">{publicCount}장</span>
          </span>
          <span className="l-sub">공개 엽서와 세린의 답장</span>
        </Letter>
        <Letter href="/write" className="l-write">
          <span className="l-to">to. 세린</span>
          <span className="l-title">엽서 쓰기</span>
          <span className="l-lines" />
          <Sheep tone="red" className="l-sheep" />
        </Letter>
      </LetterPile>
    </main>
  )
}
