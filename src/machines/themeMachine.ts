import { assign, createMachine } from "xstate";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

export const themeMachine = createMachine({
  id: "theme",
  context: { theme: initialTheme as Theme },
  on: {
    TOGGLE: {
      actions: assign({
        theme: ({ context }): Theme => {
          const next: Theme = context.theme === "light" ? "dark" : "light";
          applyTheme(next);
          return next;
        },
      }),
    },
  },
});
