import React from 'react'
import { useState, useContext } from 'react'
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom"
import '../CSS/Registation.css'
const UserAddDetails = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { userDetails, setUserDetails } = context;
  const [user, setUser] = useState({//אובייקט של כל פרטי המשתמש
    id: "",
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
    },
    phone: "",
    website: "",
    company: {
      name: "",
    }
  });

  const handleOkAddButton = () => {
    console.log(user);
    console.log(userDetails.id)
    fetch(`http://localhost:3000/users/${userDetails.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, id: userDetails.id, username: userDetails.username, website: userDetails.website }),
    })
      .then(() => {
        setUserDetails({ ...user, id: userDetails.id, username: userDetails.username, website: userDetails.website });
        navigate(`/home/users/${userDetails.id}`);
      })
      .catch(error => {
        console.error('Error making POST request:', error);
        alert(error);
      });
  }
  return (
    <div>
      <form id="form">

        <div className="content" id="signUpForm">
          <h1>HELLO {userDetails.username}! ADD DETAILS</h1>
          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, name: e.target.value })} value={user.name} type="text" placeholder="Full Name" required />
          </div>

          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} type="email" placeholder="Email" required />
          </div>
          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })} value={user.address.street} type="text" placeholder="Street" required />
          </div>
          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, address: { ...user.address, suite: e.target.value } })} value={user.address.suite} type="text" placeholder="Suit" required />
          </div>
          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })} value={user.address.city} type="email" placeholder="City" required />
          </div>
          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, phone: e.target.value })} value={user.phone} type="text" placeholder="Phone Number" required />
          </div>
          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, company: { ...user.company, name: e.target.value } })} value={user.company.name} type="text" placeholder="Company Name" required />
          </div>
          <button type="button" id="signUp" className="button button-block" onClick={handleOkAddButton}>OK</button>
        </div>

      </form>
    </div>
  )
}

export default UserAddDetails