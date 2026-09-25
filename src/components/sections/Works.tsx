import { useRef, useState, type CSSProperties } from "react"
import { cn } from "cn"
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { BeforeAfter } from "@/components/site/BeforeAfter"
import { Photo } from "@/components/site/Photo"
import { SectionHeader } from "@/components/site/SectionHeader"
import { Tilt } from "@/components/site/Tilt"
import { beforeAfter, bodyProcess, gallery } from "@/data/content"
import { getImage } from "@/lib/images"

const spanClass = {
  big: "col-span-2 row-span-2",
  tall: "row-span-2",
  wide: "col-span-2",
} as const

export function Works() {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <section id="works" aria-labelledby="works-title" className="section-y relative bg-graphite">
      <div className="container-x">
        <SectionHeader
          id="works-title"
          index="04"
          label="Работы"
          title={
            <>
              Цех <span className="text-muted-foreground">изнутри</span>
            </>
          }
          lead="Слесарный и кузовной цех, покрасочная камера, диагностика и шиномонтаж — так выглядит сервис, куда вы оставляете машину."
          titleClassName="max-w-[16ch]"
        />

        {/* Галерея-бенто. Каждое фото открывается крупно. */}
        <ul className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4 lg:auto-rows-[230px] lg:gap-4">
          {gallery.map((item, i) => (
            <li
              key={item.photo}
              data-reveal
              style={{ "--i": i % 4 } as CSSProperties}
              className={cn(item.span && spanClass[item.span])}
            >
              <Tilt max={2.5} className="size-full">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group/tile relative block size-full overflow-hidden text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark"
                  aria-label={`Открыть фото: ${item.title}`}
                >
                  <Photo
                    name={item.photo}
                    alt={item.title}
                    reveal={false}
                    sizes={item.span === "big" || item.span === "wide" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className="size-full"
                    imgClassName="group-hover/tile:scale-[1.05]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-80 transition-opacity duration-300 ease-out group-hover/tile:opacity-100"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
                    <span>
                      <span className="eyebrow block text-[0.625rem] text-spark sm:text-xs">{item.tag}</span>
                      <span className="mt-1 block font-semibold leading-tight sm:text-lg">{item.title}</span>
                    </span>
                    <Maximize2
                      aria-hidden
                      className="hidden size-5 shrink-0 translate-y-1 text-foreground opacity-0 transition-[opacity,translate] duration-300 ease-out-strong group-hover/tile:translate-y-0 group-hover/tile:opacity-100 sm:block"
                    />
                  </span>
                </button>
              </Tilt>
            </li>
          ))}
        </ul>

        {/* Кузовной ремонт по шагам: реальные фото из кузовного цеха. */}
        <div className="mt-28 lg:mt-36">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="display text-[clamp(2rem,4vw,3.25rem)]">
              Кузовной ремонт <span className="text-muted-foreground">по шагам</span>
            </h3>
            <p className="max-w-sm text-muted-foreground">От дефектовки до покраски — в своём кузовном цехе и камере.</p>
          </div>
          <ol className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
            {bodyProcess.map((st, i) => (
              <li
                key={st.step}
                data-reveal
                style={{ "--i": i } as CSSProperties}
                className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto"
              >
                <Photo name={st.photo} alt={st.title} sizes="(min-width: 768px) 25vw, 78vw" className="aspect-[4/5]" />
                <div className="mt-5 flex items-baseline gap-3 border-t border-line pt-4">
                  <span className="eyebrow tabular text-spark">{st.step}</span>
                  <h4 className="display text-3xl leading-none">{st.title}</h4>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {beforeAfter.length > 0 && (
          <div className="mt-28 lg:mt-36">
            <h3 data-reveal className="display text-[clamp(2rem,4vw,3.25rem)]">
              До и после <span className="text-muted-foreground">— потяните ползунок</span>
            </h3>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {beforeAfter.map((p) => (
                <BeforeAfter key={p.title} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Lightbox index={index} onIndex={setIndex} />
    </section>
  )
}

function Lightbox({ index, onIndex }: { index: number | null; onIndex: (i: number | null) => void }) {
  const [shown, setShown] = useState(0)
  if (index !== null && index !== shown) setShown(index) // держим последнее фото на время закрытия
  const item = gallery[shown]
  const img = getImage(item.photo)
  const startX = useRef<number | null>(null)
  const total = gallery.length
  const go = (d: number) => onIndex((shown + d + total) % total)

  return (
    <Dialog open={index !== null} onOpenChange={(o) => !o && onIndex(null)}>
      <DialogContent
        className="w-[calc(100%-1rem)] max-w-6xl gap-0 border-line bg-background p-0 sm:max-w-6xl sm:p-0"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1)
          if (e.key === "ArrowLeft") go(-1)
        }}
      >
        <div
          className="relative touch-pan-y bg-black"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return
            const dx = e.clientX - startX.current
            startX.current = null
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
          }}
        >
          <img
            key={item.photo}
            src={img.src}
            srcSet={img.srcSet}
            width={img.w}
            height={img.h}
            sizes="(min-width: 1200px) 1150px, 100vw"
            alt={item.title}
            className="mx-auto max-h-[78dvh] w-full animate-in object-contain duration-200 fade-in-0"
            style={{ maxWidth: Math.round(img.w * 1.6) }}
            draggable={false}
          />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="eyebrow text-spark">{item.tag}</p>
            <DialogTitle className="mt-1 truncate text-2xl sm:text-3xl">{item.title}</DialogTitle>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="eyebrow tabular mr-2 hidden text-muted-foreground sm:inline">
              {String(shown + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Предыдущее фото">
              <ArrowLeft strokeWidth={2.25} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Следующее фото">
              <ArrowRight strokeWidth={2.25} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
