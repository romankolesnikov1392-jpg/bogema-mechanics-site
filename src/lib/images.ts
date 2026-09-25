import manifest from "@/data/images.json"

type Entry = { w: number; h: number; widths: number[]; lqip: string }
const images = manifest as Record<string, Entry>

const BASE = import.meta.env.BASE_URL

export function getImage(name: string) {
  const entry = images[name]
  if (!entry) throw new Error(`Нет изображения «${name}» в images.json — запустите npm run images`)
  const url = (w: number) => `${BASE}assets/img/${name}-${w}.webp`
  return {
    ...entry,
    src: url(entry.widths.includes(1200) ? 1200 : entry.widths[entry.widths.length - 1]),
    srcSet: entry.widths.map((w) => `${url(w)} ${w}w`).join(", "),
  }
}
