import { LogoMark } from "@/components/site/Logo"
import { business, nav } from "@/data/business"
import { priceDisclaimer } from "@/data/services"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-graphite pt-20 pb-28 lg:pb-12">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <LogoMark className="size-10" />
              <p translate="no" className="display text-4xl">{business.name}</p>
            </div>
            <p className="mt-5 max-w-sm text-muted-foreground">
              Автосервис полного цикла в ЮЗАО: диагностика, ремонт, кузов и покраска, шиномонтаж и мойка.
            </p>
          </div>
          <nav aria-label="Разделы сайта" className="md:col-span-3">
            <p className="eyebrow text-dim">Разделы</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-muted-foreground transition-colors duration-200 hover:text-foreground">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow text-dim">Контакты</p>
            <address className="mt-4 grid gap-2 not-italic">
              <a href={business.phone.href} className="tabular text-xl font-semibold transition-colors duration-200 hover:text-spark">
                {business.phone.display}
              </a>
              <span className="text-muted-foreground">{business.address.full}</span>
              <span className="text-muted-foreground">{business.hours.label}</span>
            </address>
          </div>
        </div>

        {/* Подпись во всю ширину — как шильдик на станке */}
        <p
          aria-hidden
          className="display mt-20 text-center text-[clamp(2.75rem,11.6vw,11rem)] leading-[0.8] whitespace-nowrap text-white/[0.05] select-none"
        >
          Богема Механикс
        </p>

        <div className="mt-10 grid gap-3 border-t border-line pt-6 text-sm text-dim md:grid-cols-2 md:gap-10">
          <p>{priceDisclaimer}</p>
          <p className="md:text-right">
            © {new Date(__BUILD_DATE__).getFullYear()} {business.fullName}. Демонстрационный проект сайта: данные о сервисе — из открытых источников.
          </p>
        </div>
      </div>
    </footer>
  )
}
