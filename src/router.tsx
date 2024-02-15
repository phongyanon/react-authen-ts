import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/Layout";
import { ErrorPage } from "./components/error/ErrorPage";
import { useRecoilState } from 'recoil';
import { IUserInfo } from "./types/user.type";
import { userState } from "./store/user";
import { getCurrentUser, getCurrentProfile } from "./services/user";
import { getTokenDecode } from "./utils/token";
import Users from "./pages/user";
import UserForm from "./pages/user/components/UserForm";
import UserView from "./pages/user/components/UserView";
import Profiles from "./pages/profile";
import ProfileView from "./pages/profile/components/profileView";
import { Signin } from "./pages/authen/Signin";
import { ForgotPassword } from "./pages/authen/ForgotPassword";
import { Register } from "./pages/authen/Register";
import { RegisterProfileForm } from "./pages/profile/components/RegisterProfileForm";
import ProfileForm from "./pages/profile/components/ProfileForm";
import { ImageProfile } from "./pages/profile/components/ImageProfile";
import { EditImageProfile } from "./pages/profile/components/EditImageProfile";
import Verifications from "./pages/verification";
import VerificationForm from "./pages/verification/components/VerificationForm";
import VerificationView from "./pages/verification/components/VerificationView";
import Tokens from "./pages/token";
import Setting from "./pages/setting";
import { NewPassword } from "./pages/authen/NewPassword";
import Overview from "./pages/overview";
import { LandingPage } from "./components/landing/landing";

interface ICustomRoute {
  user?: any
  redirectPath: string
  children: JSX.Element
}

interface IProtectRoute extends ICustomRoute {
  roles: string[]
}

const ProtectRoute = ({ user, redirectPath, children, roles }: IProtectRoute) => {
  if (user) {
    let hasPermission: boolean = false;
    roles.forEach((role: string) => {
      if (user.roles.includes(role)) hasPermission = true;
    });

    if (hasPermission) return children;
  }
  return <Navigate to={redirectPath} replace />
}

const AuthRoute = ({ user, redirectPath, children }: ICustomRoute) => {
  if (!user) {
      return children
  }
  return <Navigate to={redirectPath} replace />
}

export const Router = () => {
  const [user, setCurrentUser] = useRecoilState(userState);

  useEffect( () => {
    console.log('currentUser: ', user)
    if ((user) || (getTokenDecode !== null)) {
      Promise.all([getCurrentUser(), getCurrentProfile()]).then((values) => {
        if ((values[0] !== null) && (values[1].image_profile)) {
          let user_info: IUserInfo = values[0];
          user_info.image_profile = values[1].image_profile;
          setCurrentUser(user_info);
        }
        else if (values[0] !== null) {
          setCurrentUser(values[0]);
        }
      });
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <LandingPage/>,
    },
    {
      path: "",
      errorElement: <ErrorPage />,
      element: <MainLayout/>,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              path: "/overview",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <Overview/>
                </ProtectRoute>,
            },
            {
              path: "/users",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <Users/>
                </ProtectRoute>,
            },
            {
              path: "users/:user_id",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <UserView/>
                </ProtectRoute>,
            },
            {
              path: "/users/new",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin']}>
                  <UserForm/>
                </ProtectRoute>,
            },
            {
              path: "/users/:user_id/edit",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <UserForm/>
                </ProtectRoute>,
            },
            {
              path: "/profiles",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <Profiles/>
                </ProtectRoute>,
            },
            {
              path: "/profiles/new",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <ProfileForm/>
                </ProtectRoute>,
            },
            {
              path: "/profiles/:profile_id/edit",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <ProfileForm/>
                </ProtectRoute>,
            },
            {
              path: "profiles/:profile_id",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <ProfileView/>
                </ProtectRoute>,
            },
            {
              path: "profiles/:profile_id/image",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <EditImageProfile/>
                </ProtectRoute>,
            },
            {
              path: "/verifications",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <Verifications/>
                </ProtectRoute>,
            },
            {
              path: "verifications/:record_id",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <VerificationView/>
                </ProtectRoute>,
            },
            {
              path: "/verifications/new",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <VerificationForm/>
                </ProtectRoute>,
            },
            {
              path: "/verifications/:record_id/edit",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin', 'User']}>
                  <VerificationForm/>
                </ProtectRoute>,
            },
            {
              path: "/tokens",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin']}>
                  <Tokens/>
                </ProtectRoute>,
            },
            {
              path: "/setting",
              element: 
                <ProtectRoute redirectPath="/signin" user={user} roles={['SuperAdmin', 'Admin']}>
                  <Setting/>
                </ProtectRoute>,
            },
          ]
        }
      ],
    },
    {
      path: "/signin",
      element: 
        <AuthRoute redirectPath="/overview" user={user}>
          <Signin/>
        </AuthRoute>,
    },
    {
      path: "/password/forgot",
      element: 
        <AuthRoute redirectPath="/overview" user={user}>
          <ForgotPassword/>
        </AuthRoute>,
    },
    {
      path: "/register",
      element: 
        <AuthRoute redirectPath="/overview" user={user}>
          <Register/>
        </AuthRoute>,
    },
    {
      path: "/register/profile",
      element: 
      <AuthRoute redirectPath="/overview" user={user}>
        <RegisterProfileForm/>
      </AuthRoute>,
    },
    {
      path: "/register/image/profile",
      element: 
        <AuthRoute redirectPath="/overview" user={user}>
          <ImageProfile/>
        </AuthRoute>,
    },
    {
      path: "/password/new",
      element: 
        <AuthRoute redirectPath="/overview" user={user}>
          <NewPassword/>
        </AuthRoute>,
    },
  ]);

  return <RouterProvider router={router} />
}