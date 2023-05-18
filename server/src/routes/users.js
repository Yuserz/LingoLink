// routes/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mongoose = require("mongoose");

router.get("/protected", (req, res) => {
  res.send("This is a protected endpoint");
});

//Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if email is in valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ error: "invalid email!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const objectId = new mongoose.Types.ObjectId();

    const user = new User({
      _id: objectId, // generate a unique ID
      name,
      email,
      password: hashedPassword,
    });
    //save user
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "12345",
      {
        expiresIn: "1h",
      }
    );

    const userCred = user;
    res.status(201).send({
      success: "User created and logged in successfully",
      token,
      userCred,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

//login endpoint
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Regex pattern to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    if (!emailRegex.test(email)) {
      return res.status(400).send({ error: "Invalid email format" });
    }

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

    // set token in an http-only cookie
    res.cookie("token", token, { httpOnly: true });
    const userCred = user;
    res.status(200).send({ success: "User logged in successfully", userCred });
  } catch (error) {
    next(error);
  }
});

// logout endpoint
router.post("/logout", (req, res) => {
  // Clear the token cookie
  try {
    res.clearCookie("token");
    res.send({ success: "User logged out successfully" });
  } catch (error) {
    res.send(error);
  }
});

//Find a user
router.post("/search", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "Email not found" });
    }

    const { name, _id } = user;
    res.status(200).send({ name, _id, email });
  } catch (error) {
    next(error);
    console.log("Not Found:");
  }
});

//create new contact
router.post("/contacts/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name, email, roomId } = req.body;

  try {
    const user = await User.findById(_id);
    // Prevent adding self as a contact
    if (user.email === email) {
      return res.status(400).json({ message: "Cannot add self as a contact" });
    }
    //user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if contact already exists
    const existingContact = user.contacts.find(
      (contact) => contact.email === email
    );
    if (existingContact) {
      return res.status(409).json({ message: "Contact already exists" });
    }

    const newContact = {
      name,
      email,
      roomId,
    };

    user.contacts.push(newContact);
    await user.save();

    res.status(201).json({message: "success!", newContact});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//get contact list from current user
router.get("/contacts/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { contacts, status } = user;
    res.json({ contacts, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//get roomId
router.post("/room", async (req, res) => {
  try {
    const { userId, email } = req.body;
    const user = await User.findOne({ _id: userId }, { contacts: 1 });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const contact = user.contacts.find((c) => c.email === email);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    const { roomId, name, _id } = contact;
    res.json({ roomId, name, _id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting contact data");
  }
});

module.exports = router;
