const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  country: String,
  city: String,
  street: String,
  zipCode: Number,
});

const userSchema = new mongoose.Schema({
  fullName: String,
  userName: String,
  password: String,
  brithDate: String,
  gender: String,
  email: String,
  address: addressSchema,
  orders: Array,
});

const usersCollection = mongoose.model("users", userSchema, "users");

module.exports = usersCollection;
