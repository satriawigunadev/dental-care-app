const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const pool = require('./config/db'); 
const authRoutes = require('./routes/authRoutes'); // 🌟 TAMBAHAN: Impor rute auth

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE GLOBAL
// ==========================================
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,               
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// ==========================================
// ROUTES / ENDPOINTS
// ==========================================

// 🌟 TAMBAHAN: Gunakan rute auth dengan prefix /api/auth
app.use('/api/auth', authRoutes);

// Rute Testing Kesehatan Server
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Online', message: 'Server Dental Care Backend siap bertempur!' });
});

// ==========================================
// MENJALANKAN SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(` Server berjalan di mode: [${process.env.NODE_ENV}]`);
    console.log(` Membuka gerbang di port: http://localhost:${PORT}`);
    console.log(`===================================================`);
});