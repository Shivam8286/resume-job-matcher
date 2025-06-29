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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Snackbar,
  Fab,
  Zoom,
  Tooltip,
  CircularProgress,
  Badge
} from '@mui/material';
import {
  Work as WorkIcon,
  Upload as UploadIcon,
  Email as EmailIcon,
  TrendingUp as TrendingUpIcon,
  Bookmark as BookmarkIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  InfoOutlined as InfoOutlinedIcon,
  CheckCircle as CheckCircleIcon,
  PictureAsPdf as PictureAsPdfIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const AnimatedCounter = ({ value }) => {
  const controls = useAnimation();
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    controls.start({ val: value, transition: { duration: 1.2, ease: 'easeOut' } });
  }, [value, controls]);
  return (
    <motion.span
      initial={{ val: 0 }}
      animate={controls}
      onUpdate={latest => setDisplay(Math.floor(latest.val))}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {display}
    </motion.span>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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

  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'You have a new job match!', time: '2m ago', read: false },
    { id: 2, message: 'Application submitted to TechCorp.', time: '1h ago', read: false },
    { id: 3, message: 'Your resume was viewed by Amazon.', time: '3h ago', read: true },
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleBellClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };
  const handleCloseNotifications = () => {
    setNotificationAnchor(null);
  };
  const handleMarkAsRead = (id) => {
    setNotifications((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

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
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                Welcome back, {user?.name || 'User'}! 👋
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Here's what's happening with your job search
              </Typography>
            </Box>
            {/* Notification Bell */}
            <Box sx={{ position: 'absolute', right: 260, top: 0 }}>
              <Button
                onClick={handleBellClick}
                sx={{ minWidth: 0, p: 1.2, borderRadius: '50%', bgcolor: 'rgba(102,126,234,0.08)', boxShadow: '0 2px 8px rgba(102,126,234,0.08)', position: 'relative' }}
              >
                <NotificationsIcon sx={{ color: '#667eea', fontSize: 28 }} />
                {unreadCount > 0 && (
                  <Box sx={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 14,
                    height: 14,
                    bgcolor: 'error.main',
                    color: 'white',
                    borderRadius: '50%',
                    fontSize: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    boxShadow: '0 0 0 2px white',
                  }}>{unreadCount}</Box>
                )}
              </Button>
              {/* Notifications Dropdown */}
              {notificationAnchor && (
                <Box sx={{
                  position: 'absolute',
                  top: 40,
                  right: 0,
                  minWidth: 320,
                  bgcolor: 'white',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                  zIndex: 10,
                  p: 2,
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Notifications</Typography>
                    <Button onClick={handleCloseNotifications} sx={{ minWidth: 0, p: 0.5 }}><CloseIcon fontSize="small" /></Button>
                  </Box>
                  {notifications.length === 0 && (
                    <Typography variant="body2" color="text.secondary">No notifications</Typography>
                  )}
                  {notifications.map((n) => (
                    <Box key={n.id} sx={{
                      p: 1.2,
                      borderRadius: 2,
                      bgcolor: n.read ? 'grey.100' : 'rgba(102,126,234,0.08)',
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'primary.light', color: 'white' },
                    }}
                      onClick={() => handleMarkAsRead(n.id)}
                    >
                      <NotificationsIcon sx={{ color: n.read ? 'grey.400' : 'primary.main', fontSize: 20 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: n.read ? 400 : 700 }}>{n.message}</Typography>
                        <Typography variant="caption" color="text.secondary">{n.time}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
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
            {[
              {
                icon: <UploadIcon sx={{ fontSize: 40 }} />, color: 'primary.main', glow: 'rgba(102,126,234,0.18)', value: stats.resumesUploaded, label: 'Resumes Uploaded',
                iconBg: 'linear-gradient(135deg, #667eea 0%, #64b6ff 100%)'
              },
              {
                icon: <WorkIcon sx={{ fontSize: 40 }} />, color: 'success.main', glow: 'rgba(34,197,94,0.18)', value: stats.jobsMatched, label: 'Jobs Matched',
                iconBg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)'
              },
              {
                icon: <EmailIcon sx={{ fontSize: 40 }} />, color: 'info.main', glow: 'rgba(59,130,246,0.18)', value: stats.applicationsSubmitted, label: 'Applications',
                iconBg: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)'
              },
              {
                icon: <BookmarkIcon sx={{ fontSize: 40 }} />, color: 'warning.main', glow: 'rgba(251,191,36,0.18)', value: stats.jobsSaved, label: 'Saved Jobs',
                iconBg: 'linear-gradient(135deg, #fbbf24 0%, #f59e42 100%)'
              },
            ].map((card, idx) => (
              <Grid item xs={12} sm={6} md={3} key={card.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  style={{ borderRadius: 24 }}
                >
                  <Box
                    sx={{
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.65)',
                      boxShadow: `0 8px 32px ${card.glow}`,
                      backdropFilter: 'blur(12px)',
                      p: 4,
                      minHeight: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'box-shadow 0.3s, background 0.3s',
                      '&:hover': {
                        boxShadow: `0 16px 48px ${card.glow}`,
                        background: 'rgba(255,255,255,0.85)',
                      },
                    }}
                  >
                    {/* Gradient Glow Circle */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -40,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        background: card.iconBg,
                        opacity: 0.18,
                        filter: 'blur(16px)',
                        zIndex: 0,
                      }}
                    />
                    {/* Animated Icon */}
                    <motion.div
                      whileHover={{ scale: 1.18, rotate: [0, -10, 10, 0] }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      style={{ zIndex: 1, marginBottom: 12 }}
                    >
                      {React.cloneElement(card.icon, { sx: { fontSize: 40, color: card.color } })}
                    </motion.div>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, zIndex: 1 }}>
                      <AnimatedCounter value={card.value} />
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ zIndex: 1 }}>
                      {card.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
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

          {/* Recent Activity and Upload Resume Card Side by Side */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={8}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Recent Activity
                  </Typography>
                </Box>
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
            </Grid>
            <Grid item xs={12} md={4}>
              {/* Enhanced Upload Resume Card */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.55)',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                  backdropFilter: 'blur(14px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2.5,
                  minWidth: 260,
                  maxWidth: 360,
                  mt: { xs: 4, md: 0 },
                  border: '2.5px solid',
                  borderImage: 'linear-gradient(120deg, #667eea 0%, #a084ee 100%) 1',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 4,
                    boxShadow: 'inset 0 2px 18px 0 rgba(102,126,234,0.10)',
                    pointerEvents: 'none',
                  },
                }}
              >
                {/* Animated Cloud Icon */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ marginBottom: 4 }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={<CheckCircleIcon sx={{ color: '#4caf50', fontSize: 18, bgcolor: 'white', borderRadius: '50%' }} />}
                  >
                    <UploadIcon sx={{ fontSize: 38, color: 'primary.main', bgcolor: 'white', borderRadius: '50%', boxShadow: '0 2px 8px #a084ee33', p: 1 }} />
                  </Badge>
                </motion.div>
                {/* Profile Strength Progress */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CircularProgress variant="determinate" value={80} size={38} thickness={5} sx={{ color: '#a084ee', bgcolor: '#e0e7ff', borderRadius: '50%' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Profile Strength: 80% <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 18, ml: 0.5, verticalAlign: 'middle' }} />
                  </Typography>
                </Box>
                {/* Resume Preview & Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Box sx={{ position: 'relative', width: 48, height: 60, mr: 1 }}>
                    <Box sx={{
                      width: 48,
                      height: 60,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #e0e7ff 0%, #a084ee 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px #a084ee33',
                    }}>
                      <PictureAsPdfIcon sx={{ color: '#e53935', fontSize: 32 }} />
                    </Box>
                    <Box sx={{
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      bgcolor: 'white',
                      borderRadius: 1,
                      px: 0.5,
                      py: 0.1,
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#e53935',
                      border: '1px solid #e0e7ff',
                      boxShadow: '0 1px 4px #a084ee22',
                    }}>PDF</Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.2, fontFamily: 'Poppins, sans-serif' }}>
                      Software Engineer Resume.pdf
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'Inter, sans-serif' }}>
                      Last uploaded: 2 hours ago
                    </Typography>
                  </Box>
                </Box>
                {/* Upload Button with Animation & Tooltip */}
                <Tooltip title="Upload your latest resume for better job matches!" arrow>
                  <motion.div whileHover={{ scale: 1.06, boxShadow: '0 0 0 4px #a084ee44' }} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      startIcon={<UploadIcon />}
                      onClick={() => navigate('/upload')}
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontWeight: 700,
                        borderRadius: 3,
                        boxShadow: '0 2px 8px rgba(102,126,234,0.10)',
                        textTransform: 'none',
                        px: 2.5,
                        py: 1.2,
                        fontSize: '1rem',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                          boxShadow: '0 4px 16px rgba(102,126,234,0.18)',
                          transform: 'translateY(-2px) scale(1.03)'
                        },
                      }}
                    >
                      Upload Resume
                    </Button>
                  </motion.div>
                </Tooltip>
                {/* Help Icon with Tooltip */}
                <Tooltip title="Why should I update my resume? Keeping your resume up to date helps us match you with the best jobs!" arrow>
                  <InfoOutlinedIcon sx={{ color: 'primary.main', fontSize: 22, mt: 1, cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }} />
                </Tooltip>
              </Box>
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
    </Box>
  );
};

export default Dashboard; 