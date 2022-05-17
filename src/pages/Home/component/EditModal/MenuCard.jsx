import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { EditModal } from './EditModal';
import { Box, Typography, Modal, Button, Popover } from '@mui/material';
import { deletePosts } from '../../../../store/postSlice';
import { useDispatch, useSelector } from 'react-redux';

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
        }}
      >
        <Button
          onClick={handleOpenModal}
          sx={{ color: 'black', textAlign: 'center' }}
          variant='text'
        >
          Edit
        </Button>
        <Button
          onClick={() =>
            dispatch(deletePosts({ postId: _id, encodedToken: token }))
          }
          sx={{ color: 'black', textAlign: 'center' }}
          variant='text'
        >
          Delete
        </Button>
      </Popover>
      <EditModal
        handleModalClose={handleModalClose}
        openModal={openModal}
        post={post}
      />
    </>
  );
};
