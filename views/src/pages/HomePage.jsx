import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from "../App.jsx";
import '../css/HomePage.css';

const HomePage = () => {
  const user = useContext(UserContext);
  const location = useLocation();

  return (
    <div>
      <nav>
        <Link to={`users/${user.userID}/info`}>Info</Link>
        <Link to={`users/${user.userID}/todos`}>Todos</Link>
        <Link to={`users/${user.userID}/posts`}>Posts</Link>
        <Link to={`users/${user.userID}/albums`}>Albums</Link>
        <Link to="logout">Logout</Link>
      </nav>
      {(location.pathname.includes('todos') ||
        location.pathname.includes('posts') ||
        location.pathname.includes('albums')) ?
        null :
        <p className='title'>Welcome to {user.name}</p>}

      <Outlet />
    </div>
  )
};

export default HomePage;
