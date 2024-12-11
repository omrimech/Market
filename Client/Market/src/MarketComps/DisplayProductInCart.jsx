import React from "react";

const DisplayProductInCart = ({ prod }) => {
  return (
    <div className="display-in-cart-container">
      <div className="display-in-cart-top">{prod.title}
      <input type="number" value={prod.amount}/>
      </div>
      <div className="display-in-cart-mid">
        <img src={prod.image} style={{ width: "15%" }} />
      </div>
      <div className="display-in-cart-btm"></div>
    </div>
  );
};

export default DisplayProductInCart;
