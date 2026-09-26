import { useRef, useState } from "react"
import { cn } from "cn"
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, Quote, Star, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useBooking } from "@/components/site/Booking"
import { masters } from "@/data/content"
import { getImage } from "@/lib/images"
import { yearsWord } from "@/lib/plural"

// Окно мастера: всё, что есть в его профиле на Zoon, — описание, специализация, обучение,
// оценки, отзыв и фото работ. Слева медиа (портрет + работы), справа текст.
export function MasterDialog({ index, onIndex }: { index: number | null; onIndex: (i: number | null) => void }) {
  const { openBooking } = useBooking()
  // Фокус при открытии — на «Закрыть» (вверху), иначе браузер прокручивает окно к первой миниатюре внизу.
  const closeRef = useRef<HTMLButtonElement>(null)

  // Держим последнего мастера, пока окно закрывается, чтобы контент не пропадал на выходе.
  const [shown, setShown] = useState(0)
  if (index !== null && index !== shown) setShown(index)
  const m = masters[shown]

  // Выбранный кадр сбрасывается на портрет при смене мастера.
  const [active, setActive] = useState(0)
  const [activeFor, setActiveFor] = useState(shown)
  if (activeFor !== shown) {
    setActiveFor(shown)
    setActive(0)
  }

  const media = [m.portrait, ...m.works]
  const img = getImage(media[active])
  const isPortrait = active === 0
  const total = masters.length
  const prev = masters[(shown - 1 + total) % total]
  const next = masters[(shown + 1) % total]
  const go = (d: number) => onIndex((shown + d + total) % total)

  const book = () => {
    onIndex(null)
    openBooking(m.service, `Хочу записаться к мастеру: ${m.name}`)
  }

  return (
    <Dialog open={index !== null} onOpenChange={(o) => !o && onIndex(null)}>
      <DialogContent
        showCloseButton={false}
        initialFocus={closeRef}
        className="w-[calc(100%-1rem)] max-w-5xl gap-0 border-line p-0 sm:max-w-5xl sm:p-0 md:h-[min(90dvh,780px)] md:max-h-none md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:grid-rows-[minmax(0,1fr)] md:overflow-hidden"
      >
        {/* Медиа */}
        <div className="flex min-h-0 flex-col bg-black">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-0 md:flex-1">
            <img
              key={media[active]}
              src={img.src}
              srcSet={img.srcSet}
              sizes="(min-width: 768px) 42vw, 100vw"
              width={img.w}
              height={img.h}
              alt={isPortrait ? `${m.fullName}, ${m.role.toLowerCase()}` : `Фото работы мастера ${m.name}, ${active} из ${m.works.length}`}
              className={cn(
                "absolute inset-0 size-full animate-in duration-200 fade-in-0",
                isPortrait ? "object-cover" : "object-contain",
              )}
              style={isPortrait ? { objectPosition: m.portraitPosition } : undefined}
              draggable={false}
            />
            {!isPortrait && (
              <span className="eyebrow absolute bottom-3 left-3 bg-background/85 px-2.5 py-1.5 text-foreground">
                Фото работ · {active} / {m.works.length}
              </span>
            )}
          </div>
          <ul className="flex gap-2 overflow-x-auto border-t border-line bg-background p-3 [scrollbar-width:thin]" aria-label="Портрет и фото работ">
            {media.map((key, i) => {
              const t = getImage(key)
              return (
                <li key={key} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    aria-label={i === 0 ? "Портрет мастера" : `Фото работы ${i}`}
                    className="relative block size-14 overflow-hidden outline-none transition-[opacity,box-shadow] duration-200 ease-out not-aria-pressed:opacity-55 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark aria-pressed:ring-2 aria-pressed:ring-spark sm:size-16"
                  >
                    <img
                      src={t.src}
                      srcSet={t.srcSet}
                      sizes="64px"
                      width={t.w}
                      height={t.h}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover"
                      style={i === 0 ? { objectPosition: m.portraitPosition } : undefined}
                      draggable={false}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Текст */}
        <div className="flex min-h-0 flex-col p-6 sm:p-8 md:overflow-y-auto md:overscroll-contain">
          <p className="eyebrow text-spark">Мастер · {String(shown + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</p>
          <DialogTitle className="mt-3 pr-10">{m.fullName}</DialogTitle>
          <DialogDescription className="mt-2 text-base text-foreground/80">{m.role}</DialogDescription>

          <dl className="mt-6 grid grid-cols-3 border-y border-line">
            <div className="py-4 pr-3">
              <dt className="eyebrow text-dim">Стаж</dt>
              <dd className="display tabular mt-2 text-4xl leading-none text-spark">
                {m.years} <span className="text-xl text-muted-foreground">{yearsWord(m.years)}</span>
              </dd>
            </div>
            <div className="border-l border-line py-4 pl-4">
              <dt className="eyebrow text-dim">Оценка</dt>
              <dd className="mt-2 flex items-baseline gap-1.5">
                <span className="display tabular text-4xl leading-none">{m.rating}</span>
                <Star fill="currentColor" strokeWidth={0} aria-hidden className="size-4 text-spark" />
              </dd>
            </div>
            <div className="border-l border-line py-4 pl-4">
              <dt className="eyebrow text-dim">Фото работ</dt>
              <dd className="display tabular mt-2 text-4xl leading-none">{m.works.length}</dd>
            </div>
          </dl>
          <p className="mt-2 text-xs text-dim">{m.ratingNote}</p>

          <p className="mt-6 border-l-2 border-spark pl-4 text-[1.0625rem] leading-relaxed text-foreground/90">{m.about}</p>

          {m.facts.length > 0 && (
            <ul className="mt-6 grid gap-2">
              {m.facts.map((f) => (
                <li key={f} className="flex items-center gap-3 font-semibold">
                  <span aria-hidden className="size-1.5 bg-spark" />
                  {f}
                </li>
              ))}
            </ul>
          )}

          {m.skills.length > 0 && (
            <div className="mt-7">
              <p className="eyebrow text-muted-foreground">Специализация</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {m.skills.map((s) => (
                  <li key={s} className="border border-line-strong px-3 py-1.5 text-sm text-foreground/85">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {m.training.length > 0 && (
            <div className="mt-7">
              <p className="eyebrow text-muted-foreground">Обучение</p>
              <ul className="mt-3 grid gap-2.5">
                {m.training.map((t) => (
                  <li key={t} className="grid grid-cols-[auto_1fr] gap-3 text-[0.9375rem] leading-snug text-foreground/85">
                    <Award aria-hidden className="mt-0.5 size-4 text-spark" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {m.review && (
            <figure className="mt-7 border border-line bg-steel p-5">
              <Quote fill="currentColor" strokeWidth={0} aria-hidden className="size-6 text-spark" />
              <blockquote className="mt-3 text-[1.0625rem] leading-relaxed">{m.review.text}</blockquote>
              <figcaption className="eyebrow mt-3 text-dim">
                {m.review.author} · {m.review.date} · Zoon
              </figcaption>
            </figure>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
            <Button size="lg" onClick={book} className="sm:flex-1">
              Записаться к мастеру
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<a href={m.zoon} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
            >
              Профиль на Zoon
              <ArrowUpRight strokeWidth={2.25} />
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 md:mt-auto md:pt-6">
            <Button variant="ghost" size="sm" onClick={() => go(-1)} className="-ml-3.5 max-w-[48%] truncate" aria-label={`Предыдущий мастер: ${prev.name}`}>
              <ArrowLeft strokeWidth={2.25} />
              <span className="truncate">{prev.name}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => go(1)} className="-mr-3.5 max-w-[48%] truncate" aria-label={`Следующий мастер: ${next.name}`}>
              <span className="truncate">{next.name}</span>
              <ArrowRight strokeWidth={2.25} />
            </Button>
          </div>
        </div>

        <DialogClose
          ref={closeRef}
          render={<Button variant="outline" size="icon-sm" className="absolute top-3 right-3 bg-background/85 backdrop-blur-sm" />}
        >
          <X />
          <span className="sr-only">Закрыть</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
