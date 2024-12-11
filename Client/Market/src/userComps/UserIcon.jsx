import React from "react";
import "./userPages.css";
import { useState } from "react";
import { useNavigate } from "react-router";

const UserIcon = () => {
  const navigate = useNavigate();
  const [displayOption, setDisplayOption] = useState(false);
  const Logout = () => {
    sessionStorage.removeItem("FullName");
    sessionStorage.removeItem("userID");
    navigate("/");
  };
  return (
    <div className="container">
      <button onClick={() => setDisplayOption(!displayOption)} className="toggle-button">
        Hello, {sessionStorage.FullName} ▼
      </button>
      {displayOption && (
        <ul className="options-list">
          <li className="option-item" onClick={() => navigate("/Market-Home-Page")}>
            Market
          </li>
          <li className="option-item" onClick={() => navigate("/ViewProfile")}>
            View Profile
          </li>
          <li className="option-item" onClick={() => navigate("/ViewOrders")}>
            Orders
          </li>
          <li className="option-item" onClick={Logout}>
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserIcon;
