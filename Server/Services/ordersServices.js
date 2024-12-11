const orders = require("../Models/ordersModel");

// GET All orders :
const getAllOrders = () => {
  return orders.find({});
};

// GET A order by ID :
const getOrderByID = (id) => {
  const orderById = orders.findById(id);
  return orderById
};

const getOrdersByUserId = (id) => {
  const allOrders = orders.find({});
  return allOrders
}

// POST A new order
const postOrder = (obj) => {
  const newOrder = new orders(obj);
  newOrder.save();
  return `New order has been created under ID ${newOrder._id}`;
};

// PUT a data by ID :
const updateOrderByID = async (id, obj) => {
  await orders.findByIdAndUpdate(id, obj);
  return `Order Updated !`;
};

// DELETE a order by ID :
const deleteOrderByID = async (id, obj) => {
  await orders.findByIdAndDelete(id);
  return `Order Deleted !`;
};

module.exports = { getAllOrders, getOrderByID, postOrder, updateOrderByID, deleteOrderByID , getOrdersByUserId };
