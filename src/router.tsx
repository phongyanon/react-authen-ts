import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/Layout";

export const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout/>,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/user",
        element: <h1>User</h1>,
      },
      {
        path: "/profile",
        element: <h1>Profile</h1>,
      },
      {
        path: "/token",
        element: <h1>Token</h1>,
      },
    ],
  },
]);