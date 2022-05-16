import { PostCard } from './component/PostCard/PostCard';
import { PostFeed } from './component/PostFeed/PostFeed';
import { SuggestionCard } from '../../components';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

export const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <PostCard />
        <SuggestionCard />
      </Box>
      {posts.map((post) => (
        <PostFeed post={post} key={post._id} />
      ))}
    </>
  );
};
