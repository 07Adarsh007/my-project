// src/App.js
import React, { useState } from 'react';
import './App.css'; // We'll add some styles here

function App() {
  // State for the input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State for the validation message
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    // Prevent the form from refreshing the page
    event.preventDefault();

    // Basic Validation: Check if fields are empty
    if (!username || !password) {
      setError('Both username and password are required.');
      return; // Stop the function
    }

    // If validation passes:
    setError(''); // Clear any previous errors
    console.log('Form Submitted!');
    console.log('Username:', username);
    console.log('Password:', password);

    // In a real app, you'd send this to a backend API
    // alert(`Login successful for: ${username}`);
  };

  return (
    <div className="App">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {/* Display error message if it exists */}
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;