import React from "react";
import MarketNavBar from "../MarketComps/MarketNavBar";
import "./Market.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../MarketComps/ProductCard";
import CartIcon from "../MarketComps/CartIcon";
import { useNavigate } from "react-router";
import UserIcon from "../userComps/UserIcon";
const Jewelery = () => {
  const navigate = useNavigate();
  const [jewelery, setJewelery] = useState([]);
  const loadAllJewelery = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products/category/jewelery");
    setJewelery(data);
  };
  useEffect(() => {
    if (!sessionStorage.userID) {
      navigate("/");
    }
    loadAllJewelery();
  }, []);
  return (
    <div>
      <div className="profile-cart">
        <UserIcon />
        <CartIcon />
      </div>
      <div className="market-container">
        <div className="market-top">
          <h1>Jewelery</h1>
        </div>
        <div className="market-mid">
          <MarketNavBar />
        </div>
        <div className="market-btm">
          {jewelery.map((item) => {
            return <ProductCard key={item.id} prod={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Jewelery;
