import Link from 'next/link'

// The single way back on every sub-screen: ← at the top left.
export function Topbar({ title, back = '/', children }: { title?: string; back?: string; children?: React.ReactNode }) {
  return (
    <div className="topbar">
      <Link className="back" href={back} aria-label="뒤로">
        ←
      </Link>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
