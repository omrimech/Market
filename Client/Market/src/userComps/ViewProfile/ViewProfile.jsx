import React from 'react'
import UserIcon from '../UserIcon'
import CartIcon from '../../MarketComps/CartIcon'
import ProfileNavbar from '../ProfileNavbar'
import ViewProfileDetails from './ViewProfileDetails'
import OrderHistory from './OrderHistory'
import '../userPages.css'
const ViewProfile = () => {
  return (
    <div>
      <div className='profile-cart'>
        <UserIcon/>
        <CartIcon/>
      </div>
      <div className='profile-container'>
      <div className='profile-left'><ProfileNavbar/>
      </div>
      <div className='profile-mid'><ViewProfileDetails/><OrderHistory/></div>
      </div>
    </div>
  )
}

export default ViewProfile