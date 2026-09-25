import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Перестилизовано под тёмную индустриальную тему: острые углы, моно-подпись капсом,
// нажатие — scale(0.97) за 100ms, наведение — только цвет (ease, 200ms). Никакого transition: all.
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2.5 border border-transparent font-mono font-medium tracking-[0.08em] whitespace-nowrap uppercase outline-none select-none transition-[background-color,border-color,color,scale] duration-200 ease-out-strong active:scale-[0.97] active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-spark disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[#ffa555]",
        outline:
          "border-line-strong bg-transparent text-foreground hover:border-foreground/35 hover:bg-white/[0.04]",
        secondary: "bg-steel text-foreground hover:bg-accent",
        ghost: "text-foreground hover:bg-white/[0.06]",
        destructive: "bg-destructive/15 text-destructive hover:bg-destructive/25",
        link: "px-0 text-spark underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 text-[0.8125rem]",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-14 px-7 text-sm",
        xs: "h-7 px-2.5 text-[0.6875rem]",
        icon: "size-11",
        "icon-xs": "size-7",
        "icon-sm": "size-9",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
