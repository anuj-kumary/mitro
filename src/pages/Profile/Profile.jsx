import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { logoutHandler } from '../../store/authenticationSlice';
import { getUserPosts } from '../../store/profileSlice';
import { followUser, getAllUser, unfollowUser } from '../../store/userSlice';
import { PostFeed } from '../Home/component/PostFeed/PostFeed';
import { Suggestion } from '../Home/component/Suggestion/Suggestion';
import { EditProfile } from './components/EditProfile';
import { FollowersModal } from './components/FollowersModal';
import { FollowingModal } from './components/FollowingModal';

const theme = createTheme();

export const Profile = () => {
  const { username } = useParams();
  const { postDetails, currentUser } = useSelector((state) => state.profile);
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
      dispatch(getAllUser());
    }
  }, [username, currentUser, dispatch]);

  const currentUserDetails = users?.find((user) => user.username === username);

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
        <Box sx={{ display: 'flex' }}>
          <Container
            sx={{
              width: 'auto',
              margin: '1rem auto 0',
              display: 'flex',
              padding: '0 1rem',
              flexDirection: 'column',
            }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <EditProfile handleClose={handleClose} open={open} />
              <FollowingModal
                openFollowingModal={openFollowingModal}
                handleCloseFollowingModal={handleCloseFollowingModal}
                following={currentUserDetails?.following}
              />
              <FollowersModal
                handleCloseFollowersModal={handleCloseFollowersModal}
                openFollowersModal={openFollowersModal}
                followers={currentUserDetails?.followers}
              />

              <Container
                sx={{ display: 'flex', width: 'max-content', justifyContent: 'space-between' }}>
                <Paper elevation={3} sx={{ margin: '1rem 0', p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: 'flex', justifyContent: ' space-around' }}>
                    <Avatar
                      alt='Remy Sharp'
                      src={currentUserDetails?.avatar}
                      sx={{ width: '10.625rem', height: '10.625rem' }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          display: 'inline-block',
                          padding: '1rem 1rem 0 1rem',
                          fontFamily: 'var(--kanit-font-family)',
                        }}
                        variant='h5'
                        component='h5'>
                        {currentUserDetails?.firstName} {currentUserDetails?.lastName}
                      </Typography>
                      {user?.username === currentUserDetails?.username && (
                        <>
                          <Button
                            onClick={handleOpen}
                            sx={{ marginLeft: '8rem' }}
                            variant='contained'>
                            Edit Profile
                          </Button>
                          <IconButton
                            onClick={() => dispatch(logoutHandler())}
                            title='Logout'
                            sx={{ paddingLeft: '1rem' }}>
                            <LogoutIcon />
                          </IconButton>
                        </>
                      )}
                      {user.username !== currentUserDetails.username && (
                        <Button variant='contained' h='2rem' onClick={unFollowOrFollowHandler}>
                          {isFollowed() ? 'Following' : 'Follow'}
                        </Button>
                      )}

                      <Typography
                        sx={{ padding: '0 1rem 0 1rem', fontFamily: 'var(--font-family)' }}
                        variant='p'
                        component='p'>
                        @{currentUserDetails?.username}
                      </Typography>
                      <Typography
                        sx={{ fontFamily: 'var(--font-family)', padding: '0 1rem 0 1rem' }}
                        variant='p'
                        component='p'>
                        {currentUserDetails?.bio}
                      </Typography>

                      <Link
                        sx={{
                          fontFamily: 'var(--font-family)',
                          display: 'flex',
                          padding: '0 1rem 1rem 1rem',
                        }}
                        href={currentUserDetails?.website}
                        target='_blank'
                        rel='noopener'>
                        {currentUserDetails?.website}
                      </Link>
                      <Typography
                        sx={{
                          padding: '1rem',
                          fontFamily: 'var(--kanit-font-family)',
                          cursor: 'pointer',
                        }}
                        variant='span'
                        component='span'>
                        {postDetails.length} Post
                      </Typography>
                      <Typography
                        onClick={handleOpenFollowersModal}
                        sx={{
                          padding: '1rem',
                          fontFamily: 'var(--kanit-font-family)',
                          cursor: 'pointer',
                        }}
                        variant='span'
                        component='span'>
                        {currentUserDetails?.followers.length} Followers
                      </Typography>

                      <Typography
                        onClick={handleOpenFollowingModal}
                        sx={{
                          padding: '1rem',
                          fontFamily: 'var(--kanit-font-family)',
                          cursor: 'pointer',
                        }}
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
                <Typography
                  sx={{ textAlign: 'center', fontFamily: 'var(--kanit-font-family)' }}
                  variant='h4'
                  component='h4'>
                  No Post Yet
                </Typography>
              )}
            </ThemeProvider>
          </Container>
          <Suggestion />
        </Box>
      )}
    </>
  );
};
