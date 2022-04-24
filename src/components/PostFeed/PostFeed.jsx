import * as React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const PostFeed = () => {
  return (
    <Box
      sx={{
        marginLeft: '11rem',
      }}
    >
      <Card sx={{ width: '70ch' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              A
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title='adarshbalak'
          subheader='September 14, 2016'
        />
        <CardMedia
          component='img'
          height='100%'
          image='https://m.media-amazon.com/images/M/MV5BZDA1ODgyODEtOWI3Yy00N2UzLTk5ZGMtZGI1MzU5YzFkZDQ1XkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_.jpg'
          alt='Paella dish'
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};
