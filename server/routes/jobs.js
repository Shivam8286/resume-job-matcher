const express = require('express');
const axios = require('axios');
const Job = require('../models/Job');
const SavedJob = require('../models/SavedJob');
const Application = require('../models/Application');
const jobAggregator = require('../services/jobAggregator');
const router = express.Router();

// Adzuna API configuration
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;
const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs';

// Calculate job match score
const calculateMatchScore = (job, resumeKeywords) => {
  let score = 0;
  const jobText = `${job.title} ${job.description}`.toLowerCase();
  
  // Check for keyword matches
  resumeKeywords.forEach(keyword => {
    if (jobText.includes(keyword.toLowerCase())) {
      score += 10;
    }
  });

  // Bonus for exact title matches
  if (resumeKeywords.some(keyword => 
    job.title.toLowerCase().includes(keyword.toLowerCase())
  )) {
    score += 20;
  }

  // Bonus for location match (if provided)
  if (job.location && job.location.displayName) {
    // You can add location matching logic here
  }

  return Math.min(score, 100); // Cap at 100
};

// Fetch jobs from Adzuna API and store in database
const fetchAndStoreJobsFromAdzuna = async (keywords = '', location = '', page = 1) => {
  try {
    const params = {
      app_id: ADZUNA_APP_ID,
      app_key: ADZUNA_API_KEY,
      results_per_page: 20,
      what: keywords,
      where: location,
      page: page
    };

    const response = await axios.get(`${ADZUNA_BASE_URL}/gb/search/${page}`, { params });
    const jobsData = response.data;

    if (jobsData.results) {
      // Store jobs in database
      const jobsToSave = jobsData.results.map(job => ({
        externalId: job.id.toString(),
        title: job.title,
        company: {
          displayName: job.company?.display_name || '',
          name: job.company?.display_name || ''
        },
        location: {
          displayName: job.location?.display_name || '',
          area: job.location?.area || [],
          country: job.location?.area?.[0] || ''
        },
        description: job.description || '',
        salary: {
          min: job.salary_min,
          max: job.salary_max,
          currency: job.salary_currency || 'GBP',
          period: job.salary_is_per_year ? 'yearly' : 'monthly'
        },
        category: {
          label: job.category?.label || '',
          tag: job.category?.tag || ''
        },
        contractType: job.contract_type || '',
        redirectUrl: job.redirect_url || '',
        postedDate: job.created ? new Date(job.created) : new Date(),
        source: 'adzuna',
        keywords: keywords ? keywords.split(' ') : []
      }));

      // Use bulkWrite to efficiently save jobs
      const bulkOps = jobsToSave.map(job => ({
        updateOne: {
          filter: { externalId: job.externalId },
          update: { $set: job },
          upsert: true
        }
      }));

      if (bulkOps.length > 0) {
        await Job.bulkWrite(bulkOps);
      }
    }

    return jobsData;
  } catch (error) {
    console.error('Error fetching jobs from Adzuna:', error.message);
    return { results: [], count: 0 };
  }
};

