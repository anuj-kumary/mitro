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
      {followers.length > 0 ? (
        followers.map((users) => (
          <Modal
            open={openFollowersModal}
            onClose={handleCloseFollowersModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <Box sx={style}>
              {/* <Link to={`/profile/${users.username}`}>
                <CardHeader
                  avatar={<Avatar src={users.avatar} aria-label='recipe' />}
                  title={users?.username}
                />
              </Link> */}
            </Box>
          </Modal>
        ))
      ) : (
        <Modal
          open={openFollowersModal}
          onClose={handleCloseFollowersModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={style}>
            <Typography sx={{ textAlign: 'center' }} variant='h6' component='h6'>
              No Followers Yet
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};
