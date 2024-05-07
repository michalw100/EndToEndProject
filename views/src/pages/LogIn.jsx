import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import '../App.css'


function LogIn({ setUser }) {

    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    let user;

    const handleLogin=()=> {
        fetch(`http://localhost:3000/users?username=${userName}&&password=${password}`)
            .then(response => response.json())
            .then(data => {
                user = data;
                if (user && user.userID != null) {
                    setLoginError("");
                    localStorage.setItem("currentUser", user.userID);
                    const userWithoutPassword = { ...user };
                    delete userWithoutPassword.password;
                    localStorage.setItem(user.userID, JSON.stringify(userWithoutPassword));
                    setUser(user);
                    navigate('/home');
                }
                else if (!userName || !password)
                    setLoginError('Please fill in all fields.');
                else
                    setLoginError("Username or password is not correct")
            })
    }

    return (
        <div className='registration'>
            <h2 className="title">Log in</h2><br />
            <input type="text" className='input' value={userName} placeholder="user name" onChange={(e) => setUserName(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            {loginError &&
                <p className='error' style={{ color: "red" }}>{loginError}</p>}
            <button className="btnOkLogIn" onClick={handleLogin}>Connect</button>
            <Link className='link' to="/register" >Dont have an account? Sign up</Link>
        </div>
    );
}
export default LogIn