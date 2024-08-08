import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";

export const Login = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "admin@mail.com",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validasi
      if (!formData.email || !formData.password) {
        alert("Please fill out all fields.");
        return;
      }
      const { data } = await axios({
        method: "post",
        url: "/login",
        data: formData,
      });

      // save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", formData.email);
      nav("/home");
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="relative isolate ">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center gap-12 w-[300px] md:w-[500px]">
              <h1 className="text-3xl">
                Quick Recipe<span className="font-bold">Pro</span>
              </h1>
              <h1 className="text-2xl">Sign in to your account</h1>
              <Input
                isRequired
                variant="bordered"
                type="email"
                label="Email"
                placeholder="Enter your email"
                className="max-w-xl"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                isRequired
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <FontAwesomeIcon
                        icon="fa-solid fa-eye"
                        className="text-default-400"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon="fa-solid fa-eye-slash"
                        className="text-default-400"
                      />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xl"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                className="bg-black text-white w-full font-bold"
                variant="flat"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Sign in
              </Button>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const { data } = await axios({
                      method: "post",
                      url: "/google-login",
                      data: {
                        googleToken: credentialResponse?.credential,
                      },
                    });
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("email", data.email);
                    nav("/home");
                  } catch (error) {
                    toast.error(error.response.data.message || error.message);
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
              />
              <Link to="/" className="font-bold text-slate-500 hover:underline">
                Back to Home
              </Link>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
