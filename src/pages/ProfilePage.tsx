import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, CardHeader, TextField } from '@mui/material';
import ProfileImage from '../components/profilecomponents/ProfileImage';
import EditableField from '../components/profilecomponents/EditableField';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFDocument } from '../components/PDFDocument';


const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [newDescription, setNewDescription] = useState<string>('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [technology, setTechnology] = useState<string>('');
  const [techDescription, setTechDescription] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [certificates, setCertificates] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [cvTitle, setCvTitle] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserEmail = localStorage.getItem('userEmail');
    if (!storedUserEmail) {
      navigate('/login');
    } else {
      const storedUser = localStorage.getItem(storedUserEmail);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserInfo(parsedUser);
        setNewDescription(parsedUser.description || '');
        setTechnology(parsedUser.technology || '');
        setTechDescription(parsedUser.techDescription || '');
        setSkills(parsedUser.skills || '');
        setCertificates(parsedUser.certificates || '');
        setExperience(parsedUser.experience || '');
        setCvTitle(parsedUser.cvTitle || '');
        setTimeout(() => setLoading(false), 1000);
      }
    }
  }, [navigate]);

  const currentData = useMemo(() => ({
  ...userInfo,
  cvTitle,
  description: newDescription,
  technology,
  techDescription,
  skills,
  certificates,
  experience
}), [userInfo, cvTitle, newDescription, technology, techDescription, skills, certificates, experience]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        if (userInfo) {
          const updatedUser = { ...userInfo, profileImage: base64Image };
          localStorage.setItem(userInfo.email, JSON.stringify(updatedUser));
          setUserInfo(updatedUser);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (userInfo) {
      const updatedUser = {
        ...userInfo,
        description: newDescription,
        profileImage: newImage ? URL.createObjectURL(newImage) : userInfo.profileImage,
        technology,
        techDescription,
        skills,
        certificates,
        experience,
        cvTitle
      };
      localStorage.setItem(userInfo.email, JSON.stringify(updatedUser));
      setUserInfo(updatedUser);
      setIsEditing(false);
      alert('Perfil actualizado exitosamente');
    }
  };

  const handleImageDelete = () => {
    if (userInfo) {
      const updatedUser = { ...userInfo, profileImage: null };
      localStorage.setItem(userInfo.email, JSON.stringify(updatedUser));
      setUserInfo(updatedUser);
    }
  };

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      localStorage.removeItem('userEmail');
      navigate('/login');
    }
  };

 

 

  return (
    <Box sx={{ textAlign: 'center', paddingTop: 5 }}>
      {loading ? (
        <Typography variant="body1">Cargando perfil...</Typography>
      ) : userInfo ? (
        <>
          <Typography
  variant="h4"
  gutterBottom
  sx={{
    wordWrap: 'break-word', // Rompe la palabra si es necesario
    overflow: 'hidden', // Evita que el texto se desborde
    textOverflow: 'ellipsis', // Muestra puntos suspensivos si el texto es demasiado largo
    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Ajuste dinámico del tamaño de la fuente
    textAlign: 'center', // Centrar el texto en la pantalla
  }}
>
  Bienvenido, {userInfo.email}
</Typography>

<Box sx={{ textAlign: 'center', paddingTop: 5, marginBottom: 4 }}>
<ProfileImage 
            profileImage={userInfo.profileImage} 
            onImageChange={handleImageChange} 
            onImageDelete={handleImageDelete}  // Pasamos el método de eliminar la imagen
          />
</Box>
          {/* Descripción */}
          <EditableField
            label="Perfíl Profesional"
            value={cvTitle}
            onChange={(e) => setCvTitle(e.target.value)}
            isEditing={isEditing}
          />

          {/* Campo de Descripción */}
          <EditableField
            label="Resumen Profesional"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            isEditing={isEditing}
          />

          {/* Cards editables en el centro */}
          <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={6} md={3} sx={{ marginBottom: 2 }}>
              <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                <CardHeader title="Tecnologías" />
                <CardContent sx={{ flex: 1 }}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={technology}
                      onChange={(e) => setTechnology(e.target.value)}
                      multiline
                      rows={4}
                    />
                  ) : (
                    <Typography>{technology || 'No disponible'}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                <CardHeader title="Educación" />
                <CardContent sx={{ flex: 1 }}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={techDescription}
                      onChange={(e) => setTechDescription(e.target.value)}
                      multiline
                      rows={4}
                    />
                  ) : (
                    <Typography>{techDescription || 'No disponible'}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                <CardHeader title="Habilidades" />
                <CardContent sx={{ flex: 1 }}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      multiline
                      rows={4}
                    />
                  ) : (
                    <Typography>{skills || 'No disponible'}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                <CardHeader title="Certificados" />
                <CardContent sx={{ flex: 1 }}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={certificates}
                      onChange={(e) => setCertificates(e.target.value)}
                      multiline
                      rows={4}
                    />
                  ) : (
                    <Typography>{certificates || 'No disponible'}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Campo de experiencia fuera de las cards, al igual que la descripción */}
          <EditableField label="Experiencia" value={experience} onChange={(e) => setExperience(e.target.value)} isEditing={isEditing} />

          {/* Botones de acción */}
          <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
            <Grid item>
              {isEditing ? (
                <Button variant="contained" color="primary" onClick={handleSaveProfile}>
                  Guardar Cambios
                </Button>
              ) : (
                <Button variant="contained" color="secondary" onClick={() => setIsEditing(true)}>
                  Modificar Perfil
                </Button>
              )}
            </Grid>
<Grid item>
   <PDFDownloadLink 
  document={<PDFDocument data={currentData} />} 
  fileName={`${userInfo.email}_CV.pdf`}
>
  {({ blob, url, loading, error }) => 
    <Button variant="contained" color="primary">
      {loading ? 'Preparando...' : 'Descargar PDF'}
    </Button>
  }
</PDFDownloadLink>
</Grid>
          

            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="body1">Cargando perfil...</Typography>
      )}
    </Box>
  );
};

export default ProfilePage;
