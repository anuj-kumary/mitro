import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, CardHeader, Modal, Typography } from '@mui/material';

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

export const FollowingModal = ({ openFollowingModal, handleCloseFollowingModal, following }) => {
  return (
    <div>
      <Modal
        open={openFollowingModal}
        onClose={handleCloseFollowingModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        {following.length > 0 ? (
          <Box sx={style}>
            <Typography
              sx={{
                fontFamily: 'var(--kanit-font-family)',
                cursor: 'pointer',
              }}
              variant='h5'
              component='span'>
              Following
            </Typography>
            {following.map((user) => (
              <Box>
                <Link to={`/profile/${user?.username}`}>
                  <CardHeader
                    titleTypographyProps={{ sx: { fontFamily: 'var(--kanit-font-family)' } }}
                    subheaderTypographyProps={{ sx: { fontFamily: 'var(--kanit-font-family)' } }}
                    avatar={<Avatar src={user?.avatar} aria-label='recipe' />}
                    title={user?.firstName + ' ' + user?.lastName}
                    subheader={`@${user?.username}`}
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
              No Following Yet
            </Typography>
          </Box>
        )}
      </Modal>
    </div>
  );
};
