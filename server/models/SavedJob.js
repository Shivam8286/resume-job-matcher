const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [String],
  matchScore: {
    type: Number,
    min: 0,
    max: 100
  },
  isApplied: {
    type: Boolean,
    default: false
  },
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }
}, {
  timestamps: true
});

// Indexes for faster queries
savedJobSchema.index({ userId: 1, savedAt: -1 });
savedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });
savedJobSchema.index({ userId: 1, priority: 1 });

module.exports = mongoose.model('SavedJob', savedJobSchema); 