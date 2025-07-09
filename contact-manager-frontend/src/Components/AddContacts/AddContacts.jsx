
import React, { useState } from 'react';
import { TextField, Stack, Paper, Typography, Button } from '@mui/material';
import './AddContacts.scss';

const AddContacts = ({ form, setForm, handleSubmit, errorMessage, editId }) => {
  const [errors, setErrors] = useState({});

  //Validating Field Constraints
  const validateFields = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLocalSubmit = (e) => {
    if (validateFields()) {
      handleSubmit(e);
      setErrors({});
    } else {
      e.preventDefault();
    }
  };

  return (
    <Paper elevation={3} className="add-contact-container">
      <h3 className="add-contact-title">{editId ? 'Edit Contact' : 'Add Contact'}</h3>

      {errorMessage && (
        <Typography variant="body2" className="error-message">
          {errorMessage}
        </Typography>
      )}

      <form onSubmit={handleLocalSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
          <Button type="submit" variant="contained" className="add-button">
            {editId ? 'Update' : 'Add'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddContacts;
