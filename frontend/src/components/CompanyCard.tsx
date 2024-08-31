import { useNavigate } from "react-router-dom"; // Import useNavigate

interface CompanyCardProps {
  id: number;
  name: string;
  location: string;
  industry: string;
  jobCount: number;
  slogan: string;
  logo: string;
}

function CompanyCard({
  id,
  name,
  location,
  industry,
  jobCount,
  slogan,
  logo,
}: CompanyCardProps) {
  const navigate = useNavigate(); // Use useNavigate instead of useRouter

  const handleCardClick = () => {
    console.log(id);
    // Navigate to company detail page using company id
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
      <div className="mb-2">
        <p className="text-sm font-semibold">{industry}</p>
        <p className="text-sm text-gray-500">
          {jobCount > 0 ? `${jobCount} lowongan` : "Sedang tidak ada lowongan"}
        </p>
      </div>
      <div className="text-sm text-gray-400">{slogan}</div>
    </div>
  );
}

export default CompanyCard;
