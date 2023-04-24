require('dotenv').config()

module.exports = {
    server: {
      port: process.env.PORT,
    },
    db: {
      uri: process.env.MONGODB_URL,
    },
  };
  