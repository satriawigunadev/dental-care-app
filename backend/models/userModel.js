const pool = require("../config/db");

/**
 * Mencari user di database berdasarkan email.
 * @param {string} email - Email yang diinput saat login.
 * @returns {object|null} Data user mentah atau null jika tidak ditemukan.
 */
const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  // Mengeksekusi query aman menggunakan parameterized query ($1) untuk mencegah SQL Injection
  const result = await pool.query(query, values);

  // Jika user ditemukan, kembalikan data baris pertama, jika tidak kembalikan null
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Mencari user di database berdasarkan ID.
 * @param {number} id - ID user.
 * @returns {object|null} Data user atau null jika tidak ditemukan.
 */
const findUserById = async (id) => {
  const query = "SELECT id, nama, email, role FROM users WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows.length > 0 ? result.rows[0] : null;
};

//Menyimpan user baru ke dalam database dengan role pasien secara otomatis.
const createUser = async (nama, email, hashedPassword) => {
  // Kunci langsung 'pasien' di query untuk keamanan total
  const query = `
        INSERT INTO users (nama, email, password, role) 
        VALUES ($1, $2, $3, 'pasien') 
        RETURNING id, nama, email, role
    `;
  const values = [nama, email, hashedPassword];

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
