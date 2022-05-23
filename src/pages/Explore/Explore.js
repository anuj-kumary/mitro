import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { PostFeed } from '../../pages/Home/component/PostFeed/PostFeed';
import { getAllPosts } from '../../store/postSlice';

export const Explore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const { posts } = useSelector((state) => state.posts);

  return (
    <Box
      sx={{
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {posts.map((post) => (
        <PostFeed post={post} key={post._id} />
      ))}
    </Box>
  );
};
