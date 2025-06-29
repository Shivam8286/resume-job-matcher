const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
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
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  status: {
    type: String,
    enum: ['applied', 'reviewing', 'interviewing', 'offered', 'rejected', 'withdrawn'],
    default: 'applied'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  externalApplicationUrl: String,
  companyResponse: {
    received: {
      type: Boolean,
      default: false
    },
    date: Date,
    message: String
  },
  interviewDetails: [{
    round: Number,
    date: Date,
    type: {
      type: String,
      enum: ['phone', 'video', 'onsite', 'technical', 'behavioral'],
      default: 'phone'
    },
    interviewer: String,
    notes: String,
    outcome: {
      type: String,
      enum: ['scheduled', 'completed', 'passed', 'failed', 'cancelled'],
      default: 'scheduled'
    }
  }],
  salary: {
    offered: Number,
    currency: String,
    benefits: [String]
  }
}, {
  timestamps: true
});

// Indexes for faster queries
applicationSchema.index({ userId: 1, appliedAt: -1 });
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ userId: 1, status: 1 });

// Update the updatedAt field when status changes
applicationSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.updatedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Application', applicationSchema); 