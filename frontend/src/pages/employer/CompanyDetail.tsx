import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../utils";
import {
  IoLocationOutline,
  IoGlobeOutline,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoBookmarkOutline,
} from "react-icons/io5";
import JobCard from "../../components/JobCard";

// Define the Company interface
interface Company {
  id: number;
  user_id: number;
  logoImage: string;
  bannerImage: string; // New field for banner image
  companyName: string;
  slogan: string;
  address: string;
  companySize: "small" | "medium" | "large";
  industry: string;
  verificationDate: string;
  companyDescription: string;
  websiteLink: string;
  instagramLink: string;
  facebookLink: string;
  linkedinLink: string;
}

interface Job {
  id: number;
  jobTitle: string;
  jobField: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  requiredEducation: string;
  requiredExperience: string;
  requiredSkills: string;
  workSystem: string;
  jobDescription: string;
  employer: {
    id: number;
    logoImage: string;
    companyName: string;
    address: string;
  };
}

const formatSalary = (minSalary: number, maxSalary: number) => {
  const formatToJt = (salary: number) => {
    const salaryInJt = salary / 1_000_000;
    return salaryInJt >= 1
      ? `${salaryInJt.toFixed(1).replace(/\.0$/, "")} jt`
      : salary.toLocaleString();
  };

  return `${formatToJt(minSalary)} - ${formatToJt(maxSalary)}`;
};

export default function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (id) {
      // Fetch company details
      api
        .get(`/employers/${id}`)
        .then((response) => {
          setCompany(response); // Ensure response.data contains the company data
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
          navigate("/error");
        });

      // Fetch jobs for the company
      api
        .get(`/jobs`)
        .then((response) => {
          setJobs(response); // Ensure response.data contains the job listings
        })
        .catch((error) => {
          console.error("Error fetching job data:", error);
        });
    }
  }, [id, navigate]);

  const filterJob = jobs.filter((job) => job.employer?.id === company?.id);

  if (!company) {
    return <p>Loading...</p>; // Show a loading state until company data is fetched
  }

  const handleJobClick = (jobId: number) => {
    navigate(`/job-list/job/${jobId}`);
  };

  return (
    <div className="mx-auto h-full bg-white shadow-lg rounded-lg p-6">
      {/* Company Banner */}
      <div className="relative">
        <img
          src={company.bannerImage}
          alt={`${company.companyName} banner`}
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />

        {/* Company Logo positioned above the banner */}
        <div className="absolute bottom-0 left-4 transform translate-y-1/2">
          {/* Company Logo */}
          <img
            src={company.logoImage}
            alt={`${company.companyName} logo`}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Company Name and Slogan outside the banner */}
      <div className="mt-16 px-4 text-gray-800">
        <h1 className="text-3xl font-bold flex items-center">
          {company.companyName}
          <span className="ml-2 text-yellow-500" title="Verified">
            ✔️
          </span>
        </h1>
        <p className="text-sm">{company.slogan}</p>
      </div>

      {/* Company Details */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
        <div>
          <p>
            <span className="font-medium">📍 Location:</span> {company.address}
          </p>
          <p>
            <span className="font-medium">🏢 Industry:</span> {company.industry}
          </p>
        </div>
        <div>
          <p>
            <span className="font-medium">👥 Company Size:</span>{" "}
            {company.companySize.charAt(0).toUpperCase() +
              company.companySize.slice(1)}
          </p>
          <p>
            <span className="font-medium">✔️ Verified:</span>{" "}
            {company.verificationDate}
          </p>
        </div>
      </div>

      {/* Company Description */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          About the Company
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {company.companyDescription}
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h2>
        <div className="flex flex-col space-y-2 text-gray-600">
          <p className="flex items-center">
            <IoLocationOutline className="mr-2" />
            {company.address}
          </p>
          <p className="flex items-center">
            <IoGlobeOutline className="mr-2" />
            <a
              href={company.websiteLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {company.websiteLink}
            </a>
          </p>
          <p className="flex items-center">
            <IoLogoInstagram className="mr-2" />
            <a
              href={company.instagramLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
          <p className="flex items-center">
            <IoLogoFacebook className="mr-2" />
            <a
              href={company.facebookLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </p>
          <p className="flex items-center">
            <IoLogoLinkedin className="mr-2" />
            <a
              href={company.linkedinLink}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Job Openings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filterJob.length > 0 ? (
            filterJob.map((job) => (
              <JobCard key={job.id} job={job} onClick={handleJobClick} />
            ))
          ) : (
            <p className="text-gray-600">
              No job openings available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
