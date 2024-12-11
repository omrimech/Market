import React from "react";
import "./EditOrder.css";
import AdminNavbar from "../AdminNavbar";
import axios, { all } from "axios";
import { useState, useEffect } from "react";
import AllUsers from "../Users/AllUsers";
import { useNavigate } from "react-router";
const AllOrders = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordersObj, setOrdersObj] = useState({
    currentTable: [],
    entireOrders: [],
  });
  const fetchOrders = async () => {
    try {
      const orders = await axios.get(`http://localhost:3000/orders`);
      const users = await axios.get("http://localhost:3000/users");
      const allOrders = orders.data;
      const allUsers = users.data;
      const OrdersAfterFiltering = allOrders.map((order) => {
        const user = allUsers.find((u) => u._id === order.userID);
        return {
          ...order,
          fullName: user ? user.fullName : "Unknown User",
        };
      });

      setOrdersObj({ ...ordersObj, currentTable: OrdersAfterFiltering, entireOrders: OrdersAfterFiltering });
    } catch (error) {
      setError(`Error fetching data : ${error}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (id, orderNumber, userFullName) => {
    if (window.confirm(`Are you sure you want to delete Order : ${orderNumber} , for user : ${userFullName}`)) {
      try {
        await axios.delete(`http://localhost:3000/orders/${id}`);
      } catch (error) {
        console.log(`Error is : ${error}`);
      } finally {
        alert(`Order : ${orderNumber} , has been deleted for user : ${userFullName}`);
        fetchOrders();
      }
    } else {
      return;
    }
  };

  const setByStatusTable = (value) => {
    console.log(value);
    switch (value) {
      case "all": {
        return setOrdersObj({ ...ordersObj, currentTable: ordersObj.entireOrders });
      }
      case "pending": {
        const pending = ordersObj.entireOrders.filter((item) => item.orderStatus == "Pending");
        return setOrdersObj({ ...ordersObj, currentTable: pending });
      }
      case "completed": {
        const completed = ordersObj.entireOrders.filter((item) => item.orderStatus == "Completed");
        return setOrdersObj({ ...ordersObj, currentTable: completed });
      }
      case "cancelled": {
        const canceled = ordersObj.entireOrders.filter((item) => item.orderStatus == "Cancelled");
        return setOrdersObj({ ...ordersObj, currentTable: canceled });
      }
      default: {
        return;
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="admin-home-container">
        <div className="admin-home-top">
          <AdminNavbar />
        </div>
      </div>
      <div className="admin-container">
        <h1>Order Managment</h1>

        {/* Search Order */}
        <div className="search-container">
          <input type="text" placeholder="Search Orders..." />
        </div>
        <label>
          <select onChange={(e) => setByStatusTable(e.target.value)} className="select-dropdown">
            <option hidden>Search by status</option>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        {/* Table */}
        <table className="order-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Full Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersObj.currentTable.length > 0 ? (
              ordersObj.currentTable.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.orderNumber}</td>
                    <td>{item.fullName}</td>
                    <td>{item.orderStatus}</td>
                    <td>
                      <button className="btn-edit" onClick={() => navigate(`/EditOrder/${item._id}?username=${item.fullName}`)}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => deleteOrder(item._id, item.orderNumber, item.fullName)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
