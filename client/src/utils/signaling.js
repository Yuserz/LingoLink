import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export function onMe(callback) {
  socket.on("me", (id) => {
    callback(id);
  });
}

export function callUser(id, signalData, from, name) {
  socket.emit("callUser", {
    userToCall: id,
    signalData: signalData,
    from: from,
    name: name,
  });
}

export function onCallUser(callback) {
  socket.on("callUser", (data) => {
    callback(data);
  });
}

export function answerCall(signal, to) {
  socket.emit("answerCall", { signal: signal, to: to });
}

export function onCallAccepted(callback) {
  socket.on("callAccepted", (signal) => {
    callback(signal);
  });
}
