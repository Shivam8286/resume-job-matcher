const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  extractedText: {
    type: String,
    required: true
  },
  keywords: [{
    type: String,
    trim: true
  }],
  experienceLevel: {
    type: String,
    enum: ['junior', 'mid-level', 'senior', 'lead', 'manager', 'director'],
    default: 'mid-level'
  },
  education: {
    type: Boolean,
    default: false
  },
  textLength: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
resumeSchema.index({ userId: 1, uploadDate: -1 });
resumeSchema.index({ keywords: 1 });

module.exports = mongoose.model('Resume', resumeSchema); 