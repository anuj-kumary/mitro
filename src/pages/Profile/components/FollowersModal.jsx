import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, CardHeader, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export const FollowersModal = ({ handleCloseFollowersModal, openFollowersModal, followers }) => {
  return (
    <div>
      <Modal
        open={openFollowersModal}
        onClose={handleCloseFollowersModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        {followers.length > 0 ? (
          <Box sx={style}>
            <Typography
              sx={{
                fontFamily: 'var(--kanit-font-family)',
                cursor: 'pointer',
              }}
              variant='h5'
              component='span'>
              Folllowers
            </Typography>
            {followers.map((user) => (
              <Box>
                <Link to={`/profile/${user?.username}`}>
                  <CardHeader
                    titleTypographyProps={{ sx: { fontFamily: 'var(--kanit-font-family)' } }}
                    subheaderTypographyProps={{ sx: { fontFamily: 'var(--kanit-font-family)' } }}
                    avatar={<Avatar src={user?.avatar} aria-label='recipe' />}
                    title={user?.username}
                  />
                </Link>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              sx={{ fontFamily: 'var(--kanit-font-family)', textAlign: 'center' }}
              variant='h6'
              component='h6'>
              No Followers Yet
            </Typography>
          </Box>
        )}
      </Modal>
    </div>
  );
};
