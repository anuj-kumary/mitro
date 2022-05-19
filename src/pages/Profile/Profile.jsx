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
import { getUserPosts, userDetails } from '../../store/profileSlice';
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

  useEffect(() => {
    dispatch(userDetails(username));
    dispatch(getUserPosts(username));
  }, [dispatch, username]);

  const isFollowed = () =>
    profileDetails?.followers.some((users) => users.username === user.username);

  const unFollowOrFollowHandler = () => {
    isFollowed()
      ? dispatch(unfollowUser({ followUserId: profileDetails._id, token, dispatch }))
      : dispatch(followUser({ followUserId: profileDetails._id, token, dispatch }));
  };

  console.log(profileDetails);
  console.log(user);

  return (
    <>
      {profileDetails && (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <EditProfile handleClose={handleClose} open={open} />
          <FollowingModal
            openFollowingModal={openFollowingModal}
            handleCloseFollowingModal={handleCloseFollowingModal}
            following={profileDetails.following}
          />
          <FollowersModal
            handleCloseFollowersModal={handleCloseFollowersModal}
            openFollowersModal={openFollowersModal}
            followers={profileDetails.followers}
          />

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
                  {user?.username === profileDetails?.username && (
                    <Button onClick={handleOpen} sx={{ marginLeft: '8rem' }} variant='contained'>
                      Edit
                    </Button>
                  )}
                  {user.username !== profileDetails.username && (
                    <Button variant='outline' h='2rem' onClick={unFollowOrFollowHandler}>
                      {isFollowed() ? 'Following' : 'Follow'}
                    </Button>
                  )}

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
                  <Typography
                    onClick={handleOpenFollowersModal}
                    sx={{ padding: '1rem', cursor: 'pointer' }}
                    variant='span'
                    component='span'>
                    160 Followers
                  </Typography>

                  <Typography
                    onClick={handleOpenFollowingModal}
                    sx={{ padding: '1rem', cursor: 'pointer' }}
                    variant='span'
                    component='span'>
                    {user?.following.length} following
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
