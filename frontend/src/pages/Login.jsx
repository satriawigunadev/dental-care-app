import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// Mengimpor komponen murni dari shadcn/ui yang sudah kita download sebelumnya
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

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State untuk menangkap input form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State untuk handle error dan loading UI
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Panggil fungsi login dari AuthContext
      const loggedInUser = await login(email, password);

      // PILAR OTORISASI: Alihkan halaman secara otomatis berdasarkan ROLE user
      if (loggedInUser.role === "admin") {
        navigate("/admin/dashboard");
      } else if (loggedInUser.role === "dokter") {
        navigate("/dokter/dashboard");
      } else {
        navigate("/pasien/dashboard");
      }
    } catch (errMessage) {
      // Tampilkan pesan error yang dikirim oleh backend (misal: "Email atau password salah")
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
            🦷 Dental Care App
          </CardTitle>
          <CardDescription className="text-slate-500">
            Masuk untuk mengakses rekam medis dan jadwal klinik
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 text-left">
            {/* Alert Error Visual jika login gagal */}
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <Input
                type="email"
                placeholder="nama@dental.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-md transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Memverifikasi..." : "Masuk"}
            </Button>

            <p className="text-sm text-slate-500 text-center">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-teal-600 hover:underline font-medium"
              >
                Registrasi disini
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
