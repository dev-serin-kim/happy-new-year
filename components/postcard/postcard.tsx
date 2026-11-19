import type { StampKey } from '@/lib/postcards/rules'
import { shortDate, yearOf } from '@/lib/postcards/format'

import { Sheep, SheepParade } from './sheep'
import { Stamp } from './stamp'

export type PostcardContent = {
  nickname: string
  message: string
  stamp: StampKey
  isPublic: boolean
  createdAt: string
}

// Back of a friend's postcard: to. 세린, happy new year, stamp, lines, from.
export function Postcard({ card }: { card: PostcardContent }) {
  return (
    <div className="pc">
      <div className="pc-head">
        <span className="pc-to">to. 세린</span>
        <span className="pc-corner">
          <span className="pc-hny">
            happy
            <br />
            new
            <br />
            year
          </span>
          <Stamp stamp={card.stamp} className="pc-stamp" />
        </span>
      </div>
      <div className={card.isPublic ? 'pc-postmark' : 'pc-postmark secret'} aria-hidden="true">
        {card.isPublic ? 'OPEN' : 'SECRET'}
        <br />
        {shortDate(card.createdAt)}
        <br />
        {yearOf(card.createdAt)}
      </div>
      <p className="pc-msg">{card.message}</p>
      <div className="pc-from">from. {card.nickname}</div>
      <SheepParade />
    </div>
  )
}

// Serin's reply in the same postcard form with a red inner border.
export function ReplyCard({ nickname, reply }: { nickname: string; reply: string | null }) {
  if (!reply) {
    return (
      <div className="pc reply waiting">
        <Sheep tone="red" />
        <p>답장을 쓰는 중이에요</p>
        <span>조금만 기다려 주세요</span>
      </div>
    )
  }
  return (
    <div className="pc reply">
      <ReplyHead nickname={nickname} />
      <p className="pc-msg">{reply}</p>
      <div className="pc-from">from. 세린</div>
      <SheepParade />
    </div>
  )
}

export function ReplyHead({ nickname }: { nickname: string }) {
  return (
    <div className="pc-head">
      <span className="pc-to">re. {nickname}</span>
      <span className="pc-corner">
        <span className="pc-hny" style={{ color: 'var(--ink)' }}>
          with
          <br />
          love
        </span>
        <Stamp stamp="red" className="pc-stamp" />
      </span>
    </div>
  )
}
