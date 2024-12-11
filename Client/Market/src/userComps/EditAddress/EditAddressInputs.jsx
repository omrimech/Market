import React from "react";
import "../userPages.css";
import { useState, useEffect } from "react";
import axios from "axios";

const EditAddressInputs = () => {
  const [address, setAddress] = useState({
    country: "",
    city: "",
    street: "",
    zipCode: "",
  });
  const [error, setError] = useState({
    msg: "",
    color: "",
  });
  const checkAddressInputs = () => {
    if (!address.country || !address.city || !address.street || !address.zipCode) {
      return setError({ ...error, msg: "Please fill all address information", color: "red" });
    }
    if(address.zipCode < 0){
      return setError({ ...error, msg: "Please insert a positive number", color: "red" });
    }
    updateAddress();
  };
  const updateAddress = async () => {
    const data = await axios.post(`http://localhost:3000/users/postAddress/${sessionStorage.userID}`,address)
    return setError({ ...error, msg: "Changes Saved", color: "green" });
  };
  return (
    <div className="edit-profile">
      <h2 className="profile-h2">Edit Address</h2>
      <form onSubmit={(e) => e.preventDefault()} className="profile-form">
        <label>
          Country:
          <input type="text" placeholder="Enter country" onChange={(e) => setAddress({ ...address, country: e.target.value })} />
        </label>
        <label>
          City:
          <input type="text" placeholder="Enter city" onChange={(e) => setAddress({ ...address, city: e.target.value })} />
        </label>
        <label>
          Street:
          <input type="text" placeholder="Enter street" onChange={(e) => setAddress({ ...address, street: e.target.value })} />
        </label>
        <label>
          Zipcode:
          <input type="number" placeholder="Enter zipcode" onChange={(e) => setAddress({ ...address, zipCode: +e.target.value })} />
        </label>
        <label style={{ color: error.color }}>{error.msg}</label>
        <button type="submit" onClick={checkAddressInputs}>
          Edit Address
        </button>
      </form>
    </div>
  );
};

export default EditAddressInputs;
