import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-center p-4">
            <h1 className="text-4xl font-bold text-red-600">⛔ Akses Ditolak</h1>
            <p className="mt-2 text-slate-600">Akun Anda tidak memiliki otoritas (hak akses) untuk membuka halaman ini.</p>
            <button onClick={() => navigate('/login')} className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md">Kembali ke Login</button>
        </div>
    );
};
export default Unauthorized;