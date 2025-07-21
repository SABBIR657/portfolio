const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: String,
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  responded: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);