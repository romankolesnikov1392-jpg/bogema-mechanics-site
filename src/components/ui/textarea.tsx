import * as React from "react"
import { cn } from "cn"

import { fieldBase } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, "field-sizing-content min-h-24 resize-none py-3", className)}
      {...props}
    />
  )
}

export { Textarea }
