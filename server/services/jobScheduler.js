const cron = require('node-cron');
const jobAggregator = require('./jobAggregator');
const Job = require('../models/Job');

class JobScheduler {
  constructor() {
    this.isRunning = false;
    this.lastRun = null;
  }

  // Start the job scheduler
  start() {
    console.log('🚀 Starting job scheduler...');

    // Fetch new jobs every 6 hours
    cron.schedule('0 */6 * * *', async () => {
      await this.fetchNewJobs();
    }, {
      scheduled: true,
      timezone: "Europe/London"
    });

    // Clean up old jobs daily at 2 AM
    cron.schedule('0 2 * * *', async () => {
      await this.cleanupOldJobs();
    }, {
      scheduled: true,
      timezone: "Europe/London"
    });

    // Initial fetch on startup
    setTimeout(async () => {
      await this.fetchNewJobs();
    }, 5000); // Wait 5 seconds after startup
  }

  // Fetch new jobs from all sources
  async fetchNewJobs() {
    if (this.isRunning) {
      console.log('Job fetch already running, skipping...');
      return;
    }

    this.isRunning = true;
    console.log('📡 Fetching new jobs from all sources...');

    try {
      const popularKeywords = [
        'javascript', 'python', 'react', 'node.js', 'java', 'c#', 'php',
        'software engineer', 'developer', 'frontend', 'backend', 'full stack',
        'data scientist', 'machine learning', 'devops', 'cloud', 'aws'
      ];

      let totalNewJobs = 0;

      for (const keyword of popularKeywords.slice(0, 5)) { // Limit to top 5 keywords
        try {
          console.log(`Fetching jobs for keyword: ${keyword}`);
          
          const results = await jobAggregator.fetchAllJobs(keyword, '', 1);
          
          if (results.results.length > 0) {
            // Store jobs in database
            await jobAggregator.storeJobs(results.results);
            totalNewJobs += results.results.length;
            
            console.log(`Stored ${results.results.length} jobs for keyword: ${keyword}`);
          }

          // Add delay between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
          console.error(`Error fetching jobs for keyword ${keyword}:`, error.message);
        }
      }

      this.lastRun = new Date();
      console.log(`✅ Job fetch completed. Total new jobs: ${totalNewJobs}`);

    } catch (error) {
      console.error('Error in job fetch scheduler:', error);
    } finally {
      this.isRunning = false;
    }
  }

  // Clean up old jobs (older than 30 days)
  async cleanupOldJobs() {
    try {
      console.log('🧹 Cleaning up old jobs...');
      
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const result = await Job.updateMany(
        { 
          postedDate: { $lt: thirtyDaysAgo },
          isActive: true 
        },
        { 
          isActive: false 
        }
      );

      console.log(`✅ Cleaned up ${result.modifiedCount} old jobs`);

    } catch (error) {
      console.error('Error cleaning up old jobs:', error);
    }
  }

  // Manual job fetch (for testing)
  async manualFetch(keywords = [], location = '') {
    console.log('🔄 Manual job fetch triggered...');
    
    if (keywords.length === 0) {
      keywords = ['javascript', 'python', 'react'];
    }

    let totalJobs = 0;

    for (const keyword of keywords) {
      try {
        const results = await jobAggregator.fetchAllJobs(keyword, location, 1);
        
        if (results.results.length > 0) {
          await jobAggregator.storeJobs(results.results);
          totalJobs += results.results.length;
          console.log(`Stored ${results.results.length} jobs for: ${keyword}`);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`Error in manual fetch for ${keyword}:`, error);
      }
    }

    console.log(`✅ Manual fetch completed. Total jobs: ${totalJobs}`);
    return totalJobs;
  }

  // Get scheduler status
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastRun: this.lastRun,
      nextRun: this.getNextRunTime()
    };
  }

  // Calculate next run time
  getNextRunTime() {
    if (!this.lastRun) return null;
    
    const nextRun = new Date(this.lastRun);
    nextRun.setHours(nextRun.getHours() + 6);
    return nextRun;
  }
}

module.exports = new JobScheduler(); 