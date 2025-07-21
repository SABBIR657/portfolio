const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  fieldOfStudy: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  currentlyStudying: {
    type: Boolean,
    default: false
  },
  description: String,
  achievements: [String]
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);