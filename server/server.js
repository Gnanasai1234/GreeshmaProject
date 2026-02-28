const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const predictionRoutes = require('./routes/predictions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        // Allow any localhost origin (handles port 3000, 3001, etc.)
        if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', predictionRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'DiaPredict API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 DiaPredict server running on port ${PORT}`);
});
