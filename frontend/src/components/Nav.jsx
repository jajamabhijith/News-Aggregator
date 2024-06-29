// client/src/Nav.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Nav({ handleCategoryChange }) {
  const { user, logout } = useContext(AuthContext);
  const categories = [
    { name: 'General', id: 'general' },
    { name: 'Business', id: 'business' },
    { name: 'Sports', id: 'sports' },
    { name: 'Technology', id: 'technology' },
    { name: 'Entertainment', id: 'entertainment' }
  ];

  return (
    <nav className="category-list">
      {/* <ul className="category-list"> */}
        <div className='nav-flex'>
          <NavLink to='/'><h1>News App</h1></NavLink>
          {categories.map((category) => (
            <li key={category.id}>
              <button onClick={() => handleCategoryChange(category.id)}>
                {category.name}
              </button>
            </li>
          ))}
        </div>
        <div className='nav-flex'>
          {
            Object.keys(user).length !== 0 ? 
              <>
                <NavLink to='/profile'><li>{user.username}</li></NavLink>
                <NavLink to='/'><li onClick={logout}>Logout</li></NavLink>
              </>
            :
              <>
                <NavLink to='/login'><li>Login</li></NavLink>
                <NavLink to='/register'><li>Register</li></NavLink>
              </>
          }
        </div>
        
      {/* </ul> */}
    </nav>
  );
}

export default Nav;
