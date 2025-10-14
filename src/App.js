/**
 * App - Main orchestrator with lazy-loaded components, theme integration.
 * @version 2.0.0
 */
import React, { Suspense, lazy } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Pricing from "./components/Pricing/Pricing";

// Lazy load heavy components
const AssignmentsMarks = lazy(() =>
  import("./components/AssignmentMarks/AssignmentsMarks")
);
const PhoneBar = lazy(() => import("./components/PhoneBar/PhoneBar"));
const Footer = lazy(() => import("./components/Footer/Footer"));

function App() {
  return (
    <div className="App min-h-screen bg-base-200">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <Pricing />
        <Suspense
          fallback={
            <div className="loading loading-spinner loading-lg mx-auto animate-pulse-gentle"></div>
          }
        >
          <AssignmentsMarks />
          <PhoneBar />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
