import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip
} from '@mui/material';
import {
  Work as WorkIcon,
  Upload as UploadIcon,
  Email as EmailIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <UploadIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Smart Resume Upload',
      description: 'Upload your PDF resume and let our AI extract key skills and experience automatically.'
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Intelligent Job Matching',
      description: 'Get personalized job recommendations based on your skills, experience, and preferences.'
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Daily Notifications',
      description: 'Receive curated job matches in your inbox every day to never miss opportunities.'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Track Applications',
      description: 'Monitor your job applications and track your career progress in one place.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We never share your information with third parties.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Lightning Fast',
      description: 'Get job matches in seconds with our optimized matching algorithm.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Jobs Matched' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  Find Your Dream Job with AI
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 300
                  }}
                >
                  Upload your resume and let our intelligent matching system find the perfect job opportunities for you.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/upload')}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'grey.100'
                      }
                    }}
                  >
                    Upload Resume
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Get Started Free
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 400
                  }}
                >
                  <WorkIcon sx={{ fontSize: 200, opacity: 0.3 }} />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box textAlign="center">
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              sx={{ mb: 6, fontWeight: 700 }}
            >
              Why Choose Job Matcher?
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.3s ease-in-out'
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                      <Box sx={{ mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box textAlign="center">
              <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
                Ready to Find Your Next Opportunity?
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Join thousands of professionals who have already found their dream jobs with our platform.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{ px: 4, py: 1.5 }}
              >
                Start Your Journey
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 