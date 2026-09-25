import { cn } from "cn"

// Знак — гайка, вид сверху. Простая геометрия, читается и в 16px фавиконки.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8 text-spark", className)}>
      <path d="M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25z" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="16" cy="16" r="5.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  )
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label="Богема Механикс — на главную"
      className={cn("group/logo flex items-center gap-3 outline-none focus-visible:outline-2 focus-visible:outline-spark", className)}
    >
      <LogoMark className="transition-transform duration-300 ease-out-strong group-hover/logo:rotate-30" />
      <span translate="no" className="flex flex-col leading-none">
        <span className="display text-[1.625rem] tracking-[0.01em]">Богема</span>
        <span className="eyebrow mt-0.5 text-[0.625rem] tracking-[0.32em] text-muted-foreground">Механикс</span>
      </span>
    </a>
  )
}
