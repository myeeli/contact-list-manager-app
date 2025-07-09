import React, { useState } from 'react';
import './ViewContacts.scss';
import {
  TextField,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const ViewContacts = ({ contacts, setContacts, search, setSearch, setForm, setEditId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedContactId(id);
    setOpenDialog(true);
  };

  //Function to call the delete functionality
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:4500/api/contacts/${selectedContactId}`);
      setContacts(contacts.filter(contact => contact._id !== selectedContactId));
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper elevation={3} className="contacts-container">
      <div className="search-wrapper">
        <TextField
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ // This is to display the search icon inside the TextField
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: '#F3E8FF',
              borderRadius: 8,
              width: '26vw',
              left: '13vw',
              top: '1vw'
            }
          }}
        />
      </div>

      <div className="contacts-list">
        {contacts.length === 0 ? (
          <div className="no-contacts">No contacts</div> // This is displayed if there are no contacts
        ) : (
          contacts.map((contact, index) => (
            <div key={contact._id} className={`contact-item ${index !== contacts.length - 1 ? 'bordered' : ''}`}>
              <div>
                <div>{`${contact.firstName} ${contact.lastName}`}</div>
                <div className="contact-email">{contact.email}</div>
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    setForm({
                      firstName: contact.firstName,
                      lastName: contact.lastName,
                      email: contact.email,
                    });
                    setEditId(contact._id);
                  }}
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(contact._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>Are you sure you want to delete this contact?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ViewContacts;
