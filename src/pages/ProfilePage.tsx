import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, CardHeader, TextField } from '@mui/material';
import { jsPDF } from 'jspdf';
import ProfileImage from '../components/profilecomponents/ProfileImage';
import EditableField from '../components/profilecomponents/EditableField';

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [newDescription, setNewDescription] = useState<string>('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [technology, setTechnology] = useState<string>('');
  const [techDescription, setTechDescription] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [certificates, setCertificates] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [cvTitle, setCvTitle] = useState<string>(''); // Default title is 'CV'
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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = 20;

    const addText = (text: string, size: number = 12, yOffset: number = 0) => {
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, margin, yPosition + yOffset);
      return lines.length * 7;
    };

    // Título personalizado
    doc.setFontSize(16);
    doc.text(cvTitle, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 1;

    // Foto redonda y email al lado derecho
    if (userInfo?.profileImage) {
      // Primero, hacemos la foto redonda
      const photoSize = 50;
      const photoX = margin;
      const photoY = yPosition + 20;

      // Dibuja un círculo blanco donde irá la foto
      doc.setFillColor(255, 255, 255); // Blanco
      doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 'F'); // Círculo relleno

      // Ahora agregamos la imagen recortada en forma circular
      doc.addImage(userInfo.profileImage, 'JPEG', photoX, photoY, photoSize, photoSize, undefined, 'SLOW'); // Slow para mejorar la calidad

      // Agregar el email a la derecha de la foto
      const emailX = photoX + photoSize + 10; // 10px de separación entre la foto y el email
      doc.setFontSize(12);
      doc.text(`Email: ${userInfo?.email}`, emailX, yPosition + 40); // Alineamos el email al lado de la foto
      yPosition += 70; // Espaciamos un poco más para la siguiente sección
    }

    doc.setDrawColor(0);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // Descripción
    yPosition += addText("Acerca de", 14, 10);
    yPosition += addText(newDescription || 'No disponible', 12, 10);
    yPosition += 5;

    // Divisores
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // Tecnología
    yPosition += addText("Tecnología", 14, 10);
    yPosition += addText(technology || 'No disponible', 12, 10);
    yPosition += 5;

    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // Descripción de Tecnología
    yPosition += addText("Descripción de Tecnología", 14, 10);
    yPosition += addText(techDescription || 'No disponible', 12, 10);
    yPosition += 5;

    // Experiencia
    yPosition += addText("Experiencia", 14, 10);
    yPosition += addText(experience || 'No disponible', 12, 10);
    yPosition += 5;

    doc.save("perfil_usuario.pdf");
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
            label="Descripción"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            isEditing={isEditing}
          />

          {/* Cards editables en el centro */}
          <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={6} md={3} sx={{ marginBottom: 2 }}>
              <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                <CardHeader title="Tecnología" />
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
                <CardHeader title="Descripción de Tecnología" />
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
              <Button variant="contained" color="primary" onClick={handleExportPDF}>
                Exportar a PDF
              </Button>
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
