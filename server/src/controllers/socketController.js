let io;

function initialize(server) {
  io = require("socket.io")(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || `http://localhost:3000`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with socket ID: ${socket.id} joined the room `);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("callUser", (data) => {
      socket.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
        roomId: data.roomId
      });
    });
    

    socket.on("answerCall", (data) => {
      socket.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });
  });
}

module.exports = {
  initialize,
};
