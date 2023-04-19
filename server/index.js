const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");
const config = require('./src/config/config');
const serverApp = require('./src/app');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Use middleware functions
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', serverApp);

// Import socket controller
const socketController = require('./src/controllers/socketController');

// Setup socket io connection
socketController.initialize(server);


server.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});
