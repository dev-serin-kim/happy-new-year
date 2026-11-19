'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Sheep } from '@/components/postcard/sheep'
import { Stamp } from '@/components/postcard/stamp'
import { Topbar } from '@/components/postcard/topbar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { MailboxPostcard } from '@/lib/mailbox/types'
import { shortDate } from '@/lib/postcards/format'
import { cn } from '@/lib/utils'

export function InboxScreen({ postcards }: { postcards: MailboxPostcard[] }) {
  const waiting = postcards.filter((p) => !p.reply)
  const done = postcards.filter((p) => p.reply)
  const publicCount = postcards.filter((p) => p.isPublic).length

  const copyAddress = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/`)
    toast('주소를 복사했어요')
  }

  return (
    <main className="app fill">
      <Topbar title="세린의 우체통" />
      {postcards.length === 0 ? (
        <div className="empty">
          <Sheep tone="red" style={{ width: 120, animation: 'bobble 3s infinite' }} />
          <h3>아직 도착한 엽서가 없어요</h3>
          <p>친구들에게 연하장 주소를 보내 보세요.</p>
          <Button
            variant="postal-secondary"
            size="postal-sm"
            style={{ marginTop: 14, maxWidth: 240 }}
            onClick={copyAddress}
          >
            <b>주소 복사하기</b>
            <span>⧉</span>
          </Button>
        </div>
      ) : (
        <div>
          <div className="owner-sum">
            <div className="hot">
              <b>{waiting.length}</b>
              <span>답장 기다리는 중</span>
            </div>
            <div>
              <b>{postcards.length}</b>
              <span>
                받은 엽서 · 공개 {publicCount} · 비공개 {postcards.length - publicCount}
              </span>
            </div>
          </div>
          <Tabs defaultValue="wait" className="gap-0">
            <TabsList variant="line" className="tabs w-full justify-start">
              <TabsTrigger value="wait">
                답장 전<span>{waiting.length}</span>
              </TabsTrigger>
              <TabsTrigger value="done">
                답장 완료<span>{done.length}</span>
              </TabsTrigger>
              <TabsTrigger value="all">
                전체<span>{postcards.length}</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="wait">
              <InboxList postcards={waiting} />
            </TabsContent>
            <TabsContent value="done">
              <InboxList postcards={done} />
            </TabsContent>
            <TabsContent value="all">
              <InboxList postcards={postcards} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </main>
  )
}

function InboxList({ postcards }: { postcards: MailboxPostcard[] }) {
  const router = useRouter()
  return (
    <div className="inbox">
      {postcards.map((p, i) => (
        <button
          key={p.id}
          type="button"
          className={cn('inbox-item', p.isNew && 'new')}
          style={{ animationDelay: `${i * 40}ms` }}
          onClick={() => router.push(`/mailbox/${p.id}`)}
        >
          <span>
            <span className="nm">
              {p.nickname} {!p.isPublic && <span className="lock">비공개</span>}
            </span>
            <span className="pv">{p.message}</span>
          </span>
          <span className="side">
            <Stamp stamp={p.stamp} className="pc-stamp" />
            <span>
              {p.reply ? (
                <span className="chip chip-red">답장 완료</span>
              ) : p.isNew ? (
                `NEW · ${shortDate(p.createdAt)}`
              ) : (
                shortDate(p.createdAt)
              )}
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}
