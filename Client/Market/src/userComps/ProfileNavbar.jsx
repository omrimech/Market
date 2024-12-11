import React from 'react'
import './userPages.css';
import { useNavigate } from 'react-router';

const ProfileNavbar = () => {
    const navigate = useNavigate()
  return (
    <div className='sidebar-nav'>
        <button onClick={() => navigate('/ViewProfile')}>View Profile</button>
        <button onClick={() => navigate('/ChangePassword')}>Change Password</button>
        <button onClick={() => navigate('/EditAddress')}>Edit Address</button>
        <button onClick={() => navigate('/PaymentMethod')}>Payment Method</button>
    </div>
  )
}

export default ProfileNavbar