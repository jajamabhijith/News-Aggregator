import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [logoutTimer, setLogoutTimer] = useState(null);
  

  useEffect(() => {
    const token = Cookies.get('token');
    const storedUser = Cookies.get('user');
    const id = Cookies.get('id');
    
    if (token && storedUser && id) {
      // Parse the stored user data from cookies
      const userData = JSON.parse(storedUser);
      const _id = JSON.parse(id);
      setUser({ token, ...userData, ..._id});
      // Calculate the remaining time for the token expiration
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // current time in seconds
      if (decodedToken.exp > currentTime) {
        const remainingTime = (decodedToken.exp - currentTime) * 1000; // remaining time in milliseconds

        // Set a timeout to log out the user when the token expires
        const timer = setTimeout(() => {
          logout();
        }, remainingTime);

        setLogoutTimer(timer);
      } else {
        // Token has expired, log the user out
        logout();
      }
    }

     
  }, []);



  const login = async (username, password) => {
    // try {
      const response = await axios.post('/api/login', { username, password });
      const token = response.data.token;
      const userData = { username: response.data.username };
      const id = {id: response.data.id};
      
      // Store the token and user information in cookies
      Cookies.set('token', token);
      Cookies.set('user', JSON.stringify(userData));
      Cookies.set('id',JSON.stringify(id));
      
      return response;
    // }
    //  catch (error) {
    //   throw new Error(error.response.data.message || 'Login failed');
    // }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
      Cookies.remove('token');
      Cookies.remove('user');
      Cookies.remove('id');
      setUser({});
      window.location.reload();
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        setLogoutTimer(null);
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  console.log(user);
  return (
    <AuthContext.Provider value={{user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };








// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setAuthToken(token);
//       axios.get('/api/auth')
//         .then(res => {
//           setUser(res.data);
//           setIsAuthenticated(true);
//         })
//         .catch(err => {
//           localStorage.removeItem('token');
//           setAuthToken(null);
//           setUser(null);
//           setIsAuthenticated(false);
//         });
//     }
//   }, []);

//   const login = async (formData) => {
//     try {
//       const res = await axios.post('/api/auth/login', formData);
//       const { token } = res.data;
//       localStorage.setItem('token', token);
//       setAuthToken(token);
//       const userRes = await axios.get('/api/auth');
//       setUser(userRes.data);
//       setIsAuthenticated(true);
//     } catch (err) {
//       console.error(err.response.data);
//       setIsAuthenticated(false);
//     }
//   };

//   const signup = async (formData) => {
//     try {
//       const res = await axios.post('/api/auth/register', formData);
//       const { token } = res.data;
//       localStorage.setItem('token', token);
//       setAuthToken(token);
//       const userRes = await axios.get('/api/auth');
//       setUser(userRes.data);
//       setIsAuthenticated(true);
//       return true;
//     } catch (err) {
//       console.error(err.response.data);
//       setIsAuthenticated(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuthToken(null);
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




