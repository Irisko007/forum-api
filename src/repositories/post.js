let posts = [
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

export function getAll(category, take) {
  let result = posts;

  if (category) {
    result = result.filter((post) => post.category === category);
  }

  if (take) {
    result = result.slice(0, take);
  }

  return result;
}

export function getById(id) {
  return posts.find((post) => post.id === Number(id));
}

export function addPost(post) {
  return new Promise((resolve) => {
    const newPost = {
      id: posts.length + 1,
      ...post,
    };

    posts.push(newPost);
    resolve(newPost);
  });
}
