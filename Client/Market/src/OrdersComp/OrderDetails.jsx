import React from "react";
import { useNavigate } from "react-router";
import "./Orders.css";

const OrderDetails = ({ orderInfo, id }) => {
  const navigate = useNavigate();
  return (
    <div className="view-order-container" onClick={sessionStorage.AdminUsername ? null : () => navigate(`/OrderNumber/${orderInfo._id}`)}>
      <span className="view-order-order-id">Order ID : {orderInfo.orderNumber}</span>
      {orderInfo.products.map((item, index) => (
        <div className="view-order-card" key={index}>
          <img src={item.image} alt="Order Item" />
          <div className="view-order-card-details"></div>
        </div>
      ))}
      {sessionStorage.AdminUsername ? (
        <div className="edit-order-button">
          <button className="btn-edit" onClick={() => navigate(`/EditOrder/${orderInfo._id}`)}>
            Edit Order
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default OrderDetails;

("/OrderNumber/:id");
