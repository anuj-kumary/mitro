import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Avatar, Box, Button, Input, Modal, Typography } from '@mui/material';
import { editProfile } from '../../../store/authenticationSlice';
import { ToastHandler } from '../../../utils/toastutils';

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

export const EditProfile = ({ handleClose, open }) => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website);
  const [avatar, setAvatar] = useState(user.avatar);

  const uploadImageHandler = async (img) => {
    const data = new FormData();
    data.append('file', img);
    data.append('upload_preset', 'ty4kew5l');
    const requestOptions = {
      method: 'POST',
      body: data,
    };
    await fetch('https://api.cloudinary.com/v1_1/anujy0510/image/upload', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setAvatar(json.url);
        console.log(json.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    dispatch(editProfile({ userDetails: { avatar, bio, website }, token }));
    ToastHandler('success', 'Profile Updated Succesfully');
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Avatar
            alt='Remy Sharp'
            src={avatar}
            sx={{ width: 100, height: 100, position: 'relative' }}
          />
          <Box sx={{ cursor: 'pointer' }} htmlFor='avatar' component='label'>
            <CameraAltIcon sx={{ position: 'absolute', top: '6rem', left: '7rem' }} />
            <Input
              sx={{ display: 'none' }}
              id='avatar'
              name='avatar'
              type='file'
              onChange={(e) => uploadImageHandler(e.target.files[0])}
              accept='image/*'
            />
          </Box>

          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem 0 0 0',
              }}>
              <Typography variant='h5' component='h5'>
                Name
              </Typography>
              <Typography variant='h5' component='h5'>
                {user.firstName} {user.lastName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Typography variant='p' component='p'>
                Username
              </Typography>
              <Typography variant='p' component='p'>
                {user.username}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Typography sx={{ padding: ' 1rem 0 ' }} variant='p' component='p'>
                Bio
              </Typography>
              <Input value={bio} onChange={(e) => setBio(e.target.value)} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Typography sx={{ padding: ' 1rem 0 ' }} variant='p' component='p'>
                Website
              </Typography>
              <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
            </Box>
          </Box>
          <Button onClick={updateProfile} variant='contained'>
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
};
