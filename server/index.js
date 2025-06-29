const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const connectDB = require('./config/database');
const jobScheduler = require('./services/jobScheduler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/resume', require('./routes/resume'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/applications', require('./routes/applications'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected',
    services: {
      resume: 'Active',
      jobs: 'Active',
      auth: 'Active',
      notifications: 'Active',
      applications: 'Active'
    },
    jobScheduler: jobScheduler.getStatus()
  });
});

// Job scheduler status
app.get('/api/jobs/scheduler/status', (req, res) => {
  res.json({
    success: true,
    data: jobScheduler.getStatus()
  });
});

// Manual job fetch (for testing)
app.post('/api/jobs/scheduler/fetch', async (req, res) => {
  try {
    const { keywords, location } = req.body;
    const totalJobs = await jobScheduler.manualFetch(keywords, location);
    
    res.json({
      success: true,
      message: `Manual fetch completed. Total jobs: ${totalJobs}`,
      data: { totalJobs }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error in manual fetch' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  
  // Start job scheduler
  jobScheduler.start();
});

module.exports = app; 