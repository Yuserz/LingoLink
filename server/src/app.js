const express = require("express");
const app = express();
const db = require("./db");

const Server = require("socket.io").Server;


const io = new Server(3002);
//create a socket io connection
io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });
});

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

io.on("connection", (socket) => {
  console.log("New client connected");
});

module.exports = app;
