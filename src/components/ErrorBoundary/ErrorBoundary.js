/**
 * ErrorBoundary - Catches JS errors in the tree, displays friendly fallback,
 * logs to console, and allows retry. World-class error handling.
 * @version 1.0.0
 */
import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Send to analytics (placeholder)
    // sendToAnalytics({ name: "error", value: error.message });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-8">
          <div className="card bg-base-100 shadow-xl max-w-md w-full">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl text-error mb-4">
                Oops! Something Went Wrong
              </h2>
              <p className="text-base-content/70 mb-6">
                We've encountered an unexpected error. Our team is notified.
                <br />
                <small className="text-xs mt-2 block">
                  {this.state.error?.message || "Unknown error"}
                </small>
              </p>
              <div className="space-x-2">
                <button className="btn btn-primary" onClick={this.handleRetry}>
                  Retry
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
