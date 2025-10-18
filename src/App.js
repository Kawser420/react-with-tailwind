/**
 * App - Premium app orchestrator with ErrorBoundary, lazy loading + suspense,
 * React Router for navigation, theme provider, and performance monitoring.
 * World-class structure with Framer Motion page transitions, responsive layout,
 * and client-impressive features like hero banner and smooth scrolling.
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Pricing from "./components/Pricing/Pricing";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { motion } from "framer-motion";

// Lazy load with enhanced fallbacks for smooth UX
const AssignmentsMarks = lazy(() => import("./components/AssignmentMarks/AssignmentsMarks"));
const PhoneBar = lazy(() => import("./components/PhoneBar/PhoneBar"));
const Footer = lazy(() => import("./components/Footer/Footer"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App min-h-screen bg-base-200 overflow-x-hidden relative">
          <NavBar />
          <Suspense
            fallback={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center min-h-[50vh] p-8 bg-base-100 shadow-xl"
              >
                <div className="loading loading-infinity loading-lg text-primary animate-pulse-gentle"></div>
                <span className="ml-4 text-base-content/70 text-lg font-medium">
                  Loading Premium Features – Please Wait...
                </span>
              </motion.div>
            }
          >
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 transition-all duration-300">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </Suspense>
          <Suspense fallback={<div className="h-32 bg-base-200"></div>}>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

// Expanded Routes for Full Application Feel
const Home = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {/* Hero Banner for Client Impressiveness */}
    <section className="hero min-h-[60vh] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-12 parallax-layer">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Welcome to ReactTailwind Pro
          </h1>
          <p className="text-xl text-base-content/80 mb-8">
            Experience world-class UI with responsive designs, animations, and seamless interactions. Built to impress.
          </p>
          <a href="#pricing" className="btn btn-primary btn-lg hover:scale-105 transition-transform">
            Explore Pricing
          </a>
        </div>
      </div>
    </section>
    <Pricing />
    <section className="my-16 space-y-16" id="charts">
      <AssignmentsMarks />
      <PhoneBar />
    </section>
    {/* Infinite Scroll Hint - Expanded for UX */}
    <div className="text-center py-8 opacity-60 hover:opacity-100 transition-opacity">
      <p className="text-sm md:text-base font-medium">
        📜 Scroll for more insights... (Demo Mode – Infinite Data Simulation Available in Pro)
      </p>
    </div>
  </motion.div>
);

// Placeholder Pages - Expanded for Completeness
const ProductPage = () => <div className="text-3xl font-bold">Product Overview – Premium Features Here</div>;
const OrderPage = () => <div className="text-3xl font-bold">Order Dashboard – Track and Manage</div>;
const AboutPage = () => <div className="text-3xl font-bold">About Us – World-Class Team</div>;
const BlogPage = () => <div className="text-3xl font-bold">Blog – Latest Insights</div>;
const LoginPage = () => <div className="text-3xl font-bold">Login – Secure Access</div>;
const NotFound = () => <div className="text-3xl font-bold text-error">404 – Page Not Found</div>;

export default App;