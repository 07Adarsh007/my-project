/**
 * App Component - Main Application Router
 *
 * This is the root component of the React Single Page Application (SPA).
 * It demonstrates the implementation of client-side routing using React Router DOM.
 *
 * Features Demonstrated:
 * - React Router DOM setup and configuration
 * - BrowserRouter for clean URLs
 * - Routes and Route components for path-based rendering
 * - Navigate component for programmatic redirection
 * - Component-based architecture
 * - Default route handling
 *
 * Application Structure:
 * - /login - Login component for user authentication
 * - /signup - SignUp component for user registration
 * - / - Default route redirects to login page
 *
 * @component
 * @returns {JSX.Element} The main application with routing
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import './App.css';

/**
 * Main App component that sets up the application routing
 * Uses React Router DOM for client-side navigation
 *
 * The application follows a component-based architecture where:
 * - Router provides the routing context
 * - Routes defines the route configuration
 * - Route maps paths to components
 * - Navigate handles default redirection
 */
function App() {
  return (
    // BrowserRouter enables clean URLs and browser history integration
    <Router>
      <div className="App">
        {/* Routes component contains all route definitions */}
        <Routes>
          {/* Login route - renders Login component for user authentication */}
          <Route path="/login" element={<Login />} />

          {/* Signup route - renders SignUp component for user registration */}
          <Route path="/signup" element={<SignUp />} />

          {/* Dashboard route - renders Dashboard component for authenticated users */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Default route - redirects to login page when no path is specified */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
