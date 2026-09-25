# Богема Механикс — сайт автосервиса

Демо-кейс для портфолио: одностраничный сайт автосервиса полного цикла на ул. Каховка, 30 (Москва).
Тёмная индустриальная тема, реальные фото и данные сервиса с Zoon, форма записи без своего бэкенда.

**Сайт:** https://romankolesnikov1392-jpg.github.io/bogema-mechanics-site/

## Стек

- Vite + React 19 + TypeScript, Tailwind CSS v4
- shadcn/ui (стиль Lyra на Base UI) — кнопки, аккордеон, диалоги, боковое меню, карусель, поля формы;
  все компоненты перестилизованы под тему в `src/components/ui`
- Шрифты: Sofia Sans Extra Condensed (заголовки), Golos Text (текст), JetBrains Mono (подписи, цены)
- Пререндер при сборке: HTML страницы готов сразу, React затем «оживляет» его (`tools/prerender.mjs`)
- Деплой: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`)

## Команды

```
npm install
npm run dev       # разработка, http://localhost:5173/bogema-mechanics-site/
npm run build     # проверка типов, сборка, пререндер → dist/
npm run preview   # посмотреть собранный сайт
npm run images    # пересобрать фото из assets/ → public/assets/img + src/data/images.json
```

## Где что менять

| Что | Файл |
| --- | --- |
| Телефон, адрес, часы, год, рейтинг, марки | `src/data/business.ts` |
| Прайс (цены «по запросу» — `price: null`) | `src/data/services.ts` |
| Мастера, отзывы, акции, вопросы, галерея, «до/после» | `src/data/content.ts` |
| Исходные фото | `assets/photos`, `assets/masters` → затем `npm run images` |
| Цвета, шрифты, анимации | `src/index.css` |

Акции скрываются сами после даты `until`. Слайдер «до/после» появляется, когда в `beforeAfter`
добавлены пары фото одного автомобиля.

## Форма записи

Работает без своего сервера. Способ отправки выбирается переменной при сборке
(GitHub → Settings → Secrets and variables → Actions → **Variables**):

- `VITE_FORMSPREE_ID` — заявки на почту через [Formspree](https://formspree.io): создайте форму, возьмите id из адреса `formspree.io/f/<id>`.
- `VITE_LEAD_ENDPOINT` — заявки в Telegram через serverless-функцию, см. `serverless/telegram-worker/README.md`.

Пока ни одна переменная не задана, форма работает в демо-режиме: проверяет поля и честно пишет,
что заявка не отправлена, предлагая позвонить.

## Анимации

Сдержанные, 200–400 мс, сильный ease-out на входе, только `transform`/`opacity`:
появление секций при скролле (IntersectionObserver + CSS), параллакс фото на первом экране,
наклон карточек мастеров и галереи на пружине (только мышь), зум фото при наведении.
Всё уважает `prefers-reduced-motion`.

## Скиллы для Claude Code

Папка `.claude/skills/` в git не хранится. После клона: `npx skills experimental_install` (по `skills-lock.json`).
