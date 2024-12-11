import React from "react";
import "./userPages.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const Signup = () => {
  const navigator = useNavigate();
  // Get All Users form DB
  const getUsers = async () => {
    const { data } = await axios.get("http://localhost:3000/users");
    setUsers(data);
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  // Setting a new User
  const [newUser, setNewUser] = useState({
    fullName: null,
    email: null,
    userName: null,
    password: null,
    brithDate: null,
    gender: null,
    address: {
      country: "",
      city: "",
      street: "",
      zipCode: 0,
    },
    orders: [],
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    msg: "",
    color: "",
  });

  // Checks the signup conditons
  const checkSignUp = () => {
    if (!newUser.fullName || !newUser.userName || !newUser.email || !newUser.password || !newUser.brithDate || !newUser.gender === null) {
      return setError({ ...error, msg: `Some details not filled, please fill every detail`, color: "red" });
    }
    completeSignUp();
  };

  const completeSignUp = async () => {
    const foundEmail = users.find((item) => item.email.toLowerCase() == newUser.email.toLowerCase());
    console.log(foundEmail);
    if (foundEmail) {
      return setError({ ...error, msg: "Email is already in use", color: "red" });
    }
    const foundUserName = users.find((item) => item.userName.toLowerCase() == newUser.userName.toLowerCase());
    console.log(foundUserName);
    if (foundUserName) {
      return setError({ ...error, msg: "Username is already in use", color: "red" });
    }
    if (newUser.password !== confirmPassword) {
      return setError({ ...error, msg: "Passwords doesnt match", color: "red" });
    }

    const createUser = await axios.post("http://localhost:3000/users", newUser);
    alert(`User has been registered : ${newUser.fullName}`);
    navigator("/");
  };

  return (
    <div className="body">
      <div className="login-container">
        <h2 className="header">Signup</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <label>
            FullName :
            <input type="text" placeholder="Full Name" onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })} required />
          </label>
          {/* Email */}
          <label>
            Email :
            <input type="email" placeholder="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
          </label>
          {/* User Name */}
          <label>
            User Name :
            <input type="text" placeholder="User Name" onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })} required />
          </label>
          {/* Password */}
          <label>
            Password :
            <input type="password" placeholder="Password" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
          </label>
          {/* Confirm Passowrd */}
          <label>
            Confirm Passowrd :
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
          </label>
          {/* Brithdate */}
          <label>
            Brithdate :
            <input type="date" onChange={(e) => setNewUser({ ...newUser, brithDate: e.target.value })} placeholder="Brith-date" required />
          </label>
          {/* Gender */}
          <label>
            Gender
            <br />
            <select defaultValue={""} onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })} required>
              <option hidden value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Mechanic">Mechanic</option>
            </select>
          </label>
          <br />
          <span style={{ color: error.color }}>{error.msg}</span>
          <br /> <br />
          {/* Signup Btn */}
          <button type="submit" onClick={checkSignUp}>
            Register
          </button>
          <br />
          <br />
          <button type="button" onClick={() => navigator("/")}>
            Return to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
