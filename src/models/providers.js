const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true },
  contact: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Provider", providerSchema);
