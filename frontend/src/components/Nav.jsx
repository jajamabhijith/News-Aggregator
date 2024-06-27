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
    <nav>
      <ul className="category-list">
        <NavLink to='/'><h1>News App</h1></NavLink>
        {categories.map((category) => (
          <li key={category.id}>
            <button onClick={() => handleCategoryChange(category.id)}>
              {category.name}
            </button>
          </li>
        ))}
        {
          Object.keys(user).length !== 0 ? 
            <>
              <li><NavLink to='/profile'>{user.username}</NavLink></li>
              <NavLink to='/'><li onClick={logout}>Logout</li></NavLink>
            </>
          :
            <>
              <NavLink to='/login'><li>Login</li></NavLink>
              <NavLink to='/register'><li>Register</li></NavLink>
            </>
        }
      </ul>
    </nav>
  );
}

export default Nav;
