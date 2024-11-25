const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  is_status: {
    type: Boolean,
    default: true,
  },
  timeTemps: {
    type: Date,
    default: Date.now, // Setting the default value to the current date
},
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
