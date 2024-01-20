import React, { useState } from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://employee-3730.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        
        console.log('User registered successfully');
      } else {
        
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };



  return (
    <div className="signup-container">
    <h2>Sign Up</h2>
    <p style={{fontSize:10 , textAlign:'center'}}>Sign up to use exclusive features from Gocrypt</p>

    <form onSubmit={handleSubmit} className="signup-form">

        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Organization:
          <input type="text" name="organization" value={formData.organization} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" style={{backgroundColor:"blue"}}>Sign Up</button>
        <label>
          Already have an account? <Link to="/login">Login</Link>
        </label>
      </form>
    </div>
  );
};

export default SignUp;
