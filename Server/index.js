const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));