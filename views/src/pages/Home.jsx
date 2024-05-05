import React, { useContext, useState,useEffect } from 'react';
import { UserContext } from '../App';
import UserDetailsPopup from '../components/UserDetailsPopup';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../CSS/home.css'
const Home = () => {
    useEffect(() => {
        if(!userDetails.email)
        {
            alert("You must fill email");
            navigate(`/register/add-details`);
        }
    }, [])

    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { userDetails, setUserDetails } = context;
    const [showPopup, setShowPopup] = useState(false);

    const handlePopupToggle = () => {
        setShowPopup(!showPopup);
    };

    const handleLogout = () => {
        setUserDetails(null); // Set an empty object to clear user details
        navigate('/logIn')
    };

    return (
        <div id="everything" >
            <div id="home" >
            <h1>Welcome {userDetails.name}!</h1>
            <Link className='link' to="/" onClick={handleLogout}>Log Out</Link>
            <Link className='link' onClick={handlePopupToggle}>Info</Link>
            <Link className='link' to={`users/${userDetails.id}/todos`}>Todos</Link>
            <Link className='link' to={`users/${userDetails.id}/posts`}>Post</Link>
            <Link className='link' to={`users/${userDetails.id}/albums`}>Albums</Link>
            </div>
            {showPopup && (
                <UserDetailsPopup userDetails={userDetails} onClose={handlePopupToggle} />
            )}
            <Outlet/>
        </div>
    );
};

export default Home;
