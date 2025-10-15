/**
 * NavBar - World-class mega navbar: Fixed/sticky on all devices, mobile slide-in drawer with backdrop,
 * search autocomplete (vanilla JS fetch simulation), theme cycler, user profile dropdown.
 * CSS3 transitions/transforms for 60fps smoothness, ARIA for accessibility.
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React, { useState, useEffect } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  UserCircleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../ThemeProvider";
import PropTypes from "prop-types";
import Link from "../Link/Link";
import { motion, AnimatePresence } from "framer-motion"; // For advanced animations

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { toggleNextTheme, currentTheme } = useTheme();

  const routes = [
    { id: 1, name: "Home", path: "/", exact: true },
    {
      id: 2,
      name: "Product",
      path: "/product",
      mega: true,
      subItems: [
        { name: "Overview", path: "/product/overview", desc: "Product intro" },
        { name: "Features", path: "/product/features", desc: "Key highlights" },
        { name: "Pricing", path: "/product/pricing", desc: "Cost details" },
        { name: "Demos", path: "/product/demos", desc: "Live previews" }, // Expanded
      ],
    },
    {
      id: 3,
      name: "Order",
      path: "/order",
      mega: true,
      subItems: [
        { name: "Track Order", path: "/order/track", desc: "Real-time tracking" },
        { name: "Order History", path: "/order/history", desc: "Past purchases" },
        { name: "Support", path: "/order/support", desc: "Help center" },
        { name: "Returns", path: "/order/returns", desc: "Easy returns" }, // Expanded
      ],
    },
    { id: 4, name: "About", path: "/about" },
    { id: 5, name: "Blog", path: "/blog" }, // Expanded from original
    { id: 6, name: "Login", path: "/login" },
  ];

  // Vanilla JS search autocomplete simulation
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate API delay
      const timer = setTimeout(() => {
        const mockResults = routes
          .filter((route) => route.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .slice(0, 5)
          .map((route) => ({ ...route, highlight: searchQuery }));
        setSearchResults(mockResults);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      console.log("Searching for:", searchQuery); // Integrate with router or API
      setSearchResults([]); // Clear on submit
    }
  };

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <>
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="navbar bg-base-100 shadow-xl sticky top-0 z-50 transition-all duration-700 ease-out-cubic border-b border-base-200/50 will-change-transform"
        style={{ transform: "translateZ(0)" }} // Hardware acceleration
      >
        <div className="navbar-start flex-1 lg:flex-none">
          {/* Mobile Menu Toggle */}
          <div className="dropdown lg:hidden">
            <label
              tabIndex={0}
              className="btn btn-ghost p-2 m-1 hover:scale-110 transition-transform"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Bars3Icon className={`h-6 w-6 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
            </label>
          </div>

          {/* Logo */}
          <motion.a
            href="/"
            className="btn btn-ghost normal-case text-xl lg:text-2xl gradient-text mr-4 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ReactTailwind Pro
          </motion.a>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-1">
            {routes.map((route) => (
              <li key={route.id} className="group relative">
                <Link route={route} isActive={window.location.pathname === route.path} />
                {route.mega && (
                  <ul className="dropdown-content z-[1] p-6 shadow-2xl bg-base-100/95 backdrop-blur-md rounded-xl w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out group-hover:translate-y-1">
                    {route.subItems.map((sub, colIdx) => (
                      <div key={sub.path} className={`col-span-1 space-y-2 p-3 rounded-lg group-hover-sub ${colIdx % 2 === 0 ? "bg-primary/5" : "bg-secondary/5"}`}>
                        <h4 className="font-bold text-base gradient-text mb-2">{sub.name}</h4>
                        <p className="text-sm text-base-content/70 mb-3">{sub.desc}</p>
                        <motion.a
                          href={sub.path}
                          className="block py-2 px-3 rounded bg-primary/10 hover:bg-primary/20 transition-all duration-200 text-primary font-medium"
                          whileHover={{ x: 5, backgroundColor: "#3b82f6" }}
                        >
                          Explore →
                        </motion.a>
                      </div>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-80 bg-base-100 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold gradient-text">Menu</h2>
                  <button onClick={closeMobileMenu} className="btn btn-ghost">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <ul className="menu space-y-2">
                  {routes.map((route) => (
                    <li key={route.id}>
                      <Link route={route} />
                      {route.mega && (
                        <ul className="ml-4 mt-2 space-y-1 bg-base-200 p-2 rounded">
                          {route.subItems.map((sub) => (
                            <li key={sub.path}>
                              <a href={sub.path} className="text-sm hover:text-primary transition-colors py-1 block" onClick={closeMobileMenu}>
                                {sub.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar End - Search, Notifications, User, Theme */}
        <div className="navbar-end space-x-2">
          {/* Search with Autocomplete */}
          <div className="relative hidden md:block">
            <form onSubmit={handleSearch} className="join">
              <input
                type="text"
                placeholder="Search products, orders..."
                className="input input-bordered join-item pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn join-item btn-square">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </form>
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-base-100 shadow-lg rounded-b-xl mt-1 max-h-60 overflow-y-auto z-30"
                >
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <a
                        href={result.path}
                        className="block px-4 py-2 hover:bg-primary/10 transition-colors text-sm"
                        onClick={() => setSearchResults([])}
                      >
                        {result.name} {result.highlight && <span className="text-primary">({result.highlight})</span>}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <motion.button className="btn btn-ghost btn-circle relative" whileHover={{ scale: 1.1 }}>
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-error text-error-content rounded-full h-4 w-4 text-xs flex items-center justify-center">3</span>
          </motion.button>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <UserCircleIcon className="h-8 w-8" />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-30">
              <li><a>Profile</a></li>
              <li><a>Settings</a></li>
              <li><a onClick={() => setUserMenuOpen(false)}>Logout</a></li>
            </ul>
          </div>

          {/* Theme Toggle - Cycle through themes */}
          <motion.button
            onClick={toggleNextTheme}
            className="btn btn-ghost btn-circle hover:rotate-180 transition-all duration-500"
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to next theme (current: ${currentTheme})`}
            title={`Current theme: ${currentTheme}`}
          >
            <MoonIcon className="h-6 w-6 animate-spin-slow" />
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Search (Simplified) */}
      {isOpen && (
        <div className="lg:hidden p-4 bg-base-200 border-t">
          <form onSubmit={handleSearch} className="join w-full">
            <input
              type="text"
              placeholder="Quick Search..."
              className="input input-bordered join-item flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn join-item btn-square">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>

  );
};

NavBar.propTypes = {
  // Self-contained
};

export default React.memo(NavBar);