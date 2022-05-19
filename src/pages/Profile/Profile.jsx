import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LogoutIcon from '@mui/icons-material/Logout';
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
import { getUserPosts } from '../../store/profileSlice';
import { followUser, unfollowUser } from '../../store/userSlice';
import { PostFeed } from '../Home/component/PostFeed/PostFeed';
import { EditProfile } from './components/EditProfile';
import { FollowersModal } from './components/FollowersModal';
import { FollowingModal } from './components/FollowingModal';

const theme = createTheme();

export const Profile = () => {
  const { username } = useParams();
  const { profileDetails } = useSelector((state) => state.profile);
  const { postDetails } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const handleOpenFollowingModal = () => setOpenFollowingModal(true);
  const handleCloseFollowingModal = () => setOpenFollowingModal(false);
  const handleOpenFollowersModal = () => setOpenFollowersModal(true);
  const handleCloseFollowersModal = () => setOpenFollowersModal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, token } = useSelector((state) => state.auth);

  const {
    posts: { posts },
    users: { users },
  } = useSelector((state) => state);

  useEffect(() => {
    if (username) {
      dispatch(getUserPosts(username));
    }
  }, [username, dispatch]);

  console.log(users, 'dff');

  const currentUserDetails = users?.find((user) => user.username === username);
  console.log(currentUserDetails);

  const isFollowed = () =>
    currentUserDetails?.followers.some((users) => users.username === user.username);

  const unFollowOrFollowHandler = () => {
    isFollowed()
      ? dispatch(unfollowUser({ followUserId: currentUserDetails._id, authToken: token, dispatch }))
      : dispatch(followUser({ followUserId: currentUserDetails._id, authToken: token, dispatch }));
  };

  return (
    <>
      {currentUserDetails && (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <EditProfile handleClose={handleClose} open={open} />
          <FollowingModal
            openFollowingModal={openFollowingModal}
            handleCloseFollowingModal={handleCloseFollowingModal}
            following={user?.following}
          />
          <FollowersModal
            handleCloseFollowersModal={handleCloseFollowersModal}
            openFollowersModal={openFollowersModal}
            followers={user?.followers}
          />

          <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
            <Paper variant='outlined' sx={{ marginTop: '1rem', p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: 'flex', justifyContent: ' space-around' }}>
                <Avatar
                  alt='Remy Sharp'
                  src={currentUserDetails?.avatar}
                  sx={{ width: 100, height: 100 }}
                />
                <Box>
                  <Typography
                    sx={{ display: 'inline-block', padding: '1rem 1rem 0 1rem' }}
                    variant='h5'
                    component='h5'>
                    {currentUserDetails?.firstName} {currentUserDetails?.lastName}
                  </Typography>
                  {user?.username === currentUserDetails?.username && (
                    <Button onClick={handleOpen} sx={{ marginLeft: '8rem' }} variant='contained'>
                      Edit
                    </Button>
                  )}
                  {user.username !== currentUserDetails.username && (
                    <Button variant='contained' h='2rem' onClick={unFollowOrFollowHandler}>
                      {isFollowed() ? 'Following' : 'Follow'}
                    </Button>
                  )}

                  <Typography sx={{ padding: '0 1rem 1rem 1rem' }} variant='p' component='p'>
                    @{currentUserDetails?.username}
                  </Typography>
                  <Typography sx={{ padding: '0 1rem 0 1rem' }} variant='p' component='p'>
                    {currentUserDetails?.bio}
                  </Typography>

                  <Link
                    sx={{ display: 'flex', padding: '0 1rem 1rem 1rem' }}
                    href={currentUserDetails?.website}
                    target='_blank'
                    rel='noopener'>
                    {currentUserDetails?.website}
                  </Link>
                  <Typography sx={{ padding: '1rem' }} variant='span' component='span'>
                    {postDetails.length} Post
                  </Typography>
                  <Typography
                    onClick={handleOpenFollowersModal}
                    sx={{ padding: '1rem', cursor: 'pointer' }}
                    variant='span'
                    component='span'>
                    {currentUserDetails?.followers.length} Followers
                  </Typography>

                  <Typography
                    onClick={handleOpenFollowingModal}
                    sx={{ padding: '1rem', Scursor: 'pointer' }}
                    variant='span'
                    component='span'>
                    {currentUserDetails?.following.length} following
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Container>

          {postDetails?.length > 0 ? (
            postDetails.map((post) => <PostFeed key={post._id} post={post} />)
          ) : (
            <Typography sx={{ textAlign: 'center' }} variant='h4' component='h4'>
              No Post Yet
            </Typography>
          )}
        </ThemeProvider>
      )}
    </>
  );
};
