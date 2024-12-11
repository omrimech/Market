const express = require("express");
const cors = require("cors");

const connectDB = require("./Config/configDB");
const usersContoller = require("./Controllers/usersController");
const orderContoller = require('./Controllers/ordersController')
const app = express();
app.use(cors());

connectDB();

app.use(express.json());
app.use("/users", usersContoller);
app.use('/orders', orderContoller)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
