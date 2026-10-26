# Форум «Коло»

Пости завантажуються з `GET /posts` backend `forum-api` через RTK Query. Статичних постів у frontend немає.

## Запуск

У корені репозиторію:

```bash
npm install
npm run db:init # для нової бази даних
npm run db:seed # додасть 3 пости лише якщо база порожня
npm start
```

У другому терміналі:

```bash
cd frontend
npm install
npm run dev
```

Відкрийте адресу, яку показує Vite. Dev server пересилає `/api/posts` на `http://localhost:3000/posts`. Для backend потрібен `DATABASE_URL` у кореневому `.env` (приклад у `.env.example`).

Для перевірки API: `curl http://localhost:3000/posts`. Відповідь має бути JSON-масивом. Якщо база порожня, виконайте `npm run db:seed` у корені репозиторію.
