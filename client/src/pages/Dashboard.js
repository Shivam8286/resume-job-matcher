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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome back, {user?.name || 'User'}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your job search
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
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
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
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
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
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
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
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

        <Grid container spacing={4}>
          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<UploadIcon />}
                      onClick={() => navigate('/upload')}
                    >
                      Upload New Resume
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<WorkIcon />}
                      onClick={() => navigate('/matches')}
                    >
                      View Job Matches
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<BookmarkIcon />}
                    >
                      Saved Jobs
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Recent Activity
                  </Typography>
                  <List>
                    {recentActivity.map((activity, index) => (
                      <ListItem key={activity.id} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            {activity.icon}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.title}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {activity.description}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {activity.time}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

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
  );
};

export default Dashboard; 