import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function SignUp({ setUser }) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [signUpError, setSignUpError] = useState('');

    const handleRegistration = () => {
        if (!userName || !password || !passwordVerify) {
            setSignUpError('Please fill in all fields.');
            return;
        }
        if (password != passwordVerify) {
            setSignUpError('The passwords are not the same.');
            return;
        }
        if (!CheckPassword(password))
            return;

        fetch(`http://localhost:3000/register`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: userName, password: password })
        })
        .then(response => {
            return response.json().then(data => {
                if (response.status !== 201) {
                    setSignUpError(data.message);
                    return;
                }
                // אם התנאי לא מתקיים, תמשיך לכתוב קוד כאן
                setUser(prevUser => ({
                    ...prevUser,
                    userName: userName,
                    password: password,
                    userID: data.userID
                }));
                navigate(`/user-details`);
            });
        })
        .catch(err => {
            setSignUpError(err);
        });
    }

    const CheckPassword = (password) => {
        let psw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
        if (password.match(psw)) {
            return true;
        } else {
            setSignUpError('Wrong password...! The password must contain letters and numbers');
            return false;
        }
    }

    return (
        <div className='registration'>
            <h2 className="title">Create Account</h2><br />
            <input type="text" className='input' value={userName} placeholder="user name" onChange={(e) => setUserName(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="password" className='input' value={passwordVerify} placeholder="password-verify" onChange={(e) => setPasswordVerify(e.target.value)} /><br />
            {signUpError && <p className='error' style={{ color: "red" }}>{signUpError}</p>}
            <button className="btnOkSignUp" onClick={handleRegistration}>Connect</button><br />
            <Link className='link' to="/login"  >Already have an account? Sign in</Link>
        </div>
    )
};

export default SignUp;