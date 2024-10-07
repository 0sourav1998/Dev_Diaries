import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slice/user";
import { RxHamburgerMenu } from "react-icons/rx";
import toast from "react-hot-toast";

export const Navbar = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation()

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  useEffect(()=>{
      setOpen(false);
  },[location.pathname])

  return (
    <div className="w-full sticky top-0 z-[20] p-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
      <div className="relative w-9/12 mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-white sm:font-bold font-semibold text-xl sm:text-3xl cursor-pointer hover:text-gray-300 transition-all duration-300">
            The Dev_<span className="text-yellow-400">Diaries</span>
          </h1>
        </Link>

        <div className="flex-row gap-6 text-white text-lg font-medium hidden lg:flex">
          <Link to="/blogs">
            <span className="hover:text-yellow-400 transition-all duration-300">
              Blogs
            </span>
          </Link>
          <Link to="/authors">
            <span className="hover:text-yellow-400 transition-all duration-300">
              Authors
            </span>
          </Link>
          <Link to="/about">
            <span className="hover:text-yellow-400 transition-all duration-300">
              About
            </span>
          </Link>
        </div>

        {/* Buttons */}
        <div className="hidden lg:flex flex-row gap-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-md border border-red-500 hover:border-red-600 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md border border-green-500 hover:border-green-600 transition-all duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md border border-green-500 hover:border-green-600 transition-all duration-300">
                  SignUp
                </button>
              </Link>
            </div>
          )}
          {token ? (
            <Link to="/dashboard">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full shadow-md border border-yellow-500 hover:border-yellow-600 transition-all duration-300">
                Dashboard
              </button>
            </Link>
          ) : null}
        </div>

        {/* Hamburger Menu */}
        <RxHamburgerMenu
          className={`text-white text-2xl flex lg:hidden cursor-pointer transition-transform duration-500 ${
            open ? "rotate-90 scale-110 text-yellow-400" : "rotate-0"
          }`}
          onClick={() => setOpen((prev) => !prev)}
        />

        {/* Mobile Menu */}
        {open && (
          <div
            className={`absolute top-14 left-0 w-full bg-gray-900 bg-opacity-90 lg:hidden z-[10] p-6 rounded-md transition-transform duration-500 ease-in-out ${
              open ? "translate-y-0 opacity-100" : "-translate-y-96 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-2 text-white text-lg font-medium">
              <Link to="/blogs">
                <h1 className="hover:text-yellow-400 hover:bg-gray-500 w-full transition-all duration-300 p-2">
                  Blogs
                </h1>
              </Link>
              <Link to="/authors">
                <h1 className="hover:text-yellow-400 hover:bg-gray-500 w-full transition-all duration-300 p-2">
                  Authors
                </h1>
              </Link>
              <Link to="/about">
                <h1 className="hover:text-yellow-400 hover:bg-gray-500 w-full transition-all duration-300 p-2">
                  About
                </h1>
              </Link>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="w-fit bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link to="/login">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300">
                      SignUp
                    </button>
                  </Link>
                </div>
              )}
              {token ? (
                <Link to="/dashboard">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300">
                    Dashboard
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <hr className="w-[80%] mx-auto mt-4 border-t-2 border-gray-500" />
    </div>
  );
};
