import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Impor Halaman-Halaman (Views)
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import AdminDashboard from './pages/admin/AdminDashboard';
import DokterDashboard from './pages/dokter/DokterDashboard';
import PasienDashboard from './pages/pasien/PasienDashboard';

// Impor Tameng Otorisasi
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 🌟 GRUP RUTE PROTEKSI: Khusus Admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* 🌟 GRUP RUTE PROTEKSI: Khusus Dokter */}
        <Route element={<ProtectedRoute allowedRoles={['dokter']} />}>
          <Route path="/dokter/dashboard" element={<DokterDashboard />} />
        </Route>

        {/* 🌟 GRUP RUTE PROTEKSI: Khusus Pasien */}
        <Route element={<ProtectedRoute allowedRoles={['pasien']} />}>
          <Route path="/pasien/dashboard" element={<PasienDashboard />} />
        </Route>

        {/* Rute Default: Jika mengetik alamat ngawur, arahkan ke login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;