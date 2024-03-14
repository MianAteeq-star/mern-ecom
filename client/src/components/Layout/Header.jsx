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
      <header className="bg-[#121533] py-4 sm:px-10 px-6 font-[sans-serif] min-h-[70px] drop-shadow-2xl">
        <div className="flex flex-wrap items-center lg:gap-y-2 gap-y-4 gap-x-4">
          <div className="flex items-center ml-auto lg:order-1">
            <ul className="flex">
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
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        {auth?.user?.name}
                        <svg
                          className="-mr-1 h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <div
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      <div className="py-1" role="none">
                        {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                        <Link
                          to={"/login"}
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          id="menu-item-0"
                          onClick={handleLogout}
                          tabIndex={-1}
                        >
                          Logout
                        </Link>
                        <Link
                          to={"/dashboard"}
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          id="menu-item-1"
                          tabIndex={-1}
                        >
                          Dashboard
                        </Link>
                      </div>
                    </div>
                  </div>

             
                </>
              )}
            </ul>

            <div className="flex items-center ml-3">
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
                className="bg-gray-50 focus:bg-white w-full px-6 h-10 rounded outline-none text-sm"
              />
            </div>
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
          </div>
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
      </header>
    </>
  );
}

export default Header;
