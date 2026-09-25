import { useEffect, useState, type CSSProperties } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Photo } from "@/components/site/Photo"
import { SectionHeader } from "@/components/site/SectionHeader"
import { useBooking } from "@/components/site/Booking"
import { activeOffers } from "@/data/content"

const dateFmt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" })

export function Offers() {
  const { openBooking } = useBooking()
  const [now, setNow] = useState(() => new Date(__BUILD_DATE__))
  useEffect(() => setNow(new Date()), [])
  const list = activeOffers(now)
  if (!list.length) return null // акций нет — блок просто не показываем

  return (
    <section id="offers" aria-labelledby="offers-title" className="section-y relative bg-graphite">
      <div className="container-x">
        <SectionHeader
          id="offers-title"
          index="06"
          label="Акции"
          title={
            <>
              Специальные условия <span className="text-muted-foreground">на понятные работы</span>
            </>
          }
          lead="Несколько постоянных предложений — для тех, кто приезжает впервые, и для тех, кто меняет резину по сезону."
          titleClassName="max-w-[17ch]"
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:gap-5">
          {list.map((o, i) => (
            <li key={o.title} data-reveal style={{ "--i": i % 2 } as CSSProperties}>
              <article className="group/offer grid h-full border border-line bg-card sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <Photo
                  name={o.photo}
                  alt=""
                  reveal={false}
                  sizes="(min-width: 768px) 20vw, 100vw"
                  className="aspect-[16/9] sm:aspect-auto sm:h-full"
                  imgClassName="brightness-[0.85] group-hover/offer:scale-[1.04]"
                />
                <div className="flex flex-col p-6 sm:p-7">
                  <p className="eyebrow text-muted-foreground">
                    до <time dateTime={o.until}>{dateFmt.format(new Date(o.until + "T12:00:00"))}</time>
                  </p>
                  <h3 className="display mt-4 text-[2rem] leading-[0.95] sm:text-[2.25rem]">{o.title}</h3>
                  {o.price && <p className="tabular mt-3 font-mono text-xl font-medium text-spark">{o.price}</p>}
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{o.text}</p>
                  <Button variant="outline" size="sm" className="mt-6 self-start" onClick={() => openBooking(o.service)}>
                    Записаться
                    <ArrowRight strokeWidth={2.25} />
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-6 text-dim">Условия акций — по данным профиля сервиса на Zoon. Уточняйте у мастера-приёмщика.</p>
      </div>
    </section>
  )
}
