const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//Logika utama Autentikasi Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validasi Input Dasar
  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi." });
  }

  try {
    // 2. Cari user berdasarkan email melalui Model
    const user = await userModel.findUserByEmail(email);

    // Pilar Keamanan: Jangan beri tahu secara spesifik apakah "email" atau "password" yang salah
    // untuk mempersulit hacker menebak akun yang valid (Username Enumeration Attack).
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah." });
    }

    // 3. Bandingkan password input dengan hash password di database memakai bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`[BCRYPT DEBUG] Email: ${email} | Valid: ${isPasswordValid}`);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email atau password salah." });
    }

    // 4. Buat token JWT (Pilar Otorisasi: masukkan ID dan ROLE ke payload)
    const tokenPayload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token hangus dalam 1 jam demi keamanan
    });

    // 5. Kunci token di dalam HTTP-Only Cookie (Pilar Keamanan Data)
    res.cookie("token", token, {
      httpOnly: true, // Mencegah JavaScript front-end (XSS) membaca token ini
      secure: process.env.NODE_ENV === "production", // true jika sudah pakai HTTPS
      sameSite: "strict", // Mencegah serangan CSRF Cross-Site Request Forgery
      maxAge: 60 * 60 * 1000, // Durasi cookie sama dengan token JWT (1 jam dalam milidetik)
    });

    // 6. Kirim respon sukses dan data user non-sensitif ke front-end
    return res.status(200).json({
      message: "Login berhasil.",
      user: {
        id: user.id,
        nama: user.nama,
        role: user.role, // Beri tahu React rolenya apa (admin/dokter/pasien) untuk routing UI
      },
    });
  } catch (error) {
    console.error("❌ Error pada proses login:", error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan internal server." });
  }
};

//Logika Logout untuk membersihkan cookie token
const logout = (req, res) => {
  // Hapus cookie token dengan masa berlaku instan (0)
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logout berhasil." });
};

//Memverifikasi session aktif berdasarkan HTTP-only cookie token JWT
const verifySession = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Tidak ada session aktif." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Sesi tidak valid atau kedaluwarsa." });
  }
};

//Logika Registrasi Akun Pasien Baru

const register = async (req, res) => {
  const { nama, email, password, confirmPassword } = req.body;

  // 1. Validasi Input Kosong
  if (!nama || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Semua field wajib diisi." });
  }

  // 2. Validasi Kesamaan Password (Double Input Check)
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Konfirmasi password tidak cocok." });
  }

  try {
    // 3. Cek apakah email sudah terdaftar
    const userExists = await userModel.findUserByEmail(email);
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email sudah digunakan oleh akun lain." });
    }

    // 4. Enkripsi Password (Salt rounds = 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Simpan ke Database via Model
    const newUser = await userModel.createUser(nama, email, hashedPassword);

    // 6. Beri respon sukses
    return res.status(201).json({
      message: "Registrasi berhasil! Silakan login.",
      user: newUser,
    });
  } catch (error) {
    console.error("❌ Error pada proses registrasi:", error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan internal server." });
  }
};

module.exports = {
  login,
  logout,
  verifySession,
  register,
};
