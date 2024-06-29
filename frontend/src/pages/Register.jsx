import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/register', { username, password });
      console.log(response);
      if(response.data.username){
        setMessage('User registered successfully!');
        setUsername('');
        setPassword('');
      }
      else{
        alert(response.data.msg);
      }
      
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        {message && 
          <>
            <p className="message">{message} <NavLink to='/login'>Go to login-page</NavLink></p>
            
          </> 
        }
      </form>
    </div>
  );
};

export default Register;


