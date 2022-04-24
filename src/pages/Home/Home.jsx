import { PostCard, PostFeed, SuggestionCard } from '../../components';
import Box from '@mui/material/Box';

export const Home = () => {
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

      <PostFeed />
    </>
  );
};
