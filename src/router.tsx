import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/Layout";
import { ErrorPage } from "./components/error/ErrorPage";
import Users from "./pages/user";
import UserForm from "./pages/user/components/UserForm";
import EditUserForm from "./pages/user/components/EditUserForm";
import UserView from "./pages/user/components/UserView";

export const router = createBrowserRouter([
  {
    path: "",
    errorElement: <ErrorPage />,
    element: <MainLayout/>,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <h1>Overview</h1>,
          },
          {
            path: "/users",
            element: <Users/>,
          },
          {
            path: "users/:user_id",
            element: <UserView/>,
          },
          {
            path: "/users/new",
            element: <UserForm/>,
          },
          {
            path: "/users/:user_id/edit",
            element: <EditUserForm/>,
          },
          {
            path: "/profiles",
            element: <h1>Profile</h1>,
          },
          {
            path: "/tokens",
            element: <h1>Token</h1>,
          },
        ]
      }
    ],
  },
]);