const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  representativeFirstName: { type: String, required: true },
  representativeLastName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, unique: true },
  phoneNumber: { type: String },
  mobileNumber: { type: String },
  clientType: { type: String, required: true },
  rtn: { type: String, required: true },
  location: { type: String, required: true }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
