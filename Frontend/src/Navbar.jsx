import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white bg-opacity-90 sticky top-0 shadow backdrop-blur-lg backdrop-saturate-150 z-[9999]">
      <div className="flex flex-wrap items-center justify-between px-4 py-2 text-slate-800 lg:px-8 lg:py-3">
        <Link to="/" className="text-base font-semibold text-slate-800">
          Bingo
        </Link>

       
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen
              ? "max-h-60 opacity-100"
              : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100"
          }`}
        >
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <Link to="/" className="flex items-center">
                Home
              </Link>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <Link to="/login" className="flex items-center">
                Login
              </Link>
            </li>
             {/* <li className="text-sm text-slate-600">
              <Link href="#" className="flex items-center">Blocks</Link>
            </li> */}
            {/* <li className="text-sm text-slate-600">
              <a href="#" className="flex items-center">Docs</a>
            </li>  */}
          </ul>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative h-6 w-6 select-none rounded-lg text-center lg:hidden"
          type="button"
        >
          <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
