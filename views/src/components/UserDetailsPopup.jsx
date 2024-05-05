// UserDetailsPopup.js
import React from 'react';
import '../CSS/popup.css';

const UserDetailsPopup = ({ userDetails, onClose }) => {
  return (
    <div className="popup">
      <h2>User Details</h2>
      <h3><span className='bold'>Name: </span>{userDetails.name}</h3>
      <h3><span className='bold'>Username: </span>{userDetails.username}</h3>
      <h3><span className='bold'>Email: </span>{userDetails.email}</h3>
      <h3><span className='bold'>Adress: </span>{userDetails.address.street} ,{userDetails.address.suite} ,{userDetails.address.city}</h3> 
      <h3><span className='bold'>Phone Number: </span>{userDetails.phone}</h3> 
      <h3><span className='bold'>Company Name: </span>{userDetails.company.name}</h3>
      {/* Add more details as needed */}
      <button onClick={onClose}>Close</button>
    </div>
  ); 
};

export default UserDetailsPopup;

