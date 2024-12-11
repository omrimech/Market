import React from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Market.css";
import CartIcon from "./CartIcon";
import { useDispatch } from "react-redux";
import UserIcon from "../userComps/UserIcon";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const getProduct = async () => {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    data.amount = 1;
    setProduct(data);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const addProductsToCart = () => {
    dispatch({ type: "ADD", payload: product });
    if (window.confirm("Product added to cart, Go to cart?")) {
      navigate("/ConfirmOrder");
    } else {
      return;
    }
  };

  return (
    <div>
      <div className="profile-cart">
        <UserIcon />
        <CartIcon />
      </div>
      <div className="container-prod">
        <div className="product-image">
          <img src={product.image} />
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-rating">Score : 4.7 </div>
          <div className="product-price">{product.price} $</div>

          <p className="product-description">{product.description}</p>

          <div className="buy-section">
            <div className="quantity">
              <label htmlFor="quantity">Quantity:</label>
              <input onChange={(e) => setProduct({ ...product, amount: +e.target.value })} type="number" min="1" max="10" defaultValue="1" />
            </div>
            <button onClick={addProductsToCart} className="add-to-cart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
