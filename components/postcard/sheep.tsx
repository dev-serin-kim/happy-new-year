import { cn } from '@/lib/utils'

export type SheepTone = 'cream' | 'red' | 'ghost' | 'silver'

export function Sheep({ tone, className, style }: { tone: SheepTone; className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={cn('sheep', `sheep-${tone}`, className)} viewBox="0 0 240 180" style={style} aria-hidden="true">
      <use href="#sheep" />
    </svg>
  )
}

export function WaxSeal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" aria-hidden="true">
      <use href="#wax" />
    </svg>
  )
}

export function Sparkle({ style }: { style: React.CSSProperties }) {
  return (
    <svg className="sparkle" style={style} viewBox="-12 -12 24 24" aria-hidden="true">
      <use href="#spark" />
    </svg>
  )
}

export function SheepParade() {
  return (
    <div className="pc-parade">
      {Array.from({ length: 5 }, (_, i) => (
        <Sheep key={i} tone={i % 2 ? 'ghost' : 'red'} />
      ))}
    </div>
  )
}
