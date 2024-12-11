import React from 'react'
import axios from 'axios'
import '../userPages.css'
import { useState, useEffect } from 'react';
const ViewProfileDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({})
  const getUserData = async () => {
    try {
      const {data} = await axios.get(`http://localhost:3000/users/${sessionStorage.userID}`)
      console.log(data)
      setUser(data)
    } catch (error){
      setError(`failed to load data`)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getUserData()
  },[])

  if (loading) return <div>Loading....</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-profile">
      <h2 className='profile-h2'>User Profile</h2>
      <div className="profile-info">
        <div className="info-item">
          <span className="label">Name:</span>
          <span className="value">{user.fullName}</span>
        </div>
        <div className="info-item">
          <span className="label">Email:</span>
          <span className="value">{user.email}</span>
        </div>
        <div className="info-item">
          <span className="label">Brithdate:</span>
          <span className="value">{user.brithDate}</span>
        </div>
        <div className="info-item address">
          <span className="label">Address:</span>
          <div className="address-details">
            <div className="address-line">
              <span className="label">Country:</span>
              <span className="value"> {user.address.country}</span>
            </div>
            <div className="address-line">
              <span className="label">City:</span>
              <span className="value"> {user.address.city}</span>
            </div>
            <div className="address-line">
              <span className="label">Street:</span>
              <span className="value"> {user.address.street}</span>
            </div>
            <div className="address-line">
              <span className="label">Zip:</span>
              <span className="value"> {user.address.zipCode}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default ViewProfileDetails