const express = require('express');
const orderServices = require('../Services/ordersServices');

const router = express.Router();

// GET All orders :
router.get('/' , async (req ,res) => {
    const orders = await orderServices.getAllOrders();
    res.send(orders);
});

// GET Order by ID :
router.get('/:id', async (req,res) => {
    const id = req.params.id;
    const order = await orderServices.getOrderByID(id);
    res.send(order)
})

//GET orders by user id
router.get('/ordersById/:id', async (req , res) => {
    const id = req.params.id;
    const orders = await orderServices.getOrdersByUserId(id);
    const ordersByUser = orders.filter((item) => item.userID == id);
    res.send(ordersByUser)
})

// POST a new order :
router.post('/createOrder' , async (req,res) => {
    const obj = req.body;
    const newOrder = await orderServices.postOrder(obj);
    res.send(newOrder)
});

// Update an order :
router.put('/:id' , async (req,res) => {
    const obj = req.body;
    const id = req.params.id;
    console.log(obj)
    const updatedOrder = await orderServices.updateOrderByID(id , obj);
    res.send(updatedOrder);
});

// Delete an order :
router.delete('/:id' , async (req,res) => {
    const id = req.params.id;
    const orderToDelete = await orderServices.deleteOrderByID(id);
    res.send(orderToDelete)
})

module.exports = router