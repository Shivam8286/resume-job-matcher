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
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <WorkIcon />
          Job Matcher
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
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
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {item.icon}
                        {item.text}
                      </Box>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleProfileMenuOpen}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon />
                      Profile
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => {
                    navigate('/login');
                    handleMenuClose();
                  }}>
                    Login
                  </MenuItem>
                  <MenuItem onClick={() => {
                    navigate('/register');
                    handleMenuClose();
                  }}>
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
                    sx={{ textTransform: 'none' }}
                  >
                    {item.text}
                  </Button>
                ))}
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
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
                  sx={{ textTransform: 'none' }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/register"
                  sx={{ textTransform: 'none' }}
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
        >
          <MenuItem onClick={() => {
            navigate('/dashboard');
            handleMenuClose();
          }}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 