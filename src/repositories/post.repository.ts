import type { NewPost, Post } from "../domain/post/entity.js";
import type { Repository } from "../domain/post/repository.js";

export function createPostRepository(): Repository {
  const posts: Post[] = [
    {
      id: 1,
      title: "Перший пост",
      content: "Вітаю на форумі!",
      author: "Diana",
      category: "general",
    },
    {
      id: 2,
      title: "Вивчаю JavaScript",
      content: "Ділюся своїм досвідом вивчення JavaScript.",
      author: "Diana",
      category: "programming",
    },
    {
      id: 3,
      title: "Питання про Node.js",
      content: "З чого почати роботу з Node.js?",
      author: "Alex",
      category: "programming",
    },
  ];

  return {
    getAll(category?: string, take?: number): Post[] {
      let result = posts;

      if (category) {
        result = result.filter((post) => post.category === category);
      }

      if (take) {
        result = result.slice(0, take);
      }

      return result;
    },

    getById(id: number): Post | undefined {
      return posts.find((post) => post.id === id);
    },

    async addPost(post: NewPost): Promise<Post> {
      const newPost: Post = {
        id: posts.length + 1,
        ...post,
      };

      posts.push(newPost);
      return newPost;
    },
  };
}
