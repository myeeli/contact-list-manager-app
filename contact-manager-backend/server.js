const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactRoutes);

// Connect to MongoDB only when not in test mode
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');
    app.listen(4500, () => console.log('Server running on http://localhost:4500'));
  });
}

// ✅ Export the Express app (not server)
module.exports = app;
