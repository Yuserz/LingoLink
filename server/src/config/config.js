require('dotenv').config()

module.exports = {
    server: {
      // Coerce and fall back to 3001: an ambient PORT=0/unset value would
      // otherwise make server.listen(0) bind a random port silently.
      port: Number(process.env.PORT) || 3001,
    },
    db: {
      uri: process.env.MONGODB_URL,
    },
  };
  