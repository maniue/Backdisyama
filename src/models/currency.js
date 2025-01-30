const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
    min: 0,
  }
});

module.exports = mongoose.model('Currency', CurrencySchema);
