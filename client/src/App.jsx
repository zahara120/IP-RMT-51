import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@smastrom/react-rating/style.css'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={1000}
        theme="light"
        transition={Slide}
        pauseOnHover={false}
        hideProgressBar
      />
    </>
  );
}

export default App;
