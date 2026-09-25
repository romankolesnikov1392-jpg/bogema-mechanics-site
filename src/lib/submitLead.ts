// Отправка заявки без своего сервера. Способ выбирается переменными окружения при сборке:
//   VITE_FORMSPREE_ID  — заявка уходит на почту через Formspree (formspree.io/f/<id>);
//   VITE_LEAD_ENDPOINT — заявка уходит на serverless-функцию (serverless/telegram-worker),
//                        которая пересылает её в Telegram-бота. Токен бота на сайт не попадает.
// Если не задано ни то ни другое, сайт работает в демо-режиме и честно говорит, что заявка не отправлена.

export type Lead = {
  name: string
  phone: string
  car: string
  service: string
  comment: string
  company?: string // скрытое поле-ловушка для спам-ботов
}

export type LeadResult = { status: "sent" } | { status: "demo" } | { status: "error"; message: string }

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined
const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined

export const leadMode: "formspree" | "endpoint" | "demo" = LEAD_ENDPOINT
  ? "endpoint"
  : FORMSPREE_ID
    ? "formspree"
    : "demo"

export async function submitLead(lead: Lead): Promise<LeadResult> {
  if (lead.company) return { status: "sent" } // бот заполнил ловушку — молча «принимаем»

  const payload = {
    name: lead.name.trim(),
    phone: lead.phone,
    car: lead.car.trim(),
    service: lead.service,
    comment: lead.comment.trim(),
    page: typeof location !== "undefined" ? location.href : "",
  }

  if (leadMode === "demo") {
    await new Promise((r) => setTimeout(r, 600))
    return { status: "demo" }
  }

  const url = leadMode === "endpoint" ? LEAD_ENDPOINT! : `https://formspree.io/f/${FORMSPREE_ID}`
  const body =
    leadMode === "formspree"
      ? { ...payload, _subject: `Заявка с сайта: ${payload.service || "запись"} — ${payload.name}` }
      : payload

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(String(res.status))
    return { status: "sent" }
  } catch {
    return {
      status: "error",
      message: "Не получилось отправить заявку. Проверьте интернет или позвоните нам.",
    }
  }
}
