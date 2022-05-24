import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Button, Modal, Popover, TextareaAutosize, Typography } from '@mui/material';
import {
  deleteCommentsHandler,
  editCommentsHandler,
  getAllPosts,
} from '../../../../store/postSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '1rem',
  borderRadius: '5px',
};

export const Comments = ({ comment, _id }) => {
  const { user, token } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [comments, setComments] = useState('');

  // useEffect(() => {
  //   dispatch(getAllPosts());
  // }, [posts, dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editComments = () => {
    dispatch(
      editCommentsHandler({
        postId: _id,
        commentId: comment._id,
        commentData: comments,
        encodedToken: token,
      }),
    );
    handleModalClose();
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => {
    setComments(comment.text);
    setOpenModal(true);
  };
  const handleModalClose = () => setOpenModal(false);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 1rem 1rem 1rem' }}>
        <Avatar
          alt='Remy Sharp'
          src={user?.avatar}
          sx={{ width: 30, height: 30, position: 'relative', marginRight: '.5rem' }}
        />

        <Typography
          sx={{
            color: '#616161',
            fontSize: '.7rem',
            backgroundColor: '#e0e0e0',
            width: ' 100%',
            padding: '0.5rem',
            borderRadius: '10px',
          }}
          variant='h6'
          component='h6'>
          {comment.text}
          <MoreVertIcon onClick={handleClick} sx={{ cursor: 'pointer', float: 'right' }} />
        </Typography>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <Button
          onClick={handleModalOpen}
          sx={{ color: 'black', textAlign: 'center' }}
          variant='text'>
          Edit
        </Button>
        <Button
          onClick={() =>
            dispatch(
              deleteCommentsHandler({
                postId: _id,
                commentId: comment._id,
                commentData: comments,
                encodedToken: token,
              }),
            )
          }
          sx={{ color: 'black', textAlign: 'center' }}
          variant='text'>
          Delete
        </Button>
      </Popover>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h5' component='h5'>
            Edit Comment
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '3rem',
            }}>
            <TextareaAutosize
              aria-label='minimum height'
              minRows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              style={{ width: 300, border: 'none', outline: 'none' }}
            />
          </Box>
          <Button
            onClick={() => editComments()}
            sx={{ color: 'black', border: '1px solid #111 ' }}
            variant='text'>
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
