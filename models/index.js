const mongoose = require("mongoose");
const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: " Name cannot be empty",
  },
  html: {
    type: String,
    required: " html cannot be empty",
  },
  css: {
    type: String,
    required: " CSS cannot be empty",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  loaderid: {
    type: Number,
    required: " loaderid cannot be empty",
  },
  likes: {
    type: Number,
    default: 0,
  },
});
var Db = mongoose.model("Db", siteSchema);

module.exports = Db;
