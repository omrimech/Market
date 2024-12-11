import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import './Market.css'
import { Link } from "react-router-dom";

const CartIcon = () => {
  const navigate = useNavigate()
  const prods = useSelector((state) => state.products.length);
  return (
    <div>
    <div onClick={() => navigate('/ConfirmOrder')} className="cart-container">
      <i className="cart-icon">🛒</i>
      {prods > 0 && <span className="cart-count">{prods}</span>}
    </div>
    <div>
    </div>
    </div>
  );
};

export default CartIcon;
