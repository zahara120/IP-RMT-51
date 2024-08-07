import { createBrowserRouter, redirect } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    // loader: () => {
    //   const isLogin = localStorage.getItem("token");
    //   return isLogin ? redirect("/cms/news") : null;
    // },
    element: <>
    <h1>ini home page</h1>
    </>,
  },
]);
