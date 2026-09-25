import type { CSSProperties } from "react"
import { ArrowRight } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { useBooking } from "@/components/site/Booking"
import { formatPrice, minPrice, priceDisclaimer, serviceOptions, services } from "@/data/services"

const rub = new Intl.NumberFormat("ru-RU")

// Категория прайса → пункт в форме записи.
const bookingService: Record<string, (typeof serviceOptions)[number]> = {
  diagnostics: "Диагностика",
  maintenance: "ТО и замена масла",
  engine: "Двигатель",
  chassis: "Ходовая, рулевое, тормоза",
  transmission: "КПП и трансмиссия",
  body: "Кузов и покраска",
  electrics: "Автоэлектрика и климат",
  tires: "Шиномонтаж",
  wash: "Автомойка и химчистка",
}

export function Services() {
  const { openBooking } = useBooking()

  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative bg-graphite">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <SectionHeader
              id="services-title"
              index="02"
              label="Услуги и цены"
              title="Цены — до начала работ"
              layout="stack"
              lead="Основные работы и цены по направлениям. Точную стоимость мастер-приёмщик назовёт после осмотра — до начала ремонта."
              className="mb-10 md:mb-10"
            />
            <div data-reveal className="border-l-2 border-spark bg-spark-soft px-5 py-4">
              <p className="font-semibold">Диагностика — бесплатно при ремонте</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Компьютерная и комплексная диагностика не стоят ничего, если ремонт делаете у нас.
              </p>
            </div>
            <div data-reveal className="mt-8">
              <Button size="lg" className="w-full sm:w-auto" onClick={() => openBooking("Диагностика")}>
                Записаться на диагностику
              </Button>
            </div>
            <p className="mt-8 hidden text-sm leading-relaxed text-dim lg:block">{priceDisclaimer}</p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Accordion hiddenUntilFound className="border-t border-line">
            {services.map((cat, i) => {
              const min = minPrice(cat)
              return (
                <AccordionItem key={cat.id} value={cat.id} data-reveal style={{ "--i": i % 4 } as CSSProperties}>
                  <AccordionTrigger className="py-6 md:py-7">
                    <span className="grid flex-1 grid-cols-[2.25rem_1fr] items-baseline gap-x-3 md:grid-cols-[3rem_1fr_auto] md:gap-x-5">
                      <span className="eyebrow tabular text-dim">{String(i + 1).padStart(2, "0")}</span>
                      <span className="display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[0.95] transition-colors duration-200 group-hover/accordion-trigger:text-spark">
                        {cat.title}
                      </span>
                      <span className="eyebrow tabular col-start-2 mt-2 text-muted-foreground md:col-start-3 md:mt-0 md:text-right">
                        {min !== null ? `от ${rub.format(min)} ₽` : "цена после осмотра"}
                      </span>
                      <span className="mt-2 hidden max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground md:col-[2/4] md:block">
                        {cat.summary}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="md:pl-[4.25rem]">
                    <p className="mb-5 text-[0.9375rem] leading-relaxed text-muted-foreground md:hidden">{cat.summary}</p>
                    <ul className="grid gap-3.5">
                      {cat.rows.map((row) => (
                        <li key={row.name} className="flex items-baseline gap-3">
                          <span className="min-w-0 text-[0.9375rem] leading-snug text-foreground/90 sm:text-base">
                            {row.name}
                            {row.note && <span className="ml-2 text-sm whitespace-nowrap text-spark">· {row.note}</span>}
                          </span>
                          <span aria-hidden className="leader" />
                          <span
                            className={
                              row.price === null
                                ? "font-mono text-sm whitespace-nowrap text-dim"
                                : "tabular font-mono text-[0.9375rem] font-medium whitespace-nowrap"
                            }
                          >
                            {formatPrice(row)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-7 h-auto min-h-9 max-w-full py-2 text-left whitespace-normal"
                      onClick={() => openBooking(bookingService[cat.id])}
                    >
                      Записаться: {cat.title.toLowerCase()}
                      <ArrowRight strokeWidth={2.25} />
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
          <p className="mt-8 text-sm leading-relaxed text-dim lg:hidden">{priceDisclaimer}</p>
        </div>
      </div>
    </section>
  )
}
