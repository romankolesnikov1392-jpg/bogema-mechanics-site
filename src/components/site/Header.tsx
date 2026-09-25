import { useEffect, useRef, useState, type CSSProperties } from "react"
import { cn } from "cn"
import { Menu, Phone } from "lucide-react"
import { WhatsappIcon } from "@/components/icons/WhatsappIcon"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Logo } from "@/components/site/Logo"
import { OpenStatus } from "@/components/site/OpenStatus"
import { useBooking } from "@/components/site/Booking"
import { business, nav } from "@/data/business"

const desktopNav = nav.filter((n) => ["services", "masters", "works", "reviews", "offers", "contacts"].includes(n.id))

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])
  return scrolled
}

// Подсветка раздела, который сейчас на экране.
function useActiveSection() {
  const [active, setActive] = useState<string>("")
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return active
}

export function Header() {
  const scrolled = useScrolled()
  const active = useActiveSection()
  const { openBooking } = useBooking()
  const [menuOpen, setMenuOpen] = useState(false)
  const pendingTarget = useRef<string | null>(null)

  // В открытом меню прокрутка страницы заблокирована, поэтому к разделу переходим кодом,
  // когда меню уже закрылось, а не обычным якорем.
  const goFromMenu = (id: string) => {
    pendingTarget.current = id
    setMenuOpen(false)
  }
  const onMenuClosed = (open: boolean) => {
    if (open || !pendingTarget.current) return
    const el = document.getElementById(pendingTarget.current)
    pendingTarget.current = null
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
    history.replaceState(null, "", `#${el.id}`)
  }

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-transparent transition-[background-color,border-color] duration-300 ease-out data-scrolled:border-line data-scrolled:bg-background/85 data-scrolled:backdrop-blur-md"
    >
      <div className="container-x flex h-full items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Разделы" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {desktopNav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className="group/nav eyebrow relative block px-3 py-2 text-muted-foreground transition-colors duration-200 hover:text-foreground aria-[current]:text-foreground"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-spark transition-transform duration-300 ease-out-strong group-hover/nav:scale-x-100 group-aria-[current]/nav:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={business.phone.href}
            className="tabular hidden items-center gap-2 px-2 font-mono text-sm tracking-wide text-foreground transition-colors duration-200 hover:text-spark md:flex"
          >
            <Phone strokeWidth={2.25} className="size-4 text-spark" />
            {business.phone.display}
          </a>
          <Button className="hidden sm:inline-flex" onClick={() => openBooking()}>
            Записаться
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="xl:hidden"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu strokeWidth={2.25} className="size-5" />
          </Button>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen} onOpenChangeComplete={onMenuClosed}>
        <SheetContent side="right" className="max-w-none sm:max-w-md">
          <SheetTitle>Меню</SheetTitle>
          <div className="flex h-(--header-h) shrink-0 items-center border-b border-line px-5">
            <Logo onClick={() => setMenuOpen(false)} />
          </div>
          <nav aria-label="Разделы" className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
            <ul className="grid">
              {nav.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      goFromMenu(item.id)
                    }}
                    style={{ "--i": i } as CSSProperties}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-line py-2.5 transition-colors duration-200 hover:text-spark",
                      active === item.id && "text-spark",
                    )}
                  >
                    <span className="eyebrow tabular w-6 text-dim">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[2rem] sm:text-4xl">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-3 border-t border-line px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <OpenStatus className="justify-self-start" />
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg" render={<a href={business.phone.href} />} nativeButton={false}>
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
            </div>
            <Button
              size="lg"
              onClick={() => {
                setMenuOpen(false)
                openBooking()
              }}
            >
              Записаться
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
