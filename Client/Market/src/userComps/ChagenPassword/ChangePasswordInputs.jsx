import React from "react";
import "../userPages.css";
import { useState, useEffect } from "react";
import axios from "axios";
const ChangePasswordInputs = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassowrd: "",
  });
  const [error, setErrorMsg] = useState({
    msg: "* Password must contain 6 digits or more",
    color: "red",
  });
  // Current logged on user password
  const [userPassword, setUserPassword] = useState("");
  const loadUser = async () => {
    const { data } = await axios.get(`http://localhost:3000/users/${sessionStorage.userID}`);
    setUserPassword(data.password);
  };
  useEffect(() => {
    loadUser();
  }, []);

  const checkValues = () => {
    console.log(passwords.currentPassword.length, passwords.newPassword.length, passwords.confirmPassowrd.length);
    if (passwords.currentPassword.length < 6 || passwords.newPassword.length < 6 || passwords.confirmPassowrd.length < 6) {
      return setErrorMsg({
        ...error,
        msg: "Passwords are shorter than 6 digits",
        color: "red",
      });
    }
    changePassword();
  };

  const changePassword = async () => {
    if (passwords.currentPassword !== userPassword) {
      return setErrorMsg({
        ...error,
        msg: "Current password doesn't match",
        color: "red",
      });
    }
    if (passwords.newPassword !== passwords.confirmPassowrd) {
      return setErrorMsg({
        ...error,
        msg: "New & confirm password doesn't match",
        color: "red",
      });
    }
    if (passwords.newPassword == passwords.confirmPassowrd) {
      const obj = {
        newPassword: passwords.newPassword,
      };
      console.log(obj);
      const passwordToChange = axios.post(`http://localhost:3000/users/changePassword/${sessionStorage.userID}`, obj);
      return setErrorMsg({
        ...error,
        msg: "Password changed",
        color: "green",
      });
    }
  };
  return (
    <div className="edit-profile">
      <h2 className="profile-h2">Change Password</h2>
      <form onSubmit={(e) => e.preventDefault()} className="profile-form">
        <label>
          Current Password:
          <input type="password" placeholder="Enter current password" minLength={6} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} />
        </label>
        <label>
          New Password:
          <input type="password" placeholder="Enter new password" minLength={6} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
        </label>
        <label>
          Confirm Password:
          <input type="password" placeholder="Confirm new password" minLength={6} onChange={(e) => setPasswords({ ...passwords, confirmPassowrd: e.target.value })} />
        </label>
        <label style={{ color: error.color }}>{error.msg}</label>
        <button type="submit" onClick={checkValues}>
          Change Passowrd
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordInputs;

// address to change password : `http://localhost:3000/users/changePassword/:id`
