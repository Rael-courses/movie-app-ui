import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import { DefaultTemplate } from "../pages/DefaultTemplate";
import Details from "../pages/Details";
import Search from "../pages/Search";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultTemplate />,

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "details/:id",
        element: <Details />,
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
