import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi awal di sisi klien sebelum membebani server
    if (password !== confirmPassword) {
      return setError("Konfirmasi password tidak cocok.");
    }

    setIsLoading(true);
    try {
      const data = await register(nama, email, password, confirmPassword);
      setSuccess(data.message);
      // Bersihkan form
      setNama("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // Alihkan ke login setelah 2 detik agar user sempat membaca pesan sukses
      setTimeout(() => navigate("/login"), 2000);
    } catch (errMessage) {
      setError(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg bg-white border-slate-200">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            📝 Daftar Pasien Baru
          </CardTitle>
          <CardDescription className="text-slate-500">
            Buat akun untuk mulai menjadwalkan konsultasi dokter gigi
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 text-left">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                {success}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Nama Lengkap
              </label>
              <Input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <Input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) =>
                  e.target.value !== " " && setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Konfirmasi Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Mendaftarkan Akun..." : "Daftar Sekarang"}
            </Button>
            <p className="text-sm text-slate-500 text-center">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-teal-600 hover:underline">
                Login di sini
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
