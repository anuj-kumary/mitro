import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
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
            }}
          >
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
            <IconButton
              size='large'
              edge='end'
              aria-haspopup='true'
              sx={{ color: '#111' }}
              onClick={() => navigate('/profile')}
            >
              <AccountCircle />
            </IconButton>
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
