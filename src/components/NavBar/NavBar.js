// // /**
// //  * NavBar - World-class mega navbar: Fixed/sticky on all devices, mobile slide-in drawer with backdrop,
// //  * search autocomplete (vanilla JS fetch simulation), theme cycler, user profile dropdown with logout.
// //  * CSS3 transitions/transforms for 60fps smoothness, ARIA for accessibility, Framer Motion for animations.
// //  * Expanded with more routes, subitems, notifications, and responsive design.
// //  * @version 3.0.0
// //  * @author ReactTailwind Pro Team
// //  */
// // import React, { useState, useEffect } from "react";
// // import {
// //   Bars3Icon,
// //   XMarkIcon,
// //   MagnifyingGlassIcon,
// //   MoonIcon,
// //   UserCircleIcon,
// //   BellIcon,
// // } from "@heroicons/react/24/outline";
// // import { useTheme } from "../../ThemeProvider";
// // import PropTypes from "prop-types";
// // import Link from "../Link/Link";
// // import { motion, AnimatePresence } from "framer-motion";

// // const NavBar = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [userMenuOpen, setUserMenuOpen] = useState(false);
// //   const [notificationCount, setNotificationCount] = useState(3); // Demo
// //   const { toggleNextTheme, currentTheme } = useTheme();

// //   const routes = [
// //     { id: 1, name: "Home", path: "/", exact: true },
// //     {
// //       id: 2,
// //       name: "Product",
// //       path: "/product",
// //       mega: true,
// //       subItems: [
// //         { name: "Overview", path: "/product/overview", desc: "Product intro and highlights" },
// //         { name: "Features", path: "/product/features", desc: "Key features and benefits" },
// //         { name: "Pricing", path: "/product/pricing", desc: "Detailed pricing plans" },
// //         { name: "Demos", path: "/product/demos", desc: "Live demos and tutorials" },
// //         { name: "Integrations", path: "/product/integrations", desc: "Third-party integrations" }, // Expanded
// //       ],
// //     },
// //     {
// //       id: 3,
// //       name: "Order",
// //       path: "/order",
// //       mega: true,
// //       subItems: [
// //         { name: "Track Order", path: "/order/track", desc: "Real-time order tracking" },
// //         { name: "Order History", path: "/order/history", desc: "View past orders" },
// //         { name: "Support", path: "/order/support", desc: "Get help with orders" },
// //         { name: "Returns", path: "/order/returns", desc: "Manage returns and refunds" },
// //         { name: "FAQ", path: "/order/faq", desc: "Common order questions" }, // Expanded
// //       ],
// //     },
// //     { id: 4, name: "About", path: "/about" },
// //     { id: 5, name: "Blog", path: "/blog" },
// //     { id: 6, name: "Login", path: "/login" },
// //     { id: 7, name: "Contact", path: "/contact" }, // Expanded
// //   ];

