import React from 'react';
import { Avatar, Button, Box } from '@mui/material';

interface ProfileImageProps {
  profileImage: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete: () => void; // Prop para eliminar la imagen
}

const ProfileImage: React.FC<ProfileImageProps> = ({ profileImage, onImageChange, onImageDelete }) => (
  <>
    <Avatar
      src={profileImage || '/default-profile.png'} // Imagen por defecto si no hay imagen
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
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
      <Button
        variant="outlined"
        component="label"
        sx={{
          fontSize: '0.875rem', // Reducir el tamaño del texto
          padding: '6px 16px', // Ajustar el padding para hacerlo más pequeño
        }}
      >
        Cambiar foto
        <input type="file" accept="image/*" hidden onChange={onImageChange} />
      </Button>
      <Button
        variant="outlined"
        onClick={onImageDelete}
        sx={{
          fontSize: '0.875rem', // Reducir el tamaño del texto
          padding: '6px 16px', // Ajustar el padding para hacerlo más pequeño
        }}
      >
        Eliminar foto
      </Button>
    </Box>
  </>
);

export default ProfileImage;
