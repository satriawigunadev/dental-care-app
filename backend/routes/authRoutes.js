const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 1. Endpoint untuk Login: POST http://localhost:5000/api/auth/login
router.post('/login', authController.login);

// 2. Endpoint untuk Logout: POST http://localhost:5000/api/auth/logout
router.post('/logout', authController.logout);

module.exports = router;