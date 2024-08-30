import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLanguage, MdNotificationsNone } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { api } from "../utils";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    avatar: "/Elon Musk.jpeg",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    api
      .post("/auth/sign-out", {}) // Log out the user
      .then(() => {
        localStorage.removeItem("token"); // Remove token from localStorage
        setIsLoggedIn(false); // Update login state
        navigate("/"); // Redirect to home page or login page
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50 font-KumbhSans">
      <div className="container mx-auto py-4 flex justify-between items-center">
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

        <div className="flex items-center space-x-10">
          <Link
            onClick={(e) => {
              e.preventDefault();
              alert("Coming soon !!!");
            }}
            to={""}
          >
            <MdOutlineLanguage className="text-xl" />
          </Link>

          {isLoggedIn ? (
            <div className="relative flex items-center space-x-10">
              <MdNotificationsNone className="text-xl cursor-pointer" />

              <div className="relative">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="rounded-full w-8 h-8 cursor-pointer"
                  onClick={toggleDropdown}
                />
                <div
                  className="absolute top-2 left-10 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {dropdownOpen ? (
                    <FaAngleUp className="text-xl" />
                  ) : (
                    <FaAngleDown className="text-xl" />
                  )}
                </div>

                {dropdownOpen && (
                  <div
                    className="absolute -right-16 mt-5 w-48 bg-white border rounded-lg shadow-lg text-sm z-10"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profil Saya
                    </Link>
                    <Link
                      to="/applications"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Lamaran Saya
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Keluar
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/user/register">DAFTAR</Link>
              <Link to="/user/login">MASUK</Link>
              <Link
                to="/employe/dashboard"
                className="py-1 px-3 border-blue-600 text-blue-600 font-bold border-[1px] rounded-lg"
              >
                UNTUK KASIHKERJA
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
