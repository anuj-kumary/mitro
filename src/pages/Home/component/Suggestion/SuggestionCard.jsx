import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';
import { followUser } from '../../../../store/userSlice';

export const SuggestionCard = ({ users }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`/profile/${users.username}`}>
          <CardHeader
            avatar={<Avatar src={users.avatar} sx={{ bgcolor: red[500] }} aria-label='recipe' />}
            title={users?.username}
          />
        </Link>
        <Button
          onClick={() =>
            dispatch(followUser({ followUserId: users._id, authToken: token, dispatch }))
          }
          variant='contained'>
          Follow
        </Button>
      </Box>
      <hr />
    </Box>
  );
};
