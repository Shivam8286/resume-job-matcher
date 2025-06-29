const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['daily_jobs', 'weekly_jobs', 'application_updates', 'new_matches'],
    default: 'daily_jobs'
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'instant'],
    default: 'daily'
  },
  preferences: {
    keywords: [String],
    location: String,
    experienceLevel: {
      type: String,
      enum: ['junior', 'mid-level', 'senior', 'lead', 'manager', 'director'],
      default: 'mid-level'
    },
    salaryRange: {
      min: Number,
      max: Number,
      currency: String
    },
    jobTypes: [String], // full-time, part-time, contract, remote
    industries: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastSent: Date,
  nextScheduled: Date,
  sentCount: {
    type: Number,
    default: 0
  },
  unsubscribeToken: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Indexes for faster queries
notificationSchema.index({ userId: 1 });
notificationSchema.index({ email: 1 });
notificationSchema.index({ isActive: 1, nextScheduled: 1 });
notificationSchema.index({ unsubscribeToken: 1 });

// Generate unsubscribe token before saving
notificationSchema.pre('save', function(next) {
  if (!this.unsubscribeToken) {
    this.unsubscribeToken = require('crypto').randomBytes(32).toString('hex');
  }
  next();
});

module.exports = mongoose.model('Notification', notificationSchema); 