import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookingForm } from "@/components/site/BookingForm"
import { business } from "@/data/business"

type BookingApi = { openBooking: (service?: string, comment?: string) => void }

const BookingContext = createContext<BookingApi | null>(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking вне BookingProvider")
  return ctx
}

// Один диалог записи на весь сайт. Любая кнопка «Записаться» открывает его,
// при желании — сразу с выбранной услугой и комментарием (например, «к мастеру …»). key пересоздаёт форму при каждом открытии.
export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [service, setService] = useState("")
  const [comment, setComment] = useState("")
  const [session, setSession] = useState(0)

  const openBooking = useCallback((s = "", c = "") => {
    setService(s)
    setComment(c)
    setSession((n) => n + 1)
    setOpen(true)
  }, [])

  const api = useMemo(() => ({ openBooking }), [openBooking])

  return (
    <BookingContext.Provider value={api}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <p className="eyebrow text-spark">Запись · {business.hours.label}</p>
            <DialogTitle>Запись в сервис</DialogTitle>
            <DialogDescription>
              Оставьте номер — мастер-приёмщик перезвонит, уточнит задачу и подберёт удобное время.
            </DialogDescription>
          </DialogHeader>
          <BookingForm key={session} defaultService={service} defaultComment={comment} onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  )
}
