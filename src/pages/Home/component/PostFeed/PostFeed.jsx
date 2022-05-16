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
import { MenuCard } from '../EditModal/MenuCard';

export const PostFeed = ({ post }) => {
  const { content, username, createdAt } = post;
  return (
    <Box
      sx={{
        marginLeft: '11rem',
        marginTop: '1rem',
      }}
    >
      <Card sx={{ width: '70ch', marginBottom: '1rem' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              A
            </Avatar>
          }
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
