/**
 * NavBar - Professional mega navbar with DaisyUI, responsive mega menus,
 * search, and theme toggle. Includes CSS3 transitions and transforms.
 * @param {Object} props - Component props
 * @version 2.0.0
 */
import React, { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../ThemeProvider";
import PropTypes from "prop-types";
import Link from "../Link/Link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleNextTheme, currentTheme } = useTheme();

  const routes = [
    { id: 1, name: "Home", path: "/" },
    {
      id: 2,
      name: "Product",
      path: "/product",
      mega: true,
      subItems: [
        { name: "Overview", path: "/product/overview" },
        { name: "Features", path: "/product/features" },
        { name: "Pricing", path: "/product/pricing" },
      ],
    },
    {
      id: 3,
      name: "Order",
      path: "/order",
      mega: true,
      subItems: [
        { name: "Track", path: "/order/track" },
        { name: "History", path: "/order/history" },
        { name: "Support", path: "/order/support" },
      ],
    },
    { id: 4, name: "About", path: "/about" },
    { id: 5, name: "Login", path: "/login" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", searchQuery); // Integrate with search logic
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="navbar-start">
        {/* Logo */}
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden hover:scale-110 transition-transform"
          >
            <Bars3Icon
              className={`h-6 w-6 ${
                isOpen ? "rotate-180" : ""
              } transition-transform duration-300`}
              onClick={() => setIsOpen(!isOpen)}
            />
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] w-52 p-2 shadow bg-base-100 rounded-box ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            } transition-transform duration-300 ease-in-out`}
          >
            {routes.map((route) => (
              <li
                key={route.id}
                className="hover:scale-105 transition-transform"
              >
                <Link route={route} />
                {route.mega && (
                  <ul className="p-2 bg-base-200 rounded">
                    {route.subItems.map((sub) => (
                      <li key={sub.path}>
                        <a href={sub.path} className="animate-fade-in">
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl gradient-text">
          ReactTailwind Pro
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {routes.map((route) => (
            <li key={route.id} className="group">
              <Link route={route} />
              {route.mega && (
                <ul className="dropdown-content z-[1] p-4 shadow bg-base-100 rounded-box w-full max-w-4xl grid grid-cols-3 gap-4 absolute top-full left-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {route.subItems.map((sub, col) => (
                    <div key={sub.path} className="col-span-1">
                      <h3 className="font-bold text-lg mb-2">{`Column ${
                        col + 1
                      }`}</h3>
                      <ul>
                        <li>
                          <a
                            href={sub.path}
                            className="block py-1 hover:scale-105 transition-transform"
                          >
                            {sub.name}
                          </a>
                        </li>
                      </ul>
                    </div>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        {/* Search */}
        <form onSubmit={handleSearch} className="join hidden md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered join-item"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn join-item">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </button>
        </form>

        {/* Theme Toggle */}
        <button
          onClick={toggleNextTheme}
          className="btn btn-ghost btn-circle ml-2 hover:rotate-180 transition-transform duration-500"
          aria-label="Toggle theme"
          title={`Current: ${currentTheme}`}
        >
          <MoonIcon className="h-6 w-6 animate-pulse-gentle" />
        </button>
      </div>
    </div>
  );
};

NavBar.propTypes = {};

export default NavBar;
