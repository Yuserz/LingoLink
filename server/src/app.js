const express = require("express");
const app = express();
const db = require("./db");

// Import the users router
const usersRouter = require("./routes/users");

//Calling mongoDB function
console.log("Connecting to MongoDB...");
db.connect()
  .then(() => {
    console.log("Connected to MongoDB");
    //some logic
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Use the users router as middleware for a specific route
app.use("/users", usersRouter);

module.exports = app;
