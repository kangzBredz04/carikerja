import { Link } from "react-router-dom";
import { MdOutlineLanguage } from "react-icons/md";

export default function Header() {
  return (
    <header className="bg-white border  sticky top-0 z-50 font-KumbhSans">
      <div className="container mx-auto  py-4 flex justify-between items-center">
        <div className="flex items-center space-x-5">
          <Link to="/" className="text-3xl font-bold tracking-widest">
            CARIKERJA
          </Link>
          <Link to="/job-list" className="text-base hover:text-gray-500">
            LOWONGAN KERJA
          </Link>
          <Link to="/company-list" className="hover:text-gray-500 text-base">
            PERUSAHAAN
          </Link>
        </div>
        <div className="flex items-center justify-evenly space-x-4 w-2/5">
          <Link
            onClick={(e) => {
              e.preventDefault();
              alert("Coming soon !!!");
            }}
            to={""}
          >
            <MdOutlineLanguage className="text-xl" />
          </Link>
          <Link to="/user/register">DAFTAR</Link>
          <Link to="/user/login">MASUK</Link>
          <Link
            to="/cart"
            className="py-1 px-3 border-blue-600 text-blue-600 font-bold border-[1px] rounded-lg"
          >
            UNTUK PERUSAHAAN
          </Link>
        </div>
      </div>
    </header>
  );
}
