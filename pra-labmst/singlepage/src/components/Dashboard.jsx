/**
 * Dashboard Component - User Dashboard after Login
 *
 * Features:
 * - Welcome message with user name
 * - Logout functionality
 * - User profile information display
 * - Navigation between different sections
 * - Responsive design with modern UI
 *
 * @component
 * @returns {JSX.Element} The dashboard component
 */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * Dashboard component for authenticated users
 * Displays user information and provides navigation options
 */
function Dashboard() {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check if user is logged in on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      // Redirect to login if no user is found
      navigate('/login');
    }
  }, [navigate]);

  /**
   * Handles user logout
   * Clears user data and redirects to login
   */
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/login');
  };

  /**
   * Formats the current time for display
   * @returns {string} Formatted time string
   */
  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  /**
   * Gets a greeting based on current time
   * @returns {string} Appropriate greeting
   */
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            color: '#333',
            margin: 0,
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Dashboard
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{
              color: '#666',
              fontSize: '14px'
            }}>
              {formatTime()}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Welcome Section */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: '#333',
            marginBottom: '10px',
            fontSize: '32px',
            fontWeight: '600'
          }}>
            {getGreeting()}, {user.name}!
          </h2>
          <p style={{
            color: '#666',
            fontSize: '18px',
            margin: '0'
          }}>
            Welcome to your personal dashboard
          </p>
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px',
            color: 'white',
            display: 'inline-block'
          }}>
            <strong>Last Login:</strong> {new Date().toLocaleDateString()} at {formatTime()}
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              margin: '0 auto 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              👤
            </div>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Profile</h3>
            <p style={{ margin: '0', color: '#666' }}>Manage your account information</p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              borderRadius: '50%',
              margin: '0 auto 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              📊
            </div>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Analytics</h3>
            <p style={{ margin: '0', color: '#666' }}>View your activity statistics</p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
              borderRadius: '50%',
              margin: '0 auto 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              ⚙️
            </div>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Settings</h3>
            <p style={{ margin: '0', color: '#666' }}>Customize your preferences</p>
          </div>
        </div>

        {/* User Info Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{
            color: '#333',
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Account Information
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <h4 style={{
                color: '#666',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Full Name
              </h4>
              <p style={{
                margin: '0',
                color: '#333',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                {user.name}
              </p>
            </div>
            <div>
              <h4 style={{
                color: '#666',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Email Address
              </h4>
              <p style={{
                margin: '0',
                color: '#333',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                {user.email}
              </p>
            </div>
            <div>
              <h4 style={{
                color: '#666',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Account Status
              </h4>
              <span style={{
                background: '#28a745',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Active
              </span>
            </div>
            <div>
              <h4 style={{
                color: '#666',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Member Since
              </h4>
              <p style={{
                margin: '0',
                color: '#333',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          marginTop: '30px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#333',
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Quick Actions
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            justifyContent: 'center'
          }}>
            <Link
              to="/login"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'inline-block'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Back to Login
            </Link>
            <button
              onClick={() => alert('Feature coming soon!')}
              style={{
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
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
              View Reports
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'white',
        borderTop: '1px solid #e1e5e9',
        padding: '20px 0',
        marginTop: '40px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center',
          color: '#666',
          fontSize: '14px'
        }}>
          <p style={{ margin: '0' }}>
            © 2026 React Authentication App. Built with React & React Router.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;