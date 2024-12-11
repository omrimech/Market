import React from "react";
import MarketNavBar from "../MarketComps/MarketNavBar";
import "./Market.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../MarketComps/ProductCard";
import CartIcon from "../MarketComps/CartIcon";
import { useNavigate } from "react-router";
import UserIcon from "../userComps/UserIcon";
const MensClotching = () => {
  const navigate = useNavigate();
  const [mensClothing, setMensClothing] = useState([]);
  const loadAllMens = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products/category/men's%20clothing");
    setMensClothing(data);
  };
  useEffect(() => {
    if (!sessionStorage.userID) {
      navigate("/");
    }
    loadAllMens();
  }, []);
  return (
    <div>
      <div className="profile-cart">
        <UserIcon />
        <CartIcon />
      </div>
      <div className="market-container">
        <div className="market-top">
          <h1>Men's Clotching</h1>
        </div>
        <div className="market-mid">
          <MarketNavBar />
        </div>
        <div className="market-btm">
          {mensClothing.map((item) => {
            return <ProductCard key={item.id} prod={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MensClotching;

MensClotching;
