import { GrInstagram } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { TbBrandTiktok } from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">
        {/* Glints Asia Section */}
        <div className="col-span-1">
          <h1 className="text-xl font-semibold mb-4">CARIKERJA</h1>
          <p className="text-sm leading-relaxed">
            Secara resmi diluncarkan pada tahun 2015 di Program Beasiswa PUB,
            CARIKERJA telah memberdayakan lebih dari 5 juta bakat dan 60.000
            organisasi untuk mewujudkan potensi manusia mereka.
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-6">
            <a href="#" aria-label="Instagram">
              <GrInstagram size={22} />
            </a>
            <a href="#" aria-label="Twitter">
              <BsTwitterX size={22} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <PiLinkedinLogoBold size={24} />
            </a>
            <a href="#" aria-label="Email">
              <TfiEmail size={24} />
            </a>
            <a href="#" aria-label="TikTok">
              <TbBrandTiktok size={24} />
            </a>
          </div>
        </div>

        {/* Untuk Pencari Kerja Section */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-4">Untuk Pencari Kerja</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Lokasi Pekerjaan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Nama Perusahaan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Kategori Pekerjaan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Lowongan Kerja Populer
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Untuk Pemberi Kerja Section */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-4">Untuk Pemberi Kerja</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                For Employers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                HR Tips
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Glints Platform
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Perekrutan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Bakat Terkelola
              </a>
            </li>
          </ul>
        </div>

        {/* Perusahaan Section */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-4">Perusahaan</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Tim Kami
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Hired Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Inside Glints
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 text-sm">
                Karir
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 flex flex-col md:flex-row justify-between items-center border-t border-white pt-6">
        <p className="text-sm text-gray-200 mb-4 md:mb-0">
          &copy; 2024 PT. CariKerja. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-200">Terdaftar dan diawasi oleh</p>
          <img src="/logo-kominfo.png" alt="Kominfo" className="w-20 h-auto" />
          <img
            src="/logo-kemenaker.png"
            alt="Kemenaker"
            className="w-24 h-auto"
          />
        </div>
      </div>
    </footer>
  );
}
