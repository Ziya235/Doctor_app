

import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-16 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Hamburger button for mobile screens */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={!showMenu ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
          />
        </svg>
      </button>

      {/* Navigation links for larger screens */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME </li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS </li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT </li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT </li>
        </NavLink>
      </ul>

      {/* Mobile menu */}
      <ul
        className={`${
          showMenu ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 right-0 bg-red-500 text-white flex flex-col items-start p-4 mx-4 z-10`}
      >
        <NavLink to="/" onClick={() => setShowMenu(false)}>
          <li className="py-2 border-b border-white w-full text-left">HOME</li>
        </NavLink>
        <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
          <li className="py-2 border-b border-white w-full text-left">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about" onClick={() => setShowMenu(false)}>
          <li className="py-2 border-b border-white w-full text-left">ABOUT</li>
        </NavLink>
        <NavLink to="/contact" onClick={() => setShowMenu(false)}>
          <li className="py-2 w-full text-left">CONTACT</li>
        </NavLink>
      </ul>

   
    </div>
  );
};

export default Navbar;
