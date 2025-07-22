const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: true
  },
  profilePicture: {
    public_id: String,
    url: String
  },
  resume: {
    public_id: String,
    url: String
  },
  contact: {
    email: String,
    phone: String,
    address: String,
    website: String,
    socialMedia: {
      linkedin: String,
      github: String,
      twitter: String,
      instagram: String
    }
  },
  skills: [{
    name: String,
    percentage: Number,
    category: String
  }],
  stats: {
    projects: Number,
    experience: Number,
    clients: Number,
    awards: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);