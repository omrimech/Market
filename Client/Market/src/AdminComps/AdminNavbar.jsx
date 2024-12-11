import React from "react";
import { useNavigate } from "react-router";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const adminLogOut = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.removeItem("AdminUsername");
      navigate("/");
    } else {
      return;
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button onClick={() => navigate('/AllOrders')}>Orders</button>
        </li>
        <li className="navbar-item">
          <button onClick={() => navigate("/AllUsers")}>Users</button>
        </li>
        <li className="navbar-item">
          <button onClick={adminLogOut}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
