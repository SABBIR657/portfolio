const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: String,
  coverImage: {
    public_id: String,
    url: String
  },
  tags: [String],
  published: {
    type: Boolean,
    default: false
  },
  publishedDate: Date,
  readingTime: Number,
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);