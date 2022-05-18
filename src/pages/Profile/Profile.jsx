import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  CssBaseline,
  IconButton,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { userDetails } from '../../store/profileSlice';
import { EditProfile } from './components/EditProfile';

const theme = createTheme();

export const Profile = () => {
  const { username } = useParams();
  const { profileDetails } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(userDetails(username));
  }, [username]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EditProfile handleClose={handleClose} open={open} />
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ marginTop: '1rem', p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', justifyContent: ' space-around' }}>
            <Avatar
              alt='Remy Sharp'
              src={profileDetails?.avatar}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography
                sx={{ display: 'inline-block', padding: '1rem 1rem 0 1rem' }}
                variant='h5'
                component='h5'>
                {profileDetails?.firstName} {profileDetails?.lastName}
              </Typography>
              <Button onClick={handleOpen} sx={{ marginLeft: '8rem' }} variant='contained'>
                Edit
              </Button>
              <Typography sx={{ padding: '0 1rem 1rem 1rem' }} variant='p' component='p'>
                @{profileDetails?.username}
              </Typography>
              <Typography sx={{ padding: '0 1rem 0 1rem' }} variant='p' component='p'>
                {profileDetails?.bio}
              </Typography>

              <Link
                sx={{ display: 'flex', padding: '0 1rem 1rem 1rem' }}
                href={profileDetails?.website}
                target='_blank'
                rel='noopener'>
                {profileDetails?.website}
              </Link>
              <Typography sx={{ padding: '1rem' }} variant='span' component='span'>
                2 Post
              </Typography>
              <Typography sx={{ padding: '1rem' }} variant='span' component='span'>
                160 Followers
              </Typography>
              <Typography sx={{ padding: '1rem' }} variant='span' component='span'>
                10 Following
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ p: { xs: 2 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Typography variant='span' component='span'>
              <IconButton aria-label='Post'>
                <InsertPhotoIcon />
              </IconButton>
              Post
            </Typography>
            <Typography variant='span' component='span'>
              <IconButton aria-label='Saved'>
                <SaveIcon />
              </IconButton>
              Saved
            </Typography>
            <Typography variant='span' component='span'>
              <IconButton aria-label='Archive'>
                <BookmarkIcon />
              </IconButton>
              Archive
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Box>
          <Card sx={{ width: '63ch' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                  A
                </Avatar>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title='adarshbalak'
              subheader='September 14, 2016'
            />
            <CardMedia
              component='img'
              height='100%'
              image='https://m.media-amazon.com/images/M/MV5BZDA1ODgyODEtOWI3Yy00N2UzLTk5ZGMtZGI1MzU5YzFkZDQ1XkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_.jpg'
              alt='Paella dish'
            />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                This impressive paella is a perfect party dish and a fun meal to cook together with
                your guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label='add to favorites'>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label='share'>
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
