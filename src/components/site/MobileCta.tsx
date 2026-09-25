import { useEffect, useState } from "react"
import { Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/site/Booking"
import { business } from "@/data/business"

// Нижняя панель на телефоне: звонок и запись всегда под пальцем.
// Появляется, когда первый экран ушёл вверх, и прячется у блока контактов, где есть своя форма.
export function MobileCta() {
  const { openBooking } = useBooking()
  const [pastHero, setPastHero] = useState(false)
  const [atContacts, setAtContacts] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("top")
    const contacts = document.getElementById("contacts")
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPastHero(!e.isIntersecting)
        if (e.target === contacts) setAtContacts(e.isIntersecting)
      }
    })
    if (hero) io.observe(hero)
    if (contacts) io.observe(contacts)
    return () => io.disconnect()
  }, [])

  const visible = pastHero && !atContacts

  return (
    <div
      data-visible={visible || undefined}
      inert={!visible}
      className="fixed inset-x-0 bottom-0 z-40 translate-y-full border-t border-line-strong bg-background/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-drawer data-visible:translate-y-0 lg:hidden motion-reduce:transition-none"
    >
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <Button variant="outline" size="lg" render={<a href={business.phone.href} aria-label={`Позвонить: ${business.phone.display}`} />} nativeButton={false}>
          <Phone strokeWidth={2.25} />
          Позвонить
        </Button>
        <Button size="lg" onClick={() => openBooking()}>
          Записаться
        </Button>
      </div>
    </div>
  )
}
