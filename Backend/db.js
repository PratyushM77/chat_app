const mongoose = require("mongoose");

MONGO_URI = "mongodb://localhost:27017/chat";
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected To Mongodb");
});
module.exports = db;
