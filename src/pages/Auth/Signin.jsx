import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { signinHandler } from '../../store/authenticationSlice';

export const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signin, setSignin] = useState({
    username: '',
    password: '',
  });

  const signupUser = (e, signin, setSignin) => {
    if (e.target.innerText === 'SIGN IN AS GUEST') {
      setSignin({
        username: 'adarshbalak',
        password: 'adarshBalaki123',
      });

      dispatch(
        signinHandler({
          username: 'adarshbalak',
          password: 'adarshBalaki123',
          navigate,
        }),
      );
    } else {
      dispatch(signinHandler({ username: signin.username, password: signin.password, navigate }));
    }
  };

  return (
    <Grid container component='main' sx={{ height: '100vh', position: 'relative' }}>
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
            t.palette.mode === 'dark' ? t.palette.grey[900] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        display={{ xs: 'none', md: 'block' }}
        sx={{
          position: 'absolute',
          left: '5%',
          top: '20%',
          backdropFilter: 'blur(8px)',
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-family)',
            fontWeight: '800',
            fontSize: '4rem',
            color: '#fff',
          }}
          component='h1'
          variant='h5'>
          MITRO
        </Typography>
        <Typography
          sx={{
            fontFamily: 'var(--font-family)',
            fontWeight: '700',
            fontSize: '2rem',
            color: '#fff',
          }}
          component='h6'
          variant='h6'>
          Best Place To Make New मित्र
        </Typography>
      </Box>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography
            sx={{ fontFamily: 'var(--font-family)', fontWeight: '700' }}
            component='h1'
            variant='h5'>
            SIGN IN
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              type='text'
              value={signin.username}
              onChange={(e) => setSignin({ ...signin, username: e.target.value })}
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
              value={signin.password}
              onChange={(e) => setSignin({ ...signin, password: e.target.value })}
              autoComplete='current-password'
            />
            <Button
              fullWidth
              onClick={(e) => signupUser(e, signin, setSignin)}
              variant='contained'
              sx={{ fontFamily: 'var(--font-family)', fontWeight: '650', mt: 2, mb: 1 }}>
              Sign In
            </Button>
            <Button
              fullWidth
              onClick={(e) => signupUser(e, signin, setSignin)}
              variant='outlined'
              sx={{ fontFamily: 'var(--font-family)', fontWeight: '650', mt: 3, mb: 2 }}>
              Sign In As Guest
            </Button>
            <Grid container>
              <Grid
                item
                sx={{
                  width: '100%',
                  textAlign: 'center',
                }}>
                <Link
                  sx={{ fontFamily: 'var(--font-family)', fontWeight: '650' }}
                  variant='body2'
                  to='/signup'>
                  Don't have an account?
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: '700',
                      textDecoration: 'underline;',
                    }}
                    component='span'
                    variant='span'>
                    Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
