import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

// 16px текст — iOS не зумит страницу при фокусе.
const fieldBase =
  "w-full min-w-0 border border-input bg-white/[0.03] px-4 text-base text-foreground outline-none transition-[border-color,background-color] duration-200 ease-out placeholder:text-dim hover:border-foreground/30 focus-visible:border-spark focus-visible:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <InputPrimitive type={type} data-slot="input" className={cn(fieldBase, "h-12", className)} {...props} />
}

export { Input, fieldBase }
