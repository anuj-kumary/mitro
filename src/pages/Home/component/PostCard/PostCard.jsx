import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, InputAdornment, TextField } from '@mui/material';
import { createNewPost } from '../../../../store/postSlice';

export const PostCard = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

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
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': {
          width: '70ch',
        },
      }}
      noValidate
      autoComplete='off'>
      <Box sx={{ borderWidth: '0px', outline: 'none' }}>
        <TextField
          InputProps={{
            sx: {
              alignItems: 'flex-end',
              position: 'relative',
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
          src={user.avatar}
          sx={{ position: 'absolute', width: '50px', height: '50px', top: '100px', left: '190px' }}
        />
      </Box>
    </Box>
  );
};
