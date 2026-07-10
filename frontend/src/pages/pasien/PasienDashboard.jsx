import { useAuth } from '../../context/AuthContext';

const PasienDashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold text-blue-800">🦷 Area Pasien / Customer</h1>
            <p className="mt-2 text-slate-600">Halo {user?.nama}, terima kasih telah mempercayai layanan dental care kami. Cek riwayat kunjungan Anda.</p>
            <button onClick={logout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
        </div>
    );
};
export default PasienDashboard;