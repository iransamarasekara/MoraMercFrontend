import React, { useState } from 'react';
import './CSS/Signup.css';
import profile_default from '../Components/Assets/profile_photo_default.webp';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    index: "",
    faculty: "",
    department: "none",
    batch: "",
    profile_pic: profile_default,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const validateForm = () => {
    // Username validation
    if (formData.username.length < 3) {
      setMessage({ type: 'error', content: 'Username must be at least 3 characters long' });
      return false;
    }

    // Index number validation
    const indexRegex = /^\d{6}[A-Z]$/;
    if (!indexRegex.test(formData.index)) {
      setMessage({ type: 'error', content: 'Please enter a valid index number (e.g., 200001A)' });
      return false;
    }

    return true;
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', content: '' });
  };

  const signup = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: 'success',
          content: 'Signup successful! Please check your email to verify your account.'
        });
      } else {
        setMessage({ type: 'error', content: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', content: 'An error occurred. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    const isFormFilled = Object.entries(formData).every(([key, value]) => {
      if (key === 'profile_pic' || key === 'department') return true;
      return value.trim() !== '';
    });

    if (!isFormFilled) {
      setMessage({ type: 'error', content: 'Please fill in all required fields.' });
      return;
    }

    setMessage({ type: 'info', content: 'Processing your request...' });
    await signup();
  };

  return (
    <div className='signup'>
      <div className="signup-container">
        <div className="hello-container">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <p>Login with your personal info</p>
          <div>
            <button 
              className='switch signup button' 
              onClick={() => window.location.href = "/login"}
              disabled={isLoading}
            >
              Login
            </button>
          </div>
        </div>
        <div className="signup-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} className='signup-fields'>
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type='text'
              placeholder='Your Full Name'
              required
              minLength={3}
              maxLength={50}
            />
            <input
              name='index'
              value={formData.index}
              onChange={changeHandler}
              type='text'
              placeholder='University Index (e.g., 200001A)'
              required
              pattern="^\d{6}[A-Z]$"
            />
              <select Name='faculty' value={formData.faculty} onChange={changeHandler} required>
                <option value=''>Select Faculty</option>
                <option value='Faculty of Engineering'>Faculty of Engineering</option>
                <option value='Faculty of IT'>Faculty of IT</option>
                <option value='Faculty of Business'>Faculty of Business</option>
                <option value='Faculty of Architecture'>Faculty of Architecture</option>
                <option value='Faculty of Medicine'>Faculty of Medicine</option>
                <option value='NDT'>NDT</option>
              </select>
              {formData.faculty === 'Faculty of Engineering' && (
                <select Name='department' value={formData.department} onChange={changeHandler} required>
                  <option value=''>Select Department</option>
                  <option value='Department of Computer Science & Engineering'>Department of Computer Science & Engineering</option>
                  <option value='Department of Mechanical Engineering'>Department of Mechanical Engineering</option>
                  <option value='Department of Electronic & Telecom. Engineering'>Department of Electronic & Telecom. Engineering</option>
                  <option value='Department of Chemical & Process Engineering'>Department of Chemical & Process Engineering</option>
                  <option value='Department of Electrical Engineering'>Department of Electrical Engineering</option>
                  <option value='Department of Civil Engineering'>Department of Civil Engineering</option>
                  <option value='Department of Textile & Apparel Engineering'>Department of Textile & Apparel Engineering</option>
                  <option value='Department of Earth Resource Engineering'>Department of Earth Resource Engineering</option>
                  <option value='Department of Material Science & Engineering'>Department of Interdisciplinary Studies</option>
                  <option value='None'>None</option>
                </select>
              )}
              <select Name='batch' value={formData.batch} onChange={changeHandler} required>
                <option value=''>Select Batch</option>
                <option value='19'>19</option>
                <option value='20'>20</option>
                <option value='21'>21</option>
                <option value='22'>22</option>
                <option value='23'>23</option>
              </select>
              <input
              name='email'
              value={formData.email}
              onChange={changeHandler}
              type='email'
              placeholder='Email Address'
              required
            />
            <input
              name='password'
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder='Password'
              required
              minLength={8}
            />
            
            {message.content && (
              <p className={`message ${message.type}`}>{message.content}</p>
            )}
            
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;