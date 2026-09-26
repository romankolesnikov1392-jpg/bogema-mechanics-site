import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { SectionHeader } from "@/components/site/SectionHeader"
import { business } from "@/data/business"
import { reviews } from "@/data/content"

const num = new Intl.NumberFormat("ru-RU")

export function Reviews() {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState(0)

  useEffect(() => {
    if (!api) return
    const update = () => {
      setSelected(api.selectedScrollSnap())
      setSnaps(api.scrollSnapList().length)
    }
    update()
    api.on("select", update).on("reInit", update)
    return () => {
      api.off("select", update).off("reInit", update)
    }
  }, [api])

  const progress = snaps > 1 ? (selected + 1) / snaps : 1

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-y relative overflow-hidden">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeader id="reviews-title" index="05" label="Отзывы" title="Что говорят клиенты" layout="stack" className="mb-10 md:mb-12" />
          <div data-reveal className="border-t border-line pt-8">
            <p className="display tabular text-[clamp(7rem,14vw,11rem)] leading-[0.78]">
              {business.rating}
            </p>
            {/* Звёзды по реальному рейтингу: пятая заполнена на 90% при 4,9. */}
            <div className="mt-5 flex gap-1" role="img" aria-label={`Рейтинг ${business.rating} из 5`}>
              {Array.from({ length: 5 }, (_, i) => {
                const fill = Math.min(1, Math.max(0, business.ratingValue - i))
                return (
                  <span key={i} className="relative size-6">
                    <Star fill="currentColor" strokeWidth={0} className="absolute inset-0 size-6 text-line-strong" />
                    <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                      <Star fill="currentColor" strokeWidth={0} className="size-6 text-spark" />
                    </span>
                  </span>
                )
              })}
            </div>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Средняя оценка на Zoon: {num.format(business.ratingCount)} оценок и {num.format(business.reviewsCount)} отзывов. Ниже —
              подтверждённые отзывы.
            </p>
            <a
              href={business.links.zoonReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow mt-6 inline-flex items-center gap-2 text-foreground underline-offset-4 transition-colors duration-200 hover:text-spark"
            >
              Все отзывы на Zoon
              <ArrowUpRight strokeWidth={2.25} className="size-4" />
            </a>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-8 lg:pt-24">
          <Carousel setApi={setApi} opts={{ align: "start" }} aria-label="Отзывы клиентов">
            <CarouselContent className="-ml-4">
              {reviews.map((r, i) => (
                <CarouselItem
                  key={r.author + r.date}
                  className="basis-[88%] pl-4 sm:basis-[62%] xl:basis-1/2"
                  aria-label={`Отзыв ${i + 1} из ${reviews.length}`}
                >
                  <figure className="flex h-full flex-col border border-line bg-card p-6 sm:p-8">
                    <Quote fill="currentColor" strokeWidth={0} aria-hidden className="size-9 text-spark" />
                    <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-foreground/90 sm:text-xl sm:leading-relaxed">
                      {r.text}
                    </blockquote>
                    <figcaption className="mt-8 flex items-end justify-between gap-4 border-t border-line pt-5">
                      <span>
                        <span className="block text-lg font-semibold">{r.author}</span>
                        <span className="eyebrow mt-1 block text-dim">{r.date} · Zoon</span>
                      </span>
                      <span className="border border-line-strong px-2.5 py-1 text-sm whitespace-nowrap text-muted-foreground">
                        {r.topic}
                      </span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-8 flex items-center gap-5">
            <Button variant="outline" size="icon" onClick={() => api?.scrollPrev()} disabled={selected === 0} aria-label="Предыдущий отзыв">
              <ArrowLeft strokeWidth={2.25} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              disabled={snaps > 0 && selected >= snaps - 1}
              aria-label="Следующий отзыв"
            >
              <ArrowRight strokeWidth={2.25} />
            </Button>
            {/* Прогресс — scaleX на одной линии, без анимации ширины */}
            <div aria-hidden className="relative h-px flex-1 bg-line-strong">
              <div
                className="absolute inset-0 origin-left bg-spark transition-transform duration-300 ease-out-strong"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
            <span className="eyebrow tabular text-muted-foreground" aria-live="polite">
              {String(selected + 1).padStart(2, "0")} / {String(Math.max(snaps, 1)).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
