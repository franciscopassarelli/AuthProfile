import React from 'react';
import { TextField, Card, CardContent, Typography } from '@mui/material';

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, onChange, isEditing }) => (
  isEditing ? (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      multiline={label === "Descripción" || label === "Experiencia"} // solo multiline si es descripción o experiencia
      rows={label === "Descripción" || label === "Experiencia" ? 4 : 1} // ajustamos las filas para texto corto
      sx={{ marginBottom: 3 }}
    />
  ) : (
    <Card sx={{ marginTop: 6 }}>
      <CardContent>
        <Typography variant="h6">{label}</Typography>
        <Typography variant="body2" color="textSecondary">
          {value || `¡Agrega un ${label.toLowerCase()}!`}
        </Typography>
      </CardContent>
    </Card>
  )
);

export default EditableField;
