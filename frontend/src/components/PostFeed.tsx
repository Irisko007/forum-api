import type { Post } from '../types/post';
import { PostCard } from './PostCard';

interface PostFeedProps {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
}

export function PostFeed({ posts, isLoading, isError }: PostFeedProps) {
  return (
    <section className="feed" id="feed" aria-labelledby="feed-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">РОЗМОВИ СПІЛЬНОТИ</p>
          <h2 id="feed-title">Свіже у колі <span>✳</span></h2>
        </div>
        {!isLoading && !isError && <span className="post-count">{String(posts.length).padStart(2, '0')} теми</span>}
      </div>
      {isLoading ? (
        <p className="feed-state" role="status">Завантажуємо розмови…</p>
      ) : isError ? (
        <p className="feed-state" role="alert">Не вдалося завантажити пости. Перевірте, чи працює forum-api.</p>
      ) : posts.length === 0 ? (
        <p className="feed-state" role="status">Поки що немає постів. Перша розмова чекає на вас.</p>
      ) : (
        <div className="post-list">
          {posts.map((post, index) => <PostCard key={post.id} post={post} index={index} />)}
        </div>
      )}
    </section>
  );
}
