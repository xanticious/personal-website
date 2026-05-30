import { useActorRef } from "@xstate/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";
import { themeMachine } from "./machines/themeMachine";
import { Home } from "./pages/Home";
import { Placeholder } from "./pages/Placeholder";

export default function App() {
  const themeRef = useActorRef(themeMachine);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <SiteLayout themeRef={themeRef} />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "gallery",
            element: (
              <Placeholder
                title="Gallery"
                description="A curated collection of projects — coming in Phase 2."
              />
            ),
          },
          {
            path: "gallery/:slug",
            element: (
              <Placeholder
                title="Project"
                description="Project detail page — coming in Phase 2."
              />
            ),
          },
          {
            path: "blog",
            element: (
              <Placeholder
                title="Blog"
                description="Long-form writing — coming in Phase 3."
              />
            ),
          },
          {
            path: "blog/:slug",
            element: (
              <Placeholder
                title="Post"
                description="Article detail page — coming in Phase 3."
              />
            ),
          },
        ],
      },
    ],
    { basename: "/personal-website" },
  );

  return <RouterProvider router={router} />;
}
