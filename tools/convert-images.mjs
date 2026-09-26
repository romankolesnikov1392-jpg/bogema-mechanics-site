// Готовит фото для сайта: webp в нескольких ширинах + крошечное размытое превью (LQIP).
// Исходники: assets/photos, assets/masters (+ full — крупные портреты, works — фото работ мастеров). Результат: public/assets/img + src/data/images.json.
// Запуск: npm run images
import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const ROOT = path.resolve(import.meta.dirname, "..")
const OUT = path.join(ROOT, "public/assets/img")
const MANIFEST = path.join(ROOT, "src/data/images.json")
const WIDTHS = [480, 800, 1200, 1600, 2400]
const QUALITY = 78

const sources = [
  { dir: "assets/photos", prefix: "" },
  { dir: "assets/masters", prefix: "master-" },
  { dir: "assets/masters/full", prefix: "master-", suffix: "-full" },
  { dir: "assets/masters/works", prefix: "work-" },
]

await fs.mkdir(OUT, { recursive: true })
const manifest = {}

for (const { dir, prefix, suffix = "" } of sources) {
  const files = (await fs.readdir(path.join(ROOT, dir))).filter((f) => /\.(jpe?g|png)$/i.test(f))
  for (const file of files) {
    const name = prefix + file.replace(/\.[^.]+$/, "") + suffix
    const input = path.join(ROOT, dir, file)
    const meta = await sharp(input).metadata()
    const widths = WIDTHS.filter((w) => w < meta.width)
    widths.push(meta.width) // оригинальная ширина — всегда последняя
    for (const w of widths) {
      await sharp(input)
        .resize({ width: w })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(path.join(OUT, `${name}-${w}.webp`))
    }
    const lqip = await sharp(input).resize({ width: 16 }).blur(1.2).webp({ quality: 40 }).toBuffer()
    manifest[name] = {
      w: meta.width,
      h: meta.height,
      widths,
      lqip: `data:image/webp;base64,${lqip.toString("base64")}`,
    }
    console.log(`${name.padEnd(24)} ${meta.width}×${meta.height} → ${widths.join(", ")}`)
  }
}

// Картинка для превью ссылки в мессенджерах (1200×630).
await sharp(path.join(ROOT, "assets/photos/workshop-lifts.jpg"))
  .resize({ width: 1200, height: 630, fit: "cover", position: "left" })
  .modulate({ brightness: 0.82 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og-image.jpg"))

await fs.mkdir(path.dirname(MANIFEST), { recursive: true })
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n")
console.log(`\nГотово: ${Object.keys(manifest).length} изображений, манифест — src/data/images.json`)
