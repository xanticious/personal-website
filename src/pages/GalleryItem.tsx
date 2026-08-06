import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../content/gallery/projects";
import styles from "./GalleryItem.module.css";

export function GalleryItem() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className={styles.page}>
        <h1>Project not found</h1>
        <p className={styles.muted}>
          <Link to="/gallery">Back to Gallery</Link>
        </p>
      </div>
    );
  }

  return (
    <article className={styles.page}>
      <p className={styles.back}>
        <Link to="/gallery">← Gallery</Link>
      </p>
      <header className={styles.header}>
        <h1>{project.title}</h1>
        <ul className={styles.tagList}>
          {project.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </header>
      <p className={styles.lead}>{project.description}</p>
      <p className={styles.body}>{project.body}</p>
      <div className={styles.links}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Live demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source on GitHub
          </a>
        )}
      </div>
    </article>
  );
}
