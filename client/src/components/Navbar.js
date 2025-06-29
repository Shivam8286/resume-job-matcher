import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Work as WorkIcon,
  Upload as UploadIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const navItems = [
    { text: 'Upload Resume', path: '/upload', icon: <UploadIcon /> },
    { text: 'Job Matches', path: '/matches', icon: <WorkIcon /> },
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> }
  ];

  return (
    <AppBar 
      position="fixed" 
      elevation={0} 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          zIndex: -1
        }
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
        >
          <WorkIcon sx={{ 
            fontSize: 28, 
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }} />
          Job Matcher
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 3,
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 20px rgba(0, 0, 0, 0.1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    borderRadius: 3,
                    zIndex: -1
                  }
                }
              }}
            >
              {isAuthenticated ? (
                <>
                  {navItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      onClick={() => {
                        navigate(item.path);
                        handleMenuClose();
                      }}
                      sx={{
                        borderRadius: 1,
                        margin: '2px 8px',
                        '&:hover': {
                          backgroundColor: 'rgba(102, 126, 234, 0.1)',
                          color: '#667eea',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {item.icon}
                        {item.text}
                      </Box>
                    </MenuItem>
                  ))}
                  <MenuItem 
                    onClick={handleProfileMenuOpen}
                    sx={{
                      borderRadius: 1,
                      margin: '2px 8px',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon />
                      Profile
                    </Box>
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      borderRadius: 1,
                      margin: '2px 8px',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        color: '#f44336',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem 
                    onClick={() => {
                      navigate('/login');
                      handleMenuClose();
                    }}
                    sx={{
                      borderRadius: 1,
                      margin: '2px 8px',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    Login
                  </MenuItem>
                  <MenuItem 
                    onClick={() => {
                      navigate('/register');
                      handleMenuClose();
                    }}
                    sx={{
                      borderRadius: 1,
                      margin: '2px 8px',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    Register
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated ? (
              <>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 500,
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease-in-out'
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{ 
                    ml: 1,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.1)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}
                >
                  <Avatar sx={{ 
                    width: 36, 
                    height: 36, 
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    border: '2px solid rgba(255,255,255,0.4)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {user?.name?.charAt(0) || 'U'}
                  </Avatar>
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/register"
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ff5252 0%, #d63031 100%)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.25), 0 6px 20px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}
                >
                  Get Started
                </Button>
              </>
            )}
          </Box>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 3,
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 20px rgba(0, 0, 0, 0.1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                borderRadius: 3,
                zIndex: -1
              }
            }
          }}
        >
          <MenuItem 
            onClick={() => {
              navigate('/dashboard');
              handleMenuClose();
            }}
            sx={{
              borderRadius: 1,
              margin: '2px 8px',
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                color: '#667eea',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            Dashboard
          </MenuItem>
          <MenuItem 
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              margin: '2px 8px',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                color: '#f44336',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 