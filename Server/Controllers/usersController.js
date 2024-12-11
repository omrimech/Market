const express = require("express");
const userServices = require("../Services/usersServices");

const router = express.Router();

//GET all users :
router.get("/", async (req, res) => {
  const users = await userServices.getAllUsers();
  res.send(users);
});

// GET by ID :
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userServices.getUserByID(id);
  res.send(user);
});

// POST a new user :
router.post("/", async (req, res) => {
  const obj = req.body;
  const newUser = await userServices.postUser(obj);
  res.send(newUser);
});

// Update a user :
router.put("/:id", async (req, res) => {
  const obj = req.body;
  const id = req.params.id;
  const updatedUser = await userServices.updateUserByID(id, obj);
  res.send(updatedUser);
});

// Delete a user :
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userToDelete = await userServices.deleteUserByID(id);
  res.send(userToDelete);
});

router.post("/postAddress/:id", async (req,res) => {
  const id = req.params.id;
  const obj = req.body;
  const addressToUpdate = await userServices.changeAddressById(id , obj)
  res.send(addressToUpdate)
})

router.post('/changePassword/:id', async (req,res) => {
  const id = req.params.id;
  const obj = req.body;
  const passwordToUpate = await userServices.changePasswordById(id , obj)
  res.send(passwordToUpate)
})

module.exports = router;
