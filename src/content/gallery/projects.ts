export type ProjectEntry = {
  slug: string;
  title: string;
  description: string;
  body: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
};

export const projects: ProjectEntry[] = [
  {
    slug: "weekly-calendar",
    title: "Family Weekly Calendar",
    description:
      "A wizard-driven app that builds printable 11″×17″ family weekly calendars with holidays, birthdays, and custom events — download as a print-ready PDF.",
    body: "Built for wall-hanging family planning: pick a year, choose holidays (including Utah state holidays), add birthdays and anniversaries with emoji, and generate a clean seven-column week layout with room to write. Next.js, React, TypeScript, Tailwind CSS, and jsPDF; deployed to GitHub Pages via GitHub Actions.",
    githubUrl: "https://github.com/xanticious/weekly-calendar",
    liveUrl: "https://xanticious.github.io/weekly-calendar/",
    tags: ["Next.js", "TypeScript", "PDF", "App"],
  },
  {
    slug: "soma-cube-solver",
    title: "Soma Cube Solver",
    description:
      "Browse, visualize, and share solutions to the classic 3×3×3 Soma cube puzzle — with a 3D step-through viewer and a free-form builder.",
    body: "Pre-computes tens of thousands of cube assemblies and lets you filter to rotation-unique solutions, step through piece placements in Three.js, or experiment in a 9×9×9 builder. Compact URL notation makes individual solutions shareable. TypeScript, Vite, Three.js, and XState.",
    githubUrl: "https://github.com/xanticious/soma-cube-solver",
    liveUrl: "https://xanticious.github.io/soma-cube-solver/",
    tags: ["TypeScript", "Three.js", "XState", "Puzzle"],
  },
  {
    slug: "idle-cannon",
    title: "Idle Cannon",
    description:
      "A browser idle game: a medieval cannon auto-fires at procedurally built castles while you invest in upgrades and chase multi-world prestige.",
    body: "Matter.js drives block physics as wood and stone castles crumble; Gaussian shot accuracy, fire-rate and cannonball-size upgrades, streak multipliers, and local save data keep the loop going. Canvas rendering with particle fireworks when a castle falls. Vanilla JavaScript on HTML5 Canvas.",
    githubUrl: "https://github.com/xanticious/idle-cannon",
    liveUrl: "https://xanticious.github.io/idle-cannon/",
    tags: ["JavaScript", "Canvas", "Idle game", "Physics"],
  },
  {
    slug: "word-games",
    title: "Word Games Collection",
    description:
      "A hub of word puzzles and typing games — Boggle-style letter bags, Wordle-style guessing, rhymes, speed typing, and word search.",
    body: "One GitHub Pages site bundles several open-ended word games meant for unlimited play: create words from a letter bag, guess with colored feedback, complete rhyme prompts, race a typing challenge, and hunt words in a grid. Built with SvelteKit and TypeScript.",
    githubUrl: "https://github.com/xanticious/word-games",
    liveUrl: "https://xanticious.github.io/word-games/",
    tags: ["SvelteKit", "TypeScript", "Word games"],
  },
];

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projects.find((p) => p.slug === slug);
}
