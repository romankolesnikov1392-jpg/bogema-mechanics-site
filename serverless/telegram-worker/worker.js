// Cloudflare Worker: принимает заявку с сайта и пересылает её в Telegram-бота.
// Без базы данных и своего сервера. Секреты (токен бота, chat id) хранятся в Cloudflare,
// на сайт не попадают. Деплой: см. serverless/telegram-worker/README.md
//
// Переменные окружения:
//   BOT_TOKEN        — секрет, токен бота от @BotFather
//   CHAT_ID          — секрет, id чата/группы, куда слать заявки
//   ALLOWED_ORIGINS  — через запятую, например https://romankolesnikov1392-jpg.github.io

const LIMITS = { name: 80, phone: 32, car: 120, service: 80, comment: 1000, page: 300 }

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || ""
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean)
    const cors = {
      "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : allowed[0] || "",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    }
    const json = (body, status = 200) =>
      new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } })

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors })
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405)
    if (!allowed.includes(origin)) return json({ ok: false, error: "origin" }, 403)

    let data
    try {
      data = await request.json()
    } catch {
      return json({ ok: false, error: "json" }, 400)
    }

    const clean = {}
    for (const [key, max] of Object.entries(LIMITS)) clean[key] = String(data?.[key] ?? "").trim().slice(0, max)
    const digits = clean.phone.replace(/\D/g, "")
    if (clean.name.length < 2 || digits.length < 10) return json({ ok: false, error: "validation" }, 422)

    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    const lines = [
      "<b>Новая заявка с сайта</b>",
      `👤 ${esc(clean.name)}`,
      `📞 <a href="tel:+${digits}">${esc(clean.phone)}</a>`,
      clean.car && `🚗 ${esc(clean.car)}`,
      clean.service && `🔧 ${esc(clean.service)}`,
      clean.comment && `💬 ${esc(clean.comment)}`,
    ].filter(Boolean)

    const tg = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text: lines.join("\n"), parse_mode: "HTML", disable_web_page_preview: true }),
    })
    if (!tg.ok) return json({ ok: false, error: "telegram" }, 502)
    return json({ ok: true })
  },
}
