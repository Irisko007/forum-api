import type { CreatePostDto, PostDto } from "../dto/post.dto.js";

let posts: PostDto[] = [
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

export function getAll(category?: string, take?: number): PostDto[] {
  let result = posts;

  if (category) {
    result = result.filter((post) => post.category === category);
  }

  if (take) {
    result = result.slice(0, take);
  }

  return result;
}

export function getById(id: number): PostDto | undefined {
  return posts.find((post) => post.id === id);
}

export function addPost(post: CreatePostDto): Promise<PostDto> {
  return new Promise((resolve) => {
    const newPost: PostDto = {
      id: posts.length + 1,
      ...post,
    };

    posts.push(newPost);
    resolve(newPost);
  });
}
