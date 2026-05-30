import { NavLink, Outlet } from "react-router-dom";
import { ActorRefFrom } from "xstate";
import { themeMachine } from "../machines/themeMachine";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./SiteLayout.module.css";

type Props = {
  themeRef: ActorRefFrom<typeof themeMachine>;
};

export function SiteLayout({ themeRef }: Props) {
  return (
    <div className={styles.site}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.logo} end>
            Tony Litchfield
          </NavLink>
          <ul className={styles.navLinks}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                Blog
              </NavLink>
            </li>
          </ul>
          <ThemeToggle themeRef={themeRef} />
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Tony Litchfield &mdash; Built with
          React & TypeScript
        </p>
      </footer>
    </div>
  );
}
