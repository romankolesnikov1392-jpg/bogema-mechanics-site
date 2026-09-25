import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("eyebrow flex items-center gap-2 text-muted-foreground select-none", className)}
      {...props}
    />
  )
}

export { Label }
