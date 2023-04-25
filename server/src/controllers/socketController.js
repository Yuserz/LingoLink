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
      socket.join(data.room);
      console.log(`User with ID: ${socket.id} joined room: ${data.room}`);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("start_call", async (room) => {
      const peerConnection = new RTCPeerConnection();

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit("offer", { room, offer });
      } catch (error) {
        console.error(error);
      }

      socket.on("answer", async (data) => {
        const { answer } = data;
        await peerConnection.setRemoteDescription(answer);
      });

      peerConnection.ontrack = (event) => {
        const remoteVideo = document.getElementById("remote-video");
        remoteVideo.srcObject = event.streams[0];
      };
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
}

module.exports = {
  initialize,
};
