// routes/users.js
const express = require("express");
const router = express.Router();
const User = require('../models/user');

// Define your routes here
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log("DB data:", users)
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users from database");
  }
});

//create user
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating user');
    }
  });
  

// router.get("/:id", async (req, res) => {
//   const userId = req.params.id;
//   res.send(`User ${userId}`);
// });

module.exports = router;
