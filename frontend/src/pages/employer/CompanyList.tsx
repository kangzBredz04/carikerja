import { useState, useEffect } from "react";
import CompanyCard from "../../components/CompanyCard";
import { api } from "../../utils";

// Define the Company interface based on your database schema
interface Company {
  id: number;
  user_id: number;
  bannerImage: string;
  logoImage: string;
  companyName: string;
  slogan: string;
  address: string;
  companySize: "small" | "medium" | "large";
  industry: string;
  websiteLink: string;
  instagramLink: string;
  facebookLink: string;
  linkedinLink: string;
  companyDescription: string;
}

export default function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch company data from backend
    api
      .get("/employers") // Replace with the correct endpoint
      .then((response) => {
        setCompanies(response); // Assuming the data is in response.data
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  const filteredCompanies = companies.filter((company) => {
    if (!company.companyName) {
      return (company.companyName = "Unknown"); // Exclude companies without a name
    }

    return company.companyName.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
        {filteredCompanies.map((company) => (
          <CompanyCard
            key={company.id}
            id={company.id}
            name={company.companyName || "Unknown"} // Mapping the fields
            location={company.address || "Unknown"}
            industry={company.industry || "Unknown"}
            slogan={company.slogan || "No slogan available"} // Pass slogan
            logo={
              company.logoImage ||
              "https://i.pinimg.com/1200x/ae/4c/9e/ae4c9ea2edf887f6ad1e4e63cfae05b0.jpg"
            } // Fallback logo
          />
        ))}
      </div>
    </div>
  );
}
