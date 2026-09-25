# Заявки с сайта в Telegram

Маленькая serverless-функция на Cloudflare Workers (бесплатный тариф): сайт отправляет заявку,
функция проверяет поля и пересылает сообщение в Telegram. Базы данных и своего сервера нет,
токен бота хранится в секретах Cloudflare и в код сайта не попадает.

## Один раз настроить

1. В Telegram у [@BotFather](https://t.me/BotFather) создайте бота (`/newbot`) и сохраните токен.
2. Напишите боту любое сообщение (или добавьте его в группу), затем откройте
   `https://api.telegram.org/bot<ТОКЕН>/getUpdates` и возьмите `chat.id`.
3. Задеплойте функцию:

   ```
   cd serverless/telegram-worker
   npx wrangler login
   npx wrangler secret put BOT_TOKEN
   npx wrangler secret put CHAT_ID
   npx wrangler deploy
   ```

   Wrangler выведет адрес вида `https://bogema-lead.<аккаунт>.workers.dev`.
4. В репозитории на GitHub: Settings → Secrets and variables → Actions → Variables →
   добавьте `VITE_LEAD_ENDPOINT` с этим адресом. Следующая сборка сайта начнёт слать заявки в Telegram.

Автодеплой функции вместе с сайтом: добавьте в Secrets репозитория `CLOUDFLARE_API_TOKEN`
и `CLOUDFLARE_ACCOUNT_ID` — workflow `deploy.yml` сам выполнит `wrangler deploy` при каждом пуше.
