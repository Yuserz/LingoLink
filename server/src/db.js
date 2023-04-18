const mongoose = require('mongoose');
const config = require('./config/config');

function connect() {
  return mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = { connect };
