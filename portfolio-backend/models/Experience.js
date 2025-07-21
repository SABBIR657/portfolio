const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  currentlyWorking: {
    type: Boolean,
    default: false
  },
  skills: [String]
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);