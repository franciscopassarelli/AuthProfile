// ProfileImage.tsx
import React from 'react';
import { Avatar, Button } from '@mui/material';

interface ProfileImageProps {
  profileImage: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ profileImage, onImageChange }) => (
  <>
    <Avatar
      src={profileImage || '/default-profile.png'}
      sx={{
        width: 150,
        height: 150,
        margin: 'auto',
        marginBottom: 2,
        border: '5px solid black',
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      }}
    />
    <Button variant="outlined" component="label" sx={{ marginBottom: 3 }}>
      Cambiar foto
      <input type="file" accept="image/*" hidden onChange={onImageChange} />
    </Button>
  </>
);

export default ProfileImage;
