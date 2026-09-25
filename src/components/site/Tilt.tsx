import { useEffect, useRef, type ReactNode } from "react"

// Лёгкий наклон карточки за курсором. Декоративный эффект, поэтому угол не «прилипает»
// к курсору, а догоняет его по пружине (критическое демпфирование — без отскока).
// Только мышь/трекпад и без prefers-reduced-motion; transform пишется прямо в элемент.
const K = 170 // жёсткость
const D = 20 // демпфирование
const M = 0.6 // масса

export function Tilt({ children, max = 4, className }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!fine.matches || reduce.matches) return

    let tx = 0, ty = 0 // цель, градусы
    let x = 0, y = 0, vx = 0, vy = 0
    let raf = 0
    let last = 0

    const step = (t: number) => {
      const dt = Math.min(0.032, (t - last) / 1000 || 0.016)
      last = t
      vx += ((-K * (x - tx) - D * vx) / M) * dt
      vy += ((-K * (y - ty) - D * vy) / M) * dt
      x += vx * dt
      y += vy * dt
      const settled = Math.abs(x - tx) < 0.01 && Math.abs(y - ty) < 0.01 && Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05
      if (settled && tx === 0 && ty === 0) {
        el.style.transform = ""
        raf = 0
        return
      }
      el.style.transform = `perspective(1000px) rotateX(${x.toFixed(3)}deg) rotateY(${y.toFixed(3)}deg)`
      raf = settled ? 0 : requestAnimationFrame(step)
    }
    const kick = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(step)
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      ty = ((e.clientX - r.left) / r.width - 0.5) * max * 2
      tx = -((e.clientY - r.top) / r.height - 0.5) * max * 2
      kick()
    }
    const onLeave = () => {
      tx = 0
      ty = 0
      kick()
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [max])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
