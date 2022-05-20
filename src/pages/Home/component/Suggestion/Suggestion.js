import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { getAllUser } from '../../../../store/userSlice';
import { SuggestionCard } from './SuggestionCard';

export const Suggestion = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  let userSuggestion = users.filter(
    (currUser) =>
      !user.following.find((innerCurrUser) => innerCurrUser._id === currUser._id) &&
      currUser.username !== user.username,
  );

  return (
    <>
      <Box
        sx={{
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '5px',
        }}>
        <Typography sx={{ paddingBottom: '1rem', fontWeight: '650' }} variant='p' component='p'>
          Suggestions for you
        </Typography>
        {userSuggestion.map(
          (users) =>
            users.username !== user.username && <SuggestionCard key={users._id} users={users} />,
        )}
      </Box>
    </>
  );
};
