import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, CardHeader, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { followUser } from '../../../../store/userSlice';

export const SuggestionCard = ({ users }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to={`/profile/${users.username}`}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CardHeader
              sx={{ padding: '1rem 0 0 1rem' }}
              avatar={<Avatar src={users.avatar} sx={{ bgcolor: red[500] }} aria-label='recipe' />}
            />
            <Typography sx={{ textTransform: 'capitalize' }} variant='span' component='span'>
              {users?.username}
            </Typography>
          </Box>
        </Link>
        <Box sx={{ paddingLeft: '.5rem' }}>
          <Button
            onClick={() =>
              dispatch(followUser({ followUserId: users._id, authToken: token, dispatch }))
            }
            variant='contained'>
            Follow
          </Button>
        </Box>
      </Box>
      <hr />
    </Box>
  );
};
