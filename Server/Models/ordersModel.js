const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    count : Number,
    rate : Number
})

const productsSchema = new mongoose.Schema({
    amount : Number,
    category : String,
    description : String,
    id : Number,
    image : String,
    price : Number,
    rating : ratingSchema,
    title : String
})

const ordersSchema = new mongoose.Schema({
    orderNumber : String,
    userID : String,
    products : [productsSchema],
    orderStatus : String
})

const ordersCollection = mongoose.model('orders' , ordersSchema , 'orders')

module.exports = ordersCollection