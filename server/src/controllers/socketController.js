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

    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`Joined the room ${room} `);
    });

    socket.on("send_message", (data) => {
      console.log(data)
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
        userToCall: data.userToCall,
      });
      console.log(data)
      // socket.emit()
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
