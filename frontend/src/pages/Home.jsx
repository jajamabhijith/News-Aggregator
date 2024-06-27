// client/src/Home.js
import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Nav from '../components/Nav';


function Home() {
  const [news, setNews] = useState([]);
  const [loading,setLoading] = useState(false);
  // const [categories] = useState([
  //   { name: 'General', id: 'general' },
  //   { name: 'Business', id: 'business' },
  //   { name: 'Sports', id: 'sports' },
  //   { name: 'Technology', id: 'technology' },
  //   { name: 'Entertainment', id: 'entertainment' }
  // ]);
  const {user,logout} = useContext(AuthContext);
  // console.log(user);

  // useEffect(() => {
  //   fetchNews('general');
  // }, []);

  // const fetchNews = async (category) => {
  //   setLoading(true);
  //   console.log(`Fetching news for category: ${category}`);
  //   try {
  //     const response = await axios.get(`/api/news/${category}`);
  //     setNews(response.data);
  //   } catch (error) {
  //     console.error('Error fetching news:', error);
  //   }finally{
  //     setLoading(false);
  //   }
  // };


  // const handleCategoryChange = (category) => {
  //   fetchNews(category);
  // };

  // if(loading){
  //   return <div>Loading</div>;
  // }

  return (
    <div className="App">
      <header>
{/* handleCategoryChange={handleCategoryChange} */}
      <Nav  />


        {/* <nav>
          <ul className="category-list">
            <h1>News App</h1>
            {categories.map((category) => (
              <li key={category.id}>
                <button>
                  {category.name}
                </button>
              </li>
            ))}
            {
              Object.keys(user).length !== 0 ? 
                <>
                <NavLink to='/login'><li>{user.username}</li></NavLink>
                <NavLink><li onClick={logout}>Logout</li></NavLink>
                </>
              
              :
              
                <>
                <NavLink to='/login'><li>Login</li></NavLink>
                <NavLink to='/register'><li>Register</li></NavLink>
                </>
              
            }
            

            
          </ul>
        </nav> */}
      </header>
      <main className="news-grid">
        {news.map((article, index) => (
          <div key={index} className="news-item">
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />}
            <div className="news-content">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;

