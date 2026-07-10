import { useAuth } from '../../context/AuthContext';

const DokterDashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold text-teal-800">🩺 Portal Praktik Dokter</h1>
            <p className="mt-2 text-slate-600">Selamat datang, {user?.nama}. Akses rekam medis dan jadwal periksa gigi pasien di sini.</p>
            <button onClick={logout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
        </div>
    );
};
export default DokterDashboard;