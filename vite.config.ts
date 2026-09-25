import path from "node:path"
import { defineConfig, type HtmlTagDescriptor, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

import { business } from "./src/data/business.ts"
import { faq } from "./src/data/content.ts"
import images from "./src/data/images.json" with { type: "json" }

// GitHub Pages отдаёт сайт из подпапки с именем репозитория.
const BASE = "/bogema-mechanics-site/"
const SITE_URL = `https://romankolesnikov1392-jpg.github.io${BASE}`

// JSON-LD для поисковиков и preload главного фото — из тех же данных, что видит посетитель.
function seo(): Plugin {
  const autoRepair = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE_URL}#service`,
    name: business.fullName,
    url: SITE_URL,
    image: `${SITE_URL}og-image.jpg`,
    telephone: business.phone.e164,
    foundingDate: String(business.since),
    priceRange: "600–140 000 ₽",
    currenciesAccepted: "RUB",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      postalCode: business.address.postalCode,
      addressCountry: "RU",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lon },
    hasMap: business.links.yandexMap,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    sameAs: [business.links.zoon],
  }
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
  const hero = images["workshop-lifts"]

  return {
    name: "bogema-seo",
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [
        {
          tag: "link",
          attrs: {
            rel: "preload",
            as: "image",
            type: "image/webp",
            fetchpriority: "high",
            imagesrcset: hero.widths.map((w) => `${BASE}assets/img/workshop-lifts-${w}.webp ${w}w`).join(", "),
            imagesizes: "(min-width: 1024px) 66vw, 100vw",
          },
          injectTo: "head",
        },
        { tag: "script", attrs: { type: "application/ld+json" }, children: JSON.stringify(autoRepair), injectTo: "head" },
        { tag: "script", attrs: { type: "application/ld+json" }, children: JSON.stringify(faqPage), injectTo: "head" },
      ]
      return tags
    },
  }
}

export default defineConfig({
  base: BASE,
  define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString()) },
  plugins: [react(), tailwindcss(), seo()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
})
