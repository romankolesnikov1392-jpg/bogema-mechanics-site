import type { CSSProperties } from "react"

import { Photo } from "@/components/site/Photo"
import { SectionHeader } from "@/components/site/SectionHeader"
import { Tilt } from "@/components/site/Tilt"
import { masters, totalExperience } from "@/data/content"

function yearsWord(n: number) {
  const d = n % 10
  const dd = n % 100
  if (d === 1 && dd !== 11) return "год"
  if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return "года"
  return "лет"
}

export function Masters() {
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
          lead="Мастера, маляры и приёмщик, которые годами работают в одном цехе. Есть клиенты, которые ездят сюда больше десяти лет."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {masters.map((m, i) => (
            <li key={m.name} data-reveal style={{ "--i": i % 3 } as CSSProperties}>
              <Tilt className="h-full">
                <article className="group/master relative flex h-full flex-col border border-line bg-card p-5 transition-[border-color,background-color] duration-300 ease-out hover:border-line-strong hover:bg-steel sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="crop-marks shrink-0">
                      <Photo
                        name={m.photo}
                        alt={`${m.name}, ${m.role.toLowerCase()}`}
                        sizes="130px"
                        className="h-[157px] w-[120px]"
                        imgClassName="grayscale-[0.9] contrast-[1.08] group-hover/master:grayscale-0 group-hover/master:scale-[1.06]"
                      />
                    </div>
                    <div className="text-right">
                      <p className="display tabular text-[5.5rem] leading-[0.8] text-spark sm:text-[6.5rem]">{m.years}</p>
                      <p className="eyebrow mt-2 text-muted-foreground">{yearsWord(m.years)} стажа</p>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-line pt-5">
                    <h3 className="display text-[2rem] leading-none">{m.name}</h3>
                    <p className="mt-2 text-muted-foreground">{m.role}</p>
                  </div>
                </article>
              </Tilt>
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-6 text-dim">Стаж — по данным профиля сервиса на Zoon</p>
      </div>
    </section>
  )
}
