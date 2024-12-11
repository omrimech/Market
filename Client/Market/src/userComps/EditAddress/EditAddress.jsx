import React from 'react'
import UserIcon from '../UserIcon'
import CartIcon from '../../MarketComps/CartIcon'
import ProfileNavbar from '../ProfileNavbar'
import '../userPages.css'
import EditAddressInputs from './EditAddressInputs'
const EditAddress = () => {
    return (
        <div>
          <div className='profile-cart'>
            <UserIcon/>
            <CartIcon/>
          </div>
          <div className='profile-container'>
          <div className='profile-left'><ProfileNavbar/>
          </div>
          <div className='profile-mid'><EditAddressInputs/></div>
          </div>
        </div>
      )
}

export default EditAddress