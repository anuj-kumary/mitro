import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Modal, Popover, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { deletePosts } from '../../../../store/postSlice';
import { EditModal } from './EditModal';

export const MenuCard = ({ post }) => {
  const [openModal, setOpenModal] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const { _id } = post;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    handleClose();
    setOpenModal(true);
  };

  const handleModalClose = () => setOpenModal(false);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <IconButton onClick={handleClick} aria-label='settings'>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <Button
            onClick={handleOpenModal}
            sx={{
              fontSize: '1rem',
              color: 'black',
              fontFamily: 'var(--kanit-font-family)',
            }}
            variant='text'>
            Edit
          </Button>
          <Button
            onClick={() => dispatch(deletePosts({ postId: _id, encodedToken: token }))}
            sx={{
              fontSize: '1rem',
              color: 'black',
              fontFamily: 'var(--kanit-font-family)',
            }}
            variant='text'>
            Delete
          </Button>
        </Box>
      </Popover>
      <EditModal handleModalClose={handleModalClose} openModal={openModal} post={post} />
    </>
  );
};
