import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { getAllUser } from '../../../../store/userSlice';
import { SuggestionCard } from './SuggestionCard';

export const Suggestion = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

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
        {userSuggestion.map((users) => (
          <SuggestionCard key={users._id} users={users} />
        ))}
      </Box>
    </>
  );
};
