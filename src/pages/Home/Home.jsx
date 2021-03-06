import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { PostCard } from './component/PostCard/PostCard';
import { PostFeed } from './component/PostFeed/PostFeed';
import { Suggestion } from './component/Suggestion/Suggestion';

export const Home = () => {
  const { posts, postSorting } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (currPost) =>
        user.following.find((user) => user.username === currPost.username) ||
        user.username === currPost.username,
    );
    switch (postSorting) {
      case 'TRENDING':
        setFilteredData(
          filteredPosts
            .filter((post) => post.likes.likeCount > 0)
            .sort((a, b) => b.likes.likeCount - a.likes.likeCount),
        );
        break;
      case 'OLDEST':
        setFilteredData(
          filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
        );
        break;
      case 'LATEST':
        setFilteredData(
          filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        );
        break;
      default:
        setFilteredData(filteredPosts);
    }
  }, [user, posts, postSorting]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Container
          sx={{
            marginTop: '1rem',
            display: 'flex',
            padding: '0 1rem',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              display: 'flex',
              marginTop: '1rem',
              justifyContent: 'space-around',
              maxWidth: '50rem',
              flex: '1 1 0%',
            }}>
            <PostCard />
          </Box>
          {filteredData.length > 0 ? (
            filteredData.map((post) => <PostFeed post={post} key={post._id} />)
          ) : (
            <Typography
              sx={{
                textAlign: 'center',
                fontFamily: 'var(--kanit-font-family)',
                color: 'var( --active-color)',
                paddingBottom: '6rem',
              }}
              variant='h4'
              component='h4'>
              Start Following and Liking your friends post to get updates on your feed
            </Typography>
          )}
        </Container>

        <Suggestion />
      </Box>
    </>
  );
};
