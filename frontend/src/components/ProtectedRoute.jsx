import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    // Jika status auth sedang diverifikasi dengan backend, tampilkan loading spinner sederhana
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
            </div>
        );
    }

    // Skenario 1: User belum login sama sekali -> Tendang ke halaman login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Skenario 2: User sudah login, tapi rolenya tidak diizinkan -> Tendang ke halaman unauthorized
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Skenario 3: Lolos verifikasi -> Izinkan akses halaman internal (Outlet)
    return <Outlet />;
};

export default ProtectedRoute;