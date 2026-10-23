import io from "socket.io-client";

// One shared connection for chat and video-call signalling. Created on first
// use so importing this module never opens a socket (keeps tests hermetic).
let socket;

export function getSocket() {
  if (!socket) {
    socket = io("http://localhost:3001");
  }
  return socket;
}
