import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLanguage, MdNotificationsNone } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { api } from "../utils";

export default function HeaderEmpolye() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        navigate("/employe"); // Redirect to home page or login page
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50 font-KumbhSans">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center space-x-5">
          <Link to="/employe" className="text-3xl font-bold tracking-widest">
            KASIHKERJA
          </Link>
          {isLoggedIn && (
            <Link
              to="/employe/dashboard"
              className="text-base hover:text-gray-500"
            >
              DASHBOARD
            </Link>
          )}
          <Link
            to="/employe/biaya&faq"
            className="text-base hover:text-gray-500"
          >
            BIAYA & FAQ
          </Link>
          <Link to="/employe/blog" className="hover:text-gray-500 text-base">
            BLOG
          </Link>
        </div>

        <div className="flex items-center space-x-10">
          {isLoggedIn && (
            <Link
              to="/employe/add-job"
              className="py-1 px-3 bg-blue-600 text-white font-bold rounded-lg"
            >
              PASANG LOKER
            </Link>
          )}
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
                  src="https://i.pinimg.com/1200x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"
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
                      Profil Perusahaan
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
              <Link to="/employe/register">DAFTAR</Link>
              <Link to="/employe/login">MASUK</Link>
              <Link
                to="/"
                className="py-1 px-3 border-blue-600 text-blue-600 font-bold border-[1px] rounded-lg"
              >
                UNTUK CARIKERJA
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
