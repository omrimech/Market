import React from "react";
import AdminNavbar from "../AdminNavbar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import "./EditOrder.css";
import { useSearchParams } from "react-router-dom";

const EditOrder = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("username");
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState([]);
  const [productsObj, setProductsObj] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/orders/${id}`);
      setOrderDetails(data);
      setProductsObj(data.products);
    } catch (error) {
      setError(`Failed to fetch data : ${error}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>{error}</div>;

  const handleChange = (id, newValue, key) => {
    setOrderDetails((prevData) => ({...prevData, products : prevData.products.map((item) => item.id === id ? {...item, [key] : newValue} : item)}))
  };
  
  const handleSubmit = async () => {
    await axios.put(`http://localhost:3000/orders/${id}`, orderDetails);
    if (window.confirm(`Changed saved, would you like to go back to all orders page?`)) {
      navigate("/AllOrders");
    }
  };

  return (
    <div>
      <div className="admin-home-container">
        <div className="admin-home-top">
          <AdminNavbar />
        </div>
      </div>
      <div className="edit-order">
        <h2 className="edit-order-h2">
          User : {query} / Order Number : {orderDetails.orderNumber}
        </h2>
        <br />
        <form className="edit-order-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Set order status :
            <select onChange={(e) => setOrderDetails({ ...orderDetails, orderStatus: e.target.value })}>
              <option hidden>{orderDetails.orderStatus}</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
          {orderDetails.products.map((item, index) => {
            return (
              <div key={index}>
                <h2 className="edit-order-h2"></h2>
                <span>{item.title}</span>
                <br /> <br />
                <img src={item.image} width={"15%"} />
                <br />
                <br />
                <label>
                  Amount :
                  <input type="number" onClick={(e) => handleChange(item.id, +e.target.value, "amount")} min={1} defaultValue={item.amount} />
                </label>
                <br /> <br />
                <label>
                  Price :
                  <input type="text" onClick={(e) => handleChange(item.id, +e.target.value, "price")} min={1} defaultValue={item.price} />
                </label>
              </div>
            );
          })}
          <button type="submit" onClick={handleSubmit}>
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
