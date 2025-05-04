import React, { useState } from 'react';
import loginbg from './loginbg2.jpg'; // Import the image file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate credentials
    if (username === 'abc@gmail.com' && password === '123456') {
      localStorage.setItem('loggedIn', 'true'); // Save login status
      window.location.href = '/'; // Redirect to home page after login
    } else {
      setErrorMessage('Invalid username or password!');
    }
  };

  // Define the styles for the page
  const styles = {
    body: {
      background: `url(${loginbg}) no-repeat center center fixed`,  // Apply background image to the body
      backgroundSize: 'cover',  // Cover the whole page
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      height: '100vh',  // Ensure the body takes up the full height of the viewport
      display: 'flex',  // Use flexbox to center content
      justifyContent: 'center',
      alignItems: 'center',
    },
    section: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#333',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '14px 20px',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      borderRadius: '5px',
      fontSize: '1rem',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.body}> {/* Apply background to the entire page */}
      <section style={styles.section}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
          {errorMessage && (
            <p style={styles.errorMessage}>{errorMessage}</p>
          )}
        </form>
      </section>
    </div>
  );
};

export default Login;
