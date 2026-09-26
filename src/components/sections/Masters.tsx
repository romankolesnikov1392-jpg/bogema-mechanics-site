import { useState, type CSSProperties } from "react"
import { ArrowRight } from "lucide-react"

import { MasterDialog } from "@/components/site/MasterDialog"
import { Photo } from "@/components/site/Photo"
import { SectionHeader } from "@/components/site/SectionHeader"
import { Tilt } from "@/components/site/Tilt"
import { masters, totalExperience } from "@/data/content"
import { yearsWord } from "@/lib/plural"

export function Masters() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="masters" aria-labelledby="masters-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="masters-title"
          index="03"
          label="Мастера"
          title={
            <>
              {totalExperience} {yearsWord(totalExperience)} опыта <span className="text-muted-foreground">на шестерых</span>
            </>
          }
          lead="Жестянщик, маляры, арматурщик и два мастера-приёмщика. Нажмите на карточку — там описание, специализация и фото работ мастера."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {masters.map((m, i) => (
            <li key={m.id} data-reveal style={{ "--i": i % 3 } as CSSProperties}>
              <Tilt className="h-full">
                {/* Кликабельна вся карточка: кнопка растянута на неё через ::after, а заголовки остаются заголовками. */}
                <article className="group/master relative flex h-full flex-col border border-line bg-card p-5 transition-[border-color,background-color] duration-300 ease-out hover:border-line-strong hover:bg-steel has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-2 has-[button:focus-visible]:outline-spark sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="crop-marks shrink-0">
                      <Photo
                        name={m.photo}
                        alt={`${m.name}, ${m.role.toLowerCase()}`}
                        sizes="132px"
                        className="h-[176px] w-[132px]"
                        imgClassName="grayscale-[0.9] contrast-[1.08] group-hover/master:grayscale-0 group-hover/master:scale-[1.06]"
                      />
                    </div>
                    <div className="text-right">
                      <p className="display tabular text-[5.5rem] leading-[0.8] text-spark sm:text-[6.5rem]">{m.years}</p>
                      <p className="eyebrow mt-2 text-muted-foreground">{yearsWord(m.years)} стажа</p>
                    </div>
                  </div>
                  <div className="mt-8 flex-1 border-t border-line pt-5">
                    <h3 className="display text-[2rem] leading-none">{m.name}</h3>
                    <p className="mt-2 text-muted-foreground">{m.role}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-haspopup="dialog"
                    aria-label={`Подробнее о мастере: ${m.name}`}
                    className="eyebrow mt-6 inline-flex items-center gap-2 self-start text-foreground outline-none after:absolute after:inset-0 after:content-['']"
                  >
                    Подробнее
                    <ArrowRight
                      aria-hidden
                      strokeWidth={2.25}
                      className="size-4 text-spark transition-transform duration-300 ease-out-strong group-hover/master:translate-x-1"
                    />
                  </button>
                </article>
              </Tilt>
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-6 text-dim">Данные о мастерах — из их профилей на Zoon</p>
      </div>

      <MasterDialog index={open} onIndex={setOpen} />
    </section>
  )
}
