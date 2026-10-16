# Forum API

Простий API на Express, TypeScript, PostgreSQL та Prisma ORM 8.
Категорія має багато дописів, кожен допис належить одній категорії.

## Запуск

Потрібні Node.js 22+ і PostgreSQL 15+.

```bash
npm ci
cp .env.example .env
```

У `.env` вкажіть `DATABASE_URL` своєї PostgreSQL.
Для нової порожньої БД:

```bash
npm run contract:emit
npm run db:init
npm start
```

Сервер: `http://localhost:3000`.

## Оновлення попередньої БД

Якщо в БД вже є таблиця Post з текстовим полем category, спочатку
виконайте SQL нижче, підставивши свій DATABASE_URL замість прикладу.
Він створить категорії зі старих назв та заповнить categoryId без втрати дописів.
Потім Prisma додасть зовнішній ключ та індекс.

```bash
npm run contract:emit
psql "postgresql://user:password@localhost:5432/mydb" -v ON_ERROR_STOP=1 -f scripts/migrate-post-categories.sql
npm run db:update
npm run db:verify
```

Цей SQL виконується один раз для старої структури таблиці.

## Запити

| Метод | Шлях | Дія |
| --- | --- | --- |
| GET | /categories | Усі категорії |
| GET | /categories/:id | Категорія за id |
| POST | /categories | Створити категорію |
| GET | /posts | Усі дописи з вкладеною category |
| GET | /posts/:id | Один допис з вкладеною category |
| POST | /posts | Створити допис у категорії |

Тіло `POST /categories`:

```json
{ "name": "JavaScript" }
```

Тіло `POST /posts`:

```json
{
  "title": "Перший допис",
  "content": "Вивчаю JavaScript",
  "author": "Ілля",
  "categoryId": 1
}
```

`categoryId` передається числом. Назва категорії унікальна.
Зайві поля та порожні текстові значення не допускаються.

Фільтри: `/posts?category=JavaScript`, `/posts?categoryId=1`,
`/posts?categoryId=1&take=2`. Якщо передати обидва фільтри категорії,
мають виконуватися обидві умови. Якщо збігів немає, відповідь — `[]`.

Приклад `GET /posts` — [docs/get-posts.json](docs/get-posts.json).

## Помилки

Помилки повертають JSON: `{ "message": "Опис помилки" }`.

| Код | Причина |
| --- | --- |
| 400 | Некоректний id/categoryId або некоректний JSON |
| 404 | Допис, категорію або маршрут не знайдено |
| 409 | Категорія з такою назвою вже існує |
| 422 | Недопустимі поля, порожній текст або некоректний take/category |
| 500 | Помилка сервера або підключення до БД |

## Перевірка

```bash
npx tsc --noEmit
npm run db:verify
```

Імпортуйте [колекцію Postman](postman/forum-api.postman_collection.json)
та запустіть її через Collection Runner на порожній БД. Вона створює
2 категорії та 3 дописи й перевіряє вкладену category, фільтри та помилки.
Змінна `baseUrl` за замовчуванням — `http://localhost:3000`.
Або запустіть цю саму колекцію через Newman:

```bash
npx newman run postman/forum-api.postman_collection.json
```

Результати перевірки та скриншоти — [docs/verification.md](docs/verification.md).

Для перегляду даних у Prisma Studio виконайте з директорії поза проєктом,
підставивши свій рядок підключення:

```bash
npx prisma@7 studio --url "postgresql://user:password@localhost:5432/mydb"
```

Prisma ORM 8 використовується для API. Studio запускається окремо через
Prisma CLI 7, як описано в [документації Prisma](https://www.prisma.io/docs/orm/coming-from-prisma-orm-7#commands).
