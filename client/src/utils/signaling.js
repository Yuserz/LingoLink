// client/src/utils/signaling.js

import io from "socket.io-client";

const socket = io.connect();

function joinRoom(roomId) {
  socket.emit("join-room", roomId);
}

function listenForOffer(callback) {
  socket.on("offer", (data) => {
    callback(data.offer);
  });
}

function sendOffer(roomId, offer) {
  socket.emit("offer", { roomId, offer });
}

function listenForAnswer(callback) {
  socket.on("answer", (data) => {
    callback(data.answer);
  });
}

function sendAnswer(roomId, answer) {
  socket.emit("answer", { roomId, answer });
}

function listenForICECandidate(callback) {
  socket.on("ice-candidate", (data) => {
    callback(data.candidate);
  });
}

function sendICECandidate(roomId, candidate) {
  socket.emit("ice-candidate", { roomId, candidate });
}

export {
  joinRoom,
  listenForOffer,
  sendOffer,
  listenForAnswer,
  sendAnswer,
  listenForICECandidate,
  sendICECandidate,
};
