import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Avatar,
  Paper,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Work as WorkIcon,
  Upload as UploadIcon,
  Email as EmailIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
  PlayArrow as PlayArrowIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);

  const features = [
    {
      icon: <UploadIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Smart Resume Upload',
      description: 'Upload your PDF resume and let our AI extract key skills and experience automatically.',
      color: '#667eea'
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Intelligent Job Matching',
      description: 'Get personalized job recommendations based on your skills, experience, and preferences.',
      color: '#764ba2'
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Daily Notifications',
      description: 'Receive curated job matches in your inbox every day to never miss opportunities.',
      color: '#f093fb'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Track Applications',
      description: 'Monitor your job applications and track your career progress in one place.',
      color: '#4facfe'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We never share your information with third parties.',
      color: '#43e97b'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Lightning Fast',
      description: 'Get job matches in seconds with our optimized matching algorithm.',
      color: '#fa709a'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: '👥' },
    { number: '50K+', label: 'Jobs Matched', icon: '🎯' },
    { number: '95%', label: 'Success Rate', icon: '📈' },
    { number: '24/7', label: 'Support', icon: '🛡️' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      company: 'TechCorp',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: 'Found my dream job within 2 weeks! The AI matching was incredibly accurate.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'StartupXYZ',
      avatar: 'https://i.pravatar.cc/150?img=2',
      content: 'The daily job recommendations are spot-on. Saved me hours of job hunting.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      company: 'DataFlow Inc',
      avatar: 'https://i.pravatar.cc/150?img=3',
      content: 'Amazing platform! The resume parsing and job matching exceeded my expectations.',
      rating: 5
    }
  ];

  const jobCategories = [
    'Software Development', 'Data Science', 'Product Management', 
    'Marketing', 'Sales', 'Design', 'DevOps', 'AI/ML'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box>
      {/* Hero Section with Parallax */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Animated Background Elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
          }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Chip
                  label="🚀 AI-Powered Job Matching"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    mb: 3,
                    fontWeight: 600
                  }}
                />
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    lineHeight: 1.2,
                    background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Find Your Dream Job with AI
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 300,
                    lineHeight: 1.6
                  }}
                >
                  Upload your resume and let our intelligent matching system find the perfect job opportunities for you. 
                  Get personalized recommendations in seconds.
                </Typography>

                {/* Job Categories */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                    Popular job categories:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {jobCategories.slice(0, 4).map((category, index) => (
                      <Chip
                        key={index}
                        label={category}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.1)',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.2)'
                          }
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/upload')}
                    startIcon={<UploadIcon />}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'grey.100',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Upload Resume
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/register')}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Get Started Free
                  </Button>
                </Stack>

                {/* Trust Indicators */}
                <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Trusted by 10,000+ professionals
                  </Typography>
                </Box>
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
                    position: 'relative'
                  }}
                >
                  {/* Main Illustration */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Box
                      sx={{
                        width: 400,
                        height: 400,
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      <WorkIcon sx={{ fontSize: 120, opacity: 0.8 }} />
                    </Box>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '20%',
                      left: '10%'
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <SearchIcon sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                  </motion.div>

                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '20%',
                      right: '10%'
                    }}
                    animate={{
                      rotate: [360, 0],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <EmailIcon sx={{ fontSize: 25, color: 'white' }} />
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3
          }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <IconButton
            onClick={scrollToFeatures}
            sx={{
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <ArrowDownIcon />
          </IconButton>
        </motion.div>
      </Box>

      {/* Stats Section with Animation */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    borderRadius: 3,
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      transition: 'transform 0.3s ease'
                    }
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 1, fontSize: '2.5rem' }}>
                    {stat.icon}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box id="features" sx={{ py: 12, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Chip
                label="✨ Features"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  mb: 2,
                  fontWeight: 600
                }}
              />
              <Typography
                variant="h2"
                component="h2"
                sx={{ mb: 3, fontWeight: 700 }}
              >
                Why Choose Job Matcher?
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                Our AI-powered platform combines cutting-edge technology with user-friendly design 
                to revolutionize your job search experience.
              </Typography>
            </Box>
          </motion.div>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'visible',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: 4,
                        background: `linear-gradient(90deg, ${feature.color}, ${feature.color}88)`,
                        borderRadius: '2px 2px 0 0'
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}44)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
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

      {/* Testimonials Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Chip
                label="💬 Testimonials"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  mb: 2,
                  fontWeight: 600
                }}
              />
              <Typography
                variant="h2"
                component="h2"
                sx={{ mb: 3, fontWeight: 700 }}
              >
                What Our Users Say
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ position: 'relative', minHeight: 300 }}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: currentTestimonial === index ? 1 : 0,
                  x: currentTestimonial === index ? 0 : 50
                }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  display: currentTestimonial === index ? 'block' : 'none'
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: 3,
                    maxWidth: 600,
                    mx: 'auto'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 24 }} />
                    ))}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.6 }}
                  >
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <Avatar
                      src={testimonial.avatar}
                      sx={{ width: 60, height: 60 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {testimonial.role} at {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            ))}

            {/* Testimonial Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: currentTestimonial === index ? 'primary.main' : 'grey.300',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 12, bgcolor: 'grey.50' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 6,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: 4
              }}
            >
              <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
                Ready to Find Your Next Opportunity?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Join thousands of professionals who have already found their dream jobs with our platform.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Start Your Journey
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/upload')}
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Try Demo
                </Button>
              </Stack>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a1929 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            animation: 'gradientShift 8s ease-in-out infinite',
            zIndex: 1,
            '@keyframes gradientShift': {
              '0%, 100%': {
                opacity: 0.8,
                transform: 'scale(1) rotate(0deg)'
              },
              '50%': {
                opacity: 1,
                transform: 'scale(1.05) rotate(1deg)'
              }
            }
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Main Footer Content */}
          <Box sx={{ py: 8 }}>
            <Grid container spacing={4}>
              {/* Company Info Card */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 4,
                      p: 4,
                      height: '100%',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                        borderRadius: 4,
                        zIndex: -1
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <WorkIcon sx={{ 
                        fontSize: 36, 
                        color: '#667eea', 
                        mr: 2,
                        filter: 'drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3))'
                      }} />
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 900,
                          fontFamily: '"Poppins", sans-serif',
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        Job Matcher
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 4, 
                        opacity: 0.9, 
                        lineHeight: 1.8, 
                        fontSize: '1.1rem',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 400
                      }}
                    >
                      AI-powered job matching platform that revolutionizes how professionals discover and connect with their dream careers.
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>

              {/* Connect with Us */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#667eea' }}>
                    Connect with Us
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6 }}>
                    Stay connected and get the latest updates on job opportunities and platform features.
                  </Typography>
                  
                  {/* Social Media */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: '#667eea' }}>
                      Follow Us
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <IconButton 
                        sx={{ 
                          bgcolor: 'rgba(102, 126, 234, 0.1)',
                          border: '1px solid rgba(102, 126, 234, 0.3)',
                          color: '#667eea',
                          '&:hover': {
                            bgcolor: 'rgba(102, 126, 234, 0.2)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton 
                        sx={{ 
                          bgcolor: 'rgba(102, 126, 234, 0.1)',
                          border: '1px solid rgba(102, 126, 234, 0.3)',
                          color: '#667eea',
                          '&:hover': {
                            bgcolor: 'rgba(102, 126, 234, 0.2)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <GitHubIcon />
                      </IconButton>
                      <IconButton 
                        sx={{ 
                          bgcolor: 'rgba(102, 126, 234, 0.1)',
                          border: '1px solid rgba(102, 126, 234, 0.3)',
                          color: '#667eea',
                          '&:hover': {
                            bgcolor: 'rgba(102, 126, 234, 0.2)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <TwitterIcon />
                      </IconButton>
                    </Stack>
                  </Box>

                  {/* Contact Info */}
                  <Box>
                    <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: '#667eea' }}>
                      Contact Info
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                      📧 hello@jobmatcher.com
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      📞 +1 (555) 123-4567
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>

              {/* Support & Legal Card */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 4,
                      p: 4,
                      height: '100%',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 700,
                        fontFamily: '"DM Sans", sans-serif',
                        color: '#667eea',
                        textAlign: 'center'
                      }}
                    >
                      Support & Legal
                    </Typography>
                    <Stack spacing={2}>
                      <Button
                        color="inherit"
                        sx={{ 
                          justifyContent: 'center', 
                          textTransform: 'none',
                          opacity: 0.8,
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: 500,
                          fontSize: '1rem',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            width: 0,
                            height: '2px',
                            background: '#667eea',
                            transition: 'all 0.3s ease',
                            transform: 'translateX(-50%)'
                          },
                          '&:hover': {
                            opacity: 1,
                            color: '#667eea',
                            transform: 'translateY(-2px)',
                            '&::after': {
                              width: '80%'
                            }
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        Help Center
                      </Button>
                      <Button
                        color="inherit"
                        sx={{ 
                          justifyContent: 'center', 
                          textTransform: 'none',
                          opacity: 0.8,
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: 500,
                          fontSize: '1rem',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            width: 0,
                            height: '2px',
                            background: '#667eea',
                            transition: 'all 0.3s ease',
                            transform: 'translateX(-50%)'
                          },
                          '&:hover': {
                            opacity: 1,
                            color: '#667eea',
                            transform: 'translateY(-2px)',
                            '&::after': {
                              width: '80%'
                            }
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        Privacy Policy
                      </Button>
                      <Button
                        color="inherit"
                        sx={{ 
                          justifyContent: 'center', 
                          textTransform: 'none',
                          opacity: 0.8,
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: 500,
                          fontSize: '1rem',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            width: 0,
                            height: '2px',
                            background: '#667eea',
                            transition: 'all 0.3s ease',
                            transform: 'translateX(-50%)'
                          },
                          '&:hover': {
                            opacity: 1,
                            color: '#667eea',
                            transform: 'translateY(-2px)',
                            '&::after': {
                              width: '80%'
                            }
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        Terms of Service
                      </Button>
                    </Stack>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Box>

          {/* Bottom Section */}
          <Box sx={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            pt: 4,
            pb: 3
          }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.7,
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 400
                  }}
                >
                  © 2024 Job Matcher. All rights reserved. | Made with ❤️ for job seekers worldwide
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={3} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                  <Button
                    size="small"
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'none',
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 500,
                      '&:hover': { 
                        color: '#667eea',
                        transform: 'translateY(-1px)',
                        transition: 'all 0.3s ease'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Terms
                  </Button>
                  <Button
                    size="small"
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'none',
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 500,
                      '&:hover': { 
                        color: '#667eea',
                        transform: 'translateY(-1px)',
                        transition: 'all 0.3s ease'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Privacy
                  </Button>
                  <Button
                    size="small"
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'none',
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 500,
                      '&:hover': { 
                        color: '#667eea',
                        transform: 'translateY(-1px)',
                        transition: 'all 0.3s ease'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Cookies
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 