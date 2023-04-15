// routes/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Define your routes here
router.get("/getAll", async (req, res) => {
  try {
    const users = await User.find();
    console.log("DB data:", users);
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users from database");
  }
});

//Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

//login endpoint
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "Email or password is incorrect" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: "Email or password is incorrect" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "12345",
      {
        expiresIn: "1h",
      }
    );
    res.send({ success: "User logged in successfully", token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
