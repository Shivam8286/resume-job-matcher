import React, { useState, useRef } from 'react';
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
  useMediaQuery,
  InputBase,
  Paper
} from '@mui/material';
import {
  Work as WorkIcon,
  Upload as UploadIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavbarEnhanced = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchInputRef = useRef(null);

  const mockSuggestions = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Designer',
    'DevOps Engineer',
    'QA Tester',
    'Project Manager',
    'Business Analyst'
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 1) {
      setSuggestions(
        mockSuggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()))
      );
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setHighlightedIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSearchKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        setSearchQuery(suggestions[highlightedIndex]);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

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
      <Toolbar sx={{ display: 'flex', alignItems: 'center', px: 2, gap: 2 }}>
        {/* Logo (left) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: '0 0 auto' }}>
          <WorkIcon />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            Job Matcher
          </Typography>
        </Box>

        {/* Search Bar (center) */}
        <Box sx={{ flex: '1 1 0%', maxWidth: 500, mx: 'auto', position: 'relative' }}>
          <Paper
            component="form"
            sx={{ display: 'flex', alignItems: 'center', p: '2px 8px', borderRadius: 2, boxShadow: 0, width: '100%' }}
            onSubmit={e => { e.preventDefault(); }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search jobs, companies..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              onKeyDown={handleSearchKeyDown}
              sx={{ flex: 1, fontSize: '1rem' }}
              inputRef={searchInputRef}
            />
          </Paper>
          {showSuggestions && suggestions.length > 0 && (
            <Paper
              sx={{
                position: 'absolute',
                top: '110%',
                left: 0,
                width: '100%',
                zIndex: 10,
                mt: 1,
                borderRadius: 2,
                boxShadow: 3,
                maxHeight: 240,
                overflowY: 'auto'
              }}
            >
              {suggestions.map((s, idx) => (
                <Box
                  key={s}
                  onMouseDown={() => handleSuggestionClick(s)}
                  sx={{
                    px: 2,
                    py: 1,
                    cursor: 'pointer',
                    backgroundColor: idx === highlightedIndex ? 'grey.100' : 'white',
                    color: 'text.primary',
                    fontWeight: idx === highlightedIndex ? 600 : 400,
                    '&:hover': {
                      backgroundColor: 'grey.100'
                    }
                  }}
                >
                  {s}
                </Box>
              ))}
            </Paper>
          )}
        </Box>

        {/* Nav/Profile (right) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: '0 0 auto' }}>
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
            <>
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
            </>
          )}
        </Box>

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

export default NavbarEnhanced; 