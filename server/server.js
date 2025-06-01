const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth')
const morgan = require('morgan')
const logger = require('./utils/logger')
const app = express();


// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Home Inventory Manager API');
});

// add logger
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));

app.use('/api/auth', authRoutes)
app.use('/api/items', authMiddleware, itemRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});