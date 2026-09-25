import { useEffect, useState } from "react"
import { cn } from "cn"

import { getOpenState, openStateLabel, type OpenState } from "@/lib/hours"
import { business } from "@/data/business"

// Статус по московскому времени, обновляется раз в полминуты. Считается только в браузере:
// в пререндеренном HTML стоит нейтральный режим работы, чтобы гидратация не разошлась со временем сборки.
export function OpenStatus({ className }: { className?: string }) {
  const [state, setState] = useState<OpenState | null>(null)

  useEffect(() => {
    setState(getOpenState())
    const t = window.setInterval(() => setState(getOpenState()), 30_000)
    return () => window.clearInterval(t)
  }, [])

  const open = state?.kind === "open"

  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-3 border border-line-strong bg-background/60 px-3.5 py-2.5 text-foreground backdrop-blur-sm",
        className,
      )}
    >
      <span aria-hidden className="relative flex size-2">
        {open && <span className="status-ring absolute inset-0 rounded-full bg-ok" />}
        <span className={cn("relative size-2 rounded-full", open ? "bg-ok" : state ? "bg-dim" : "bg-spark")} />
      </span>
      <span>{state ? openStateLabel(state) : business.hours.label}</span>
    </span>
  )
}
