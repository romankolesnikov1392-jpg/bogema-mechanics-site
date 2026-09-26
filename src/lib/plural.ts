// «1 год», «2 года», «5 лет», «11 лет», «21 год».
export function yearsWord(n: number) {
  const d = n % 10
  const dd = n % 100
  if (d === 1 && dd !== 11) return "год"
  if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return "года"
  return "лет"
}
