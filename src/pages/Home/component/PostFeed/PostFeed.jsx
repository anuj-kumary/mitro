import * as React from 'react';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { MenuCard } from '../EditModal/MenuCard';

export const PostFeed = ({ post }) => {
  const { content, username, createdAt } = post;
  const { user } = useSelector((state) => state.auth);
  return (
    <Box
      sx={{
        marginLeft: '11rem',
        marginTop: '1rem',
      }}>
      <Card sx={{ width: '70ch', marginBottom: '1rem' }}>
        <CardHeader
          avatar={<Avatar src={user.avatar} sx={{ bgcolor: red[500] }} aria-label='recipe' />}
          action={<MenuCard post={post} />}
          title={username}
          subheader={createdAt}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {content}
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
