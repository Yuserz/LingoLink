let io;

function initialize(server) {
  io = require("socket.io")(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || `http://localhost:3000`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
      socket.join(data.roomId);
      console.log(
        `User: "${data.name}" | Joined the room: ${data.roomId} | ${data.message}`
      );
    });

    socket.on("send_message", (data) => {
      console.log(data);
      socket.to(data.roomId).emit("receive_message", data);
    });

    //emit my socket id
    socket.emit("me", socket.id);

    socket.on("callUser", (data) => {
      socket.to(data.roomId).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
        userToCall: data.userToCall,
      });
      console.log(data);
    });

    socket.on("answerCall", (data) => {
      io.to(data.roomId).emit("callAccepted", data.signal);
    });

    socket.on("disconnect", () => {
      socket.rooms.forEach((room) => {
        socket.to(room).emit("callEnded");
        socket.leave(room);
      });
    });
  });
}

module.exports = {
  initialize,
};
