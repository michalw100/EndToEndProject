import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom"
import '../CSS/Registation.css'
const LogIn = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { userDetails,setUserDetails } = context;
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleLogInButton = () => {
        fetch(`http://localhost:3000/users?username=${userName}&&password=${password}`)
            .then(response => response.json()) 
            .then((data) => {
                if (!data) {
                    alert("one or more of the details are wrong")
                }
                else {
                    setUserDetails(data);         
                    navigate(`/home/users/${userDetails.id}`);
                }
            })
            .catch(error => {
                alert("Error fetching :"+ error);
             });
     }
   
    // useEffect(() => {
    //     console.log(userDetails);
    //     if(userDetails!=={})
    //     navigate(`/home/users/${userDetails.id}`)
    // }, []);
    
    return (
        <div>
            <form id="form">
                <ul id="tabs" className="register-buttons active">
                    <li className="tab active">
                        <a href="/register" className="link-btn">Sign Up</a>
                    </li>
                    <li className="tab">
                        <a className="link-btn">Log In</a>
                    </li>
                </ul>
                <div>
                    <h1>Welcome Back!</h1>
                    <div className="User-fill">
                        <input className="input" id="userName" onChange={(e)=>setUserName(e.target.value)} value={userName} type="text" placeholder="UserName" required />
                    </div>
                    <div className="User-fill">
                        <input className="input" onChange={(e)=>setPassword(e.target.value)} value={password}  id="userPassword" type="password" placeholder="Password" required />
                    </div>
                    <button type="button" id="logIn" onClick={handleLogInButton} className="button button-block">LogIn</button>

                </div>
            </form>
        </div>
    )
}

export default LogIn