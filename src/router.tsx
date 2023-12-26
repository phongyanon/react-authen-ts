import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/Layout";
import { ErrorPage } from "./components/error/ErrorPage";
import Users from "./pages/user";
import UserForm from "./pages/user/components/UserForm";

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
            element: <h1>User by id</h1>,
          },
          {
            path: "/users/new",
            element: <UserForm formType="add" initValue={null}/>,
          },
          {
            path: "/users/:user_id/edit",
            element: <UserForm formType="edit" initValue={null}/>,
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