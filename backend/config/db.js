const { Pool } = require('pg');
require('dotenv').config();

// Membuat instance pool koneksi menggunakan variabel lingkungan dari .env
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

// Verifikasi koneksi saat server pertama kali berjalan
pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Gagal terhubung ke database PostgreSQL:', err.stack);
    }
    console.log('🚀 Hubungan aman ke PostgreSQL berhasil dibangun.');
    release(); // Lepas kembali client ke pool setelah pengecekan sukses
});

module.exports = pool;