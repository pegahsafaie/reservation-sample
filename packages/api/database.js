const mongoose = require("mongoose");

class Connection {
  constructor() {
    mongoose.connect(process.env.MONGODB_URI);
  }
}

module.exports = new Connection();