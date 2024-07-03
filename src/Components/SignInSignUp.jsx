import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SignInSignUp.css';
import profileIcon from '../assets/1.jpg';

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const { fullName, email, password, confirmPassword } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = isSignIn ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (isSignIn) {
          navigate('/dashboard'); // Redirect to dashboard after sign in
        } else {
          setIsSignIn(true); // Switch to sign in form after sign up
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="header">
            <h3 className="card-title text-center mb-4">{isSignIn ? 'Sign In' : 'Sign Up'}</h3>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <img src={profileIcon} alt="image" width="64" height="64" />
            </div>
          </div>

          <form onSubmit={onSubmit}>
            {!isSignIn && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  name="fullName"
                  value={fullName}
                  onChange={onChange}
                />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-2">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            {!isSignIn && (
              <div className="form-group mb-2">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-block">
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
            <p className="text-center mt-3">
              {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
              <span className="text-primary text-dark" style={{ cursor: 'pointer' }} onClick={toggleForm}>
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
