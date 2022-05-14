import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';

export const PostCard = () => {
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
                <InputAdornment sx={{ padding: '.5rem 1.5rem' }} position='end'>
                  <Button variant='contained' component='label'>
                    Upload File
                    <input type='file' hidden />
                  </Button>
                </InputAdornment>
                <InputAdornment sx={{ padding: '.5rem 0' }} position='end'>
                  <Button variant='contained' component='label'>
                    Post
                  </Button>
                </InputAdornment>
              </>
            ),
          }}
          multiline
          rows={6}
        />
      </Box>
    </Box>
  );
};
