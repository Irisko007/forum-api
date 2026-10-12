import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
  index: number;
}

const initials = (name: string) => name.split(' ').map((part) => part[0]).slice(0, 2).join('');

export function PostCard({ post, index }: PostCardProps) {
  return (
    <article className="post-card" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="post-topline">
        <span className={`category category-${post.category.toLowerCase()}`}>{post.category}</span>
        <span className="post-number">ТЕМА №{String(post.id).padStart(2, '0')}</span>
      </div>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content}</p>
      <div className="post-footer">
        <div className="author">
          <span className={`avatar avatar-${index % 4}`}>{initials(post.author)}</span>
          <span>{post.author}</span>
        </div>
        <span className="read-label">Читати <span aria-hidden="true">↗</span></span>
      </div>
    </article>
  );
}
