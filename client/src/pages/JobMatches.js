import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Work as WorkIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Star as StarIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const JobMatches = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    experienceLevel: '',
    sortBy: 'matchScore'
  });

  // Sample job data for demonstration
  const sampleJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: { display_name: 'TechCorp Inc.' },
      location: { display_name: 'San Francisco, CA' },
      description: 'We are looking for a senior React developer with 5+ years of experience...',
      matchScore: 95,
      salary_min: 120000,
      salary_max: 150000,
      redirect_url: 'https://example.com/job1',
      created: '2024-01-15'
    },
    {
      id: 2,
      title: 'Full Stack JavaScript Engineer',
      company: { display_name: 'StartupXYZ' },
      location: { display_name: 'New York, NY' },
      description: 'Join our fast-growing startup as a full-stack developer...',
      matchScore: 88,
      salary_min: 100000,
      salary_max: 130000,
      redirect_url: 'https://example.com/job2',
      created: '2024-01-14'
    },
    {
      id: 3,
      title: 'Node.js Backend Developer',
      company: { display_name: 'Enterprise Solutions' },
      location: { display_name: 'Austin, TX' },
      description: 'Build scalable backend services using Node.js and MongoDB...',
      matchScore: 82,
      salary_min: 90000,
      salary_max: 120000,
      redirect_url: 'https://example.com/job3',
      created: '2024-01-13'
    }
  ];

  useEffect(() => {
    // In a real app, you'd fetch jobs based on user's resume keywords
    setJobs(sampleJobs);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveJob = (jobId) => {
    // In a real app, you'd make an API call to save the job
    toast.success('Job saved to your favorites!');
  };

  const handleApplyJob = (job) => {
    // In a real app, you'd redirect to the job application
    window.open(job.redirect_url, '_blank');
    toast.success('Redirecting to job application...');
  };

  const filteredJobs = jobs.filter(job => {
    if (filters.location && !job.location.display_name.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.experienceLevel && job.title.toLowerCase().includes('senior') && filters.experienceLevel !== 'senior') {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'matchScore') {
      return b.matchScore - a.matchScore;
    }
    if (filters.sortBy === 'salary') {
      return (b.salary_max || 0) - (a.salary_max || 0);
    }
    if (filters.sortBy === 'date') {
      return new Date(b.created) - new Date(a.created);
    }
    return 0;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
          Your Job Matches
        </Typography>

        {/* Filters */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="e.g., San Francisco"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Experience Level</InputLabel>
                  <Select
                    value={filters.experienceLevel}
                    label="Experience Level"
                    onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  >
                    <MenuItem value="">All Levels</MenuItem>
                    <MenuItem value="entry">Entry Level</MenuItem>
                    <MenuItem value="mid">Mid Level</MenuItem>
                    <MenuItem value="senior">Senior Level</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={filters.sortBy}
                    label="Sort By"
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  >
                    <MenuItem value="matchScore">Match Score</MenuItem>
                    <MenuItem value="salary">Salary</MenuItem>
                    <MenuItem value="date">Date Posted</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Results */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="text.secondary">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </Typography>
        </Box>

        {loading && <LinearProgress sx={{ mb: 3 }} />}

        <Grid container spacing={3}>
          {filteredJobs.map((job, index) => (
            <Grid item xs={12} key={job.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ 
                  '&:hover': { 
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                          {job.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <BusinessIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {job.company.display_name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {job.location.display_name}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={`${job.matchScore}% Match`}
                          color="primary"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                        <Tooltip title="Save Job">
                          <IconButton size="small" onClick={() => handleSaveJob(job.id)}>
                            <BookmarkBorderIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {job.description.substring(0, 200)}...
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {job.salary_min && job.salary_max && (
                          <Chip
                            label={`$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`}
                            variant="outlined"
                            size="small"
                          />
                        )}
                        <Chip
                          label={new Date(job.created).toLocaleDateString()}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleApplyJob(job)}
                        endIcon={<OpenInNewIcon />}
                      >
                        Apply Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredJobs.length === 0 && !loading && (
          <Alert severity="info" sx={{ mt: 4 }}>
            No jobs found matching your criteria. Try adjusting your filters or upload your resume to get better matches.
          </Alert>
        )}
      </motion.div>
    </Container>
  );
};

export default JobMatches; 