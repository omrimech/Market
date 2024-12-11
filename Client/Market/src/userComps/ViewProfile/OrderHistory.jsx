import React from "react";
import "../userPages.css";
import axios from "axios";
import { useState, useEffect } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const loadUserOrders = async () => {
    const { data } = await axios.get(`http://localhost:3000/orders/ordersById/${sessionStorage.userID}`);
    console.log(data)
    setOrders(data)
  };
  useEffect(() => {
    loadUserOrders();
  }, []);
  return (
    <div className="view-profile">
      <h2 className="profile-h2">Order History</h2>
    </div>
  );
};

export default OrderHistory;
