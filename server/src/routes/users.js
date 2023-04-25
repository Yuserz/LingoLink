// routes/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// middleware for verifying token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET || "12345", (err, user) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send("Token not provided");
  }
};

// Define your routes here
//Register endpoint
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

    const { _id } = user;
    res.send({ success: "User logged in successfully", token, _id });
  } catch (error) {
    next(error);
  }
});

//Find a user
router.post("/search", verifyToken, async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "Email not found" });
    }

    const { name, _id, contacts } = user;
    res.send({ name, _id, contacts });
  } catch (error) {
    next(error);
    console.log("Not Found:");
  }
});

//add contact
router.post("/addContact", verifyToken,  async (req, res) => {
  try {
    const { contact, _id } = req.body;
    const user = await User.findOneAndUpdate(_id,
      { $push: { contacts: contact } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding contact");
  }
});

//get current user data based on ID
router.get("/getUserData", verifyToken,  async (req, res) => {
  try {
    const { _id } = req.body; // assuming userId is passed in the request body
    const user = await User.findOne(_id, {
      _id: 1,
      name: 1,
      contacts: 1,
      email: 1,
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting user data");
  }
});

module.exports = router;
