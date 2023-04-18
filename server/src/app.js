const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const axios = require('axios');
const db = require('./db')


// Import the users router
const usersRouter = require('./routes/users');

//Calling mongoDB function
console.log('Connecting to MongoDB...');
db.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    //some logic
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });



// Use the users router as middleware for a specific route
app.use('/users', usersRouter);


// //websocket
// app.get('/data', async (req, res) => {
//     try {
//       const response = await axios.get('https://api.example.com/data');
//       const data = response.data;
//       io.emit('data', data);
//       res.json(data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error fetching data from API');
//     }
//   });
  

io.on('connection', (socket) => {
    console.log('New client connected');
  });
  


  module.exports = app;