import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { bookmarkPostHandler, removeBookmarkHandler } from '../../../../store/authenticationSlice';
import {
  dislikedPostHandler,
  likedPostHandler,
  postCommentsHandler,
} from '../../../../store/postSlice';
import { ToastHandler } from '../../../../utils/toastutils';
import { MenuCard } from '../EditModal/MenuCard';
import { Comments } from './Comments';

export const PostFeed = ({ post }) => {
  const { content, _id } = post;
  const { user, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const [currUser, setCurrUser] = useState(null);
  const [showComment, setShowComment] = useState(2);
  const [commentData, setCommentData] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrUser(users.filter((user) => user.username === post.username)[0]);
  }, [post, user, users, currUser]);

  const likedByUser = () =>
    post.likes.likedBy.filter((users) => users._id === user._id).length !== 0;

  const bookmarkByUser = () => user.bookmarks.filter((postId) => postId === _id).length !== 0;

  const bookmarkPostByUser = () => {
    if (bookmarkByUser()) {
      dispatch(removeBookmarkHandler({ postId: _id, encodeToken: token }));
    } else {
      dispatch(bookmarkPostHandler({ postId: _id, encodeToken: token }));
    }
  };

  const likedPostByUser = () => {
    if (likedByUser()) {
      dispatch(dislikedPostHandler({ postId: _id, encodeToken: token }));
    } else {
      dispatch(likedPostHandler({ postId: _id, encodeToken: token }));
    }
  };

  const postCommentsByUser = () => {
    if (commentData === '') {
      ToastHandler('warn', 'Please Enter Something To Comment');
    } else {
      dispatch(postCommentsHandler({ postId: _id, commentData: commentData, encodeToken: token }));
    }
    setCommentData('');
  };

  return (
    <>
      {currUser && (
        <Container sx={{ width: 'auto', margin: '0' }}>
          <Box
            sx={{
              width: ' 580px',
              display: 'flex',
              justifyContent: 'right',
              marginBottom: '1rem',
            }}>
            <Card
              sx={{ width: '70ch', marginBottom: '1rem', fontFamily: 'var(--kanit-font-family)' }}>
              <CardHeader
                avatar={
                  <Avatar src={currUser?.avatar} sx={{ bgcolor: red[500] }} aria-label='recipe' />
                }
                titleTypographyProps={{ sx: { fontFamily: 'var(--kanit-font-family)' } }}
                subheaderTypographyProps={{ sx: { fontFamily: 'var(--kanit-font-family)' } }}
                action={<MenuCard post={post} />}
                title={currUser?.firstName + ' ' + currUser?.lastName}
                subheader={`@${currUser?.username}`}
              />
              <CardContent>
                <Typography
                  sx={{ fontFamily: 'var(--kanit-font-family)' }}
                  variant='body2'
                  color='text.secondary'>
                  {content}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton onClick={() => likedPostByUser()} aria-label='add to favorites'>
                  {likedByUser() ? (
                    <FavoriteIcon sx={{ color: red[500], fontSize: '1rem' }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />
                  )}

                  <Typography
                    sx={{
                      color: grey[500],
                      fontSize: '.9rem',
                      fontFamily: 'var(--kanit-font-family)',
                    }}
                    variant='span'
                    component='span'>
                    {post?.likes?.likeCount} Like
                  </Typography>
                </IconButton>
                <IconButton onClick={bookmarkPostByUser} aria-label='bookmark'>
                  {bookmarkByUser() ? (
                    <BookmarkIcon sx={{ fontSize: '1rem' }} />
                  ) : (
                    <BookmarkBorderIcon sx={{ fontSize: '1rem' }} />
                  )}

                  <Typography
                    sx={{
                      color: grey[500],
                      fontSize: '.9rem',
                      fontFamily: 'var(--kanit-font-family)',
                    }}
                    variant='span'
                    component='span'>
                    Bookmark
                  </Typography>
                </IconButton>
              </CardActions>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '0 1rem 1rem 1rem' }}>
                <Avatar
                  alt='Remy Sharp'
                  src={currUser?.avatar}
                  sx={{ width: 30, height: 30, position: 'relative', marginRight: '.5rem' }}
                />
                <TextField
                  id='input-with-sx'
                  label='Comments'
                  placeholder='Write your comments'
                  sx={{ width: '100%' }}
                  variant='standard'
                  value={commentData}
                  onChange={(e) => setCommentData(e.target.value)}
                />
                <Button
                  onClick={() => postCommentsByUser()}
                  sx={{ borderRadius: '5px' }}
                  variant='text'>
                  Post
                </Button>
              </Box>
              {post.comments
                ?.map((comment) => <Comments key={commentData?._id} comment={comment} _id={_id} />)
                .slice(0, showComment)}
              {post.comments?.length > 2 && (
                <Typography
                  sx={{
                    padding: ' 0 0 .5rem 3rem',
                    textDecoration: 'underline',
                    color: grey[500],
                    fontSize: '.9rem',
                    cursor: 'pointer',
                  }}
                  variant='p'
                  onClick={() => {
                    if (showComment === 2) {
                      setShowComment(post.comments.length);
                    } else {
                      setShowComment(2);
                    }
                  }}
                  component='p'>
                  {post.comments?.slice(0, showComment).length > 2
                    ? 'Hide comments'
                    : 'View all comments'}
                </Typography>
              )}
            </Card>
          </Box>
        </Container>
      )}
    </>
  );
};
