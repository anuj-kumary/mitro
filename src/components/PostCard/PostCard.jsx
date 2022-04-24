import React from 'react';
import { Box , TextField } from '@mui/material';

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
        <TextField multiline rows={6} />
      </Box>
    </Box>
  );
};
