import React from 'react'
import UserIcon from '../UserIcon'
import CartIcon from '../../MarketComps/CartIcon'
import ProfileNavbar from '../ProfileNavbar'
import PaymentMethodInputs from './PaymentMethodInputs'
import ViewPaymentMethods from './ViewPaymentMethods'
import '../userPages.css'


const PaymentMethod = () => {
    return (
        <div>
          <div className='profile-cart'>
            <UserIcon/>
            <CartIcon/>
          </div>
          <div className='profile-container'>
          <div className='profile-left'><ProfileNavbar/>
          </div>
          <div className='profile-mid'>
            <ViewPaymentMethods/>
            <PaymentMethodInputs/>
            </div>
          </div>
        </div>
      )
}

export default PaymentMethod