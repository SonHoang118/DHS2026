interface ProjectCardProps {
  title: string;
  description: string;
  category?: string;
  year?: number;
  image?: string;
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  category,
  year,
  image,
  link,
}: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-card-img">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="project-placeholder">🏗️</div>
        )}
      </div>
      <div className="project-card-body">
        {category && <span className="project-badge">{category}</span>}
        <h3>{title}</h3>
        <p>{description}</p>
        {year && <p className="project-year">Năm: {year}</p>}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-small">
            Xem Dự Án
          </a>
        )}
      </div>
    </div>
  );
}
