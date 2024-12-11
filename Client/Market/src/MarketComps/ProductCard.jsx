import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ prod }) => {
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate(`/ProductDetails/${prod.id}`)}>
      <img className="product-image" src={prod.image} />
      <div className="product-info">
        <h2 className="product-name">{prod.title}</h2>
        <p className="product-price">{prod.price} $</p>
      </div>
    </div>
  );
};

export default ProductCard;
