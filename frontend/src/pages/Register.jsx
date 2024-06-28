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






// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// const Register = () => {
//   const { signup } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate();
//   const { name, email, password } = formData;

//   const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const res = await signup(formData);
//     if(res){
//       navigate("/login",{replace:true});
//     }
    
//   };

//   return (
//     <div>
//       <h1>Signup</h1>
//       <form onSubmit={onSubmit}>
//         <div>
//           <input
//             type="text"
//             placeholder="Name"
//             name="name"
//             value={name}
//             onChange={onChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             value={email}
//             onChange={onChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={password}
//             onChange={onChange}
//             required
//           />
//         </div>
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
