-- =======================================================
-- SPRINT 1 - TASK 2: SCRIPT DATABASE DENTAL CARE LOGIN
-- =======================================================

-- 1. Hapus database lama jika ada (opsional, untuk reset)
-- DROP DATABASE IF EXISTS dental_care_db;

-- 2. Membuat tipe ENUM untuk membatasi Role (Pilar Otorisasi)
-- Ini memastikan tidak ada role gaib selain 3 peran ini.
CREATE TYPE user_role AS ENUM ('admin', 'dokter', 'pasien');

-- 3. Membuat tabel users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, -- UNIQUE mencegah email kembar
    password VARCHAR(255) NOT NULL,    -- Tempat menyimpan hash bcrypt hasil enkripsi
    role user_role NOT NULL DEFAULT 'pasien',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. SEED DATA (Data Contoh untuk Testing Modul Login)
-- PENTING: Password di bawah ini adalah hasil hash bcrypt dari kata 'password123'
-- Jangan pernah memasukkan teks asli 'password123' langsung ke database!

-- Contoh Akun Admin
INSERT INTO users (nama, email, password, role) 
VALUES (
    'Siti Admin Klinik', 
    'admin@dental.com', 
    '$2b$10$.QXXr.7ahKEXSO3NCU7P2ebLytD/VMlqpFwtglqXz31HxKhvCOOgK', -- hash dari 'password123'
    'admin'
);

-- Contoh Akun Dokter
INSERT INTO users (nama, email, password, role) 
VALUES (
    'drg. Budi Dermawan', 
    'budi@dental.com', 
    '$2b$10$.QXXr.7ahKEXSO3NCU7P2ebLytD/VMlqpFwtglqXz31HxKhvCOOgK', -- hash dari 'password123'
    'dokter'
);

-- Contoh Akun Pasien / Customer
INSERT INTO users (nama, email, password, role) 
VALUES (
    'Ahmad Pasien', 
    'ahmad@gmail.com', 
    '$2b$10$.QXXr.7ahKEXSO3NCU7P2ebLytD/VMlqpFwtglqXz31HxKhvCOOgK', -- hash dari 'password123'
    'pasien'
);