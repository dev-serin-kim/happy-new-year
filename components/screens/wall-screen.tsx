import Link from 'next/link'

import { FlipPostcard } from '@/components/postcard/flip-postcard'
import { SecretPostcard } from '@/components/postcard/secret-postcard'
import { Sheep } from '@/components/postcard/sheep'
import { Topbar } from '@/components/postcard/topbar'
import { buttonVariants } from '@/components/ui/button'
import type { WallPostcard } from '@/lib/postcards/types'

export function WallScreen({ postcards }: { postcards: WallPostcard[] }) {
  const publicCount = postcards.filter((p) => p.isPublic).length

  return (
    <main className="app fill">
      <Topbar title="모두의 엽서">
        {postcards.length > 0 && (
          <span className="muted" style={{ fontSize: 12.5, marginRight: 6 }}>
            공개 {publicCount} · 비밀 {postcards.length - publicCount}
          </span>
        )}
      </Topbar>
      {postcards.length > 0 ? (
        <>
          <p className="lead" style={{ margin: '0 0 16px', fontSize: 13 }}>
            엽서를 누르면 뒤집혀서 세린의 답장이 보여요.
          </p>
          <div style={{ columns: 2, columnGap: 12 }}>
            {postcards.map((p) =>
              p.isPublic ? (
                <FlipPostcard
                  key={p.id}
                  mini
                  card={p}
                  reply={p.reply}
                  meta={
                    <div className="flip-meta">
                      <span>{p.nickname}</span>
                      {p.reply ? (
                        <span className="chip chip-red">답장 있음</span>
                      ) : (
                        <span className="chip chip-line">답장 전</span>
                      )}
                    </div>
                  }
                />
              ) : (
                <SecretPostcard key={p.id} stamp={p.stamp} createdAt={p.createdAt} />
              ),
            )}
          </div>
        </>
      ) : (
        <div className="empty">
          <Sheep tone="red" style={{ width: 120, animation: 'bobble 3s infinite' }} />
          <h3>첫 엽서를 기다리고 있어요</h3>
          <p>공개로 보낸 엽서와 세린의 답장이 여기에 모여요.</p>
          <Link
            href="/write"
            className={buttonVariants({ variant: 'postal', size: 'postal-sm' })}
            style={{ marginTop: 14, maxWidth: 240 }}
          >
            <b>첫 엽서 쓰기</b>
            <span>→</span>
          </Link>
        </div>
      )}
    </main>
  )
}
