const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  externalId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    displayName: String,
    name: String
  },
  location: {
    displayName: String,
    area: [String],
    country: String
  },
  description: {
    type: String,
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: String,
    period: String
  },
  category: {
    label: String,
    tag: String
  },
  contractType: String,
  redirectUrl: String,
  postedDate: Date,
  closingDate: Date,
  source: {
    type: String,
    enum: ['adzuna', 'indeed', 'linkedin', 'manual'],
    default: 'adzuna'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  keywords: [String],
  experienceLevel: {
    type: String,
    enum: ['junior', 'mid-level', 'senior', 'lead', 'manager', 'director'],
    default: 'mid-level'
  }
}, {
  timestamps: true
});

// Indexes for faster queries
jobSchema.index({ externalId: 1 });
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ keywords: 1 });
jobSchema.index({ 'location.displayName': 1 });
jobSchema.index({ postedDate: -1 });
jobSchema.index({ isActive: 1 });

module.exports = mongoose.model('Job', jobSchema); 