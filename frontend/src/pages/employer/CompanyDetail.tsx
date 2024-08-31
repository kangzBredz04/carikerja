import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams
import { useEffect, useState } from "react";
import { api } from "../../utils";

// Define the Company interface
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

export default function CompanyDetail() {
  const { id } = useParams(); // Get company id from the route parameters
  const navigate = useNavigate(); // Use navigate instead of useRouter
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch company data based on ID
      api
        .get(`/employers/${id}`) // Replace with the correct endpoint
        .then((response) => {
          setCompany(response); // Assuming response contains the company data
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
          navigate("/error"); // Optionally navigate to an error page if needed
        });
    }
  }, [id, navigate]);

  if (!company) {
    return <p>Loading...</p>; // Display loading if company data is not yet available
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{company.companyName}</h1>
      <img
        src={company.bannerImage}
        alt={`${company.companyName} banner`}
        className="w-full mb-4"
      />
      <img
        src={company.logoImage}
        alt={`${company.companyName} logo`}
        className="w-24 h-24 mb-4"
      />
      <p>
        <strong>Slogan:</strong> {company.slogan}
      </p>
      <p>
        <strong>Address:</strong> {company.address}
      </p>
      <p>
        <strong>Industry:</strong> {company.industry}
      </p>
      <p>
        <strong>Company Size:</strong> {company.companySize}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a href={company.websiteLink}>{company.websiteLink}</a>
      </p>
      <p>
        <strong>Instagram:</strong>{" "}
        <a href={company.instagramLink}>{company.instagramLink}</a>
      </p>
      <p>
        <strong>Facebook:</strong>{" "}
        <a href={company.facebookLink}>{company.facebookLink}</a>
      </p>
      <p>
        <strong>LinkedIn:</strong>{" "}
        <a href={company.linkedinLink}>{company.linkedinLink}</a>
      </p>
      <p>
        <strong>Description:</strong> {company.companyDescription}
      </p>
    </div>
  );
}
