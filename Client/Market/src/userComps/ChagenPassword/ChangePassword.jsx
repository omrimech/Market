import React from "react";
import UserIcon from "../UserIcon";
import CartIcon from "../../MarketComps/CartIcon";
import ProfileNavbar from "../ProfileNavbar";
import ChangePasswordInputs from "./ChangePasswordInputs";
import "../userPages.css";
const ChangePassword = () => {
  return (
    <div>
      <div className="profile-cart">
        <UserIcon />
        <CartIcon />
      </div>
      <div className="profile-container">
        <div className="profile-left">
          <ProfileNavbar />
        </div>
        <div className="profile-mid">
          <ChangePasswordInputs />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
