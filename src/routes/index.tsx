import { createBrowserRouter } from "react-router-dom";

import { RootLayout } from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import MusicStudio from "@/pages/MusicStudio";
import BookSession from "@/pages/BookSession";
import AudioLibrary from "@/pages/AudioLibrary";
import LiveShows from "@/pages/LiveShows";
import SummerShows from "@/pages/SummerShows";
import Concerts from "@/pages/Concerts";
import MusicMingle from "@/pages/MusicMingle";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

// The app's route tree. Every page renders inside RootLayout via its <Outlet />.
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "studio", element: <MusicStudio /> },
      { path: "studio/book", element: <BookSession /> },
      { path: "studio/audio-library", element: <AudioLibrary /> },
      { path: "live-shows", element: <LiveShows /> },
      { path: "live-shows/summer-shows", element: <SummerShows /> },
      { path: "live-shows/concerts", element: <Concerts /> },
      { path: "music-mingle", element: <MusicMingle /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
