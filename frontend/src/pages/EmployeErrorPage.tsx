import { Link } from "react-router-dom";

export default function EmployeErrorPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">404 Not Found</h1>
      <p className="text-blue-400 mb-8">
        Maaf, halaman yang Anda cari tidak ditemukan.
      </p>
      <Link
        to="/employe"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
