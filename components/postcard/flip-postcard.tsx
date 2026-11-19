'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Postcard, ReplyCard, type PostcardContent } from './postcard'

// A postcard that turns over to show Serin's reply when pressed.
export function FlipPostcard({
  card,
  reply,
  meta,
  mini,
}: {
  card: PostcardContent
  reply: string | null
  meta: React.ReactNode
  mini?: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className={mini ? 'mini-pc' : undefined} style={{ breakInside: 'avoid', marginBottom: mini ? 16 : 0 }}>
      <button
        type="button"
        className={cn('flip block w-full text-left', flipped && 'flipped')}
        aria-pressed={flipped}
        aria-label={flipped ? '엽서 앞면 보기' : '뒤집어서 답장 보기'}
        onClick={() => setFlipped((v) => !v)}
      >
        <div className="flip-inner">
          <div aria-hidden={flipped}>
            <Postcard card={card} />
          </div>
          <div className="flip-back" aria-hidden={!flipped}>
            <ReplyCard nickname={card.nickname} reply={reply} />
          </div>
        </div>
      </button>
      {meta}
    </div>
  )
}
