import React from "react";
import { useNavigate } from "react-router";
import "./Market.css";
import { useDispatch, useSelector } from "react-redux";
import DisplayProductInCart from "./DisplayProductInCart";
import UserIcon from "../userComps/UserIcon";
import { useState, useEffect } from "react";
import axios from "axios";
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.products);
  const [user, setUser] = useState({});
  const loadUser = async () => {
    const { data } = await axios.get(`http://localhost:3000/users/${sessionStorage.userID}`);
    setUser(data);
  };
  const checkAddressPayment = () => {
    if (!user.address.country || !user.address.city || !user.address.street || !user.address.zipCode) {
      alert("Some information about your address is missing, in order to continue please fill all required address information, click ok to edit your Address page");
      return navigate("/EditAddress");
    }
    completeOrder();
  };

  const completeOrder = () => {
    dispatch({ type: "CONFIRM_ORDER", payload: itemsInCart });
  };

  const changeAmount = (id, newAmount) => {
    const obj = {
      id : id,
      amount : newAmount
    }
    console.log(obj)
    dispatch({type : "CHANGE_AMOUNT", payload : obj});
  };

  const deleteProducts = (prodID) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      return dispatch({ type: "DELETE", payload: prodID });
    } else {
      return;
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div>
      <div className="profile-cart">
        <UserIcon />
      </div>
      <div className="container-confirm">
        <div className="top-confirm">
          <h1>Products in cart</h1>
        </div>
      </div>
      <div className="container-confirm">
        {itemsInCart.length <= 0 ? (
          <div>
          <h2 style={{ color: "red" }}>cart is empty</h2>
          <br /><br />
          <button className="confirm-button" style={{backgroundColor : 'green'}} onClick={() => navigate('/Market-Home-Page')}>To market</button>
          </div>
        ) : (
          itemsInCart.map((item) => {
            return (
              <div className="cart-item" key={item.id}>
                <img src={item.image} className="product-image" />
                <div className="product-details">
                  <p className="product-title">{item.title}</p>
                  <input type="number" defaultValue={item.amount} onChange={(e) => changeAmount(item.id, +e.target.value)} min="1" className="quantity-input" />
                </div>
                <button className="delete-button" onClick={() => deleteProducts(item.id)}>
                  Delete
                </button>
              </div>
            );
          })
        )}
        {itemsInCart.length <= 0 ? null : (
          <div>
            <button className="confirm-button" onClick={checkAddressPayment}>
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrder;
