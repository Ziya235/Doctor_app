import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  User,
  BookOpen,
  Mail,
  Globe,
  UserCircle2,
  Check,
  UserIcon,
  LogOutIcon,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Az");

  const languageRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navigate = useNavigate();

  const languages = [
    { code: "Az", name: "Azərbaycan" },
    { code: "En", name: "English" },
    { code: "Ru", name: "Русский" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close language dropdown
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }

      // Close profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }

      // Close mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.code);
    setIsLanguageOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("teacherId");
    Cookies.remove("userId");
    setIsProfileOpen(false);
    navigate("/login")
  };

  const token = Cookies.get("token");

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className="flex items-center text-gray-700 hover:text-blue-600 md:mb-0"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Home className="mr-2" size={20} />
        Home
      </Link>
      <Link
        to="/teachers"
        className="flex items-center text-gray-700 hover:text-blue-600 mb-4 md:mb-0"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <User className="mr-2" size={20} />
        Teachers
      </Link>
      <Link
        to="/about"
        className="flex items-center text-gray-700 hover:text-blue-600 mb-4 md:mb-0"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <BookOpen className="mr-2" size={20} />
        About
      </Link>
      <Link
        to="/contact"
        className="flex items-center text-gray-700 hover:text-blue-600 mb-4 md:mb-0"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Mail className="mr-2" size={20} />
        Contact
      </Link>
    </>
  );

  return (
    <>
      {/* Placeholder div to prevent content from being hidden behind fixed navbar */}
      <div className="h-20 md:h-24"></div>

      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-40">
        <div className="flex justify-between items-center p-3 px-4 md:px-16 bg-white shadow-md">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="/api/placeholder/50/50"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-gray-800">School Platform</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLinks />
          </nav>

          {/* Language & Profile */}
          <div className="flex items-center space-x-4 relative">
            {/* Language Dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center bg-gray-100 p-2 pr-3 rounded-full hover:bg-gray-200"
              >
                <Globe className="mr-2" size={20} />
                {selectedLanguage}
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang)}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {selectedLanguage === lang.name && (
                        <Check className="mr-2 text-green-500" size={16} />
                      )}
                      {lang.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            {token ? (
              <div className="relative" ref={profileRef}>
                <UserCircle2
                  size={40}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                />

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <div
                      onClick={() => {
                        navigate("my-profile"), setIsProfileOpen(false), scrollTo(0,0);
                      }}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <UserIcon className="mr-2" size={16} />
                      My Profile
                    </div>
                    <div
                      onClick={() => handleLogout()}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer text-red-500"
                    >
                      <LogOutIcon className="mr-2" size={16} />
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button  onClick={() => navigate("/login")} className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none transition">
                Daxil ol
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-20 p-4"
          >
            <nav className="flex flex-col space-y-4">
              <NavLinks />
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
