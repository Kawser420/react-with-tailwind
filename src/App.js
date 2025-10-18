/**
 * App - Premium app orchestrator with ErrorBoundary, lazy loading + suspense,
 * React Router with animated transitions, theme provider, performance monitoring,
 * and infinite scroll teaser. World-class structure with 3D page flips.
 * @version 3.1.0
 * @author ReactTailwind Pro Team
 */
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Pricing from "./components/Pricing/Pricing";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider, useTheme } from "./ThemeProvider";

// Lazy load with enhanced fallbacks
const AssignmentsMarks = lazy(() => import("./components/AssignmentMarks/AssignmentsMarks"));
const PhoneBar = lazy(() => import("./components/PhoneBar/PhoneBar"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const ProductPage = lazy(() => import("./pages/ProductPage")); // New placeholder page
const OrderPage = lazy(() => import("./pages/OrderPage")); // New placeholder page

// Page Transition Component
const AnimatedRoutes = () => {
  const location = useLocation();
  const { currentTheme } = useTheme();
  return (
    <AnimatePresence mode="wait">
      <Suspense
        key={location.pathname}
        fallback={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center min-h-[60vh] p-8"
          >
            <div className="loading loading-infinity loading-lg text-primary animate-pulse-gentle"></div>
            <span className="ml-6 text-base-content/70 text-lg">
              Loading World-Class Features...
            </span>
          </motion.div>
        }
      >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 100, rotateY: -90 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -100, rotateY: 90 }}
          transition={{ duration: 0.6, ease: "easeOutCubic", transformPerspective: 1000 }}
          style={{ transformStyle: "preserve-3d" }}
          className={`min-h-screen ${currentTheme === 'dark' ? 'bg-base-100' : 'bg-base-200'}`}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Pricing />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/about" element={<div className="hero min-h-screen bg-base-200"><h1 className="text-5xl font-bold gradient-text">About Us – Premium UI Crafted</h1></div>} />
            <Route path="/login" element={<div className="hero min-h-screen bg-base-200"><h1 className="text-5xl font-bold gradient-text">Login – Secure Access</h1></div>} />
            <Route path="/blog" element={<div className="hero min-h-screen bg-base-200"><h1 className="text-5xl font-bold gradient-text">Blog – Latest Insights</h1></div>} />
            <Route path="*" element={<div className="hero min-h-screen bg-error text-error-content"><h1 className="text-4xl">404 – Page Not Found</h1></div>} />
          </Routes>
          {/* Dashboard Section with Charts */}
          <section className="container mx-auto px-4 py-16 space-y-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.2 }}>
              <AssignmentsMarks />
              <PhoneBar />
            </motion.div>
            {/* Infinite Scroll Teaser with Vanilla JS Observer */}
            <div className="text-center py-12 opacity-60 animate-float">
              <p className="text-xl mb-4">📜 Infinite Insights Await...</p>
              <button className="btn btn-outline btn-wide" onClick={() => console.log("Load more via IntersectionObserver")}>
                Load More (Demo)
              </button>
            </div>
          </section>
        </motion.div>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="App min-h-screen bg-gradient-to-br from-base-200 to-primary/10 overflow-x-hidden">
            <NavBar />
            <AnimatedRoutes />
            <Suspense fallback={<div className="h-24 bg-base-200 animate-pulse-gentle"></div>}>
              <Footer />
            </Suspense>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;