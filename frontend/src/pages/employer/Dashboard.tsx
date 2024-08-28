export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Section 1 */}
      <section className="w-full flex flex-col md:flex-row justify-between items-center p-10 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            Pasang Iklan Lowongan Kerja Gratis!
          </h1>
          <p className="mt-4 text-gray-700">
            Dapatkan akses ke 5 juta talenta terbaik dari Indonesia. Daftar
            sekarang dan posting pekerjaan Anda secara gratis:
          </p>
        </div>
        <form className="mt-8 md:mt-0 bg-white p-6 rounded-lg shadow-lg w-full md:w-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              type="text"
              placeholder="Nama Depan"
            />
            <input
              className="border p-2 rounded"
              type="text"
              placeholder="Nama Belakang"
            />
            <input
              className="border p-2 rounded"
              type="email"
              placeholder="Email Kerja"
            />
            <input
              className="border p-2 rounded"
              type="tel"
              placeholder="+62 Nomor Telepon"
            />
            <input
              className="border p-2 rounded col-span-2"
              type="password"
              placeholder="Masukkan Password"
            />
          </div>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-800 text-white p-2 rounded transition">
            DAFTAR SEKARANG
          </button>
        </form>
      </section>

      {/* Section 2 */}
      <section className="w-full flex flex-col md:flex-row justify-between items-center p-10 bg-blue-50">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-gray-900">
            Percepat Rekrutmen Kandidat Senior & Manajerial Anda dengan
            KasihKerja ProHire
          </h2>
          <p className="mt-4 text-gray-700">
            Rekrut Talenta Senior & Manajerial Terbaik untuk Mendorong
            Pertumbuhan Perusahaan Anda. Kami menghubungkan Anda dengan kandidat
            berpengalaman yang siap untuk posisi kunci. Dapatkan profil kandidat
            unggulan dalam 48 jam pertama!
          </p>
          <div className="mt-6 flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded transition">
              PELAJARI LEBIH LANJUT
            </button>
            <button className="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded transition">
              MULAI REKRUT
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <img
            src="/Orang kerja.jpg"
            alt="Glints ProHire"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Section 3 */}
      <section className="w-full flex flex-col items-center p-10 bg-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Pasang Loker Mudah
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl space-y-6 md:space-y-0 md:space-x-4">
          <div className="flex-1 text-center p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 mb-2">Langkah 1</p>
            <h3 className="text-xl font-semibold text-gray-900">
              Daftar akun KasihKerja
            </h3>
          </div>
          <div className="flex-1 text-center p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 mb-2">Langkah 2</p>
            <h3 className="text-xl font-semibold text-gray-900">
              Pasang lowongan kerja
            </h3>
          </div>
          <div className="flex-1 text-center p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 mb-2">Langkah 3</p>
            <h3 className="text-xl font-semibold text-gray-900">
              Mulai menerima pelamar
            </h3>
          </div>
        </div>
        <button className="mt-8 bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition">
          DAFTAR SEKARANG
        </button>
      </section>
    </div>
  );
}
