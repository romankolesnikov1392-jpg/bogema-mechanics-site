import { useId, useRef, useState, type PointerEvent } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { getImage } from "@/lib/images"

// Слайдер «до/после» на clip-path: верхнее фото обрезается справа, без лишних слоёв — на GPU.
// Управление: перетаскивание (pointer capture), клик по месту, стрелки на клавиатуре
// (невидимый range input — он же даёт доступность для скринридеров).
export function BeforeAfter({ before, after, title }: { before: string; after: string; title: string }) {
  const id = useId()
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const b = getImage(before)
  const a = getImage(after)

  const setFromPointer = (e: PointerEvent) => {
    const r = box.current!.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)))
  }

  return (
    <figure className="select-none">
      <div
        ref={box}
        className="relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden bg-steel outline-offset-4 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-spark"
        onPointerDown={(e) => {
          if (dragging.current) return // второй палец не перехватывает
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          setFromPointer(e)
        }}
        onPointerMove={(e) => dragging.current && setFromPointer(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img src={a.src} srcSet={a.srcSet} width={a.w} height={a.h} loading="lazy" sizes="(min-width: 1024px) 50vw, 100vw" alt={`После: ${title}`} className="absolute inset-0 size-full object-cover" draggable={false} />
        <img
          src={b.src}
          srcSet={b.srcSet}
          width={b.w}
          height={b.h}
          loading="lazy"
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt={`До: ${title}`}
          className="absolute inset-0 size-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />
        <span className="eyebrow absolute top-4 left-4 bg-background/80 px-2.5 py-1.5">До</span>
        <span className="eyebrow absolute top-4 right-4 bg-spark px-2.5 py-1.5 text-primary-foreground">После</span>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-spark" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 grid-flow-col place-items-center border border-spark bg-background/85 text-spark">
            <ChevronLeft strokeWidth={2.25} className="size-3.5" />
            <ChevronRight strokeWidth={2.25} className="size-3.5" />
          </span>
        </div>
        <label htmlFor={id} className="sr-only">
          Сравнить до и после: {title}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="pointer-events-none absolute inset-0 size-full opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-muted-foreground">{title}</figcaption>
    </figure>
  )
}
