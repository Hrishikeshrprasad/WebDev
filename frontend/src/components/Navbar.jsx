import { NavLink, Link } from "react-router-dom";
import { IoSunny } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../ThemeContext.jsx";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Theme context for light/dark mode
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggles mobile menu
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            BookStore
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-gray-800 hover:text-blue-500 dark:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-gray-800 hover:text-blue-500 dark:text-white"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-gray-800 hover:text-blue-500 dark:text-white"
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Theme Toggle & LogIn */}
        <div className="flex items-center">
          {/* Theme Toggle */}
          <button
            className="mx-2 inline-flex items-center bg-gray-300 border-0 p-2 focus:outline-none hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition duration-300"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <IoSunny className="text-yellow-500 text-2xl" />
            ) : (
              <LuMoon className="text-gray-800 text-2xl" />
            )}
          </button>

          {/* LogIn Button */}
          <Link
            to="/login"
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            LogIn
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-4 text-gray-800 dark:text-white"
            onClick={toggleMenu}
            aria-label="Toggle Mobile Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 py-4 fixed inset-0 z-40">
          <NavLink
            to="/"
            className="block py-2 text-gray-800 hover:text-blue-500 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block py-2 text-gray-800 hover:text-blue-500 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="block py-2 text-gray-800 hover:text-blue-500 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          <Link
            to="/login"
            className="block mt-2 bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            LogIn
          </Link>

          {/* Close Menu Button */}
          <button
            className="absolute top-4 right-4 text-gray-800 dark:text-white"
            onClick={toggleMenu}
            aria-label="Close Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
