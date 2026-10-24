import type { Post } from '../types/post';
import { PostCard } from './PostCard';

interface PostFeedProps {
  posts: Post[];
}

export function PostFeed({ posts }: PostFeedProps) {
  return (
    <section className="feed" id="feed" aria-labelledby="feed-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">РОЗМОВИ СПІЛЬНОТИ</p>
          <h2 id="feed-title">Свіже у колі <span>✳</span></h2>
        </div>
        <span className="post-count">{String(posts.length).padStart(2, '0')} теми</span>
      </div>
      <div className="post-list">
        {posts.map((post, index) => <PostCard key={post.id} post={post} index={index} />)}
      </div>
    </section>
  );
}
