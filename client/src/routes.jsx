import { createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import MainLayout from "./layouts/Main";
import Welcome from "./pages/Welcome";
import { Home } from "./pages/Home";
import { RecipeDetail } from "./pages/RecipeDetail";

export const router = createBrowserRouter([
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
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <RecipeDetail />,
      },
    ],
  },
]);
