/**
 * Login Component - User Authentication Form
 *
 * A professional login component that demonstrates:
 * - React Hooks implementation (useState)
 * - Form handling and validation
 * - Loading states and user feedback
 * - Client-side routing integration
 * - Modern UI/UX design principles
 * - Accessibility and responsive design
 *
 * Features:
 * - Form validation for required fields
 * - Loading indicators during authentication
 * - Success/error message display
 * - Navigation to signup page
 * - Form state management
 * - Input sanitization and validation
 *
 * @component
 * @returns {JSX.Element} The login form component
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Login component for user authentication
 * Handles form validation, submission, and user feedback
 *
 * State Management:
 * - formData: Object containing login form field values
 * - isLoading: Boolean for loading state during authentication
 * - message: String for success/error messages
 * - messageType: String indicating message type ('success' or 'error')
 */
function Login() {
  // Form state management - centralized form data object
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  // UI state management for user feedback and loading states
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  /**
   * Handles input field changes
   * Updates form data state and clears previous validation messages
   *
   * @param {Event} e - Input change event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data using functional state update pattern
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear any previous messages when user starts typing (real-time UX)
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  /**
   * Validates the login form before submission
   * Performs basic validation on required fields
   *
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    // Name validation - required field check
    if (!formData.name.trim()) {
      setMessage('Name is required');
      setMessageType('error');
      return false;
    }

    // Password validation - required field check
    if (!formData.password.trim()) {
      setMessage('Password is required');
      setMessageType('error');
      return false;
    }

    return true;
  };

  /**
   * Handles form submission with async processing
   * Validates form, simulates authentication, and provides feedback
   *
   * @param {Event} e - Form submit event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing messages
    setMessage('');
    setMessageType('');

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    // Set loading state to provide user feedback during authentication
    setIsLoading(true);

    try {
      // Simulate authentication API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create user object for demo purposes
      const userData = {
        name: formData.name,
        email: `${formData.name.toLowerCase().replace(' ', '.')}@example.com`,
        loginTime: new Date().toISOString()
      };

      // Save user data to localStorage (in production, this would be handled by authentication system)
      localStorage.setItem('currentUser', JSON.stringify(userData));

      // Log login attempt for debugging
      console.log('User Login Attempt:', {
        name: formData.name,
        password: formData.password,
        timestamp: new Date().toISOString()
      });

      // Display success message to user
      setMessage('Login successful! Redirecting to dashboard...');
      setMessageType('success');

      // Redirect to dashboard after successful login
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      // Error handling for failed login attempts
      console.error('Login error:', error);
      setMessage('Login failed. Please check your credentials.');
      setMessageType('error');
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{
            color: '#333',
            marginBottom: '10px',
            fontSize: '28px',
            fontWeight: '600'
          }}>
            Welcome Back
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Sign in to your account to continue.
          </p>
        </div>

        {message && (
          <div style={{
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            color: messageType === 'success' ? '#155724' : '#721c24'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="name" style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500'
            }}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              placeholder="Enter your full name"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: isLoading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: '1px solid #e1e5e9'
        }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#764ba2'}
              onMouseOut={(e) => e.target.style.color = '#667eea'}
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;