import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../../../store/postSlice';

export const PostCard = () => {
  const { token } = useSelector((state) => state.auth);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const newPostHandler = () => {
    dispatch(
      createNewPost({
        post: { content },
        encodedToken: token,
      })
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
      autoComplete='off'
    >
      <Box>
        <TextField
          InputProps={{
            sx: { alignItems: 'flex-end' },
            endAdornment: (
              <>
                <InputAdornment sx={{ padding: '.5rem 0' }} position='end'>
                  <Button
                    onClick={() => newPostHandler()}
                    variant='contained'
                    component='label'
                  >
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
        />
      </Box>
    </Box>
  );
};
