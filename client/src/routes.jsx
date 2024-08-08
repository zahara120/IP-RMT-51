import { createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import Welcome from "./pages/auth/Welcome";
import MainLayout from "./layouts/Main";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/login",
        loader: () => {
          const isLogin = localStorage.getItem("token");
          return isLogin ? redirect("/") : null;
        },
        element: <Login />,
      },
      {
        path: "/home",
        element: (
          <>
            <h1> ini homepage</h1>
          </>
        ),
      },
    ],
  },
]);
