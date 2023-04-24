const { v4: uuidv4 } = require('uuid');

const createRoom = async (socket) => {
  try {
    // Generate a unique room ID using UUID v4
    const roomId = uuidv4();
    // Join the socket to the generated room
    await socket.join(roomId);
    // Send the room ID back to the client
    socket.emit('room-created', roomId);
  } catch (error) {
    console.log(error);
  }
};

const joinRoom = async (socket, roomId) => {
  try {
    // Check if the room exists
    const room = socket.adapter.rooms.get(roomId);
    if (!room) {
      // If the room does not exist, emit an error message
      socket.emit('room-error', 'Room not found');
      return;
    }
    // Join the socket to the specified room
    await socket.join(roomId);
    // Emit a message to all clients in the room that a new user has joined
    socket.to(roomId).emit('user-joined', socket.id);
    // Send the list of connected clients in the room to the joining client
    const clients = [...room.keys()];
    socket.emit('clients-list', clients);
  } catch (error) {
    console.log(error);
  }
};

const leaveRoom = async (socket, roomId) => {
  try {
    // Remove the socket from the specified room
    await socket.leave(roomId);
    // Emit a message to all clients in the room that a user has left
    socket.to(roomId).emit('user-left', socket.id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
};
