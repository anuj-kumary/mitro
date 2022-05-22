import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Container, InputAdornment, TextField } from '@mui/material';
import { createNewPost } from '../../../../store/postSlice';

export const PostCard = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { posts } = useSelector((state) => state?.posts);
  const [content, setContent] = useState('');
  const [currUser, setCurrUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrUser(users.filter((user) => user.username === user?.username)[0]);
  }, [posts, users]);

  const newPostHandler = () => {
    dispatch(
      createNewPost({
        post: { content },
        encodedToken: token,
      }),
    );
    setContent('');
  };

  return (
    <Container>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': {
            width: '70ch',
          },
        }}
        noValidate
        autoComplete='off'>
        <Box
          sx={{ borderWidth: '0px', outline: 'none', marginBottom: '1rem', position: 'relative' }}>
          <TextField
            InputProps={{
              sx: {
                alignItems: 'flex-end',
                borderWidth: '0px',
                outline: 'none',
                paddingLeft: ' 5rem',
              },
              endAdornment: (
                <>
                  <InputAdornment sx={{ padding: '.5rem 0' }} position='end'>
                    <Button onClick={() => newPostHandler()} variant='contained' component='label'>
                      Post
                    </Button>
                  </InputAdornment>
                </>
              ),
            }}
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
          />
          <Avatar
            alt='Remy Sharp'
            src={currUser?.avatar}
            sx={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              top: '10px',
              left: '10px',
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};
