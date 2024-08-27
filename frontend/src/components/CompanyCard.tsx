import React from "react";

interface CompanyCardProps {
  name: string;
  location: string;
  industry: string;
  jobCount: number;
  lastActive: string;
  logo: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  location,
  industry,
  jobCount,
  lastActive,
  logo,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col">
      <div className="flex items-center mb-4">
        <img src={logo} alt={`${name} logo`} className="w-12 h-12 mr-4" />
        <div>
          <h2 className="font-bold text-lg">{name}</h2>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
      <div className="mb-2">
        <p className="text-sm font-semibold">{industry}</p>
        <p className="text-sm text-gray-500">
          {jobCount > 0 ? `${jobCount} lowongan` : "Sedang tidak ada lowongan"}
        </p>
      </div>
      <div className="text-sm text-gray-400">Terakhir aktif {lastActive}</div>
    </div>
  );
};

export default CompanyCard;
