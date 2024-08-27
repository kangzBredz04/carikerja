import React, { useState } from "react";
import { api } from "../../utils";
import { useNavigate } from "react-router-dom";

interface SignInResponse {
  token: string;
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

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
        alert(`Token: ${response.token}`);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Selamat Datang Kembali!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Masuk ke akun CariKerja kamu
        </p>

        <form onSubmit={handleSubmit}>
          {/* Input Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Alamat email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Alamat email"
              required
            />
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Kata sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Kata sandi"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div className="text-right mb-4">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Lupa kata sandi?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow"
          >
            MASUK
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">atau</p>
          <div className="flex justify-center mt-4 space-x-4">
            <button className="text-blue-500">
              <img src="/icon-google.webp" alt="Icon Google" className="w-12" />
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
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
