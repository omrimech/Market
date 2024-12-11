import React from "react";
import MarketNavBar from "../MarketComps/MarketNavBar";
import "./Market.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../MarketComps/ProductCard";
import CartIcon from "../MarketComps/CartIcon";
import { useNavigate } from "react-router";
import UserIcon from "../userComps/UserIcon";
const Electronics = () => {
  const [electronics, setElectronics] = useState([]);
  const navigate = useNavigate();
  const loadAllElectronics = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products/category/electronics");
    setElectronics(data);
  };
  useEffect(() => {
    if (!sessionStorage.userID) {
      navigate("/");
    }
    loadAllElectronics();
  }, []);
  return (
    <div>
      <div className="profile-cart">
        <UserIcon />
        <CartIcon />
      </div>
      <div className="market-container">
        <div className="market-top">
          <h1>Electronics</h1>
        </div>
        <div className="market-mid">
          <MarketNavBar />
        </div>
        <div className="market-btm">
          {electronics.map((item) => {
            return <ProductCard key={item.id} prod={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Electronics;
