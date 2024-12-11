import React from "react";
import "./Orders.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderDetails from "./OrderDetails";
import CartIcon from "../MarketComps/CartIcon";
import UserIcon from "../userComps/UserIcon";
import AdminNavbar from "../AdminComps/AdminNavbar";
const ViewOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadOrdersByID = async () => {
    try {
      if (id) {
        const { data } = await axios.get(`http://localhost:3000/orders/ordersById/${id}`);
        setOrders(data);
      } else {
        const { data } = await axios.get(`http://localhost:3000/orders/ordersById/${sessionStorage.userID}`);
        setOrders(data);
      }
    } catch (error) {
      console.log(`error is : ${error}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadOrdersByID();
  }, []);

  if (loading) return <div>Loading....</div>;

  return (
    <div>
      {id ? null : (
        <div className="profile-cart">
          <UserIcon />
          <CartIcon />
        </div>
      )}
      <div className="orders-container">
        <div className="orders-top">
          {id ? <AdminNavbar /> : null}
          <br /> <br />
          <h1>Orders</h1>
        </div>
        <div className="orders-mid">
          {orders.length <= 0 ? (
            <span>No Orders has been found</span>
          ) : (
            orders.map((item) => {
              return <OrderDetails key={item._id} orderInfo={item} id={id} />;
            })
          )}
        </div>
        <div className="orders-btm"></div>
      </div>
    </div>
  );
};

export default ViewOrders;
