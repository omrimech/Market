import React from "react";
import "./AdminUsers.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import AdminNavbar from "../AdminNavbar";

const EditUser = () => {
  const { id } = useParams();
  const [userObj, setUserObj] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/users/${id}`);
      setUserObj(data);
    } catch (error) {
      setError(`Error fetching data : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="admin-home-container">
        <div className="admin-home-top">
          <AdminNavbar />
          <br /> <br />
          <h1>Edit User</h1>
        </div>
      </div>
      <div className="edit-profile">
        {/* Edit user details */}
        <div>
          <h2 className="edit-user-h2">User : {userObj.fullName}</h2>
          <form className="edit-user-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Fullname :
              <input type="text" defaultValue={userObj.fullName} onChange={(e) => setUserObj({ ...userObj, fullName: e.target.value })} required />
            </label>
            <label>
              Username :
              <input type="text" defaultValue={userObj.userName} onChange={(e) => setUserObj({ ...userObj, userName: e.target.value })} required />
            </label>
            <label>
              Password :
              <input type="text" defaultValue={userObj.password} minLength={6} onChange={(e) => setUserObj({ ...userObj, password: e.target.value })} required />
            </label>
            <label>
              Email :
              <input type="email" defaultValue={userObj.email} onChange={(e) => setUserObj({ ...userObj, email: e.target.value })} required />
            </label>
            <label>
              Brithdate : 
              <input type="text" style={{background : '#9fa3ab'}} value={userObj.brithDate} required />
            </label>
            <label>
              Gender :
              <input type="text" style={{background : '#9fa3ab'}} value={userObj.gender} required />
            </label>
            <h2 className="edit-user-h2">Address</h2>
            <label>
              Country :
              <input type="text" defaultValue={userObj.address.country} onChange={(e) => setUserObj({ ...userObj.address, country: e.target.value })} required />
            </label>
            <label>
              City :
              <input type="text" defaultValue={userObj.address.city} onChange={(e) => setUserObj({ ...userObj.address, city: e.target.value })} required />
            </label>
            <label>
              Street :
              <input type="text" defaultValue={userObj.address.street} onChange={(e) => setUserObj({ ...userObj.address, street: e.target.value })} required />
            </label>
            <label>
              Zipcode :
              <input type="text" defaultValue={userObj.address.zipCode} onChange={(e) => setUserObj({ ...userObj.address, zipCode: e.target.value })} required />
            </label>
            <h2 className="edit-user-h2">red</h2>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default EditUser;
