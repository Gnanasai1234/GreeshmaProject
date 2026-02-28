const express = require('express');
const axios = require('axios');
const pool = require('../config/db');

const router = express.Router();

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

// POST /api/predict
router.post('/predict', async (req, res) => {
    try {
        const { userId, pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, dpf, age } = req.body;

        // Call Flask ML service
        const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict`, {
            pregnancies: Number(pregnancies),
            glucose: Number(glucose),
            bloodPressure: Number(bloodPressure),
            skinThickness: Number(skinThickness),
            insulin: Number(insulin),
            bmi: Number(bmi),
            dpf: Number(dpf),
            age: Number(age)
        });

        const { result, confidence } = mlResponse.data;

        // Save prediction to database
        const [dbResult] = await pool.query(
            `INSERT INTO predictions 
             (user_id, pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, dpf, age, result, confidence) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, dpf, age, result, confidence]
        );

        res.json({
            id: dbResult.insertId,
            result,
            confidence,
            inputs: { pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, dpf, age }
        });
    } catch (error) {
        console.error('Prediction error:', error.message);
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({ message: 'ML service is not running. Start the Flask server on port 5001.' });
        }
        res.status(500).json({ message: 'Prediction failed', error: error.message });
    }
});

// GET /api/predictions/:userId
router.get('/predictions/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [predictions] = await pool.query(
            'SELECT * FROM predictions WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        res.json(predictions);
    } catch (error) {
        console.error('Get predictions error:', error);
        res.status(500).json({ message: 'Failed to fetch predictions' });
    }
});

module.exports = router;
