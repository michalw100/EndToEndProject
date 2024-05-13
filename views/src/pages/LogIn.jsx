import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import '../App.css'


function LogIn({ setUser }) {

    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    let user;

    const handleLogin = () => {
        if (!userName || !password) {
            setLoginError('Please fill in all fields.');
            return;
        }
        fetch(`http://localhost:3000/logIn?username=${userName}&&password=${password}`, { method: 'POST' })
            .then(response => {
                return response.json().then(data => {
                    if (response.status !== 200) {
                        setLoginError(data.message);
                        return;
                    }
                    user = data;
                    setLoginError("");
                    localStorage.setItem("currentUser", user.userID);
                    localStorage.setItem(user.userID, JSON.stringify(user));
                    setUser(user);
                    navigate('/home');
                })
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