import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"
import { Plus } from "lucide-react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-line", className)}
      {...props}
    />
  )
}

// Плюс поворачивается в крестик: состояние видно без второй иконки.
function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-6 py-6 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center border border-line-strong text-muted-foreground transition-[color,border-color,background-color] duration-200 ease-out group-hover/accordion-trigger:border-foreground/35 group-hover/accordion-trigger:text-foreground group-aria-expanded/accordion-trigger:border-spark group-aria-expanded/accordion-trigger:bg-spark group-aria-expanded/accordion-trigger:text-primary-foreground"
        >
          <Plus
            strokeWidth={2.25}
            className="size-4 transition-transform duration-200 ease-out-strong group-aria-expanded/accordion-trigger:rotate-45"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

// Высота панели анимируется через --accordion-panel-height (единственный случай,
// где анимация height допустима: у аккордеона нет transform-эквивалента).
function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-250 ease-out-strong data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn("pb-7", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
