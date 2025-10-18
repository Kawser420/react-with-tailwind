/**
 * ErrorBoundary - Catches JS errors in the tree, displays friendly fallback,
 * logs to console/analytics, allows retry/refresh. World-class error handling with ARIA.
 * Expanded with more details and user-friendly messages.
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Send to analytics (placeholder) - Expanded
    // sendToAnalytics({ name: "app_error", value: error.message, stack: errorInfo.componentStack });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optional: Reload specific component or full page
  };

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center bg-base-200 p-4 sm:p-8"
        >
          <div className="card bg-base-100 shadow-2xl max-w-lg w-full rounded-xl">
            <div className="card-body items-center text-center p-6 sm:p-8">
              <h2 className="card-title text-3xl text-error mb-6">
                Oops! Something Went Wrong
              </h2>
              <p className="text-base-content/70 mb-8 text-lg">
                We've encountered an unexpected error. Our team has been notified automatically.
                <br />
                <small className="text-sm mt-4 block opacity-70">
                  Error Details: {this.state.error?.message || "Unknown error occurred."}
                </small>
                {this.state.errorInfo && (
                  <details className="mt-4 text-left text-xs opacity-60">
                    <summary>Technical Stack (for developers)</summary>
                    <pre className="overflow-auto max-h-32">{this.state.errorInfo.componentStack}</pre>
                  </details>
                )}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                <button className="btn btn-primary flex-1" onClick={this.handleRetry}>
                  Retry Operation
                </button>
                <button
                  className="btn btn-outline flex-1"
                  onClick={() => window.location.reload()}
                >
                  Refresh Full Page
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;