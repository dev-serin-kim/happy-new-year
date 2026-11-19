'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState, useTransition } from 'react'

import { Sheep } from '@/components/postcard/sheep'
import { Topbar } from '@/components/postcard/topbar'
import { Button } from '@/components/ui/button'
import { openMailbox } from '@/lib/mailbox/actions'
import { motionDelay, replayClass } from '@/lib/motion'

const OPEN_MS = 950

// Serin's sign-in, drawn as a red postbox and a key tag.
export function MailboxOpenScreen({ total }: { total: number }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [denied, setDenied] = useState(false)
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const boxRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLFormElement>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pending || open) return
    startTransition(async () => {
      const { ok } = await openMailbox(email, password)
      if (!ok) {
        setDenied(true)
        replayClass(boxRef.current, 'denied')
        replayClass(tagRef.current, 'denied')
        return
      }
      setOpen(true)
      setTimeout(() => {
        router.replace('/mailbox')
        router.refresh()
      }, motionDelay(OPEN_MS))
    })
  }

  const edit = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
    setDenied(false)
  }

  return (
    <main className="app fill">
      <Topbar title="우체통 열기" />
      <div className="grow" />
      <div className={open ? 'postbox open' : 'postbox'} ref={boxRef}>
        <Sheep tone="cream" className="pb-sheep" />
        <div className="pb-body">
          <div className="pb-slot">
            <span className="pb-peek" />
          </div>
          <div className="pb-plate">
            <span>세린의 우체통</span>
            <small>2027 · 丁未年</small>
          </div>
          <div className="pb-window">
            <b>{total}</b>
            <small>통</small>
          </div>
          <div className="pb-door">
            <span className="pb-handle" />
          </div>
          <div className="pb-inside">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="pb-base" />
      </div>

      <form className="keytag" id="keytag" ref={tagRef} onSubmit={submit} noValidate>
        <span className="kt-hole" />
        <label className="kt-row">
          <span>EMAIL</span>
          <input className="line-input" type="email" autoComplete="username" value={email} onChange={edit(setEmail)} />
        </label>
        <label className="kt-row">
          <span>PASSWORD</span>
          <input
            className="line-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={edit(setPassword)}
          />
        </label>
      </form>
      <div className="err-line" role="alert">
        {denied && '이메일이나 비밀번호가 맞지 않아요. 다시 확인해 주세요.'}
      </div>
      <div className="grow" />
      <div>
        <Button type="submit" form="keytag" variant="postal" size="postal" disabled={pending || open}>
          <b>우체통 열기</b>
          <span>→</span>
        </Button>
      </div>
      <p className="lead center" style={{ marginTop: 14, fontSize: 12.5 }}>
        이 우체통은 세린만 열 수 있어요.
      </p>
    </main>
  )
}
