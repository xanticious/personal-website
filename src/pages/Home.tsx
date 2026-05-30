import styles from "./Home.module.css";

const SKILLS = [
  "TypeScript",
  "React",
  "Node.js",
  "Rust",
  "XState",
  "WebGL / PixiJS",
  "PostgreSQL",
  "Distributed Systems",
];

const INTERESTS = [
  "Compilers & language design",
  "Interactive visualizations",
  "Game development",
  "Open-source tooling",
  "Technical writing",
];

export function Home() {
  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.name}>Tony Litchfield</h1>
        <p className={styles.tagline}>Software Developer</p>
      </section>

      <section className={styles.bio}>
        <h2>About</h2>
        <p>
          Hi — I'm Tony, a software developer who enjoys building thoughtful,
          well-crafted tools and products. I care about clean APIs, reliable
          systems, and interfaces that feel intuitive.
        </p>
        <p>
          I spend most of my time working with TypeScript, React, and Node.js,
          though I'm always drawn to projects that let me explore lower-level
          territory. This site is where I share selected work and write about
          things I'm learning.
        </p>
        <p>
          You can reach me at{" "}
          <a href="mailto:tony@example.com">tony@example.com</a> or find me on{" "}
          <a
            href="https://github.com/xanticious"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </section>

      <section className={styles.skills}>
        <h2>Skills</h2>
        <ul className={styles.pillList}>
          {SKILLS.map((skill) => (
            <li key={skill} className={styles.pill}>
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.interests}>
        <h2>Interests</h2>
        <ul className={styles.pillList}>
          {INTERESTS.map((interest) => (
            <li key={interest} className={styles.pill}>
              {interest}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
