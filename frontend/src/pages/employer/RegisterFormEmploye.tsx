export default function RegisterFormEmploye() {
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
          <h2 className="text-2xl font-bold text-gray-900">Selamat Datang!</h2>
          <p>Sebelum mulai, kami ingin lebih mengenal Anda</p>
          <form className="space-y-4">
            {/* <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
            <input
              type="email"
              name="email"
              placeholder="Masukkan email Anda"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="+62 | Ketik nomor HP Anda"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Masukkan password baru"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center">
              <input type="checkbox" name="agree" id="agree" className="mr-2" />
              <label htmlFor="agree" className="text-sm">
                Dengan mendaftar, saya menyetujui{" "}
                <a href="#" className="text-blue-600 underline">
                  Ketentuan Penggunaan
                </a>{" "}
                dan{" "}
                <a href="#" className="text-blue-600 underline">
                  Kebijakan Privasi CariKerja
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full  py-3 rounded-md bg-blue-600 hover:bg-blue-800 text-white"
            >
              Buat Akun
            </button>

            <p className="text-center text-sm">atau daftar dengan</p>

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
              Sudah punya akun?{" "}
              <a href="/employe/login" className="text-blue-600 underline">
                Login di sini
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
