import React from "react";
import "./Admin.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({
    username: "Admin",
    password: "Admin",
  });
  const [adminLogin, setAdmin] = useState({
    adminUsername: "",
    adminPassword: "",
  });
  const [error, setError] = useState({
    color: "",
    msg: "",
  });

  const loginAsAdmin = () => {
    if (adminLogin.adminUsername == "" || adminLogin.adminPassword == "") {
      return setError({ ...error, color: "red", msg: "Please fill all login information" });
    }
    if (adminLogin.adminUsername !== adminInfo.username && adminLogin.adminPassword !== adminInfo.password) {
      return setError({ ...error, color: "red", msg: "Password or username is inncorrect" });
    }
    if (adminLogin.adminUsername == adminInfo.username && adminLogin.adminPassword == adminInfo.password) {
      sessionStorage.AdminUsername = adminLogin.adminUsername;
      return navigate("/AllOrders");
    }
  };
  return (
    <div className="body">
      <div className="login-container">
        <h2 className="header">Login as Admin</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Username" onChange={(e) => setAdmin({ ...adminLogin, adminUsername: e.target.value })} required />
          <input type="password" placeholder="Password" onChange={(e) => setAdmin({ ...adminLogin, adminPassword: e.target.value })} required />
          <br /> <br />
          <span style={{ color: error.color }}>{error.msg}</span>
          <br /> <br />
          <button type="submit" onClick={loginAsAdmin}>
            Login as Admin
          </button>
          <br /> <br />
          <button onClick={() => navigate("/")}>Return to Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
