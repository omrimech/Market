import React from "react";
import "./userPages.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  // Load users
  const [users, setUsers] = useState([]);
  const [isLogIn, setIslogIn] = useState(false);
  const navigate = useNavigate();

  const loadUsers = async () => {
    const { data } = await axios.get("http://localhost:3000/users");
    setUsers(data);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  // Login
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState({
    msg: "",
    color: "",
  });
  const SignIn = () => {
    const foundUserName = users.find((item) => item.userName.toLowerCase() == user.userName.toLowerCase());
    const foundEmail = users.find((item) => item.email.toLowerCase() == user.userName.toLowerCase());
    if (!foundUserName && !foundEmail) {
      return setError({ ...error, msg: "Invalid User name or Email", color: "red" });
    }
    if (foundUserName) {
      if (foundUserName.password == user.password) {
        setIslogIn(true);
        completeLogin(foundUserName);
      } else {
        return setError({ ...error, msg: "Password is incorrect", color: "red" });
      }
    } else if (foundEmail) {
      if (foundEmail.password == user.password) {
        setIslogIn(true);
        completeLogin(foundEmail);
      } else {
        return setError({ ...error, msg: "Password is incorrect", color: "red" });
      }
    }
  };
  const completeLogin = (loggedInUser) => {
    sessionStorage.FullName = loggedInUser.fullName;
    sessionStorage.userID = loggedInUser._id;
    navigate("/Market-Home-Page");
  };
  return (
    <div className="body">
      <div className="login-container">
        <h2 className="header">Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="User Name / Email" onChange={(e) => setUser({ ...user, userName: e.target.value })} required />
          <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
          <br />
          <span style={{ color: error.color }}>{error.msg}</span>
          <br /> <br />
          <button type="submit" onClick={SignIn}>
            Login
          </button>
          <br />
          <br />
          <button type="button" onClick={() => navigate("/Signup")}>
            Signup here
          </button>
          <br />
          <br />
          <button style={{ backgroundColor: "gray" }} onClick={() => navigate("/AdminLogin")}>
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
