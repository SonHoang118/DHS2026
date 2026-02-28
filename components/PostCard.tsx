interface PostCardProps {
  title: string;
  excerpt: string;
  author?: string;
  date?: string;
  category?: string;
  slug?: string;
}

export default function PostCard({
  title,
  excerpt,
  author,
  date,
  category,
  slug,
}: PostCardProps) {
  return (
    <div className="post-card">
      {category && <span className="post-category">{category}</span>}
      <h3>{title}</h3>
      <p className="excerpt">{excerpt}</p>
      <div className="post-card-meta">
        {author && <span className="author">👤 {author}</span>}
        {date && <span className="date">📅 {date}</span>}
      </div>
      {slug && <a href={`/posts/${slug}`} className="btn btn-small">Đọc Tiếp</a>}
    </div>
  );
}
