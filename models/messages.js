const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  views: {
    type: Number,
  },
  message: {
    type: String,
  },
});
var message = mongoose.model("message", messageSchema);
module.exports = message;
