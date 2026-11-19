'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { confetti } from '@/components/postcard/confetti'
import { Postcard, ReplyCard, ReplyHead } from '@/components/postcard/postcard'
import { SheepParade } from '@/components/postcard/sheep'
import { Topbar } from '@/components/postcard/topbar'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { discardPostcard, saveReply } from '@/lib/mailbox/actions'
import type { MailboxPostcard } from '@/lib/mailbox/types'
import { longDate } from '@/lib/postcards/format'
import { charCount, REPLY_MAX } from '@/lib/postcards/rules'

export function CardDetailScreen({ postcard }: { postcard: MailboxPostcard }) {
  const router = useRouter()
  const [reply, setReply] = useState(postcard.reply)
  const [editing, setEditing] = useState(!postcard.reply)
  const [draft, setDraft] = useState(postcard.reply ?? '')
  const [confirming, setConfirming] = useState(false)
  const [pending, startTransition] = useTransition()
  const appRef = useRef<HTMLElement>(null)

  const hint = postcard.isPublic ? '공개 엽서라 답장도 모두의 엽서에 공개돼요.' : '비공개 엽서라 보낸 친구만 볼 수 있어요.'

  const send = () => {
    const first = !reply
    startTransition(async () => {
      const result = await saveReply(postcard.id, draft)
      if (!result.ok) {
        toast(result.error)
        return
      }
      setReply(draft.trim())
      setDraft(draft.trim())
      setEditing(false)
      confetti(appRef.current)
      toast(first ? '답장을 보냈어요' : '답장을 고쳤어요')
      router.refresh()
    })
  }

  const discard = () => {
    startTransition(async () => {
      const result = await discardPostcard(postcard.id)
      if (!result.ok) {
        toast(result.error)
        return
      }
      setConfirming(false)
      router.replace('/mailbox')
      router.refresh()
      setTimeout(() => toast('엽서를 버렸어요'), 60)
    })
  }

  return (
    <main className="app" ref={appRef} style={{ position: 'relative' }}>
      <Topbar title={`${postcard.nickname} 님의 엽서`} back="/mailbox">
        <button
          type="button"
          className="text-link"
          style={{ color: 'var(--destructive)', marginRight: 6 }}
          onClick={() => setConfirming(true)}
        >
          버리기
        </button>
      </Topbar>
      <div className="rise">
        <Postcard card={postcard} />
      </div>
      <div className="flip-meta">
        <span>{longDate(postcard.createdAt)}에 도착</span>
        <span className="chip chip-cream">{postcard.isPublic ? '공개 · 모두의 엽서' : '비공개'}</span>
      </div>

      <div style={{ marginTop: 22 }} className="rise d1">
        {reply && !editing ? (
          <>
            <span className="label">내 답장</span>
            <ReplyCard nickname={postcard.nickname} reply={reply} />
            <div className="flip-meta">
              <span>{hint}</span>
              <button type="button" className="text-link" style={{ padding: 0 }} onClick={() => setEditing(true)}>
                답장 고치기
              </button>
            </div>
          </>
        ) : (
          <>
            <label className="label" htmlFor="reply">
              {reply ? '답장 고치기' : `${postcard.nickname} 님에게 답장`}
            </label>
            <div className="pc reply">
              <ReplyHead nickname={postcard.nickname} />
              <textarea
                id="reply"
                className="pc-msg"
                maxLength={REPLY_MAX}
                placeholder="고마운 마음을 담아 답장을 써 보세요"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <div className="pc-from">from. 세린</div>
              <SheepParade />
            </div>
            <div className="flip-meta">
              <span>{hint}</span>
              <span>
                {charCount(draft)} / {REPLY_MAX}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              {reply && (
                <button
                  type="button"
                  className="text-link"
                  style={{ flex: 'none', padding: '0 12px' }}
                  onClick={() => {
                    setDraft(reply)
                    setEditing(false)
                  }}
                >
                  취소
                </button>
              )}
              <Button variant="postal" size="postal" disabled={!draft.trim() || pending} onClick={send}>
                <b>{reply ? '고친 답장 보내기' : '답장 보내기'}</b>
                <span>→</span>
              </Button>
            </div>
          </>
        )}
      </div>

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent className="dialog">
          <AlertDialogTitle render={<h3 />}>이 엽서를 버릴까요?</AlertDialogTitle>
          <AlertDialogDescription>
            버리면 되돌릴 수 없어요. 모두의 엽서에서도 사라지고, 보낸 친구도 더 이상 이 엽서와 답장을 볼 수 없어요.
          </AlertDialogDescription>
          <div className="row">
            <button type="button" className="plain-btn" onClick={() => setConfirming(false)}>
              취소
            </button>
            <Button variant="postal-danger" size="postal" disabled={pending} onClick={discard}>
              <b>버리기</b>
              <span>✕</span>
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
