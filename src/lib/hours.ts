import { business } from "@/data/business"

export type OpenState =
  | { kind: "open"; minutesLeft: number }
  | { kind: "closed"; opensTomorrow: boolean }

// Москва живёт в UTC+3 без перехода на летнее время, поэтому считаем без Intl.
export function moscowMinutes(date = new Date()) {
  return (date.getUTCHours() * 60 + date.getUTCMinutes() + 180) % 1440
}

export function getOpenState(date = new Date()): OpenState {
  const now = moscowMinutes(date)
  const { open, close } = business.hours
  if (now >= open && now < close) return { kind: "open", minutesLeft: close - now }
  return { kind: "closed", opensTomorrow: now >= close }
}

export function openStateLabel(state: OpenState) {
  if (state.kind === "open") {
    if (state.minutesLeft <= 60) return `Открыто ещё ${state.minutesLeft} мин`
    return "Сейчас открыто · до 21:00"
  }
  return state.opensTomorrow ? "Закрыто · откроемся завтра в 9:00" : "Закрыто · откроемся в 9:00"
}
