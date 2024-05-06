import React, { useState, useEffect } from 'react'
import './App.css'
import LogIn from './pages/LogIn'
import Rergister from './pages/Rergister'
import { Routes, Route,Navigate, Link, json } from "react-router-dom"
import Home from './pages/Home'
import UserAddDetails from './pages/UserAddDetails'
import Todos from './pages/Todos'
import Posts from './pages/Posts'
import Albums from './pages/Albums'
import Photos from './pages/Photos'
import UserDetailsPopup from './components/UserDetailsPopup'
import PostDisplayPopUp from './components/PostDisplayPopUp'
export const UserContext = React.createContext();

function App() {
  const storedUserDetails = JSON.parse(localStorage.getItem('currentUser')) || {};

  const [userDetails, setUserDetails] = useState(storedUserDetails);

useEffect(() => {
  const userDetailsWithoutPassword = { ...userDetails };
  delete userDetailsWithoutPassword.password;

  // Store the modified userDetails in local storage
  localStorage.setItem('currentUser', JSON.stringify(userDetailsWithoutPassword));
}, [userDetails]);


  return (
    <>
      <UserContext.Provider value={{ userDetails, setUserDetails }}>
        <Routes>
        <Route path="/" index element={<Navigate to="/logIn" />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/register" element={<Rergister />} />
          <Route path="/register/add-details" element={<UserAddDetails />} />
          <Route path="/home" element={<Home />}>
            <Route path="users/:userId">
              <Route path="todos" element={<Todos />} />
              <Route path="info" element={<UserDetailsPopup />} />
              <Route path="posts" element={<Posts />} >
                <Route path=":postId" element={<PostDisplayPopUp />} >
                <Route path="comments" element={<PostDisplayPopUp />} />
              </Route>
              </Route>
              <Route path="albums" element={<Albums />} />
              <Route path="albums/:albumId/photos" element={<Photos />} />
            </Route>
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