// Get jobs with optional filtering
router.get('/search', async (req, res) => {
  try {
    const { keywords, location, page = 1, limit = 20, source } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    if (keywords) {
      query.$text = { $search: keywords };
    }
    
    if (location) {
      query['location.displayName'] = { $regex: location, $options: 'i' };
    }

    if (source) {
      query.source = source;
    }

    // Get jobs from database
    const jobs = await Job.find(query)
      .sort({ postedDate: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Job.countDocuments(query);

    // If no jobs in database, fetch from APIs
    if (jobs.length === 0 && keywords) {
      console.log('No jobs in database, fetching from APIs...');
      
      // Fetch from all sources
      const apiResults = await jobAggregator.fetchAllJobs(keywords, location, page);
      
      if (apiResults.results.length > 0) {
        // Store jobs in database
        await jobAggregator.storeJobs(apiResults.results);
        
        // Fetch again after storing
        const freshJobs = await Job.find(query)
          .sort({ postedDate: -1 })
          .limit(parseInt(limit))
          .skip((parseInt(page) - 1) * parseInt(limit));
        
        return res.json({
          success: true,
          data: {
            jobs: freshJobs,
            count: apiResults.count,
            page: parseInt(page),
            sources: ['adzuna', 'reed', 'ziprecruiter']
          }
        });
      }
    }
    
    res.json({
      success: true,
      data: {
        jobs: jobs,
        count: total,
        page: parseInt(page),
        sources: source ? [source] : ['database']
      }
    });

  } catch (error) {
    console.error('Error searching jobs:', error);
    res.status(500).json({ 
      error: 'Error searching jobs',
      message: error.message 
    });
  }
});

// Match jobs with resume
router.post('/match', async (req, res) => {
  try {
    const { resumeKeywords, location, experienceLevel, maxResults = 10, userId } = req.body;

    if (!resumeKeywords || !Array.isArray(resumeKeywords)) {
      return res.status(400).json({ error: 'Resume keywords are required' });
    }

    // Build query for matching jobs
    const query = { isActive: true };
    
    if (location) {
      query['location.displayName'] = { $regex: location, $options: 'i' };
    }

    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }

    // Get jobs from database
    let jobs = await Job.find(query)
      .sort({ postedDate: -1 })
      .limit(100); // Get more jobs to calculate scores

    // If not enough jobs, fetch from APIs
    if (jobs.length < 10 && resumeKeywords.length > 0) {
      console.log('Not enough jobs in database, fetching from APIs...');
      const keywords = resumeKeywords.slice(0, 3).join(' ');
      const apiResults = await jobAggregator.fetchAllJobs(keywords, location, 1);
      
      if (apiResults.results.length > 0) {
        await jobAggregator.storeJobs(apiResults.results);
        
        // Fetch again after storing
        jobs = await Job.find(query)
          .sort({ postedDate: -1 })
          .limit(100);
      }
    }

    // Calculate match scores and sort
    const scoredJobs = jobs.map(job => ({
      ...job.toObject(),
      matchScore: calculateMatchScore(job, resumeKeywords)
    }));

    // Sort by match score (highest first) and limit results
    const topJobs = scoredJobs
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, maxResults);

    // Check if user has saved/applied to these jobs
    if (userId) {
      const savedJobs = await SavedJob.find({ userId });
      const applications = await Application.find({ userId });
      
      const savedJobIds = savedJobs.map(sj => sj.jobId.toString());
      const appliedJobIds = applications.map(app => app.jobId.toString());

      topJobs.forEach(job => {
        job.saved = savedJobIds.includes(job._id.toString());
        job.applied = appliedJobIds.includes(job._id.toString());
      });
    }

    res.json({
      success: true,
      data: {
        jobs: topJobs,
        totalFound: jobs.length,
        topMatches: topJobs.length,
        sources: ['database', 'apis']
      }
    });

  } catch (error) {
    console.error('Error matching jobs:', error);
    res.status(500).json({ 
      error: 'Error matching jobs',
      message: error.message 
    });
  }
});

// Get job details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const job = await Job.findById(id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({
      success: true,
      data: job
    });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching job details' });
  }
});

// Save job for user
router.post('/:id/save', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, notes, priority, tags } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Check if job exists
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already saved
    const existingSave = await SavedJob.findOne({ userId, jobId: id });
    if (existingSave) {
      return res.status(400).json({ error: 'Job already saved' });
    }

    // Save job
    const savedJob = new SavedJob({
      userId,
      jobId: id,
      notes,
      priority,
      tags
    });

    await savedJob.save();

    res.json({
      success: true,
      message: 'Job saved successfully',
      data: savedJob
    });

  } catch (error) {
    res.status(500).json({ error: 'Error saving job' });
  }
});

// Apply to job
router.post('/:id/apply', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, resumeId, coverLetter, notes } = req.body;

    if (!userId || !resumeId) {
      return res.status(400).json({ error: 'User ID and Resume ID are required' });
    }

    // Check if job exists
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({ userId, jobId: id });
    if (existingApplication) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    // Create application
    const application = new Application({
      userId,
      jobId: id,
      resumeId,
      coverLetter,
      notes
    });

    await application.save();

    // Update saved job if exists
    await SavedJob.findOneAndUpdate(
      { userId, jobId: id },
      { isApplied: true, applicationId: application._id }
    );

    res.json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });

  } catch (error) {
    res.status(500).json({ error: 'Error submitting application' });
  }
});

// Get available job sources
router.get('/sources/list', (req, res) => {
  res.json({
    success: true,
    data: {
      sources: [
        {
          name: 'adzuna',
          description: 'UK job market (Indeed, Reed, TotalJobs)',
          free: true,
          limits: '1,000 requests/month'
        },
        {
          name: 'reed',
          description: 'Reed.co.uk job listings',
          free: false,
          limits: 'API key required'
        },
        {
          name: 'ziprecruiter',
          description: 'US job market',
          free: false,
          limits: 'API key required'
        }
      ],
      note: 'LinkedIn jobs are not available via public API due to platform restrictions'
    }
  });
});

module.exports = router; 