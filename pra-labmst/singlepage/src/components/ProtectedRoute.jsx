/**
 * ProtectedRoute Component - Route Guard for Authentication
 *
 * This component protects routes that require authentication.
 * It checks if a user is logged in and redirects to login if not.
 *
 * Features:
 * - Authentication state checking
 * - Automatic redirection for unauthenticated users
 * - Loading state during authentication check
 * - Preserves intended destination after login
 * - Uses centralized Loading component
 *
 * @component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components to render if authenticated
 * @returns {JSX.Element} Protected content or redirect
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

/**
 * ProtectedRoute component that guards authenticated routes
 * Redirects to login if user is not authenticated
 *
 * @param {Object} props
 * @param {JSX.Element} props.children - Components to render if authenticated
 */
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const user = localStorage.getItem('currentUser');

      if (user) {
        try {
          // Validate user data
          const userData = JSON.parse(user);
          if (userData && userData.name) {
            setIsAuthenticated(true);
          } else {
            // Invalid user data, redirect to login
            localStorage.removeItem('currentUser');
            navigate('/login');
          }
        } catch (error) {
          // Error parsing user data, redirect to login
          console.error('Error parsing user data:', error);
          localStorage.removeItem('currentUser');
          navigate('/login');
        }
      } else {
        // No user data found, redirect to login
        navigate('/login');
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Loading
        size="large"
        overlay={true}
        text="Verifying authentication..."
        color="#ffffff"
      />
    );
  }

  // Render protected content if authenticated
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;