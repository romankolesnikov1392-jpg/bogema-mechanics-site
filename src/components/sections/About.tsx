import type { CSSProperties } from "react"
import { Award, Coffee, ReceiptText, Wrench } from "lucide-react"

import { Photo } from "@/components/site/Photo"
import { SectionHeader } from "@/components/site/SectionHeader"
import { business } from "@/data/business"

// Факты — из описания сервиса на Zoon и из отзывов клиентов.
const facts = [
  {
    icon: Award,
    title: "Дилерская гарантия сохраняется",
    text: "У сервиса сертификаты Росстандарта на техобслуживание и кузовной ремонт.",
  },
  {
    icon: Wrench,
    title: "Диагностика бесплатно при ремонте",
    text: "Если ремонт делаете у нас, компьютерная и комплексная диагностика ничего не стоят.",
  },
  {
    icon: ReceiptText,
    title: "Смета до начала работ",
    text: "Перечень работ и стоимость называем заранее. После ремонта — заказ-наряд и чек.",
  },
  {
    icon: Coffee,
    title: "Зона ожидания",
    text: "Диваны, телевизор, кофе и вода. Работу над машиной видно через стекло.",
  },
]

const directions = [
  "Двигатель",
  "Ходовая",
  "КПП",
  "Тормоза",
  "Рулевое",
  "Кузов и покраска",
  "Автоэлектрика",
  "Климат",
  "Сигнализации",
  "Шиномонтаж",
  "Автомойка",
  "Химчистка",
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="about-title"
          index="01"
          label="О сервисе"
          title={
            <>
              Полный цикл — <span className="text-muted-foreground">от диагностики до покраски</span>
            </>
          }
          lead={`«${business.name}» — мультибрендовый автотехцентр на закрытой территории на Каховке. С ${business.since} года здесь обслужили больше 7000 клиентов: от планового ТО до ремонта после ДТП.`}
          titleClassName="max-w-[18ch]"
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Коллаж из реальных фото цеха */}
          <div className="relative lg:col-span-7 lg:pr-10">
            <div className="crop-marks">
              <Photo
                name="hall"
                alt="Кузовной цех «Богема Механикс»: автомобили в работе под защитными чехлами"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="aspect-[4/3]"
              />
            </div>
            <div className="relative -mt-24 ml-auto w-[58%] border-8 border-background sm:-mt-36 lg:absolute lg:right-0 lg:-bottom-6 lg:mt-0 lg:w-[46%]">
              <Photo
                name="interior-covers"
                alt="Салон автомобиля в защитных чехлах на сиденьях и руле во время ремонта"
                sizes="(min-width: 1024px) 26vw, 58vw"
                className="aspect-[4/3]"
              />
            </div>
            <p className="eyebrow mt-4 max-w-[40%] text-dim lg:mt-5">Цех · ул. Каховка, 30</p>
          </div>

          <div className="lg:col-span-5">
            <ul className="grid border-t border-line">
              {facts.map((f, i) => (
                <li
                  key={f.title}
                  data-reveal
                  style={{ "--i": i } as CSSProperties}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-line py-6"
                >
                  <f.icon aria-hidden className="mt-1 size-6 text-spark" />
                  <div>
                    <h3 className="text-lg font-semibold leading-snug">{f.title}</h3>
                    <p className="mt-1.5 text-muted-foreground">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-10">
              <p className="eyebrow text-muted-foreground">Направления</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {directions.map((d) => (
                  <li key={d} className="border border-line-strong px-3 py-1.5 text-sm text-foreground/85">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Марки — сетка-«шильдики» */}
        <div className="mt-28 lg:mt-36">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="display text-[clamp(2rem,4vw,3.25rem)]">
              {business.brandsCount} марок <span className="text-muted-foreground">в работе</span>
            </h3>
            <p className="max-w-sm text-muted-foreground">
              Иномарки, отечественные, корейские и китайские автомобили, микроавтобусы и коммерческий транспорт.
            </p>
          </div>
          <ul translate="no" className="mt-8 grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-6">
            {business.brands.map((b, i) => (
              <li
                key={b}
                data-reveal
                style={{ "--i": i % 6 } as CSSProperties}
                className="border-r border-b border-line"
              >
                <span className="flex h-20 items-center justify-center px-3 text-center font-display text-2xl font-bold tracking-[0.02em] text-muted-foreground uppercase transition-colors duration-200 hover:bg-white/[0.02] hover:text-foreground md:h-24 md:text-[1.75rem]">
                  {b}
                </span>
              </li>
            ))}
            <li className="flex h-20 items-center justify-center border-r border-b border-line bg-spark-soft px-3 text-center font-display text-2xl font-bold tracking-[0.02em] text-spark uppercase md:h-24 md:text-[1.75rem]">
              и ещё 30+
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
