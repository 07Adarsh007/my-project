/**
 * Loading Component - Loading States and Spinners
 *
 * This component provides various loading indicators and states for React applications.
 * It demonstrates different approaches to showing loading feedback to users.
 *
 * Features:
 * - Multiple loading spinner styles
 * - Customizable size and color
 * - Loading text support
 * - Overlay and inline modes
 * - Accessibility considerations
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the spinner ('small', 'medium', 'large')
 * @param {string} props.color - Color of the spinner (CSS color value)
 * @param {string} props.text - Loading text to display
 * @param {boolean} props.overlay - Whether to show as overlay
 * @param {string} props.type - Type of spinner ('spinner', 'dots', 'pulse')
 * @returns {JSX.Element} Loading indicator component
 */
import { useState, useEffect } from 'react';

/**
 * Loading component that displays various loading indicators
 * Supports different sizes, colors, and display modes
 */
const Loading = ({
  size = 'medium',
  color = '#007bff',
  text = 'Loading...',
  overlay = false,
  type = 'spinner'
}) => {
  // Size configurations
  const sizeConfig = {
    small: { width: '20px', height: '20px', borderWidth: '2px' },
    medium: { width: '40px', height: '40px', borderWidth: '3px' },
    large: { width: '60px', height: '60px', borderWidth: '4px' }
  };

  // Spinner styles based on type
  const getSpinnerStyle = () => {
    const baseStyle = {
      width: sizeConfig[size].width,
      height: sizeConfig[size].height,
      border: `${sizeConfig[size].borderWidth} solid #f3f3f3`,
      borderTop: `${sizeConfig[size].borderWidth} solid ${color}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto'
    };

    switch (type) {
      case 'dots':
        return {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px'
        };
      case 'pulse':
        return {
          ...baseStyle,
          border: 'none',
          backgroundColor: color,
          animation: 'pulse 1.5s ease-in-out infinite'
        };
      default:
        return baseStyle;
    }
  };

  // Dots animation
  const DotsSpinner = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);

      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ fontSize: '24px', color: color, fontWeight: 'bold' }}>
        {text.replace('...', '')}{dots}
      </div>
    );
  };

  // Container styles
  const containerStyle = overlay ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  } : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  };

  return (
    <div style={containerStyle}>
      {/* Loading Spinner */}
      {type === 'dots' ? (
        <DotsSpinner />
      ) : (
        <div style={getSpinnerStyle()} />
      )}

      {/* Loading Text */}
      {text && type !== 'dots' && (
        <p style={{
          marginTop: '15px',
          color: '#666',
          fontSize: size === 'small' ? '14px' : '16px',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {text}
        </p>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

/**
 * FullPageLoading component - Loading overlay for entire page
 * Useful for initial app loading or major state changes
 */
export const FullPageLoading = ({ text = 'Loading application...' }) => (
  <Loading
    size="large"
    overlay={true}
    text={text}
    color="#007bff"
  />
);

/**
 * InlineLoading component - Loading indicator for specific sections
 * Useful for form submissions, data fetching, etc.
 */
export const InlineLoading = ({
  size = 'small',
  text = 'Loading...',
  color = '#007bff'
}) => (
  <Loading
    size={size}
    overlay={false}
    text={text}
    color={color}
  />
);

/**
 * ButtonLoading component - Loading state for buttons
 * Shows spinner inside button during async operations
 */
export const ButtonLoading = ({
  loading = false,
  children,
  loadingText = 'Loading...',
  ...buttonProps
}) => (
  <button
    {...buttonProps}
    disabled={loading || buttonProps.disabled}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      ...buttonProps.style
    }}
  >
    {loading && (
      <div style={{
        width: '16px',
        height: '16px',
        border: '2px solid #ffffff',
        borderTop: '2px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
    )}
    {loading ? loadingText : children}
  </button>
);

export default Loading;