const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Endpoint untuk Login: POST http://localhost:5000/api/auth/login
router.post("/login", authController.login);

// Endpoint untuk Logout: POST http://localhost:5000/api/auth/logout
router.post("/logout", authController.logout);

// Endpoint untuk Verifikasi Sesi: GET http://localhost:5000/api/auth/verify
router.get("/verify", authController.verifySession);

// Endpoint untuk Register Pasien: POST http://localhost:5000/api/auth/register
router.post("/register", authController.register);

module.exports = router;
