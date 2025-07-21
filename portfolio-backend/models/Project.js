const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [String],
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'other'],
    default: 'web'
  },
  images: [{
    public_id: String,
    url: String
  }],
  githubUrl: String,
  liveUrl: String,
  featured: {
    type: Boolean,
    default: false
  },
  completionDate: Date,
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);