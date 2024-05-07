import React, {useContext} from 'react'
import '../css/Info.css'
import { UserContext } from "../App.jsx"


const Info = () => {
  const user = useContext(UserContext);

  return (
    <div className='info'>
    <h2>User Details</h2>
    <ul>
      {/* <li><strong>ID:</strong> {user.userID}</li> */}
      <li><strong>Name:</strong> {user.name}</li>
      <li><strong>Username:</strong> {user.userName}</li>
      <li><strong>Email:</strong> {user.email}</li>
      <li>
        <strong>Address:</strong>
        <ul>
          <li><strong>Street:</strong> {user.street}</li>
          <li><strong>City:</strong> {user.city}</li>
          <li><strong>Zipcode:</strong> {user.zipcode}</li>
        </ul>
      </li>
      <li><strong>Phone:</strong> {user.phone}</li>
      <li>
        <strong>Company:</strong>  {user.company}
      </li>
    </ul>
  </div>
  )
}

export default Info;