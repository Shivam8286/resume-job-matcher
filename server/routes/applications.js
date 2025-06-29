const express = require('express');
const Application = require('../models/Application');
const SavedJob = require('../models/SavedJob');
const Job = require('../models/Job');
const Resume = require('../models/Resume');
const router = express.Router();

// Get user's applications
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    const query = { userId };
    if (status) {
      query.status = status;
    }

    const applications = await Application.find(query)
      .populate('jobId', 'title company location salary postedDate')
      .populate('resumeId', 'originalName uploadDate')
      .sort({ appliedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Application.countDocuments(query);

    res.json({
      success: true,
      data: {
        applications,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching applications' });
  }
});

// Get specific application
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id)
      .populate('jobId')
      .populate('resumeId')
      .populate('userId', 'name email');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({
      success: true,
      data: application
    });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching application' });
  }
});

// Update application status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = status;
    if (notes) {
      application.notes = notes;
    }

    await application.save();

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });

  } catch (error) {
    res.status(500).json({ error: 'Error updating application status' });
  }
});

// Add interview details
router.post('/:id/interview', async (req, res) => {
  try {
    const { id } = req.params;
    const { round, date, type, interviewer, notes } = req.body;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.interviewDetails.push({
      round,
      date: new Date(date),
      type,
      interviewer,
      notes
    });

    await application.save();

    res.json({
      success: true,
      message: 'Interview details added successfully',
      data: application
    });

  } catch (error) {
    res.status(500).json({ error: 'Error adding interview details' });
  }
});

// Update interview outcome
router.put('/:id/interview/:interviewId', async (req, res) => {
  try {
    const { id, interviewId } = req.params;
    const { outcome, notes } = req.body;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const interview = application.interviewDetails.id(interviewId);
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    interview.outcome = outcome;
    if (notes) {
      interview.notes = notes;
    }

    await application.save();

    res.json({
      success: true,
      message: 'Interview outcome updated successfully',
      data: application
    });

  } catch (error) {
    res.status(500).json({ error: 'Error updating interview outcome' });
  }
});

// Get user's saved jobs
router.get('/saved/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { priority, page = 1, limit = 10 } = req.query;

    const query = { userId };
    if (priority) {
      query.priority = priority;
    }

    const savedJobs = await SavedJob.find(query)
      .populate('jobId', 'title company location salary postedDate')
      .sort({ savedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await SavedJob.countDocuments(query);

    res.json({
      success: true,
      data: {
        savedJobs,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching saved jobs' });
  }
});

// Update saved job
router.put('/saved/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { notes, priority, tags } = req.body;

    const savedJob = await SavedJob.findById(id);
    if (!savedJob) {
      return res.status(404).json({ error: 'Saved job not found' });
    }

    if (notes !== undefined) savedJob.notes = notes;
    if (priority !== undefined) savedJob.priority = priority;
    if (tags !== undefined) savedJob.tags = tags;

    await savedJob.save();

    res.json({
      success: true,
      message: 'Saved job updated successfully',
      data: savedJob
    });

  } catch (error) {
    res.status(500).json({ error: 'Error updating saved job' });
  }
});

// Remove saved job
router.delete('/saved/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const savedJob = await SavedJob.findById(id);

    if (!savedJob) {
      return res.status(404).json({ error: 'Saved job not found' });
    }

    await SavedJob.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Saved job removed successfully'
    });

  } catch (error) {
    res.status(500).json({ error: 'Error removing saved job' });
  }
});

// Get application statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const stats = await Application.aggregate([
      { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalApplications = await Application.countDocuments({ userId });
    const totalSavedJobs = await SavedJob.countDocuments({ userId });

    const statusCounts = {};
    stats.forEach(stat => {
      statusCounts[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: {
        totalApplications,
        totalSavedJobs,
        statusBreakdown: statusCounts
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching statistics' });
  }
});

module.exports = router; 