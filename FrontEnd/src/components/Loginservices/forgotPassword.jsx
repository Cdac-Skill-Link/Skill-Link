import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { Navigate } from './navigate';
import { Navigation } from '../navigation';

// Password validation function
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before submission
    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters long, include both uppercase and lowercase letters, at least one number, and one special character.');
      return;
    }

    if (!email || !password) {
      setMessage('Please provide both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7373/skilllink/change', {
        email: email,
        password: password,
      });
      
      alert('Password updated');
      navigate("/login");
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: Unable to process your request. Please try again later.');
    }
  };

  return (
    <>
      <Navigate />
      <center>
        <div className="forgot-password-container" style={{ marginTop: "50px" }}>
          <div className="forgot-password-card">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <label>New Password:</label>
              <input
                type="password" // Use type="password" for password fields
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button type="submit">Submit</button>
            </form>
            {/* Show error message if validation fails */}
            <p style={{ color: 'red' }}>{message}</p>
          </div>
        </div>
      </center>
    </>
  );
};

export default ForgotPassword;
