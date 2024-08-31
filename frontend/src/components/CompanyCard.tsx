import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { RiBriefcase4Fill } from "react-icons/ri";

interface CompanyCardProps {
  id: number;
  name: string;
  location: string;
  industry: string;
  slogan: string;
  logo: string;
}

function CompanyCard({
  id,
  name,
  location,
  industry,
  slogan,
  logo,
}: CompanyCardProps) {
  const [jobCount, setJobCount] = useState<number>(0); // State to hold job count
  const navigate = useNavigate(); // Use useNavigate instead of useRouter

  // Fetch job data when component mounts or id changes
  useEffect(() => {
    const fetchJobCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/jobs/by-employer?employerId=${id}`
        ); // API endpoint to get jobs for this employer
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Assuming the API returns an array of jobs
        setJobCount(data.length); // Update job count with the number of jobs
      } catch (error) {
        console.error("Error fetching job data:", error);
        setJobCount(0); // Set job count to 0 if there's an error
      }
    };

    fetchJobCount();
  }, [id]); // Dependency array includes id to refetch if id changes

  const handleCardClick = () => {
    navigate(`/company/${id}`);
  };

  return (
    <div
      onClick={handleCardClick} // Add click event to navigate
      className="border p-4 rounded-lg shadow-md flex flex-col cursor-pointer"
    >
      <div className="flex items-center mb-4">
        <img
          src={logo} // Display the logo passed via props
          alt={`${name} logo`}
          className="w-12 h-12 mr-4"
        />
        <div>
          <h2 className="font-bold text-lg">{name}</h2>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
      <div className="mb-2 flex flex-col gap-2">
        <p className="text-sm font-semibold flex items-center gap-2">
          <HiBuildingOffice2 size={18} />
          {industry}
        </p>
        <p className="text-sm font-semibold flex items-center gap-2">
          <RiBriefcase4Fill size={18} />
          {jobCount > 0 ? `${jobCount} lowongan` : "Sedang tidak ada lowongan"}
        </p>
      </div>
      <div className="text-sm font-semibold">{slogan}</div>
    </div>
  );
}

export default CompanyCard;
