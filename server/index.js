const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");
const config = require("./src/config/config");
const serverApp = require("./src/app");
const app = express();
const http = require("http");
const server = http.createServer(app);
//socket controller
const io = require("./src/controllers/socketController");

// Use middleware functions
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", serverApp);
app.use(cookieParser());

// Setup socket io connection
io.initialize(server);

server.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});
