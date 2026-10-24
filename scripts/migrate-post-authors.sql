-- Run once against a database made by the category branch before db:update.
-- Preserve old author text as User.name and give legacy users disabled credentials.
BEGIN;

CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "name" TEXT
);

INSERT INTO "User" ("email", "password", "name")
SELECT 'legacy+' || md5("author") || '@example.invalid', '!disabled', "author"
FROM "Post"
GROUP BY "author";

ALTER TABLE "Post" ADD COLUMN "authorId" INTEGER;

UPDATE "Post" AS post
SET "authorId" = usr."id"
FROM "User" AS usr
WHERE usr."name" = post."author";

ALTER TABLE "Post" ALTER COLUMN "authorId" SET NOT NULL;
ALTER TABLE "Post" DROP COLUMN "author";

COMMIT;

-- npm run db:update adds the foreign key and index.
