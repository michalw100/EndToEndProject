import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App"

const UserDetails = ({ setUser }) => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [signUpError, setSignUpError] = useState('');

  const handleChange = (e) => {

    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  const postUser = () => {
    if(user.name == "" || user.steet == "" || user.city == "" || user.email == "" || user.zipcode == "" || user.phone == "" || user.company == "")
    {
        setSignUpError("Please fill in all fields.");
        return;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    fetch(`http://localhost:3000/users`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        const userWithoutPassword = { ...data };
        delete userWithoutPassword.password;
        localStorage.setItem("currentUser", data.userID);
        localStorage.setItem(data.userID, JSON.stringify(userWithoutPassword));
        navigate('/home');
      })
      .catch((error) => {
        setSignUpError(error.toString());
        console.error('There was an error!', error);
      });

  };

  return (
    <div className='registration'>
      <h2 className="title">User Details</h2><br />
      <input type="text" className='input' value={user.name} name="name" placeholder="name" onChange={handleChange} /><br />
      <input type="text" className='input' value={user.email} name="email" placeholder="email" onChange={handleChange} /><br />
      <input type="text" className='input' value={user.street} name="street" placeholder="street" onChange={handleChange} /><br />
      <input type="text" className='input' value={user.city} name="city" placeholder="city" onChange={handleChange} /><br />
      <input type="text" className='input' value={user.zipcode} name="zipcode" placeholder="zipcode" onChange={handleChange} /><br />
      <input type="text" className='input' value={user.phone} name="phone" placeholder="phone" onChange={handleChange} /><br />
      <input type="text" className='input' value={user.company} name="company" placeholder="company" onChange={handleChange} /><br />
      {signUpError && <p className='error' style={{ color: "red" }}>{signUpError}</p>}
      <button className="Connect" onClick={postUser}>Connect</button><br />
    </div>
  )
}

export default UserDetails;