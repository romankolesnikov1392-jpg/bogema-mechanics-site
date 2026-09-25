import type { CSSProperties } from "react"
import { Phone } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { business } from "@/data/business"
import { faq } from "@/data/content"

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader
            id="faq-title"
            index="07"
            label="Вопросы"
            title="Частые вопросы"
            layout="stack"
            lead="Не нашли ответа — позвоните. Мастер-приёмщик подскажет и сориентирует по срокам и цене."
            className="mb-8 md:mb-10"
          />
          <div data-reveal>
            <Button variant="outline" size="lg" render={<a href={business.phone.href} />} nativeButton={false} className="tabular">
              <Phone strokeWidth={2.25} className="text-spark" />
              {business.phone.display}
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Accordion className="border-t border-line">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={item.q} data-reveal style={{ "--i": i % 4 } as CSSProperties}>
                <AccordionTrigger>
                  <span className="text-lg font-semibold leading-snug transition-colors duration-200 group-hover/accordion-trigger:text-spark sm:text-xl">
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
