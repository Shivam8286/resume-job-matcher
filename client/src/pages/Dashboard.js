import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  Work as WorkIcon,
  Upload as UploadIcon,
  Email as EmailIcon,
  TrendingUp as TrendingUpIcon,
  Bookmark as BookmarkIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    resumesUploaded: 2,
    jobsMatched: 15,
    applicationsSubmitted: 8,
    jobsSaved: 12
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'resume_upload',
      title: 'Resume uploaded',
      description: 'Software Engineer Resume.pdf',
      time: '2 hours ago',
      icon: <UploadIcon />
    },
    {
      id: 2,
      type: 'job_match',
      title: 'New job match',
      description: 'Senior React Developer at TechCorp',
      time: '1 day ago',
      icon: <WorkIcon />
    },
    {
      id: 3,
      type: 'application',
      title: 'Application submitted',
      description: 'Full Stack Developer at StartupXYZ',
      time: '2 days ago',
      icon: <EmailIcon />
    }
  ]);

  const [subscriptionStatus] = useState({
    isActive: true,
    email: user?.email || 'user@example.com',
    lastEmail: '2024-01-15',
    nextEmail: '2024-01-16'
  });

  const [jobMatches] = useState([
    {
      id: 1,
      title: 'Frontend Engineer',
      company: 'Google',
      logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg',
      location: 'London, UK',
      salary: '£70k-£90k',
      remote: true
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Amazon',
      logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg',
      location: 'Manchester, UK',
      salary: '£65k-£85k',
      remote: false
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Meta',
      logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/meta.svg',
      location: 'Remote',
      salary: '£80k-£100k',
      remote: true
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'Microsoft',
      logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg',
      location: 'Birmingham, UK',
      salary: '£75k-£95k',
      remote: false
    },
  ]);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #f5d0fe 100%)',
      py: 6,
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Section */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                Welcome back, {user?.name || 'User'}! 👋
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Here's what's happening with your job search
              </Typography>
            </Box>
            {/* Profile Summary Card */}
            <Card sx={{
              minWidth: 220,
              px: 3,
              py: 2,
              borderRadius: 4,
              background: 'rgba(255,255,255,0.5)',
              boxShadow: '0 8px 32px rgba(102,126,234,0.08)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}>
              <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main', fontWeight: 700 }}>
                {user?.name ? user.name[0] : 'U'}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{user?.name || 'User'}</Typography>
                <Typography variant="body2" color="text.secondary">{user?.email || 'user@example.com'}</Typography>
                <Chip label="Resume Uploaded" color="success" size="small" sx={{ mt: 1 }} />
              </Box>
            </Card>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card sx={{
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.7)',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.08)',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.04)',
                    boxShadow: '0 16px 40px rgba(102,126,234,0.12)',
                  },
                }}>
                  <CardContent sx={{ py: 3 }}>
                    <UploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {stats.resumesUploaded}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Resumes Uploaded
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card sx={{
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.7)',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.08)',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.04)',
                    boxShadow: '0 16px 40px rgba(102,126,234,0.12)',
                  },
                }}>
                  <CardContent sx={{ py: 3 }}>
                    <WorkIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {stats.jobsMatched}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jobs Matched
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card sx={{
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.7)',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.08)',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.04)',
                    boxShadow: '0 16px 40px rgba(102,126,234,0.12)',
                  },
                }}>
                  <CardContent sx={{ py: 3 }}>
                    <EmailIcon sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {stats.applicationsSubmitted}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Applications
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card sx={{
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.7)',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.08)',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.04)',
                    boxShadow: '0 16px 40px rgba(102,126,234,0.12)',
                  },
                }}>
                  <CardContent sx={{ py: 3 }}>
                    <BookmarkIcon sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {stats.jobsSaved}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Saved Jobs
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Job Matches Carousel */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Top Job Matches
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                overflowX: 'auto',
                pb: 2,
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {jobMatches.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.04 }}
                  style={{ scrollSnapAlign: 'start', minWidth: 320 }}
                >
                  <Card sx={{
                    minWidth: 300,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.8)',
                    boxShadow: '0 8px 32px rgba(102,126,234,0.10)',
                    backdropFilter: 'blur(8px)',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                      boxShadow: '0 16px 40px rgba(102,126,234,0.18)',
                    },
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Avatar src={job.logo} alt={job.company} sx={{ width: 40, height: 40, bgcolor: 'white', border: '1px solid #eee' }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{job.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{job.company}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {job.location} {job.remote && <Chip label="Remote" color="info" size="small" sx={{ ml: 1 }} />}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                      {job.salary}
                    </Typography>
                    <Button variant="contained" size="small" sx={{ alignSelf: 'flex-end', fontWeight: 600 }}>
                      Apply
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* Recent Activity Timeline */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Recent Activity
            </Typography>
            <List sx={{ position: 'relative', pl: 2 }}>
              {recentActivity.map((activity, idx) => (
                <ListItem key={activity.id} alignItems="flex-start" sx={{
                  pb: 3,
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    left: 18,
                    top: idx === 0 ? 32 : 0,
                    bottom: idx === recentActivity.length - 1 ? 32 : 0,
                    width: 2,
                    bgcolor: 'primary.light',
                    opacity: 0.2,
                    zIndex: 0,
                  },
                }}>
                  <ListItemIcon sx={{ minWidth: 40, zIndex: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                      {activity.icon}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 600 }}>{activity.title}</Typography>}
                    secondary={<>
                      <Typography variant="body2" color="text.secondary">{activity.description}</Typography>
                      <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                    </>}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Email Notifications Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card sx={{ mt: 4 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Email Notifications
                  </Typography>
                  <Chip
                    label={subscriptionStatus.isActive ? 'Active' : 'Inactive'}
                    color={subscriptionStatus.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
                
                {subscriptionStatus.isActive ? (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    You're subscribed to daily job recommendations. Next email will be sent on {subscriptionStatus.nextEmail}.
                  </Alert>
                ) : (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    You're not subscribed to email notifications. Subscribe to get daily job matches.
                  </Alert>
                )}

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<NotificationsIcon />}
                  >
                    {subscriptionStatus.isActive ? 'Manage Preferences' : 'Subscribe'}
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    color="error"
                  >
                    {subscriptionStatus.isActive ? 'Unsubscribe' : ''}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Dashboard; 