const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  password: { type: String, required: true },
  profileImage: { type: String },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
