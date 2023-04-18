const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");
const config = require('./src/config/config');
const serverApp = require('./src/app');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });


// Use middleware functions
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', serverApp);

// Import socket controller
const socketController = require('./src/controllers/socketController');

// Setup socket io connection
socketController.initialize(server);

// //Setup socket io connecion
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });
// });


server.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});
