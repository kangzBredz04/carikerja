import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBookmark, FaShareAlt, FaRocket } from "react-icons/fa";

interface Job {
  id: number;
  employer: {
    id: number;
    user: {
      id: number;
      email: string;
      name: string | null;
      role: string;
      username: string;
    };
    bannerImage: string | null;
    logoImage: string | null;
    companyName: string | null;
    slogan: string | null;
    address: string | null;
    companySize: string | null;
    industry: string | null;
    websiteLink: string | null;
    instagramLink: string | null;
    facebookLink: string | null;
    linkedinLink: string | null;
    companyDescription: string | null;
  };
  jobField: string;
  jobTitle: string;
  jobType: string;
  workSystem: string;
  location: string;
  jobDescription: string;
  minSalary: number;
  maxSalary: number;
  minAge: number;
  maxAge: number;
  genderPreference: string;
  requiredSkills: string;
  requiredEducation: string;
  requiredExperience: string;
  cvLink: string;
}

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/${id}`); // Replace with your API endpoint
        setJob(await response.json());
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Job Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{job.jobTitle}</h1>
            <p className="text-blue-600 font-semibold text-lg">
              {job.minSalary.toLocaleString()} -{" "}
              {job.maxSalary.toLocaleString()} IDR
            </p>
            <p className="text-gray-600">
              {job.employer.companyName || "No company info"}
            </p>
            <p className="text-gray-600">{job.location}</p>
          </div>
          <div>
            {/* Action Buttons */}
            <div className="flex flex-col gap-5">
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
                <FaRocket />
                Apply Fast
              </button>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-600 rounded-lg shadow-lg hover:bg-gray-200">
                  <FaBookmark />
                  Bookmark
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-600 rounded-lg shadow-lg hover:bg-gray-200">
                  <FaShareAlt />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Job Description</h2>
          <p className="text-gray-700">{job.jobDescription}</p>
        </div>

        {/* Required Skills */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.split(",").map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Required Experience */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Required Experience</h2>
          <p className="text-gray-600">{job.requiredExperience}</p>
        </div>

        {/* Employer Details */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Employer Details</h2>
          <p className="text-gray-700">{job.employer.companyName}</p>
          <p className="text-gray-600">{job.employer.address}</p>
          <p className="text-gray-600">{job.employer.industry}</p>
          <p className="text-gray-600">{job.employer.companySize}</p>
          <p className="text-gray-600">{job.employer.companyDescription}</p>
        </div>
      </div>
    </div>
  );
}
