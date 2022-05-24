import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExploreIcon from '@mui/icons-material/Explore';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, token } = useSelector((state) => state.auth);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ backgroundColor: '#fafafa' }} position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#111' }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            onClick={() => navigate('/home')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'var(--kanit-font-family)',
              fontWeight: 600,
              fontSize: '2rem',
              letterSpacing: '3px',
              color: 'var( --bg-color)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}>
            Mitro
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}></Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          {pathname !== '/' && (
            <Box sx={{ flexGrow: 0, justifyContent: 'center' }}>
              <IconButton title='Explore' onClick={() => navigate('/explore')}>
                <ExploreIcon sx={{ color: '#111', cursor: 'pointer', fontSize: '1.3rem' }} />
              </IconButton>

              <IconButton
                sx={{ margin: '0 .8rem' }}
                title='Bookmark'
                onClick={() => navigate('/bookmark')}>
                <BookmarkIcon sx={{ color: '#111', cursor: 'pointer', fontSize: '1.3rem' }} />
              </IconButton>

              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt={user?.username}
                  src={user?.avatar}
                  sx={{ width: '40px', borderRadius: '50px', cursor: 'pointer', margin: '.5rem' }}
                  onClick={() => navigate(`/profile/${user.username}`)}></Avatar>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
