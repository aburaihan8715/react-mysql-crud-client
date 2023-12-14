import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";

import Home from "../pages/Home";
import AppLayout from "../layouts/AppLayout";
import AddBook from "../pages/AddBook";
import UpdateBook from "../pages/UpdateBook";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add",
        element: <AddBook />,
      },
      {
        path: "/update/:id",
        element: <UpdateBook />,
      },
    ],
  },
]);

export default router;
