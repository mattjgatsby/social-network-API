const mongoose = require("mongoose");
const { connect, connection } = require("mongoose");
mongoose.connect("mongodb://localhost:27017/socialDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
