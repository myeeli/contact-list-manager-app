
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddContacts from './Components/AddContacts/AddContacts';
import ViewContacts from './Components/ViewContacts/ViewContacts';
import { Container, Grid } from '@mui/material';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editId, setEditId] = useState(null);

  const API = 'http://localhost:4500/api/contacts';

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${API}?search=${search}`);
        setContacts(res.data);
      } catch (err) {
        console.error('Error fetching contacts:', err);
      }
    };

    fetchContacts();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setErrorMessage('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      if (editId) {
        const res = await axios.put(`${API}/${editId}`, form);
        setContacts((prev) =>
          prev.map((contact) => (contact._id === editId ? res.data : contact))
        );
        setEditId(null);
      } else {
        const res = await axios.post(API, form);
        setContacts((prev) => [...prev, res.data]);
      }

      setForm({ firstName: '', lastName: '', email: '' });
    } catch (err) {
      if (err.response?.status === 409) {
        setErrorMessage('Contact with this email already exists.');
      } else {
        console.error('Failed to save contact:', err);
        setErrorMessage('Error saving contact.');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#fbeaff', minHeight: '95vh', paddingTop: '5vh' }}>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '8vw', backgroundColor: '#fbeaff' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <AddContacts
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
              errorMessage={errorMessage}
              editId={editId}
            />
          </Grid>
          <Grid item>
            <ViewContacts
              contacts={contacts}
              setContacts={setContacts}
              search={search}
              setSearch={setSearch}
              setForm={setForm}
              setEditId={setEditId}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
