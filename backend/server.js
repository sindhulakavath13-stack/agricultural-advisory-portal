
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Read existing Angular crop data
const cropsData = require(
    path.join(__dirname, '..', 'src', 'assets', 'data', 'crops.json')
);

// Temporary storage for registered farmers
const farmers = [];

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Agricultural Advisory Portal Backend is running!',
        status: 'success'
    });
});

// Health-check API
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Express server is working'
    });
});

// Get all crops
app.get('/api/crops', (req, res) => {
    res.json(cropsData.crops);
});

// Get all services
app.get('/api/services', (req, res) => {
    res.json(cropsData.services);
});

// Get one crop by ID
app.get('/api/crops/:id', (req, res) => {
    const crop = cropsData.crops.find(
        item => item.id === req.params.id
    );

    if (!crop) {
        return res.status(404).json({
            message: 'Crop not found'
        });
    }

    res.json(crop);
});

// Register a farmer
app.post('/api/farmers/register', (req, res) => {
    const { name, age, phone, village, crop } = req.body;

    // Validate required fields
    if (
        !name ||
        age === undefined ||
        age === null ||
        !Number.isFinite(Number(age)) ||
        Number(age) < 13 ||
        Number(age) > 100 ||
        !village ||
        !/^[0-9]{10}$/.test(String(phone || '')) ||
        !crop
    ) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid name, age, mobile number, village and crop.'
        });
    }

    // Create farmer record
    const farmer = {
        id: farmers.length + 1,
        name: String(name).trim(),
        age: Number(age),
        phone: String(phone).trim(),
        village: String(village).trim(),
        crop: String(crop).trim()
    };

    // Save farmer temporarily
    farmers.push(farmer);

    // Send success response
    res.status(201).json({
        success: true,
        message: 'Farmer registered successfully!',
        farmer
    });
});

// Get registered farmers
app.get('/api/farmers', (req, res) => {
    res.json(farmers);
});

// Start server
app.listen(PORT, () => {
    console.log(
        `Express server running at http://localhost:${PORT}`
    );
});
