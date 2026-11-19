// Delay for a decorative animation; collapses when the user reduces motion.
export const motionDelay = (ms: number) =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : ms

// Restart a CSS animation class (shake, hop) on an element.
export function replayClass(el: HTMLElement | null, name: string) {
  if (!el) return
  el.classList.remove(name)
  void el.offsetWidth
  el.classList.add(name)
}
