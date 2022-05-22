import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { PostFeed } from '../../pages/Home/component/PostFeed/PostFeed';
import { getBookmarkPost } from '../../store/postSlice';

export const Bookmark = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  console.log(user);

  const getBookmarkPosts = (postId) => posts.filter((post) => post._id === postId)[0];
  console.log(getBookmarkPosts());

  return (
    <>
      {user.bookmarks?.length === 0 ? (
        <Typography
          sx={{ textAlign: 'center', margin: '1rem 0', fontWeight: '650' }}
          id='modal-modal-title'
          variant='h2'
          component='h2'>
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
          {user.bookmarks?.map((postId) => (
            <PostFeed key={postId} post={getBookmarkPosts(postId)} />
          ))}
        </>
      )}
    </>
  );
};
