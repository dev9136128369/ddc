// 28-10-25 - Fixed Version
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true 
  },
  content: {
    type: String 
  },
  bannerImage: {
    type: String,
    required: false
  },
  contentImageFilenames: { 
    type: [String], 
    default: []
  },
  published: {
    type: Boolean,
    default: false
  },
  category: { 
    type: String, 
    enum: ['BlogCard', 'ProductList', 'Reviews'], 
    default: 'BlogCard',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

//  FIX: Modern Async Pre-save Middleware (Bina 'next' ke)
blogSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

// Text index for search functionality
blogSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Blog', blogSchema);