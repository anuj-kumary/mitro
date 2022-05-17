import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  TextareaAutosize,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { editPosts } from '../../../../store/postSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: 2,
};

export const EditModal = ({ handleModalClose, openModal, post }) => {
  const { token } = useSelector((state) => state.auth);
  const [content, setContent] = useState(post?.content);
  const dispatch = useDispatch();
  const updatePostHandler = () => {
    dispatch(
      editPosts({
        postData: { ...post, content: content },
        encodedToken: token,
      })
    );
    handleModalClose();
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h5' component='h5'>
            Edit Post
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '3rem',
            }}
          >
            <TextareaAutosize
              aria-label='minimum height'
              minRows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: 300, border: 'none', outline: 'none' }}
            />
          </Box>
          <Button
            onClick={() => updatePostHandler()}
            sx={{ color: 'black', border: '1px solid #111 ' }}
            variant='text'
          >
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
};
