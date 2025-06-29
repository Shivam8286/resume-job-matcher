const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    phone: String,
    location: String,
    linkedinUrl: String,
    githubUrl: String,
    portfolioUrl: String,
    bio: String,
    avatar: String
  },
  preferences: {
    jobTypes: [String], // full-time, part-time, contract, remote
    industries: [String],
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
    preferredLocations: [String],
    keywords: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Virtual for getting user stats
userSchema.virtual('stats').get(function() {
  // This will be populated when needed
  return {
    resumeCount: 0,
    savedJobsCount: 0,
    applicationsCount: 0
  };
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ 'preferences.keywords': 1 });

module.exports = mongoose.model('User', userSchema); 