import { useSelector } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { themeMachine } from "../machines/themeMachine";
import styles from "./ThemeToggle.module.css";

type Props = {
  themeRef: ActorRefFrom<typeof themeMachine>;
};

export function ThemeToggle({ themeRef }: Props) {
  const isDark = useSelector(themeRef, (s) => s.context.theme === "dark");

  return (
    <button
      className={styles.toggle}
      onClick={() => themeRef.send({ type: "TOGGLE" })}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
