import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Paper, Typography } from '@mui/material';
import { sortByTrendingAndLatest } from '../../../../store/postSlice';
import { getAllUser } from '../../../../store/userSlice';
import { SuggestionCard } from './SuggestionCard';

export const Suggestion = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const [sort, setSort] = useState(true);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  let userSuggestion = users.filter(
    (currUser) =>
      !user.following.find((innerCurrUser) => innerCurrUser._id === currUser._id) &&
      currUser.username !== user.username,
  );

  const sortByHandler = (e) => {
    setSort((sort) => !sort);
    console.log(e.target.innerText);
    dispatch(sortByTrendingAndLatest(e.target.innerText));
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', margin: '2rem' }}>
        <Paper elevation={3}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              padding: '1rem 1rem 0 1rem',
            }}>
            <Button
              onClick={(e) => dispatch(sortByTrendingAndLatest(e.target.innerText))}
              variant='outlined'>
              Trending
            </Button>
            <Button onClick={(e) => sortByHandler(e)} variant='outlined'>
              {sort ? 'OLDEST' : 'LATEST'}
            </Button>
          </Box>
          <Box
            sx={{
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '5px',
              marginRight: '1rem',
            }}>
            <Typography
              sx={{ textAlign: 'center', paddingBottom: '1rem', fontWeight: '650' }}
              variant='p'
              component='p'>
              Suggestions for you
            </Typography>
            {userSuggestion
              .map(
                (users) =>
                  users.username !== user.username && (
                    <SuggestionCard key={users._id} users={users} />
                  ),
              )
              .slice(0, 4)}
          </Box>
        </Paper>
      </Box>
    </>
  );
};
