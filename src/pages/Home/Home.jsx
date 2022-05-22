import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
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
            width: 'auto',
            margin: '1rem auto 0',
            display: 'flex',
            padding: '0 1rem',
            flexDirection: 'column',
          }}>
          <Box
            sx={{
              display: 'flex',
              marginTop: '2rem',
              justifyContent: 'space-around',
              maxWidth: '50rem',
              flex: '1 1 0%',
            }}>
            <PostCard />
          </Box>
          {filteredData.map((post) => (
            <PostFeed post={post} key={post._id} />
          ))}
        </Container>

        <Suggestion />
      </Box>
    </>
  );
};
