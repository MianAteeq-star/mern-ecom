import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

function Header() {
  const [auth, setAuth] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <>
      <header className="bg-[#121533] flex justify-around py-4 sm:px-10 px-6 font-[sans-serif] min-h-[70px] drop-shadow-2xl">
        <div className="flex  flex-wrap  items-center lg:gap-y-2 gap-y-4 gap-x-4">
          <button id="toggle" className="lg:hidden ml-7" onClick={toggleMenu}>
            <svg
              className="w-7 h-7"
              fill="#fff"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <img src="./images/ecom.png" width={44} alt="" />
          <ul
            id="collapseMenu"
            className={`${
              isMenuOpen
                ? "lg:flex"
                : "lg:!flex lg:ml-8 max-lg:hidden max-lg:w-full lg:space-x-4 max-lg:space-y-2 max-lg:my-4"
            }`}
          >
            <li className="max-lg:border-b max-lg:py-2 px-3">
              <Link
                to={"/"}
                className="text-[#FFA726] hover:text-[#FFA726] text-[15px] block font-semibold"
              >
                Home
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3">
              <Link
                to={"/category"}
                className="text-[#FFA726] hover:text-[#FFA726] text-[15px] block font-semibold"
              >
                Category
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3">
              <Link
                to={"/about"}
                className="text-[#FFA726] hover:text-[#FFA726] text-[15px] block font-semibold"
              >
                About
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3">
              <Link
                to={"/contact"}
                className="text-[#FFA726] hover:text-[#FFA726] text-[15px] block font-semibold"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex  flex-wrap  items-center lg:gap-y-2 gap-y-4 gap-x-4">
          <ul className="flex ">
            {!auth.user ? (
              <>
                <li className="max-lg:border-b max-lg:py-2 px-3">
                  <Link
                    to={"/login"}
                    className="text-[#FFA726] hover:text-[#FFA726] text-[15px] block font-semibold"
                  >
                    Login
                  </Link>
                </li>
                <li className="max-lg:border-b max-lg:py-2 px-3">
                  <Link
                    to={"/register"}
                    className="text-[#FFA726] hover:text-[#FFA726] text-[15px] block font-semibold"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <div className="group inline-block">
                  <button className="outline-none focus:outline-none  border-black px-3 py-1 bg-[#FFA726] rounded-xl flex items-center justify-center min-w-14">
                    <span className="pr-1 flex-1 font-medium text-blue-600 hover:text-blue-800 p-2">
                      <Link
                        to={""}
                        className="text-[#3fbaeb] hover:text-[#6837ee] text-[15px] block font-extrabold capitalize "
                      >
                        Hi 👋 {auth?.user?.name}
                      </Link>
                    </span>
                    <span>
                      <svg
                        className="fill-current h-4 w-4 transform group-hover:-rotate-180   transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </button>
                  <ul className="flex items-center justify-center flex-col  bg-cyan-500 border-black rounded-lg transform scale-0 group-hover:scale-100 absolute  transition duration-150 ease-in-out origin-top min-w-32">
                    <li
                      className="max-lg:border-b max-lg:py-2 px-3"
                      onClick={handleLogout}
                    >
                      <Link
                        to={"/login"}
                        className="text-[#ffffff] hover:text-[#000000] hover:bg-red-500 text-[15px] block font-semibold m-2 p-3 rounded-xl"
                      >
                        Logout
                      </Link>
                    </li>
                    <li className="max-lg:border-b max-lg:py-2 px-3">
                      <Link
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="text-[#ffffff] hover:text-[#000000]  hover:bg-slate-500 text-[15px] block font-semibold m-2 p-2 rounded-xl"
                      >
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </ul>

          <div className="flex  flex-wrap  gap-3 ml-3">
            <span className="relative mr-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                className="cursor-pointer hover:fill-[#FFA726] inline-block"
                fill="#fff"
              >
                <path
                  d="M1 1a1 1 0 1 0 0 2h1.78a.694.694 35.784 0 1 .657.474l3.297 9.893c.147.44.165.912.053 1.362l-.271 1.087C6.117 17.41 7.358 19 9 19h12a1 1 0 1 0 0-2H9c-.39 0-.64-.32-.545-.697l.205-.818A.64.64 142.028 0 1 9.28 15H20a1 1 0 0 0 .95-.684l2.665-8A1 1 0 0 0 22.666 5H6.555a.694.694 35.783 0 1-.658-.474l-.948-2.842A1 1 0 0 0 4 1zm7 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                  data-original="#000000"
                  paintOrder="fill markers stroke"
                />
              </svg>
              <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                0
              </span>
            </span>
            <input
              type="text"
              placeholder="Search something..."
              className="bg-gray-50 focus:bg-white w-32 md:w-48 lg:w-64  px-6 h-10 rounded-lg outline-none text-sm"
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
