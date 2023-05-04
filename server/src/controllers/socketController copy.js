let io;

function initialize(server) {
  io = require("socket.io")(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || `http://localhost:3000`,
      // methods: ['GET', 'POST']
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("start_call", (data) => {
      socket.to(data.room).emit("call_started", data);
    });

    socket.on("answer_call", (data) => {
      socket.to(data.room).emit("call_answered", data);
    });

    socket.on("reject_call", (data) => {
      socket.to(data.room).emit("call_rejected", data);
    });

    socket.on("end_call", (data) => {
      socket.to(data.room).emit("call_ended", data);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit(socket.id +"left the room")
      console.log("User Disconnected", socket.id);
    });
  });
}

module.exports = {
  initialize,
};
