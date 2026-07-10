const pool = require('../config/db');

/**
 * Mencari user di database berdasarkan email.
 * @param {string} email - Email yang diinput saat login.
 * @returns {object|null} Data user mentah atau null jika tidak ditemukan.
 */
const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    
    // Mengeksekusi query aman menggunakan parameterized query ($1) untuk mencegah SQL Injection
    const result = await pool.query(query, values);
    
    // Jika user ditemukan, kembalikan data baris pertama, jika tidak kembalikan null
    return result.rows.length > 0 ? result.rows[0] : null;
};

module.exports = {
    findUserByEmail
};