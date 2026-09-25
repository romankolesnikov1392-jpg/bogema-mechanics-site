import { useRef, type CSSProperties } from "react"
import { ArrowDown, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Photo } from "@/components/site/Photo"
import { OpenStatus } from "@/components/site/OpenStatus"
import { useBooking } from "@/components/site/Booking"
import { useParallax } from "@/hooks/useParallax"
import { business } from "@/data/business"

const stats = [
  { value: business.clients, label: "клиентов обслужили" },
  { value: String(business.since), label: "год, с которого работаем" },
  { value: business.brandsCount, label: "марок автомобилей" },
  { value: business.hours.short, label: "ежедневно, без выходных" },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  const { openBooking } = useBooking()

  // Параллакс: фото уходит вверх медленнее страницы и чуть «отъезжает» из увеличения.
  useParallax(ref, layer)

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[max(680px,100svh)] flex-col overflow-hidden pt-(--header-h)"
    >
      {/* Фото: на телефоне — фоном сверху, на десктопе — справа, с растушёвкой к тексту. */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden lg:left-[34%]">
        <div ref={layer} className="parallax-layer absolute inset-0 origin-top will-change-transform">
          <Photo
            name="workshop-lifts"
            alt=""
            priority
            reveal={false}
            sizes="(min-width: 1024px) 66vw, 100vw"
            position="28% 50%"
            className="size-full"
            imgClassName="saturate-[0.85] contrast-[1.05] brightness-[0.82]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-background via-background/55 to-background/0 lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
      {/* Тёплый «натриевый» свет в углу — на уровне секции, чтобы край фото его не обрезал */}
      <div aria-hidden className="absolute -bottom-48 -left-48 -z-10 size-[680px] rounded-full bg-spark/12 blur-[150px]" />
      <div aria-hidden className="blueprint absolute inset-0 -z-10 opacity-60" />

      <div className="container-x flex flex-1 flex-col justify-end pt-14 pb-10 lg:pb-14">
        <div className="max-w-3xl">
          <div className="hero-in flex flex-wrap items-center gap-3">
            <OpenStatus />
            <span className="eyebrow hidden text-muted-foreground sm:inline">Москва · {business.address.street}</span>
          </div>

          <h1
            id="hero-title"
            style={{ "--i": 1 } as CSSProperties}
            className="hero-in display mt-7 text-[clamp(3.4rem,min(10vw,13.5svh),8.25rem)] leading-[0.84]"
          >
            Автосервис
            <br />
            полного цикла
            <br />
            <span className="text-spark">на Каховке</span>
          </h1>

          <p style={{ "--i": 2 } as CSSProperties} className="hero-in lead mt-7 max-w-xl text-foreground/80">
            {business.clients} клиентов с {business.since} года. Двигатель и ходовая, кузов и покраска, электрика,
            шиномонтаж и мойка — в одном месте, на закрытой охраняемой территории.
          </p>

          <div style={{ "--i": 3 } as CSSProperties} className="hero-in mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => openBooking()} className="sm:min-w-52">
              Записаться
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<a href={business.phone.href} />}
              nativeButton={false}
              className="tabular bg-background/40 text-base tracking-[0.04em] backdrop-blur-sm"
            >
              <Phone strokeWidth={2.25} className="text-spark" />
              {business.phone.display}
            </Button>
          </div>
        </div>
      </div>

      {/* Полоса ключевых цифр — как строка техпаспорта. */}
      <div className="container-x relative">
        <dl className="grid grid-cols-2 border-t border-line-strong md:grid-cols-4">
          {stats.map((st, i) => (
            <div
              key={st.label}
              style={{ "--i": i + 4 } as CSSProperties}
              className="hero-in flex flex-col border-line py-5 pr-4 max-md:odd:border-r max-md:even:pl-4 max-md:[&:nth-child(-n+2)]:border-b md:not-last:border-r md:px-6 md:first:pl-0 md:py-7"
            >
              <dt className="eyebrow order-2 mt-2 text-muted-foreground">{st.label}</dt>
              <dd className="display tabular text-[clamp(1.875rem,4.2vw,3.5rem)] leading-none whitespace-nowrap">{st.value}</dd>
            </div>
          ))}
        </dl>
        <a
          href="#about"
          aria-label="Листать к разделу «О сервисе»"
          className="absolute right-[clamp(16px,4vw,48px)] -top-16 hidden size-12 place-items-center border border-line-strong text-muted-foreground transition-colors duration-200 hover:border-spark hover:text-spark lg:grid"
        >
          <ArrowDown className="size-5" />
        </a>
      </div>
    </section>
  )
}
