import { useActorRef } from "@xstate/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";
import { themeMachine } from "./machines/themeMachine";
import { Gallery } from "./pages/Gallery";
import { GalleryItem } from "./pages/GalleryItem";
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
            element: <Gallery />,
          },
          {
            path: "gallery/:slug",
            element: <GalleryItem />,
          },
          {
            path: "blog",
            element: (
              <Placeholder
                title="Blog"
                description="Programming, software development, and practical tips for getting started — plus notes on what I'm learning."
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
