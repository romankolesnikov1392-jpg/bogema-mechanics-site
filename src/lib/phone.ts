// Маска российского номера: +7 (926) 416-84-22. Принимает ввод с 8, 7, +7 или без кода.
export function normalizeDigits(value: string) {
  let d = value.replace(/\D/g, "")
  if (d.startsWith("8")) d = "7" + d.slice(1)
  if (d && !d.startsWith("7")) d = "7" + d
  return d.slice(0, 11)
}

export function formatPhone(value: string) {
  const d = normalizeDigits(value)
  if (!d) return ""
  const p = d.slice(1)
  let out = "+7"
  if (p.length) out += " (" + p.slice(0, 3)
  if (p.length >= 3) out += ")"
  if (p.length > 3) out += " " + p.slice(3, 6)
  if (p.length > 6) out += "-" + p.slice(6, 8)
  if (p.length > 8) out += "-" + p.slice(8, 10)
  return out
}

export function isValidPhone(value: string) {
  return normalizeDigits(value).length === 11
}
