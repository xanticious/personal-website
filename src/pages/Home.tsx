import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "XState",
];

const INTERESTS = [
  "Web game development",
  "Combinatorics",
  "Game theory",
  "Game AI",
  "AI alignment",
];

const RECOMMENDED_READING = [
  { title: "Superintelligence", author: "Nick Bostrom" },
  { title: "Human Compatible", author: "Stuart Russell" },
  {
    title: "Algorithms at Work",
    author: "Brian Christian & Tom Griffiths",
    note: "Audible original series",
  },
  { title: "Algorithms to Live By", author: "Brian Christian & Tom Griffiths" },
  { title: "Co-Intelligence", author: "Ethan Mollick" },
] as const;

export function Home() {
  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.name}>Tony Litchfield</h1>
        <p className={styles.tagline}>Software developer · web games</p>
      </section>

      <section className={styles.bio}>
        <h2>About</h2>
        <p>
          Hi — I'm Tony, a software developer focused on building web-based
          games. I experiment on my own, often using AI as an accelerator to
          move from idea to playable prototype, and I build most often with
          TypeScript, React, and Node.js.
        </p>
        <p>
          I'm especially drawn to games with a puzzle or mathematical
          twist — chess, checkers, word games like Boggle and Wordle, and
          anything where combinatorics shows up in the rules. I care about
          strong visuals and UX, and I'm just as interested in optimal play:
          strategy, game theory, and designing AIs that can play well — including
          games that require vision.
        </p>
        <p>
          Away from the keyboard I play widely too — RTS like Age of Empires,
          team shooters like Overwatch, platformers, rhythm games, and classics
          like Battleship. I'm especially interested in AI alignment — how we
          can build systems whose goals stay compatible with human values as
          capabilities grow.
        </p>
        <p>
          This site is a personal portfolio: the bio here is a quick picture of
          who I am and who you're learning from. The{" "}
          <Link to="/gallery">Gallery</Link> links to games and apps I've built,
          hosted on GitHub Pages with deploys through GitHub Actions, each with
          a short write-up. The <Link to="/blog">Blog</Link> is where I share
          longer posts — programming and software development, opinions and
          lessons learned, and practical tips for getting started with new tools
          and ideas.
        </p>
        <p>
          Find me on{" "}
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

      <section className={styles.books}>
        <h2>Recommended reading</h2>
        <ul className={styles.bookList}>
          {RECOMMENDED_READING.map((item) => (
            <li key={item.title} className={styles.bookItem}>
              <p className={styles.bookTitle}>{item.title}</p>
              <p className={styles.bookMeta}>
                {item.author}
                {"note" in item && item.note ? ` · ${item.note}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
