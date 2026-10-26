import { db } from '../src/prisma/db.js';
import { createPostRepository } from '../src/repositories/post.repository.js';

const repository = createPostRepository(db);
const existingPosts = await repository.getAll(undefined, 1);

if (existingPosts.length > 0) {
  console.log('Пости вже є у базі даних. Нові записи не додано.');
} else {
  for (const post of [
    {
      title: 'Який стек обрати для першого пет-проєкту?',
      content: 'Хочу довести ідею до релізу. Які технології добре підходять для невеликого вебзастосунку?',
      author: 'Марія Коваль',
      category: 'Розробка',
    },
    {
      title: 'Покажіть свої маленькі перемоги цього тижня ✨',
      content: 'Закрив перший pull request у відкритий проєкт. А що вдалося вам цього тижня?',
      author: 'Андрій Левченко',
      category: 'Спільнота',
    },
    {
      title: 'Як ви організовуєте нотатки під час навчання?',
      content: 'Цікавить, як ви зберігаєте приклади коду та повертаєтесь до них пізніше.',
      author: 'Ірина Бойко',
      category: 'Навчання',
    },
  ]) {
    await repository.addPost(post);
  }
  console.log('Додано 3 пости у базу даних.');
}

process.exit(0);
