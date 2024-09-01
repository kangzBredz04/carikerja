import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const BiayaFaqPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Biaya & FAQ</h1>
          <p className="mt-2 text-lg">
            Temukan informasi tentang biaya layanan kami dan jawaban atas
            pertanyaan yang sering diajukan.
          </p>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Biaya Layanan Kami
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs text-center">
              <h3 className="text-2xl font-semibold mb-2">Paket Dasar</h3>
              <p className="text-gray-600 mb-4">
                Fitur dasar untuk perusahaan kecil.
              </p>
              <p className="text-xl font-bold mb-4">Rp 5.000.000 / bulan</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Daftar Sekarang
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs text-center">
              <h3 className="text-2xl font-semibold mb-2">Paket Standar</h3>
              <p className="text-gray-600 mb-4">
                Fitur lengkap untuk perusahaan menengah.
              </p>
              <p className="text-xl font-bold mb-4">Rp 10.000.000 / bulan</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Daftar Sekarang
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs text-center">
              <h3 className="text-2xl font-semibold mb-2">Paket Premium</h3>
              <p className="text-gray-600 mb-4">
                Fitur lengkap dengan dukungan prioritas.
              </p>
              <p className="text-xl font-bold mb-4">Rp 20.000.000 / bulan</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            FAQ - Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-8">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaQuestionCircle className="mr-3 text-blue-600" /> Apa saja
                fitur dari paket dasar?
              </h3>
              <p className="text-gray-600">
                Paket dasar mencakup fitur pencarian kerja dasar, pemasangan
                lowongan, dan akses ke profil kandidat.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaQuestionCircle className="mr-3 text-blue-600" /> Bagaimana
                cara melakukan upgrade paket?
              </h3>
              <p className="text-gray-600">
                Anda dapat mengupgrade paket melalui dashboard pengguna atau
                menghubungi tim dukungan kami.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaQuestionCircle className="mr-3 text-blue-600" /> Apakah ada
                diskon untuk langganan tahunan?
              </h3>
              <p className="text-gray-600">
                Ya, kami menawarkan diskon khusus untuk langganan tahunan.
                Hubungi tim kami untuk informasi lebih lanjut.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Butuh Bantuan?</h2>
          <p className="mb-4">
            Jika Anda memiliki pertanyaan lebih lanjut atau membutuhkan bantuan,
            jangan ragu untuk menghubungi kami.
          </p>
          <a
            href="/contact"
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
          >
            Hubungi Kami
          </a>
        </div>
      </section>
    </div>
  );
};

export default BiayaFaqPage;
