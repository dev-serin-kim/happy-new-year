const COLORS = ['var(--primary)', '#f3ece0', 'var(--pink)', 'var(--accent)', '#e7c57a']

// Burst of stars and sparkles inside host (celebrating a sent postcard or reply).
export function confetti(host: HTMLElement | null) {
  if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const burst = document.createElement('div')
  burst.className = 'burst'
  for (let i = 0; i < 30; i++) {
    const a = Math.random() * Math.PI * 2
    const r = 110 + Math.random() * 170
    burst.insertAdjacentHTML(
      'beforeend',
      `<svg viewBox="-12 -12 24 24" style="--x:${Math.cos(a) * r}px;--y:${Math.sin(a) * r - 50}px;--r:${Math.random() * 540}deg;fill:${COLORS[i % 5]};animation-delay:${Math.random() * 0.2}s"><use href="${i % 3 ? '#spark' : '#star5'}"/></svg>`,
    )
  }
  host.append(burst)
  setTimeout(() => burst.remove(), 2000)
}
