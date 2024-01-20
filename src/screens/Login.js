import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
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
      const response = await fetch('https://employee-3730.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response, "login");

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const isAdmin = data.isAdmin;
        const userName = data.userName;
        const user=data.user; 
        console.log(token,isAdmin,user._id);

        localStorage.setItem('token', token);
        localStorage.setItem('user',user._id);
        if (isAdmin) {
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('userName',userName);
          }
          else{
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('userName',userName);

          }

        window.location = "/home";
      } else {
        console.error('Failed to log in user');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="signup-container">
    <h2>Account Login</h2>
      <p style={{fontSize:10, textAlign:'center'}}>If you already member you can login with your email address and password</p>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" style={{backgroundColor:"blue"}}>Login</button>
        <br />
        <label>
          Don't have an account? <Link to="/">Sign Up</Link>
        </label>
      </form>
      </div>
   
  );
};

export default Login;

