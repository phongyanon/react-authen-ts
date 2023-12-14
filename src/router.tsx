import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello</h1>,
    // errorElement: <ErrorPage />,
  },
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
]);