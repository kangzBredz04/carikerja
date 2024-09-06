import React, { useState, useEffect, useContext } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGlobeAmericas,
} from "react-icons/fa";
import { EmployeContext } from "./Employe";

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
  const { employeId } = useContext(EmployeContext) as unknown as {
    employeId: number; // Ensure this matches the actual type of employeId
  };

  useEffect(() => {
    const fetchEmployerProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/employers/${employeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employer profile");
        }
        const data: EmployerProfile = await response.json();
        setEmployer(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    if (employeId) {
      fetchEmployerProfile();
    } else {
      setError("No employer ID found.");
      setLoading(false);
    }
  }, [employeId]);

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
        style={{
          backgroundImage: `url(${employer.bannerImage} || "https://i.pinimg.com/1200x/5e/59/fc/5e59fc17067dc574186909461f35b78c.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Logo Image and Company Details */}
          <div className="flex items-center p-6">
            <img
              src={
                employer.logoImage ||
                "https://i.pinimg.com/1200x/ae/4c/9e/ae4c9ea2edf887f6ad1e4e63cfae05b0.jpg"
              }
              alt={employer.companyName || "Unknown"}
              className="w-32 h-32 object-cover rounded-full border-4 border-white"
            />
            <div className="ml-6">
              <h1 className="text-3xl font-bold">
                {employer.companyName || "Unknown"}
              </h1>
              <p className="text-gray-600 italic">
                {employer.slogan || "Unknown"}
              </p>
              <p className="mt-2 text-gray-800">
                {employer.address || "Unknown"}
              </p>
              <p className="mt-1 text-gray-500">
                {employer.companySize || "Unknown"} |{" "}
                {employer.industry || "Unknown"}
              </p>
              <div className="mt-4 flex space-x-4">
                {employer.websiteLink || (
                  <a
                    href={employer.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobeAmericas className="text-blue-500" />
                  </a>
                )}
                {employer.instagramLink || (
                  <a
                    href={employer.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-pink-500" />
                  </a>
                )}
                {employer.facebookLink || (
                  <a
                    href={employer.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF className="text-blue-700" />
                  </a>
                )}
                {employer.linkedinLink || (
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
            <p className="text-gray-700">
              {employer.companyDescription || "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfilePage;
