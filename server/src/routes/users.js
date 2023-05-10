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
const mongoose = require("mongoose");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if email is in valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email address");
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
    res.send({ success: "User logged in successfully", token, userCred });

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

    const userCred = user;
    res.send({ success: "User logged in successfully", token, userCred });
  } catch (error) {
    next(error);
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
    res.send({ name, _id, email });
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

    res.json(newContact);
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

// //SSE endpoint
// router.get("/contacts/sse/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const user = await User.findById(_id);
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//   res.set({
//     'Cache-Control': 'no-cache',
//     'Content-Type': 'text/event-stream',
//     'Connection': 'keep-alive'
//   });
//   // listen for new contact events and send the updated contact list to the client-side
//   user.on('newContact', function(contact) {
//     res.write('event: newContact\n');
//     res.write(`data: ${JSON.stringify(contact)}\n\n`);
//   });
// });

//get current user data based on ID
router.get("/getUserData", async (req, res) => {
  try {
    const { _id } = req.params;
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
