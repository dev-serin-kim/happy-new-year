import type { StampKey } from '@/lib/postcards/rules'
import { cn } from '@/lib/utils'

import { Sheep, type SheepTone } from './sheep'

export const STAMP_STYLES: Record<StampKey, { name: string; color: string; sheep: SheepTone }> = {
  red: { name: '붉은 양', color: 'var(--primary)', sheep: 'cream' },
  cream: { name: '크림 양', color: 'var(--cream)', sheep: 'red' },
  night: { name: '별밤 양', color: 'var(--maroon)', sheep: 'cream' },
  silver: { name: '은박 양', color: '#9e2a24', sheep: 'silver' },
}

// Small perforated stamp with a sheep, used on postcards and pickers.
export function Stamp({ stamp, className, style }: { stamp: StampKey; className?: string; style?: React.CSSProperties }) {
  const s = STAMP_STYLES[stamp]
  return (
    <span
      className={cn('stamp sm', className)}
      style={{ '--c': s.color, ...style } as React.CSSProperties}
      role="img"
      aria-label={`${s.name} 우표`}
    >
      <span className="stamp-in">
        <Sheep tone={s.sheep} />
      </span>
    </span>
  )
}
