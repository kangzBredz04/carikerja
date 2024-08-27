import { useState } from "react";
import CompanyCard from "../components/CompanyCard";

const companies = [
  {
    name: "RTMart Grup Indonesia",
    location: "Tangerang, Banten, Indonesia",
    industry: "Consumer Goods",
    jobCount: 0,
    lastActive: "42 menit yang lalu",
    logo: "/logo-amazon.png",
  },
  {
    name: "Hyundai Samarinda",
    location: "Samarinda, Kalimantan Timur, Indonesia",
    industry: "Automotive",
    jobCount: 1,
    lastActive: "sejam yang lalu",
    logo: "/logo-apple.jpg",
  },
  {
    name: "PT Lumbung Dana Indonesia",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    industry: "Financial Services",
    jobCount: 1,
    lastActive: "38 menit yang lalu",
    logo: "/loo-edii.png",
  },
  {
    name: "PT Lumbung Dana Indonesia",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    industry: "Financial Services",
    jobCount: 1,
    lastActive: "38 menit yang lalu",
    logo: "/loo-edii.png",
  },
  {
    name: "PT Lumbung Dana Indonesia",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    industry: "Financial Services",
    jobCount: 1,
    lastActive: "38 menit yang lalu",
    logo: "/loo-edii.png",
  },
  {
    name: "PT Lumbung Dana Indonesia",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    industry: "Financial Services",
    jobCount: 1,
    lastActive: "38 menit yang lalu",
    logo: "/loo-edii.png",
  },
  {
    name: "PT Lumbung Dana Indonesia",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    industry: "Financial Services",
    jobCount: 1,
    lastActive: "38 menit yang lalu",
    logo: "/loo-edii.png",
  },
  {
    name: "PT Lumbung Dana Indonesia",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    industry: "Financial Services",
    jobCount: 1,
    lastActive: "38 menit yang lalu",
    logo: "/loo-edii.png",
  },
  {
    name: "PT Lumbung Dana Indonesia",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    industry: "Financial Services",
    jobCount: 1,
    lastActive: "38 menit yang lalu",
    logo: "/loo-edii.png",
  },
];

export default function CompanyList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari perusahaan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company, index) => (
          <CompanyCard key={index} {...company} />
        ))}
      </div>
    </div>
  );
}
