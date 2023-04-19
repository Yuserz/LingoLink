let io;

function initialize(server) {
  io = require('socket.io')(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      // methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join_room', (data) => {
      socket.join(data);
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
    });
  });
}

module.exports = {
  initialize
};
