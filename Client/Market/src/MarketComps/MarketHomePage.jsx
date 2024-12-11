import React from "react";
import MarketNavBar from "./MarketNavBar";
import "./Market.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import CartIcon from "./CartIcon";
import { useNavigate } from "react-router";
import UserIcon from "../userComps/UserIcon";
const MarketHomePage = () => {
  const [allProd, setAllProd] = useState({
    entireStore: [],
    electronics: [],
    jewelery: [],
    mensClothing: [], 
    womensClothing: [],
  });
  const [currentStore, setCurrentStore] = useState({
    storeHeader: "",
    store: [],
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const loadAllProducts = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setCurrentStore({ ...currentStore, store: data, storeHeader: "All Products" });
      // filter data :
      const electronics = data.filter((item) => item.category == "electronics");
      const jewelery = data.filter((item) => item.category == "jewelery");
      const mensClothing = data.filter((item) => item.category == "men's clothing");
      const womensClothing = data.filter((item) => item.category == "women's clothing");
      setAllProd({ ...allProd, entireStore: data, electronics: electronics, jewelery: jewelery, mensClothing: mensClothing, womensClothing: womensClothing });
    } catch (error) {
      console.log(`error is : ${error}`);
    } finally {
      setLoading(false);
    }
  };
  // Change current store
  const setStore = (callback) => {
    switch (callback) {
      case "electronics": {
        return setCurrentStore({ ...currentStore, store: allProd.electronics, storeHeader: "Electornics" });
      }
      case "jewelery": {
        return setCurrentStore({ ...currentStore, store: allProd.jewelery, storeHeader: "Jewelery" });
      }
      case "mensClothing": {
        return setCurrentStore({ ...currentStore, store: allProd.mensClothing, storeHeader: "Men's clothing" });
      }
      case "womensClothing": {
        return setCurrentStore({ ...currentStore, store: allProd.womensClothing, storeHeader: "Women's clothing" });
      }
      case "allProds": {
        return setCurrentStore({ ...currentStore, store: allProd.entireStore, storeHeader: "All Products" });
      }
      default:
        return;
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div className="profile-cart">
        <UserIcon />
        <CartIcon />
      </div>
      <div className="market-container">
        <div className="market-top">
          <h1>{currentStore.storeHeader}</h1>
        </div>
        <div className="market-mid">
          <MarketNavBar callback={setStore} />
        </div>
        <div className="market-btm">
          {currentStore.store.map((item) => {
            return <ProductCard key={item.id} prod={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MarketHomePage;
