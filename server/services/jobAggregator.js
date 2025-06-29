const axios = require('axios');
const Job = require('../models/Job');

class JobAggregator {
  constructor() {
    this.apis = {
      adzuna: {
        baseUrl: 'https://api.adzuna.com/v1/api/jobs',
        appId: process.env.ADZUNA_APP_ID,
        apiKey: process.env.ADZUNA_API_KEY,
        country: 'gb'
      },
      reed: {
        baseUrl: 'https://www.reed.co.uk/api/1.0/search',
        apiKey: process.env.REED_API_KEY
      },
      ziprecruiter: {
        baseUrl: 'https://api.ziprecruiter.com/jobs/v1',
        apiKey: process.env.ZIPRECRUITER_API_KEY
      }
    };
  }

  // Fetch jobs from Adzuna
  async fetchFromAdzuna(keywords = '', location = '', page = 1) {
    try {
      const { baseUrl, appId, apiKey, country } = this.apis.adzuna;
      
      if (!appId || !apiKey) {
        console.log('Adzuna API credentials not configured');
        return { results: [], count: 0 };
      }

      const params = {
        app_id: appId,
        app_key: apiKey,
        results_per_page: 20,
        what: keywords,
        where: location,
        page: page
      };

      const response = await axios.get(`${baseUrl}/${country}/search/${page}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching from Adzuna:', error.message);
      return { results: [], count: 0 };
    }
  }

  // Fetch jobs from Reed
  async fetchFromReed(keywords = '', location = '', page = 1) {
    try {
      const { baseUrl, apiKey } = this.apis.reed;
      
      if (!apiKey) {
        console.log('Reed API key not configured');
        return { results: [], count: 0 };
      }

      const params = {
        keywords: keywords,
        locationName: location,
        distanceFromLocation: 10,
        resultsToTake: 20,
        resultsToSkip: (page - 1) * 20
      };

      const response = await axios.get(baseUrl, {
        params,
        headers: {
          'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`
        }
      });

      return {
        results: response.data.results || [],
        count: response.data.totalResults || 0
      };
    } catch (error) {
      console.error('Error fetching from Reed:', error.message);
      return { results: [], count: 0 };
    }
  }

  // Fetch jobs from ZipRecruiter
  async fetchFromZipRecruiter(keywords = '', location = '', page = 1) {
    try {
      const { baseUrl, apiKey } = this.apis.ziprecruiter;
      
      if (!apiKey) {
        console.log('ZipRecruiter API key not configured');
        return { results: [], count: 0 };
      }

      const params = {
        api_key: apiKey,
        search: keywords,
        location: location,
        radius_miles: 25,
        page: page,
        jobs_per_page: 20
      };

      const response = await axios.get(baseUrl, { params });
      return {
        results: response.data.jobs || [],
        count: response.data.total_jobs || 0
      };
    } catch (error) {
      console.error('Error fetching from ZipRecruiter:', error.message);
      return { results: [], count: 0 };
    }
  }

  // Normalize job data from different sources
  normalizeJobData(job, source) {
    switch (source) {
      case 'adzuna':
        return {
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
          source: 'adzuna'
        };

      case 'reed':
        return {
          externalId: `reed_${job.jobId}`,
          title: job.jobTitle,
          company: {
            displayName: job.employerName || '',
            name: job.employerName || ''
          },
          location: {
            displayName: job.locationName || '',
            area: [job.locationName],
            country: 'UK'
          },
          description: job.jobDescription || '',
          salary: {
            min: job.minimumSalary,
            max: job.maximumSalary,
            currency: 'GBP',
            period: 'yearly'
          },
          category: {
            label: job.categoryName || '',
            tag: job.categoryName || ''
          },
          contractType: job.employmentType || '',
          redirectUrl: job.jobUrl || '',
          postedDate: job.datePosted ? new Date(job.datePosted) : new Date(),
          source: 'reed'
        };

      case 'ziprecruiter':
        return {
          externalId: `zip_${job.id}`,
          title: job.name,
          company: {
            displayName: job.hiring_company?.name || '',
            name: job.hiring_company?.name || ''
          },
          location: {
            displayName: job.location || '',
            area: [job.location],
            country: 'US'
          },
          description: job.snippet || '',
          salary: {
            min: job.salary_min_annual,
            max: job.salary_max_annual,
            currency: 'USD',
            period: 'yearly'
          },
          category: {
            label: job.category || '',
            tag: job.category || ''
          },
          contractType: job.employment_type || '',
          redirectUrl: job.url || '',
          postedDate: job.posted_time ? new Date(job.posted_time) : new Date(),
          source: 'ziprecruiter'
        };

      default:
        return job;
    }
  }

  // Fetch jobs from all sources
  async fetchAllJobs(keywords = '', location = '', page = 1) {
    const promises = [
      this.fetchFromAdzuna(keywords, location, page),
      this.fetchFromReed(keywords, location, page),
      this.fetchFromZipRecruiter(keywords, location, page)
    ];

    try {
      const results = await Promise.allSettled(promises);
      let allJobs = [];
      let totalCount = 0;

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.results) {
          const source = Object.keys(this.apis)[index];
          const normalizedJobs = result.value.results.map(job => 
            this.normalizeJobData(job, source)
          );
          allJobs = allJobs.concat(normalizedJobs);
          totalCount += result.value.count || 0;
        }
      });

      return {
        results: allJobs,
        count: totalCount
      };
    } catch (error) {
      console.error('Error fetching from all sources:', error);
      return { results: [], count: 0 };
    }
  }

  // Store jobs in database
  async storeJobs(jobs) {
    try {
      const bulkOps = jobs.map(job => ({
        updateOne: {
          filter: { externalId: job.externalId },
          update: { $set: job },
          upsert: true
        }
      }));

      if (bulkOps.length > 0) {
        await Job.bulkWrite(bulkOps);
        console.log(`Stored ${bulkOps.length} jobs in database`);
      }
    } catch (error) {
      console.error('Error storing jobs:', error);
    }
  }
}

module.exports = new JobAggregator(); 