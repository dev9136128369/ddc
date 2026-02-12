const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

// Update lastLogin timestamp before saving
userSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.lastLogin = Date.now();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);