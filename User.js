const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  entries: {
    type: Number,
    default: 0
  },
  joined: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("users", userSchema);
