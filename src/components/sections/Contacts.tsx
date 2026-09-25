import { useState, type CSSProperties, type ReactNode } from "react"
import { ArrowUpRight, Navigation, Phone, Pointer } from "lucide-react"
import { WhatsappIcon } from "@/components/icons/WhatsappIcon"

import { Button } from "@/components/ui/button"
import { BookingForm } from "@/components/site/BookingForm"
import { OpenStatus } from "@/components/site/OpenStatus"
import { Photo } from "@/components/site/Photo"
import { SectionHeader } from "@/components/site/SectionHeader"
import { business } from "@/data/business"

const { lat, lon } = business.geo
const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=16&pt=${lon}%2C${lat}%2Cpm2orm&l=map&theme=dark`

function Row({ label, children, i }: { label: string; children: ReactNode; i: number }) {
  return (
    <div data-reveal style={{ "--i": i } as CSSProperties} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <dt className="eyebrow pt-1 text-muted-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export function Contacts() {
  const [mapActive, setMapActive] = useState(false)

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="contacts-title"
          index="08"
          label="Контакты"
          title={
            <>
              Ждём на Каховке <span className="text-muted-foreground">каждый день</span>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <OpenStatus />
            <dl className="mt-6 border-t border-line">
              <Row label="Адрес" i={0}>
                <p className="text-xl font-semibold">{business.address.full}</p>
                <p className="mt-1 text-muted-foreground">
                  {business.address.district}, {business.address.note}
                </p>
              </Row>
              <Row label="Метро" i={1}>
                <ul className="grid gap-1">
                  {business.metro.map((m) => (
                    <li key={m.name}>
                      {m.name} <span className="text-muted-foreground">— {m.distance}</span>
                    </li>
                  ))}
                </ul>
              </Row>
              <Row label="Телефон" i={2}>
                <a
                  href={business.phone.href}
                  className="tabular font-display text-4xl font-bold tracking-[0.01em] transition-colors duration-200 hover:text-spark"
                >
                  {business.phone.display}
                </a>
              </Row>
              <Row label="Режим работы" i={3}>
                <p className="font-semibold">Сервис: {business.hours.label.toLowerCase()}</p>
                <p className="mt-1 text-muted-foreground">
                  Автомойка: {business.carWashHours.map((h) => `${h.days} ${h.time}`).join(", ")}
                </p>
              </Row>
              <Row label="Как проехать" i={4}>
                <p className="leading-relaxed text-foreground/85">{business.directions}</p>
              </Row>
            </dl>
            <div data-reveal className="mt-8 grid gap-3 sm:grid-cols-3">
              <Button size="lg" render={<a href={business.phone.href} />} nativeButton={false}>
                <Phone strokeWidth={2.25} />
                Позвонить
              </Button>
              <Button
                variant="outline"
                size="lg"
                render={<a href={business.whatsapp} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
              >
                <WhatsappIcon strokeWidth={2.25} />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="lg"
                render={<a href={business.links.route} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
              >
                <Navigation strokeWidth={2.25} />
                Маршрут
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div data-reveal className="border border-line-strong bg-card p-6 sm:p-8 lg:ml-6">
              <p className="eyebrow text-spark">Онлайн-запись</p>
              <h3 className="display mt-3 text-5xl">Оставьте заявку</h3>
              <p className="mt-3 text-muted-foreground">Перезвоним в рабочее время, уточним задачу и подберём удобный день.</p>
              <BookingForm className="mt-8" />
            </div>
          </div>
        </div>

        {/* Карта и фото въезда */}
        <div className="mt-16 grid gap-4 lg:mt-24 lg:grid-cols-12">
          <div data-reveal className="relative h-[380px] overflow-hidden border border-line bg-steel lg:col-span-8 lg:h-[460px]">
            <iframe
              title={`Карта: ${business.fullName}, ${business.address.full}`}
              src={mapSrc}
              loading="lazy"
              className="size-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Чтобы карта не перехватывала прокрутку страницы на телефоне — включается по нажатию. */}
            {!mapActive && (
              <button
                type="button"
                onClick={() => setMapActive(true)}
                className="absolute inset-0 flex items-end justify-start bg-transparent p-4 lg:hidden"
                aria-label="Включить карту"
              >
                <span className="eyebrow inline-flex items-center gap-2 border border-line-strong bg-background/85 px-3 py-2 backdrop-blur-sm">
                  <Pointer className="size-4 text-spark" />
                  Нажмите, чтобы двигать карту
                </span>
              </button>
            )}
            <a
              href={business.links.yandexMap}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow absolute top-4 right-4 inline-flex items-center gap-2 border border-line-strong bg-background/85 px-3 py-2 backdrop-blur-sm transition-colors duration-200 hover:text-spark"
            >
              Яндекс Карты
              <ArrowUpRight strokeWidth={2.25} className="size-3.5" />
            </a>
          </div>
          <figure data-reveal className="lg:col-span-4">
            <Photo
              name="exterior"
              alt="Фасад на улице Каховка: въезды на посты и автомойка"
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="aspect-[4/3] lg:aspect-auto lg:h-[400px]"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Въезды на посты и мойку. На приёмку — к посту № 1.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
