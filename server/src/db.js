const mongoose = require('mongoose');
const config = require('./config/config');

function connect() {
  // mongoose 8 connects with sane defaults; useNewUrlParser/useUnifiedTopology
  // were removed there and make connect() throw.
  return mongoose.connect(config.db.uri);
}

module.exports = { connect };
