'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { motionDelay } from '@/lib/motion'
import { cn } from '@/lib/utils'

const PULL_MS = 600

// Stacked letters that lift away before moving to the next screen.
export function LetterPile({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('pile', className)}>{children}</div>
}

export function Letter({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const router = useRouter()
  const ref = useRef<HTMLAnchorElement>(null)

  const pull = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    const el = ref.current
    const pile = el?.closest('.pile')
    if (!el || el.classList.contains('pulled')) return
    router.prefetch(href)
    pile?.classList.add('pulling')
    el.classList.add('pulled')
    setTimeout(() => router.push(href), motionDelay(PULL_MS))
  }

  return (
    <Link ref={ref} href={href} className={cn('letter', className)} onClick={pull}>
      {children}
    </Link>
  )
}
