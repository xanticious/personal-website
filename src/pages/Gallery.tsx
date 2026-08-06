import { Link } from "react-router-dom";
import { projects } from "../content/gallery/projects";
import styles from "./Gallery.module.css";

export function Gallery() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Gallery</h1>
        <p className={styles.intro}>
          Games and apps I've built, hosted on{" "}
          <a
            href="https://pages.github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Pages
          </a>{" "}
          with deploys through GitHub Actions. Each project links to a live demo
          and source repo.
        </p>
      </header>

      <ul className={styles.list}>
        {projects.map((project, index) => (
          <li key={project.slug}>
            <article
              className={`${styles.card} ${index % 2 === 1 ? styles.cardReverse : ""}`}
            >
              <div className={styles.cardVisual} aria-hidden="true">
                <span className={styles.cardInitial}>
                  {project.title.charAt(0)}
                </span>
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>
                  <Link to={`/gallery/${project.slug}`}>{project.title}</Link>
                </h2>
                <p className={styles.cardDescription}>{project.description}</p>
                <ul className={styles.tagList}>
                  {project.tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className={styles.links}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                  <Link to={`/gallery/${project.slug}`} className={styles.more}>
                    View project →
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
