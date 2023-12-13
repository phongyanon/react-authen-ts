import { createBrowserRouter } from "react-router-dom";
import App from './App.tsx'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);