import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const COLORS = {
  primary: '#2c3e50',    // Azul oscuro profesional
  secondary: '#3498db',  // Azul brillante para acentos
  text: '#333333',       // Gris oscuro para lectura fácil
  lightGray: '#f4f4f4'   // Gris muy claro para el fondo de la sidebar
};

// Agrega esto arriba de tu componente PDFDocument
const BulletPoint = ({ children }: { children: string }) => (
  <View style={{ flexDirection: 'row', marginBottom: 4 }}>
    <Text style={{ width: 10, fontSize: 9 }}>•</Text>
    <Text style={{ flex: 1, fontSize: 9, lineHeight: 1.5 }}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#ffffff' },
  sidebar: { width: '35%', backgroundColor: COLORS.lightGray, padding: 25 },
  main: { width: '65%', padding: 25 },
  
  // Sidebar items
  profileImg: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  sidebarTitle: { color: COLORS.primary, fontSize: 12, fontWeight: 'bold', marginBottom: 10, marginTop: 15 },
  sidebarText: { fontSize: 9, color: COLORS.text, marginBottom: 5 },
  
  // Main items
  headerName: { fontSize: 24, color: COLORS.primary, fontWeight: 'bold', marginBottom: 5 },
  sectionTitle: { color: COLORS.primary, fontSize: 14, fontWeight: 'bold', borderBottom: `1px solid ${COLORS.secondary}`, paddingBottom: 4, marginBottom: 8, marginTop: 15 },
  text: { fontSize: 9, color: COLORS.text, lineHeight: 1.6, marginBottom: 8 }
});

export const PDFDocument = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Columna Izquierda (Sidebar) */}
      <View style={styles.sidebar}>
        {data.profileImage && <Image src={data.profileImage} style={styles.profileImg} />}
        
        <Text style={styles.sidebarTitle}>CONTACTO</Text>
        <Text style={styles.sidebarText}>{data.email}</Text>
        
        <Text style={styles.sidebarTitle}>HABILIDADES</Text>
        <Text style={styles.sidebarText}>{data.skills || 'No especificado'}</Text>
        
        <Text style={styles.sidebarTitle}>CERTIFICADOS</Text>
        <Text style={styles.sidebarText}>{data.certificates || 'No especificado'}</Text>
      </View>

      {/* Columna Derecha (Contenido) */}
      <View style={styles.main}>
        <Text style={styles.headerName}>{data.cvTitle || 'Nombre Profesional'}</Text>
        
        <Text style={styles.sectionTitle}>RESUMEN</Text>
        <Text style={styles.text}>{data.description}</Text>
        
        <Text style={styles.sectionTitle}>EXPERIENCIA</Text>
        {data.experience ? (
  data.experience
    .split('\n')
    .filter((line: string) => line.trim() !== '') // Esto evita que imprima puntos vacíos
    .map((line: string, index: number) => (
      <BulletPoint key={index}>
        {line.replace(/^[•*-]\s*/, '')}
      </BulletPoint>
    ))
) : (
  <Text style={styles.text}>No disponible</Text>
)}
        
        <Text style={styles.sectionTitle}>EDUCACIÓN</Text>
        <Text style={styles.text}>{data.techDescription}</Text>
        
        <Text style={styles.sectionTitle}>TECNOLOGÍAS</Text>
        <Text style={styles.text}>{data.technology}</Text>
      </View>
    </Page>
  </Document>
);