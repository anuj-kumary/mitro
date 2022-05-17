import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Avatar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  return (
    <AppBar sx={{ backgroundColor: '#fafafa' }} position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h3'
            noWrap
            component='div'
            sx={{
              fontFamily: 'var(--font-family)',
              mr: 2,
              color: '#111',
              display: { xs: 'none', md: 'flex' },
            }}>
            Mitro
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size='large' sx={{ color: '#111' }}>
              <MailIcon />
            </IconButton>
            <IconButton size='large' sx={{ color: '#111' }}>
              <NotificationsIcon />
            </IconButton>
            <Avatar
              alt='Remy Sharp'
              src={user?.avatar}
              sx={{ width: '40px', borderRadius: '50px', cursor: 'pointer', margin: '.5rem' }}
              onClick={() => navigate(`/profile/${user._id}`)}></Avatar>
            />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size='large' aria-haspopup='true' color='inherit'>
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
