import React from 'react'
import { useState, useContext } from 'react'
import '../CSS/Registation.css'
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom"

const Rergister = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { userDetails, setUserDetails } = context;
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleRegisterButton = () => {

        fetch(`http://localhost:3000/users?username=${userName}`)
            .then((response) => response.json())
            .then((answer) => {
                if (answer[0]) {//אם חזרה תשובה זה אומר שקיים כזה משתמש
                    alert('User with the same name already exists.');
                }
                else if (password != verifyPassword) {
                    alert('Passwords do not match.');
                }
                else if (!isStrongPassword(password)) {
                    alert('Password is not strong enough.');
                }
                else {
                    console.log(userDetails)
                    fetch('http://localhost:3000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username: userName, website: password }),
                    })
                        .then(response => response.json())  // Parse the JSON from the response
                        .then(data => {
                            console.log('Server response:', data);
                            setUserDetails(data);
                        })
                        .catch(error => {
                            console.error('Error making POST request:', error);
                        });

                    navigate('/register/add-details');
                }

            })
            .catch((error) => console.error('Error fetching data:', error));
    }
    function isStrongPassword(password) {
        // בדיקת אורך - לפחות 8 תווים ובדיקת שימוש באותיות קטנות
        if (password.length < 8 || !/[a-z]/.test(password)) {
            return false;
        }
        return true;
    }

    return (
        <div>
            <form id="form">
                <ul id="tabs" className="register-buttons active">
                    <li className="tab active">
                        <a href="#signup" className="link-btn">Sign Up</a>
                    </li>
                    <li className="tab">
                        <a href="/" className="link-btn">Log In</a>
                    </li>
                </ul>
                <div className="content" id="signUpForm">
                    <h1>Register</h1>
                    <div className="User-fill">
                        <input className="input" onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder="User Name" required />
                    </div>
                    <div className="password">
                        <div className="User-fill">
                            <input className="input" onChange={(e) => setPassword(e.target.value)} value={password} id="pwd1" type="password" placeholder="Set A Password" required />
                        </div>
                        <div className="User-fill">
                            <input className="input" onChange={(e) => setVerifyPassword(e.target.value)} value={verifyPassword} id="pwd2" type="password" placeholder="Verify-Password" required />
                        </div>
                    </div>
                    <button type="button" id="signUp" className="button button-block" onClick={handleRegisterButton}>Get Started</button>
                </div>
            </form>
        </div>
    )
};

export default Rergister