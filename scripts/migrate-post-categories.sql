-- Для старої БД, де Post.category ще є текстовим полем.
-- Переносимо назви у Category та зберігаємо всі дописи.
BEGIN;

CREATE TABLE "Category" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE
);

INSERT INTO "Category" ("name")
SELECT DISTINCT "category" FROM "Post" ORDER BY "category";

ALTER TABLE "Post" ADD COLUMN "categoryId" INTEGER;

UPDATE "Post"
SET "categoryId" = "Category"."id"
FROM "Category"
WHERE "Post"."category" = "Category"."name";

ALTER TABLE "Post" ALTER COLUMN "categoryId" SET NOT NULL;
ALTER TABLE "Post" DROP COLUMN "category";

COMMIT;

-- Після цього npm run db:update додасть зовнішній ключ та індекс.
