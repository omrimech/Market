import React from "react";
import "./AdminUsers.css";
import AdminNavbar from "../AdminNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const AllUsers = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const searchUser = (searchQuery) => {
    const searchedUser = users.filter((user) => user.fullName.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredUsers(searchedUser);
  };

  const deleteUser = async (id, userFullName) => {
    if (window.confirm(`Are you sure you want to delete user : ${userFullName}?`)) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
      } catch (error) {
        console.log(`Error is : ${error}`);
      } finally {
        alert(`User under the name ${userFullName} has been deleted `);
        fetchUsers();
      }
    } else {
      return;
    }
  };
  if (loading) return <div>Loading.....</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <div className="admin-home-container">
        <div className="admin-home-top">
          <AdminNavbar />
        </div>
      </div>

      <div className="admin-container">
        <h1>User Management</h1>

        {/* Search User */}
        <div className="search-container">
          <input type="text" placeholder="Search users..." onChange={(e) => searchUser(e.target.value)} className="search-input" />
        </div>

        {/* Table */}
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.address.country}</td>
                  <td>
                    <button className="btn-edit" onClick={() => navigate(`/EditUser/${item._id}`)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => deleteUser(item._id, item.fullName)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button className="btn-orders" onClick={() => navigate(`/ViewOrders/${item._id}`)}>Orders</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
