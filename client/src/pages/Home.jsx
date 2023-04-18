import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import Room from "../components/webrtc/Room";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3002");

export default function Home() {
  // send a message to the server
  socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

  // receive a message from the server
  socket.on("hello from server", (...args) => {
    // ...
  });

  return (
    <>
      <MainLayout>
        <Room />
      </MainLayout>
    </>
  );
}
