'use client'

import { useRef } from 'react'

import { shortDate } from '@/lib/postcards/format'
import type { StampKey } from '@/lib/postcards/rules'
import { cn } from '@/lib/utils'

import { SheepParade } from './sheep'
import { Stamp } from './stamp'

// A private postcard on the wall: shape kept, body lines greyed, faint lock.
export function SecretPostcard({ stamp, createdAt }: { stamp: StampKey; createdAt: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const peek = () => {
    const el = ref.current
    if (!el) return
    el.classList.remove('peeked')
    void el.offsetWidth
    el.classList.add('peeked')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => el.classList.remove('peeked'), 2600)
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn('sealed mini-pc block w-full text-left')}
      onClick={peek}
      aria-label={`비밀 엽서 · ${shortDate(createdAt)}`}
    >
      <div className="pc secret-pc">
        <div className="pc-head">
          <span className="pc-to">to. 세린</span>
          <Stamp stamp={stamp} className="pc-stamp" />
        </div>
        <div className="redacted" aria-hidden="true">
          <i style={{ width: '92%' }} />
          <i style={{ width: '78%' }} />
          <i style={{ width: '86%' }} />
          <i style={{ width: '40%' }} />
        </div>
        <div className="pc-from">
          from. <span className="dots">● ● ●</span>
        </div>
        <SheepParade />
        <span className="secret-lock" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <use href="#lockSolid" />
          </svg>
        </span>
      </div>
      <div className="flip-meta">
        <span>비밀 엽서 · {shortDate(createdAt)}</span>
        <span className="chip chip-line">비밀</span>
      </div>
      <div className="sealed-msg" role="status">
        보낸 사람만 비밀 우체통에서 열 수 있어요.
      </div>
    </button>
  )
}
