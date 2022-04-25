import * as React from 'react';
import { Box, Card, CardHeader, Avatar, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

const card = (
  <React.Fragment>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
          A
        </Avatar>
      }
      title='anuj'
    />
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
          R
        </Avatar>
      }
      title='Rohan'
    />
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
          A
        </Avatar>
      }
      title='Aman'
    />
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
          A
        </Avatar>
      }
      title='Rutvik'
    />
  </React.Fragment>
);

export const SuggestionCard = () => {
  return (
    <Box
      sx={{
        overflow: 'auto',
        width: '12rem',
        maxHeight: '300px',
        paddingLeft: '10rem',
      }}
    >
      <Card variant='outlined'>{card}</Card>
    </Box>
  );
};
