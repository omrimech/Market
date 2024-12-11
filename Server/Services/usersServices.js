const users = require("../Models/usersModel");

// GET All users :
const getAllUsers = () => {
  return users.find({});
};

// GET A user by ID :
const getUserByID = (id) => {
  userByID = users.findById(id);
  return userByID;
};

// POST a new USER :
const postUser = (obj) => {
  const newUser = new users(obj);
  newUser.save();
  return `New user has been created under ID ${newUser._id}`;
};

// Put a data by ID :
const updateUserByID = async (id, obj) => {
  await users.findByIdAndUpdate(id, obj);
  return `User Updated !`;
};

// DELETE A user by ID :
const deleteUserByID = async (id) => {
  await users.findByIdAndDelete(id);
  return `User Deleted !`;
};


// Change user's address :
const changeAddressById = async (userId, newAddress) => {
  try {
    const user = await users.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.address.country = newAddress.country || user.address.country;
    user.address.city = newAddress.city || user.address.city;
    user.address.street = newAddress.street || user.address.street;
    user.address.zipCode = +newAddress.zipCode || +user.address.zipCode;

    await user.save();
    console.log("Address updated successfully");
  } catch (error) {
    console.error("Error updating address:", error);
  }
};

// Change User's password : 
const changePasswordById = async (userId , obj) => {
  try {
    const user = await users.findById(userId);
    if (!user) {
      throw new Error('User not found')
    }

    user.password = obj.newPassword || user.password
    await user.save();
    console.log("Passowrd changed");
  } catch (error) {
    console.error("Error updating password:", error)
  }
}

module.exports = { getAllUsers, getUserByID, postUser, updateUserByID, deleteUserByID , changeAddressById , changePasswordById};
