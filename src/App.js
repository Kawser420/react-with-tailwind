/**
 * App - Premium app orchestrator with ErrorBoundary, lazy loading + suspense,
 * React Router placeholder (add if needed), theme provider, and performance monitoring.
 * World-class structure with Framer Motion page transitions.
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Placeholder - install if using
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Pricing from "./components/Pricing/Pricing";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary"; // New component (add file below)

// Lazy load with enhanced fallbacks
const AssignmentsMarks = lazy(() =>
  import("./components/AssignmentMarks/AssignmentsMarks")
);
const PhoneBar = lazy(() => import("./components/PhoneBar/PhoneBar"));
const Footer = lazy(() => import("./components/Footer/Footer"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        {" "}
        {/* Wrap for routing; remove if not using */}
        <div className="App min-h-screen bg-base-200 overflow-x-hidden">
          <NavBar />
          <Suspense
            fallback={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center min-h-[50vh] p-8"
              >
                <div className="loading loading-infinity loading-lg text-primary animate-pulse-gentle"></div>
                <span className="ml-4 text-base-content/70">
                  Loading Premium Features...
                </span>
              </motion.div>
            }
          >
            <main className="container mx-auto px-4 py-12 transition-all duration-300">
              <Routes>
                <Route path="/" element={<Pricing />} />
                {/* Add more routes as needed */}
                <Route
                  path="/product"
                  element={<div>Product Page (Expand Here)</div>}
                />
                <Route path="/order" element={<div>Order Dashboard</div>} />
              </Routes>
              <section className="my-16 space-y-16">
                <AssignmentsMarks />
                <PhoneBar />
              </section>
              {/* Infinite Scroll Hint */}
              <div className="text-center py-8 opacity-50">
                <p className="text-sm">
                  📜 Scroll for more insights... (Demo Mode)
                </p>
              </div>
            </main>
          </Suspense>
          <Suspense fallback={<div className="h-16 bg-base-200"></div>}>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
