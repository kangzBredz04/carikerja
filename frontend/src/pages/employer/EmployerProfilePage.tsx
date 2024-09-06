import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGlobeAmericas,
} from "react-icons/fa";

interface EmployerProfile {
  id: number;
  bannerImage: string;
  logoImage: string;
  companyName: string;
  slogan: string;
  address: string;
  companySize: string;
  industry: string;
  websiteLink: string;
  instagramLink: string;
  facebookLink: string;
  linkedinLink: string;
  companyDescription: string;
}

const EmployerProfilePage: React.FC = () => {
  const [employer, setEmployer] = useState<EmployerProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data with dummy data
    const fetchEmployerProfile = async () => {
      try {
        // Dummy data
        const dummyData: EmployerProfile = {
          id: 1,
          bannerImage:
            "https://images.unsplash.com/photo-1506748686214e9df14f4b4f1a6e2e21f54029e973d1e4a9b9d",
          logoImage: "https://via.placeholder.com/150",
          companyName: "Tech Innovators Inc.",
          slogan: "Innovating the Future",
          address: "123 Tech Lane, Silicon Valley, CA",
          companySize: "Medium",
          industry: "Technology",
          websiteLink: "https://www.techinnovators.com",
          instagramLink: "https://instagram.com/techinnovators",
          facebookLink: "https://facebook.com/techinnovators",
          linkedinLink: "https://linkedin.com/company/techinnovators",
          companyDescription:
            "Tech Innovators Inc. is a leading technology company specializing in cutting-edge innovations and solutions. Our mission is to drive progress and shape the future with our advanced technology and expert team.",
        };

        setEmployer(dummyData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchEmployerProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employer) {
    return <div>No employer data found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Image */}
      <div
        className="relative h-60 bg-cover bg-center"
        style={{ backgroundImage: `url(${employer.bannerImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Logo Image and Company Details */}
          <div className="flex items-center p-6">
            <img
              src={employer.logoImage || "https://via.placeholder.com/150"}
              alt={employer.companyName}
              className="w-32 h-32 object-cover rounded-full border-4 border-white"
            />
            <div className="ml-6">
              <h1 className="text-3xl font-bold">{employer.companyName}</h1>
              <p className="text-gray-600 italic">{employer.slogan}</p>
              <p className="mt-2 text-gray-800">{employer.address}</p>
              <p className="mt-1 text-gray-500">
                {employer.companySize} | {employer.industry}
              </p>
              <div className="mt-4 flex space-x-4">
                {employer.websiteLink && (
                  <a
                    href={employer.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobeAmericas className="text-blue-500" />
                  </a>
                )}
                {employer.instagramLink && (
                  <a
                    href={employer.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-pink-500" />
                  </a>
                )}
                {employer.facebookLink && (
                  <a
                    href={employer.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF className="text-blue-700" />
                  </a>
                )}
                {employer.linkedinLink && (
                  <a
                    href={employer.linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn className="text-blue-600" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-700">{employer.companyDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfilePage;
