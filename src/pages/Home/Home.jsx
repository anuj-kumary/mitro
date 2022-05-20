import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { PostCard } from './component/PostCard/PostCard';
import { PostFeed } from './component/PostFeed/PostFeed';
import { Suggestion } from './component/Suggestion/Suggestion';

export const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          marginTop: '2rem',
          justifyContent: 'space-around',
        }}>
        <PostCard />
        <Suggestion />
      </Box>
      {posts.map((post) => (
        <PostFeed post={post} key={post._id} />
      ))}
    </>
  );
};
