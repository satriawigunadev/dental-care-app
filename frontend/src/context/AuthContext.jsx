import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Membantu memvalidasi session saat page di-refresh

  // Cek status login saat pertama kali aplikasi dibuka / di-refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/verify");
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // [Keamanan Data] Fungsi untuk mengirim email & password ke backend
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      setUser(response.data.user); // Menyimpan { id, nama, role } ke state global
      return response.data.user;
    } catch (error) {
      // Lemparkan pesan error dari backend agar bisa ditangkap oleh UI Form Login
      throw error.response?.data?.message || "Terjadi kesalahan saat login.";
    }
  };

  // Fungsi untuk membersihkan cookie dan state saat user keluar
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Gagal logout di server:", error);
    } finally {
      setUser(null); // Selalu hapus state di front-end terlepas dari API sukses/gagal
    }
  };

  // Fungsi untuk Registrasi Akun Pasien Baru
  const register = async (nama, email, password, confirmPassword) => {
    try {
      const response = await api.post("/auth/register", {
        nama,
        email,
        password,
        confirmPassword,
      });
      return response.data; // Mengembalikan pesan sukses dari backend
    } catch (error) {
      throw (
        error.response?.data?.message || "Terjadi kesalahan saat registrasi."
      );
    }
  };

  // Pastikan fungsi dimasukkan ke dalam Provider value:
  return (
    <AuthContext.Provider value={{ user, login, logout, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook agar kita bisa memanggil context dengan singkat: const { user, login } = useAuth();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};
