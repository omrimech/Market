import React from "react";
import { useNavigate, useParams } from "react-router";
import "./Orders.css";
import axios from "axios";
import { useState, useEffect } from "react";
import UserIcon from "../userComps/UserIcon";
const OrderNumber = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState({});
  const getOrder = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/orders/${id}`);
      setOrder(data);
    } catch (error) {
      setError(`Failed to load data`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  const totalPrice = () => {
    if (order.products.length <= 1) {
      if(order.products[0].amount > 1){
        return order.products[0].price * order.products[0].amount
      }
      return order.products[0].price;
    }
    let totalPrice = 0;
    for (let i = 0; i < order.products.length; i++) {
      if (order.products[i].amount > 1) {
        let priceToAdd = order.products[i].price * order.products[i].amount;
        totalPrice += priceToAdd;
      } else {
        totalPrice += order.products[i].price;
      }
    }
    return totalPrice;
  };

  if (loading) return <div>Loading....</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {sessionStorage.AdminUsername ? null : (
              <div className="profile-cart">
              <UserIcon/>
            </div>
      )}
      <div className="order-number-container">
        <div className="order-header">Order Summary</div>
        <div className="order-id">
          Order ID: {order.orderNumber}
          <br /> <br />
          Order status : {order.orderStatus}
        </div>

        <div className="order-section">
          <div className="section-title">Products</div>
          <ul className="item-list">
            {order.products.map((item, index) => (
              <li key={index} className="item" onClick={() => navigate(`/ProductDetails/${item.id}`)}>
                <img src={item.image} className="item-image" />
                <div className="item-details">
                  <span className="item-name">
                    {item.title}
                    <br /> <br />
                    Amount : {item.amount}
                  </span>
                </div>
                <span className="item-price">${item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="total-price">
          Total : $ {totalPrice()}
          <br /> <br />
        </div>
      </div>
    </div>
  );
};

export default OrderNumber;
