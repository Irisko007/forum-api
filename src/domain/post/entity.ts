export interface NewPost {
  title: string;
  content: string;
  author: string;
  category: string;
}

export interface Post extends NewPost {
  id: number;
}
