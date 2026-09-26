import { useId, useRef, useState, type FormEvent } from "react"
import { cn } from "cn"
import { CircleCheck, Info, LoaderCircle, Phone, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { business } from "@/data/business"
import { serviceOptions } from "@/data/services"
import { formatPhone, isValidPhone } from "@/lib/phone"
import { submitLead, type LeadResult } from "@/lib/submitLead"

type Errors = Partial<Record<"name" | "phone" | "consent", string>>

export function BookingForm({
  defaultService = "",
  defaultComment = "",
  onDone,
  className,
}: {
  defaultService?: string
  defaultComment?: string
  onDone?: () => void
  className?: string
}) {
  const uid = useId()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [car, setCar] = useState("")
  const [service, setService] = useState<string>(defaultService)
  const [comment, setComment] = useState(defaultComment)
  const [consent, setConsent] = useState(false)
  const [company, setCompany] = useState("") // ловушка для ботов
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState<LeadResult | null>(null)
  const [submitError, setSubmitError] = useState("")
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const consentRef = useRef<HTMLElement>(null)

  // Ошибка поля исчезает, как только его начали исправлять.
  const clearError = (k: keyof Errors) => errors[k] && setErrors((prev) => ({ ...prev, [k]: undefined }))

  const validate = (): Errors => {
    const e: Errors = {}
    if (name.trim().length < 2) e.name = "Как к вам обращаться?"
    if (!isValidPhone(phone)) e.phone = "Нужен номер из 11 цифр, например +7 (926) 416-84-22"
    if (!consent) e.consent = "Без согласия мы не сможем перезвонить"
    return e
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (e.name) return nameRef.current?.focus()
    if (e.phone) return phoneRef.current?.focus()
    if (e.consent) return consentRef.current?.focus()

    setPending(true)
    setSubmitError("")
    const res = await submitLead({ name, phone, car, service, comment, company })
    setPending(false)
    if (res.status === "error") {
      setSubmitError(res.message)
      return
    }
    setResult(res)
  }

  if (result && result.status !== "error") {
    const demo = result.status === "demo"
    return (
      <div role="status" className={cn("flex flex-col items-start gap-5", className)}>
        {demo ? <Info className="size-10 text-spark" /> : <CircleCheck className="size-10 text-ok" />}
        <h3 className="display text-4xl">{demo ? "Это демо-версия сайта" : "Заявка отправлена"}</h3>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          {demo
            ? "Онлайн-заявки на этой версии сайта пока не подключены, поэтому ваши данные никуда не ушли. Чтобы записаться, позвоните нам."
            : `Спасибо, ${name.trim()}! Мастер-приёмщик перезвонит вам в рабочее время: ${business.hours.label.toLowerCase()}.`}
        </p>
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Button render={<a href={business.phone.href} />} nativeButton={false} size="lg" className="flex-1">
            <Phone strokeWidth={2.25} />
            {business.phone.display}
          </Button>
          {onDone && (
            <Button variant="outline" size="lg" onClick={onDone}>
              Закрыть
            </Button>
          )}
        </div>
      </div>
    )
  }

  const err = (k: keyof Errors) => (errors[k] ? `${uid}-${k}-err` : undefined)

  return (
    <form noValidate onSubmit={onSubmit} className={cn("grid gap-5", className)} aria-busy={pending}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2.5">
          <Label htmlFor={`${uid}-name`}>Имя</Label>
          <Input
            ref={nameRef}
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            placeholder="Например, Алексей…"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              clearError("name")
            }}
            aria-invalid={!!errors.name || undefined}
            aria-describedby={err("name")}
          />
          {errors.name && <FieldError id={err("name")!}>{errors.name}</FieldError>}
        </div>
        <div className="grid gap-2.5">
          <Label htmlFor={`${uid}-phone`}>Телефон</Label>
          <Input
            ref={phoneRef}
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value))
              clearError("phone")
            }}
            aria-invalid={!!errors.phone || undefined}
            aria-describedby={err("phone")}
            className="tabular"
          />
          {errors.phone && <FieldError id={err("phone")!}>{errors.phone}</FieldError>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2.5">
          <Label htmlFor={`${uid}-car`}>Автомобиль</Label>
          <Input
            id={`${uid}-car`}
            name="car"
            autoComplete="off"
            placeholder="Например, Kia Rio 2019…"
            value={car}
            onChange={(e) => setCar(e.target.value)}
          />
        </div>
        <div className="grid gap-2.5">
          <Label htmlFor={`${uid}-service`}>Что нужно сделать</Label>
          <NativeSelect id={`${uid}-service`} name="service" value={service} onChange={(e) => setService(e.target.value)}>
            <NativeSelectOption value="">Выберите услугу</NativeSelectOption>
            {serviceOptions.map((s) => (
              <NativeSelectOption key={s} value={s}>
                {s}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div className="grid gap-2.5">
        <Label htmlFor={`${uid}-comment`}>Комментарий</Label>
        <Textarea
          id={`${uid}-comment`}
          name="comment"
          autoComplete="off"
          placeholder="Что беспокоит, когда удобно приехать…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Поле-ловушка: люди его не видят, боты заполняют. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Компания
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
      </div>

      <div className="grid gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <Checkbox
            ref={consentRef}
            checked={consent}
            onCheckedChange={(v) => {
              setConsent(v === true)
              clearError("consent")
            }}
            aria-invalid={!!errors.consent || undefined}
            aria-describedby={err("consent")}
          />
          <span>Согласен на обработку персональных данных, чтобы со мной связались по заявке</span>
        </label>
        {errors.consent && <FieldError id={err("consent")!}>{errors.consent}</FieldError>}
      </div>

      {submitError && (
        <p role="alert" className="flex items-start gap-2.5 border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground">
          <TriangleAlert strokeWidth={2.25} className="mt-0.5 size-4 shrink-0 text-destructive" />
          {submitError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? <LoaderCircle className="animate-spin" /> : null}
        {pending ? "Отправляем…" : "Отправить заявку"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Или позвоните:{" "}
        <a href={business.phone.href} className="tabular text-foreground underline-offset-4 hover:underline">
          {business.phone.display}
        </a>
      </p>
    </form>
  )
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="text-sm text-destructive">
      {children}
    </p>
  )
}
