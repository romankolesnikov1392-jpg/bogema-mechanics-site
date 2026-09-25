// Пререндер: рендерим React-приложение в HTML при сборке и вшиваем в dist/index.html.
// Посетитель сразу видит готовую страницу, а JS потом только «оживляет» её (hydrateRoot).
import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const ROOT = path.resolve(import.meta.dirname, "..")
const ssrEntry = pathToFileURL(path.join(ROOT, "dist-ssr/entry-server.js")).href
const { render } = await import(ssrEntry)

const htmlPath = path.join(ROOT, "dist/index.html")
const template = await fs.readFile(htmlPath, "utf8")
const appHtml = render()
if (!template.includes('<div id="root"></div>')) throw new Error("В index.html не найден пустой #root")

// Preload кириллицы для заголовков и основного текста: первый экран без «прыжка» шрифтов.
const assets = await fs.readdir(path.join(ROOT, "dist/assets"))
const base = template.match(/src="([^"]*)assets\/index-[^"]+\.js"/)?.[1] ?? "/"
const preloadFonts = ["sofia-sans-extra-condensed-cyrillic-wght-normal", "golos-text-cyrillic-wght-normal"]
  .map((prefix) => assets.find((f) => f.startsWith(prefix) && f.endsWith(".woff2")))
  .filter(Boolean)
  .map((f) => `<link rel="preload" as="font" type="font/woff2" href="${base}assets/${f}" crossorigin>`)
  .join("\n    ")

const html = template
  .replace("</title>", `</title>\n    ${preloadFonts}`)
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
await fs.writeFile(htmlPath, html)
await fs.rm(path.join(ROOT, "dist-ssr"), { recursive: true, force: true })

// GitHub Pages: без .nojekyll файлы с подчёркиванием не отдаются.
await fs.writeFile(path.join(ROOT, "dist/.nojekyll"), "")
console.log(`Пререндер готов: ${(appHtml.length / 1024).toFixed(1)} КБ HTML в dist/index.html`)
