import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { PostFeed } from '../../pages/Home/component/PostFeed/PostFeed';
import { getAllPosts } from '../../store/postSlice';

export const Explore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const { posts } = useSelector((state) => state.posts);

  return (
    <>
      {posts.map((post) => (
        <PostFeed post={post} key={post._id} />
      ))}
    </>
  );
};
