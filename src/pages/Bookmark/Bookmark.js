import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { PostFeed } from '../../pages/Home/component/PostFeed/PostFeed';

export const Bookmark = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  const getBookmarkPosts = (postId) => posts.filter((post) => post._id === postId)[0];

  return (
    <>
      {user.bookmarks?.length === 0 ? (
        <Typography
          sx={{
            textAlign: 'center',
            margin: '1rem 0',
            fontWeight: '650',
            fontFamily: 'var(--kanit-font-family)',
          }}
          id='modal-modal-title'
          variant='h3'
          component='h3'>
          No Bookmarks yet
        </Typography>
      ) : (
        <>
          <Typography
            sx={{ textAlign: 'center', margin: '1rem 0', fontWeight: '650' }}
            id='modal-modal-title'
            variant='h5'
            component='h5'>
            Bookmarks
          </Typography>
          <Box
            sx={{
              marginTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {user.bookmarks?.map((postId) => (
              <PostFeed key={postId} post={getBookmarkPosts(postId)} />
            ))}
          </Box>
        </>
      )}
    </>
  );
};
