'use client'

import { useRef, useState, useTransition } from 'react'

import { SheepParade } from '@/components/postcard/sheep'
import { Stamp, STAMP_STYLES } from '@/components/postcard/stamp'
import { Topbar } from '@/components/postcard/topbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motionDelay, replayClass } from '@/lib/motion'
import { sendPostcard } from '@/lib/postcards/actions'
import { MESSAGE_MAX, NICKNAME_MAX, STAMPS, validateDraft, type StampKey } from '@/lib/postcards/rules'

import { SentScreen } from './sent-screen'

const SEND_MS = 3000
const FLY_MS = 520

const NOTE_PUBLIC = '공개 엽서는 누구나 볼 수 있고, 세린의 답장도 함께 공개돼요. 보낸 뒤에는 고칠 수 없어요.'
const NOTE_PRIVATE =
  '비공개 엽서는 세린과 나만 볼 수 있어요. 답장은 비밀 우체통에서 닉네임과 생일로 열어요. 보낸 뒤에는 고칠 수 없어요.'

export function WriteScreen() {
  const [message, setMessage] = useState('')
  const [nickname, setNickname] = useState('')
  const [stamp, setStamp] = useState<StampKey | null>(null)
  const [slotStamp, setSlotStamp] = useState<StampKey | null>(null)
  const [isPublic, setIsPublic] = useState(true)
  const [birthday, setBirthday] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<{ isPublic: boolean; who: string } | null>(null)
  const [, startTransition] = useTransition()

  const appRef = useRef<HTMLElement>(null)
  const composerRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLSpanElement>(null)

  // The chosen stamp flies from the picker to the stamp spot on the postcard.
  const pickStamp = (key: StampKey, button: HTMLButtonElement) => {
    setStamp(key)
    setError('')
    const app = appRef.current
    const stampEl = button.querySelector('.stamp')
    const from = stampEl?.getBoundingClientRect()
    const to = slotRef.current?.getBoundingClientRect()
    if (!app || !stampEl || !from || !to || motionDelay(FLY_MS) === 0) {
      setSlotStamp(key)
      return
    }
    const base = app.getBoundingClientRect()
    const ghost = document.createElement('div')
    ghost.className = 'stamp-fly'
    ghost.innerHTML = stampEl.outerHTML
    ;(ghost.firstElementChild as HTMLElement).style.height = '100%'
    Object.assign(ghost.style, {
      left: `${from.left - base.left}px`,
      top: `${from.top - base.top}px`,
      width: `${from.width}px`,
      height: `${from.height}px`,
    })
    app.append(ghost)
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        Object.assign(ghost.style, {
          left: `${to.left - base.left}px`,
          top: `${to.top - base.top}px`,
          width: '46px',
          height: '56px',
        }),
      ),
    )
    setTimeout(() => {
      ghost.remove()
      setSlotStamp(key)
    }, FLY_MS)
  }

  const fail = (errors: string[]) => {
    setError(errors.join(' · '))
    replayClass(composerRef.current, 'shaking')
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    const draft = { message, nickname, stamp, isPublic, birthday }
    const errors = validateDraft(draft)
    if (errors.length) return fail(errors)

    setError('')
    setSending(true)
    startTransition(async () => {
      const [result] = await Promise.all([
        sendPostcard(draft),
        new Promise((resolve) => setTimeout(resolve, motionDelay(SEND_MS))),
      ])
      setSending(false)
      if (!result.ok) return fail(result.errors)
      setSent({ isPublic, who: `${nickname.trim()} · ${birthday}` })
    })
  }

  if (sent) return <SentScreen isPublic={sent.isPublic} who={sent.who} />

  return (
    <main className="app" ref={appRef} style={{ position: 'relative' }}>
      <Topbar title="엽서 쓰기" />
      <form className="stack" noValidate onSubmit={submit}>
        <div className="pc rise" ref={composerRef}>
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
              <span ref={slotRef}>
                {slotStamp ? (
                  <Stamp stamp={slotStamp} className="pc-stamp" />
                ) : (
                  <span className="pc-slot">
                    우표를
                    <br />
                    붙여
                    <br />
                    주세요
                  </span>
                )}
              </span>
            </span>
          </div>
          <textarea
            className="pc-msg"
            maxLength={MESSAGE_MAX}
            placeholder="새해에 전하고 싶은 말을 적어 주세요"
            aria-label="덕담"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="pc-from">
            from.{' '}
            <input
              className="line-input"
              maxLength={NICKNAME_MAX}
              placeholder="닉네임"
              autoComplete="off"
              aria-label="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <SheepParade />
        </div>
        <div className="err-line" role="alert" style={{ marginTop: -6 }}>
          {error}
        </div>

        <div>
          <span className="label" id="stamp-label">
            우표 고르기
          </span>
          <div className="stamp-picker" role="radiogroup" aria-labelledby="stamp-label">
            {STAMPS.map((key) => (
              <button
                key={key}
                type="button"
                className="stamp-opt"
                role="radio"
                aria-checked={stamp === key}
                onClick={(e) => pickStamp(key, e.currentTarget)}
              >
                <Stamp stamp={key} />
                {STAMP_STYLES[key].name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="label" id="vis-label">
            누가 볼 수 있나요?
          </span>
          <div className="vis" role="radiogroup" aria-labelledby="vis-label">
            <button type="button" role="radio" aria-checked={isPublic} onClick={() => setIsPublic(true)}>
              <span className="pm">
                OPEN
                <br />
                2027
              </span>
              <span>
                <b>공개</b>
                <small>모두의 엽서에 걸려요</small>
              </span>
            </button>
            <button type="button" role="radio" aria-checked={!isPublic} onClick={() => setIsPublic(false)}>
              <span className="pm">
                SECRET
                <br />
                2027
              </span>
              <span>
                <b>비공개</b>
                <small>세린과 나만 봐요</small>
              </span>
            </button>
          </div>
        </div>
        <div className={isPublic ? 'birth closed' : 'birth'} aria-hidden={isPublic}>
          <div>
            <div className="field-dark">
              <label className="label" htmlFor="birthday">
                생일 4자리 · 비밀 우체통 비밀번호
              </label>
              <Input
                id="birthday"
                inputMode="numeric"
                maxLength={4}
                placeholder="예: 0315"
                autoComplete="off"
                tabIndex={isPublic ? -1 : 0}
                value={birthday}
                onChange={(e) => setBirthday(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>
        </div>
        <p className="lead" style={{ fontSize: 12.5 }}>
          {isPublic ? NOTE_PUBLIC : NOTE_PRIVATE}
        </p>
        <Button type="submit" variant="postal" size="postal" disabled={sending}>
          <b>우체통에 넣기</b>
          <span>→</span>
        </Button>
      </form>

      {sending && (
        <div className="overlay">
          <div className="env-scene sending">
            <div className="env-group">
              <div className="env-flap" />
              <div className="env-back" />
              <div className="env-letter">
                <div className="pc">
                  <span className="pc-to">to. 세린</span>
                  <p className="pc-msg">{message}</p>
                </div>
              </div>
              <div className="env-front" />
              <div className="env-seal">{stamp && <Stamp stamp={stamp} style={{ height: '100%' }} />}</div>
            </div>
            <div className="env-caption">양에게 날아가는 중…</div>
          </div>
        </div>
      )}
    </main>
  )
}
