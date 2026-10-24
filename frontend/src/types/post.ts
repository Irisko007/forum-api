/** Mirrors the Post entity in the forum-api backend. */
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
}
