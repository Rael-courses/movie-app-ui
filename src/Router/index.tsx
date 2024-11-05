import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Movie from "../pages/Movie";
import NotFound from "../pages/NotFound";
import PageTemplate from "../pages/PageTemplate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageTemplate />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies/:movieId",
        element: <Movie />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
