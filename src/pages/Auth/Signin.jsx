import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { Link } from 'react-router-dom';

export const Signin = () => {
  const { loginHandler } = useAuth();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1559854036-2409f22a918a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'dark'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component='h1' variant='h5'>
            SIGN IN
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              type='email'
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              autoFocus
            />

            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              autoComplete='current-password'
            />
            <Button
              fullWidth
              onClick={(e) => loginHandler(e, login, setLogin)}
              variant='contained'
              sx={{ mt: 2, mb: 1 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              onClick={(e) => loginHandler(e, login, setLogin)}
              variant='outlined'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In As Guest
            </Button>
            <Grid container>
              <Grid
                item
                sx={{
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <Link variant='body2' to='/signup'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
