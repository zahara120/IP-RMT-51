import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
} from "@nextui-org/react";
import { googleLogout } from '@react-oauth/google';

export const Navbar = (props) => {
  const isLogin = localStorage.getItem("token");
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    googleLogout();
    nav("/");
  };

  return (
    <>
      <div className="flex flex-col">
        <nav className="flex justify-between items-center py-2 border-b-2 border-slate-200">
          <div className="flex-grow text-center">
            <h1 className="text-3xl">
              <Link to="/home">
                Quick Recipe<span className="font-bold"> Pro</span>
              </Link>
            </h1>
          </div>
        </nav>
        <div className="flex items-center justify-between gap-4 py-4 border-b-2 border-slate-200">
          <div className="hidden md:flex items-center gap-12 text-slate-400">
            <Link to="/home#popular" className="hover:font-bold">
              Popular
            </Link>
            <Link to="/home#all" className="hover:font-bold">
              Gallery
            </Link>
          </div>
          <div className="flex gap-4">
            {!isLogin ? (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/my-recipe"
                  className="bg-indigo-500 text-white flex items-center gap-2"
                >
                  My Recipe
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75">
                      ✨
                    </span>
                    <span className="relative inline-flex rounded-full h-5 w-5">
                      ✨
                    </span>
                  </span>
                </Button>
                <Button
                  onPress={() => handleLogout()}
                  variant="flat"
                  color="danger"
                  isIconOnly
                >
                  <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