// //   // Vanilla JS search autocomplete simulation - Expanded with debounce
// //   useEffect(() => {
// //     const debounceTimer = setTimeout(() => {
// //       if (searchQuery.length > 2) {
// //         const mockResults = routes
// //           .flatMap((route) => [route, ...(route.subItems || [])])
// //           .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
// //           .slice(0, 6)
// //           .map((item) => ({ ...item, highlight: searchQuery }));
// //         setSearchResults(mockResults);
// //       } else {
// //         setSearchResults([]);
// //       }
// //     }, 400);
// //     return () => clearTimeout(debounceTimer);
// //   }, [searchQuery]);

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     if (searchQuery) {
// //       console.log("Searching for:", searchQuery); // Integrate with router or API
// //       setSearchResults([]);
// //       setSearchQuery("");
// //     }
// //   };

// //   const closeMobileMenu = () => setIsOpen(false);

// //   return (
// //     <>
// //       {/* Backdrop for mobile menu - With blur */}
// //       <AnimatePresence>
// //         {isOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
// //             onClick={closeMobileMenu}
// //           />
// //         )}
// //       </AnimatePresence>

// //       <motion.div
// //         initial={{ y: -100 }}
// //         animate={{ y: 0 }}
// //         className="navbar bg-base-100 shadow-2xl fixed top-0 z-50 transition-all duration-700 ease-out-cubic border-b border-base-200/50 will-change-transform"
// //         style={{ transform: "translateZ(0)" }} // Hardware acceleration
// //       >
// //         <div className="navbar-start flex-1 lg:flex-none">
// //           {/* Mobile Menu Toggle - With rotation animation */}
// //           <div className="dropdown lg:hidden">
// //             <label
// //               tabIndex={0}
// //               className="btn btn-ghost p-2 m-1 hover:scale-110 transition-transform"
// //               onClick={() => setIsOpen(!isOpen)}
// //               aria-label="Open menu"
// //             >
// //               <Bars3Icon className={`h-6 w-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
// //             </label>
// //           </div>

// //           {/* Logo - With hover animation */}
// //           <motion.a
// //             href="/"
// //             className="btn btn-ghost normal-case text-xl lg:text-2xl gradient-text mr-4 hover:scale-105"
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //           >
// //             ReactTailwind Pro
// //           </a>
// //         </div>

//         {/* Desktop Menu - Mega with subitems */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1 space-x-2">
//             {routes.map((route) => (
//               <li key={route.id} className="group relative">
//                 <Link route={route} />
//                 {route.mega && (
//                   <ul className="dropdown-content z-[100] p-6 shadow-2xl bg-base-100/95 backdrop-blur-md rounded-xl w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out group-hover:translate-y-1">
//                     {route.subItems.map((sub, colIdx) => (
//                       <div key={sub.path} className={`col-span-1 space-y-3 p-4 rounded-lg group-hover-sub hover:bg-primary/5 transition-colors`}>
//                         <h4 className="font-bold text-lg gradient-text mb-2">{sub.name}</h4>
//                         <p className="text-sm text-base-content/70 mb-3 leading-relaxed">{sub.desc}</p>
//                         <motion.a
//                           href={sub.path}
//                           className="block py-2.5 px-4 rounded bg-primary/10 hover:bg-primary/20 transition-all duration-200 text-primary font-medium text-sm"
//                           whileHover={{ x: 8, backgroundColor: "#3b82f6" }}
//                         >
//                           Explore →
//                         </motion.a>
//                       </div>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Mobile Menu Drawer - Slide-in with spring animation */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", stiffness: 350, damping: 35 }}
//               className="fixed left-0 top-0 h-full w-80 md:w-96 bg-base-100 shadow-2xl z-50 lg:hidden overflow-y-auto"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold gradient-text">Menu</h2>
//                   <button onClick={closeMobileMenu} className="btn btn-ghost" aria-label="Close menu">
//                     <XMarkIcon className="h-6 w-6" />
//                   </button>
//                 </div>
//                 <ul className="menu space-y-3">
//                   {routes.map((route) => (
//                     <li key={route.id}>
//                       <Link route={route} />
//                       {route.mega && (
//                         <ul className="ml-4 mt-3 space-y-2 bg-base-200 p-3 rounded-lg">
//                           {route.subItems.map((sub) => (
//                             <li key={sub.path}>
//                               <a href={sub.path} className="text-sm hover:text-primary transition-colors py-1.5 block" onClick={closeMobileMenu}>
//                                 {sub.name} - {sub.desc}
//                               </a>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Navbar End - Search, Notifications, User, Theme - Expanded */}
//         <div className="navbar-end space-x-1 md:space-x-2">
//           {/* Search with Autocomplete - Responsive */}
//           <div className="relative hidden sm:block">
//             <form onSubmit={handleSearch} className="join">
//               <input
//                 type="text"
//                 placeholder="Search products, orders..."
//                 className="input input-bordered join-item pr-10 text-sm md:text-base w-32 md:w-48 lg:w-64"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button type="submit" className="btn join-item btn-square">
//                 <MagnifyingGlassIcon className="h-4 w-4 md:h-5 md:w-5" />
//               </button>
//             </form>
//             <AnimatePresence>
//               {searchResults.length > 0 && (
//                 <motion.ul
//                   initial={{ opacity: 0, y: -15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -15 }}
//                   className="absolute top-full left-0 right-0 bg-base-100 shadow-xl rounded-b-xl mt-1 max-h-72 overflow-y-auto z-30 p-2"
//                 >
//                   {searchResults.map((result) => (
//                     <li key={result.path}>
//                       <a
//                         href={result.path}
//                         className="block px-4 py-2.5 hover:bg-primary/10 transition-colors text-sm md:text-base rounded"
//                         onClick={() => setSearchResults([])}
//                       >
//                         {result.name} <span className="text-primary">({result.highlight})</span>
//                       </a>
//                     </li>
//                   ))}
//                 </motion.ul>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Notifications - With badge and click to clear */}
//           <motion.button 
//             className="btn btn-ghost btn-circle relative" 
//             whileHover={{ scale: 1.1 }}
//             onClick={() => setNotificationCount(0)}
//           >
//             <BellIcon className="h-5 w-5 md:h-6 md:w-6" />
//             {notificationCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-error text-error-content rounded-full h-4 w-4 md:h-5 md:w-5 text-xs flex items-center justify-center">{notificationCount}</span>
//             )}
//           </motion.button>

//           {/* User Profile Dropdown - Expanded with more options */}
//           <div className="dropdown dropdown-end">
//             <label tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={() => setUserMenuOpen(!userMenuOpen)}>
//               <UserCircleIcon className="h-7 w-7 md:h-8 md:w-8" />
//             </label>
//             <ul tabIndex={0} className="dropdown-content menu p-3 shadow bg-base-100 rounded-box w-56 md:w-64 z-30 text-sm md:text-base">
//               <li><a href="/profile">Profile Settings</a></li>
//               <li><a href="/dashboard">Dashboard</a></li>
//               <li><a href="/settings">App Settings</a></li>
//               <li><a onClick={() => { setUserMenuOpen(false); console.log("Logout"); }}>Logout</a></li>
//             </ul>
//           </div>

//           {/* Theme Toggle - Cycle through themes with rotation */}
//           <motion.button
//             onClick={toggleNextTheme}
//             className="btn btn-ghost btn-circle hover:rotate-180 transition-all duration-500"
//             whileHover={{ rotate: 180 }}
//             whileTap={{ scale: 0.9 }}
//             aria-label={`Switch to next theme (current: ${currentTheme})`}
//             title={`Current theme: ${currentTheme} – Click to cycle`}
//           >
//             <MoonIcon className="h-5 w-5 md:h-6 md:w-6 animate-spin-slow" />
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Mobile Search - Below menu for UX */}
//       {isOpen && (
//         <div className="lg:hidden p-6 bg-base-200 border-t">
//           <form onSubmit={handleSearch} className="join w-full">
//             <input
//               type="text"
//               placeholder="Quick Search..."
//               className="input input-bordered join-item flex-1 text-sm"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className="btn join-item btn-square">
//               <MagnifyingGlassIcon className="h-4 w-4" />
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// NavBar.propTypes = {
//   // Self-contained, no props needed
// };

// export default React.memo(NavBar);