const express = require('express');
const router = express.Router();
const Contacts = require('../model/Contacts');

// Fetch Contacts
router.get('/', async (req, res) => {
  const search = req.query.search || '';
  const query = {
    $or: [
      { firstName: new RegExp(search, 'i') },
      { lastName: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
    ],
  };
  const contacts = await Contacts.find(search ? query : {});
  res.json(contacts);
});

// Adding Contact
router.post('/', async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const exists = await Contacts.findOne({ email });
  if (exists) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const contact = new Contacts({ firstName, lastName, email });
  await contact.save();
  res.status(201).json(contact);
});

// Updating Contact
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if email is being changed to an already existing one
  const existingContact = await Contacts.findOne({ email, _id: { $ne: req.params.id } });
  if (existingContact) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  
  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, email },
    { new: true }
  );

  if (!updatedContact) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  res.json(updatedContact);
});

// Deleting Contact
router.delete('/:id', async (req, res) => {
  await Contacts.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
