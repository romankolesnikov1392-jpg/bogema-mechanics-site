import type { CSSProperties, ReactNode } from "react"
import { cn } from "cn"

type Props = {
  index: string
  label: string
  title: ReactNode
  lead?: ReactNode
  className?: string
  titleClassName?: string
  id?: string
  /** split — на широком экране лид справа от заголовка; stack — всё в колонку (для узких колонок). */
  layout?: "split" | "stack"
}

export function SectionHeader({ index, label, title, lead, className, titleClassName, id, layout = "split" }: Props) {
  const split = layout === "split"
  return (
    <div className={cn("mb-12 md:mb-20", className)}>
      <div data-reveal className="eyebrow flex items-center gap-4">
        <span className="tabular text-spark">{index}</span>
        <span className="text-muted-foreground">{label}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <div className={cn(split && "lg:grid lg:grid-cols-12 lg:items-end lg:gap-10")}>
        <h2
          id={id}
          data-reveal
          style={{ "--i": 1 } as CSSProperties}
          className={cn(
            "display mt-7 max-w-[15ch] text-[clamp(2.75rem,6.4vw,6rem)]",
            split && "lg:col-span-7 lg:max-w-none",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {lead && (
          <p
            data-reveal
            style={{ "--i": 2 } as CSSProperties}
            className={cn("lead mt-6 max-w-2xl", split && "lg:col-span-5 lg:mt-0 lg:pb-2")}
          >
            {lead}
          </p>
        )}
      </div>
    </div>
  )
}
