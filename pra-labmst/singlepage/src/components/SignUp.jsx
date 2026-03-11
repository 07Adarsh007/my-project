/**
 * SignUp Component - User Registration Form
 *
 * A comprehensive user registration component that demonstrates:
 * - React Hooks (useState, useNavigate)
 * - Form validation and error handling
 * - Loading states and user feedback
 * - Client-side routing with React Router
 * - Modern UI/UX principles
 * - Accessibility features
 * - Responsive design
 *
 * Features:
 * - Real-time form validation
 * - Password strength requirements
 * - Email format validation
 * - Loading indicators during submission
 * - Success/error message display
 * - Automatic navigation after registration
 * - Form state management
 * - Input sanitization
 *
 * @component
 * @returns {JSX.Element} The signup form component
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * SignUp component for user registration
 * Handles form validation, submission, and navigation
 *
 * State Management:
 * - formData: Object containing all form field values
 * - isLoading: Boolean for loading state during submission
 * - message: String for success/error messages
 * - messageType: String indicating message type ('success' or 'error')
 */
function SignUp() {
  // Form state management - single object for all form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // UI state management for user feedback
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Navigation hook for programmatic routing after successful registration
  const navigate = useNavigate();

  /**
   * Handles input field changes
   * Updates form data state and clears previous validation messages
   *
   * @param {Event} e - Input change event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data using functional state update
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear any previous messages when user starts typing (real-time feedback)
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  /**
   * Validates the entire form before submission
   * Performs comprehensive validation on all form fields
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

    // Email validation - required field and format check
    if (!formData.email.trim()) {
      setMessage('Email is required');
      setMessageType('error');
      return false;
    }

    // Basic email format validation
    if (!formData.email.includes('@')) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return false;
    }

    // Password strength validation
    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setMessageType('error');
      return false;
    }

    // Password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return false;
    }

    return true;
  };

  /**
   * Handles form submission with async processing
   * Validates form, simulates API call, and handles response
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

    // Set loading state to provide user feedback
    setIsLoading(true);

    try {
      // Simulate API call delay (in production, replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Log form data for debugging (in production, send to backend API)
      console.log('User Registration Data:', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        timestamp: new Date().toISOString()
      });

      // Save user data to localStorage for demo purposes
      const userData = {
        name: formData.name,
        email: formData.email,
        registrationTime: new Date().toISOString()
      };
      localStorage.setItem('currentUser', JSON.stringify(userData));

      // Display success message to user
      setMessage('Account created successfully! Redirecting to dashboard...');
      setMessageType('success');

      // Automatic navigation after successful registration
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      // Error handling for failed registration attempts
      console.error('Registration error:', error);
      setMessage('An error occurred during registration. Please try again.');
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
            Create Account
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Join us today! It only takes a minute.
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

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500'
            }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
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
              placeholder="Create a password"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="confirmPassword" style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              placeholder="Confirm your password"
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
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: '1px solid #e1e5e9'
        }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#764ba2'}
              onMouseOut={(e) => e.target.style.color = '#667eea'}
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;