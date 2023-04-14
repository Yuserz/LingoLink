const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");
const config = require('./src/config/config');
const serverApp = require('./src/app');
const app = express();


const corsOrigin = "http://localhost:3000";

const corsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use middleware functions
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api', serverApp);

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});
