import React, { useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import MarketHomePage from "../MarketComps/MarketHomePage";
import ProductDetails from "../MarketComps/ProductDetails";
import ConfirmOrder from "../MarketComps/ConfirmOrder";
import ViewProfile from "./ViewProfile/ViewProfile";
import ViewOrders from "../OrdersComp/ViewOrders";
import AdminLogin from "../AdminComps/AdminLogin";
import OrderNumber from "../OrdersComp/OrderNumber";
import ChangePassword from "./ChagenPassword/ChangePassword";
import EditAddress from "./EditAddress/EditAddress";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import AllUsers from "../AdminComps/Users/AllUsers";
import EditUser from "../AdminComps/Users/EditUser";
import EditOrder from "../AdminComps/Orders/EditOrder";
import AllOrders from "../AdminComps/Orders/AllOrders";

const Navigator = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Market-Home-Page" element={<MarketHomePage />}></Route>
        <Route path="/ProductDetails/:id" element={<ProductDetails />}></Route>
        <Route path="/ConfirmOrder" element={<ConfirmOrder />}></Route>
        <Route path="/ViewProfile" element={<ViewProfile />}></Route>
        <Route path="/ViewOrders/:id" element={<ViewOrders />}></Route>
        <Route path="/ViewOrders" element={<ViewOrders />}></Route>
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>
        <Route path="/OrderNumber/:id" element={<OrderNumber />}></Route>
        <Route path="/ChangePassword" element={<ChangePassword />}></Route>
        <Route path="/EditAddress" element={<EditAddress />}></Route>
        <Route path="/PaymentMethod" element={<PaymentMethod />}></Route>
        <Route path="/AllUsers" element={<AllUsers />}></Route>
        <Route path="/EditUser/:id" element={<EditUser />}></Route>
        <Route path="/EditOrder/:id" element={<EditOrder/>}></Route>
        <Route path="/AllOrders" element={<AllOrders/>}></Route>
      </Routes>
    </div>
  );
};

export default Navigator;
