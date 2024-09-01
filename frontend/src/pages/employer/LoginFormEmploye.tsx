import { useState } from "react";
import { api } from "../../utils";

interface SignInResponse {
  token: string;
}

export default function LoginFormEmploye() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .post<SignInResponse>(
        `/auth/sign-in?email=${email}&password=${password}`,
        {
          email,
          password,
        }
      )
      .then((response) => {
        location.reload();
        alert("Login Berhasil");
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", email);
        location.href = "/employe/dashboard";
      })
      .catch(() => {
        alert("Email atau password salah");
      });
  };
  return (
    <div className="flex min-h-screen bg-blue-100">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-10 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-6">
          Platform Rekrutmen Terpercaya bagi Perusahaan!
        </h2>
        <div className="space-y-6">
          <div className="flex items-center">
            <span className="mr-2">💼</span>
            <div>
              <h3 className="font-semibold">Akses Jutaan Talenta</h3>
              <p>
                Pasang loker ke 5+ juta talenta yang siap diwawancara dan
                bergabung untuk mengembangkan perusahaan Anda.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2">💬</span>
            <div>
              <h3 className="font-semibold">
                Rekrut Cepat & Tepat dengan Chat
              </h3>
              <p>
                Hubungi pelamar dengan cepat dan buat strategi rekrutmen yang
                tepat. Chat, rekrut, beres. #TinggalChatAja
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2">📋</span>
            <div>
              <h3 className="font-semibold">Permudah Proses Rekrutmen</h3>
              <p>
                Pasang loker, kelola profil perusahaan, dan kelola lamaran yang
                masuk. Semua dalam satu platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Selamat Datang Kembali!
          </h2>
          <p>Rekrut cepat, rekrut tepat</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm">
                  Ingat saya
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 underline">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            >
              Masuk
            </button>

            <p className="text-center text-sm">atau login dengan</p>

            <div className="flex justify-center mt-4 space-x-4">
              <button className="text-blue-500">
                <img
                  src="/icon-google.webp"
                  alt="Icon Google"
                  className="w-12"
                />
              </button>
              <button className="text-blue-700">
                <img
                  src="/icon-facebook.png"
                  alt="Icon Facebook"
                  className="w-8"
                />
              </button>
              <button className="text-blue-600">
                <img
                  src="/icon-linkedin.webp"
                  alt="Icon Linkedin"
                  className="w-9"
                />
              </button>
            </div>

            <p className="text-center text-sm">
              Belum punya akun?{" "}
              <a href="/employe/register" className="text-blue-600 underline">
                Daftar di sini
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
