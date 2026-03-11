/**
 * ErrorBoundary Component - Error Handling for React Components
 *
 * This component catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the app.
 *
 * Features:
 * - Error catching and logging
 * - Fallback UI display
 * - Error recovery options
 * - Development vs production error display
 *
 * @component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components to wrap
 * @param {JSX.Element} props.fallback - Custom fallback component (optional)
 * @returns {JSX.Element} Error boundary wrapper
 */
import { Component } from 'react';

/**
 * ErrorBoundary class component that catches and handles React errors
 * Provides fallback UI when errors occur in child components
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  /**
   * Static method called when an error occurs in a child component
   * Updates state to trigger error UI
   *
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - Additional error information
   * @returns {Object} Updated state
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      errorId: Date.now() // Generate unique error ID
    };
  }

  /**
   * Lifecycle method called after an error has been thrown by a descendant component
   * Logs error details for debugging
   *
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - React error info object
   */
  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // In a real application, you might want to:
    // - Send error to logging service
    // - Report to error monitoring service (e.g., Sentry)
    // - Save error to local storage for debugging
  }

  /**
   * Handles error recovery by resetting error state
   */
  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  /**
   * Handles navigation back to home/login
   */
  handleGoHome = () => {
    // Clear any stored user data that might be causing issues
    localStorage.removeItem('currentUser');
    // Reload the page to reset application state
    window.location.href = '/';
  };

  render() {
    // If there's an error, render fallback UI
    if (this.state.hasError) {
      // Custom fallback component if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          padding: '20px',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center'
          }}>
            {/* Error Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
              borderRadius: '50%',
              margin: '0 auto 25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px'
            }}>
              ⚠️
            </div>

            {/* Error Title */}
            <h1 style={{
              color: '#333',
              marginBottom: '15px',
              fontSize: '28px',
              fontWeight: '600'
            }}>
              Oops! Something went wrong
            </h1>

            {/* Error Message */}
            <p style={{
              color: '#666',
              marginBottom: '25px',
              fontSize: '16px',
              lineHeight: '1.6'
            }}>
              We encountered an unexpected error. This has been logged and our team has been notified.
              You can try refreshing the page or going back to the login page.
            </p>

            {/* Error ID for debugging */}
            <div style={{
              background: '#f8f9fa',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '25px',
              fontSize: '14px',
              color: '#666',
              fontFamily: 'monospace'
            }}>
              Error ID: {this.state.errorId}
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={this.handleRetry}
                style={{
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Try Again
              </button>

              <button
                onClick={this.handleGoHome}
                style={{
                  background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(108, 117, 125, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Go to Login
              </button>
            </div>

            {/* Technical Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginTop: '30px',
                textAlign: 'left',
                border: '1px solid #e1e5e9',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: '#666',
                  marginBottom: '10px'
                }}>
                  Technical Details (Development Only)
                </summary>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#dc3545',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;