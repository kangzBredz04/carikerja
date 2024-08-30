import { useState } from "react";
import { api } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // Tambahkan state untuk konfirmasi password
    role: "job_seeker",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(""); // State untuk pesan error

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validasi apakah password sama dengan konfirmasi password
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password tidak cocok");
      return;
    }

    api
      .post(`/auth/register`, formData)
      .then(() => {
        alert("Daftar akun berhasil!"); // menampilkan alert saat berhasil
        navigate("/user/login");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Email sudah terdaftar");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md my-6">
        <h2 className="text-3xl font-bold text-center mb-6">Buat Profil</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Nama Lengkap"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-2 cursor-pointer text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Input Konfirmasi Password */}
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Konfirmasi Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Konfirmasi Password"
              required
            />
          </div>

          {/* Pesan Error jika Password tidak cocok */}
          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Daftar
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Sudah punya akun?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Masuk
          </a>
        </p>
      </div>
    </div>
  );
}
