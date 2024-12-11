import React from "react";
import "./Market.css";
import { useNavigate } from "react-router-dom";
const MarketNavBar = ({callback}) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button onClick={() => callback("electronics")}>Electronics</button>
        </li>
        <li className="navbar-item">
          <button onClick={() => callback("jewelery")}>Jewelery</button>
        </li>
        <li className="navbar-item">
          <button onClick={() => callback("mensClothing")}>Men's Clothing</button>
        </li>
        <li className="navbar-item">
          <button onClick={() => callback("womensClothing")}>Women's Clothing</button>
        </li>
        <li className="navbar-item">
          <button onClick={() => callback("allProds")}>All</button>
        </li>
      </ul>
    </nav>
  );
};

export default MarketNavBar;
