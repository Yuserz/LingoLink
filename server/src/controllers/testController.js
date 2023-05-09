let io;

function initialize(server) {
  try {
    const io = require("socket.io")(server, {
      cors: {
        origin: process.env.CORS_ORIGIN || `http://localhost:3000`,
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      socket.emit("me", socket.id);

      socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(
          `User with socket ID: ${socket.id} joined the room ${roomId}`
        );
      });

      socket.on("message", (roomId, message) => {
        console.log(
          `Received message from client: ${roomId}, message: ${message}`
        );
        socket.to(roomId).emit("messageReceived", message);
      });

      socket.on("disconnect", () => {
        // socket.to(roomId).emit("user diconnected");s
        console.log(`${socket.id} Disconnected`);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  initialize,
};
