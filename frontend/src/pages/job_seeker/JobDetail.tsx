import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBookmark, FaShareAlt, FaRocket } from "react-icons/fa";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  lastUpdated: string;
  recruiter: {
    name: string;
    title: string;
  };
  companyDetails: {
    name: string;
    industry: string;
    size: string;
    address: string;
  };
  relatedJobs: {
    title: string;
    company: string;
    location: string;
    salary: string;
    lastUpdated: string;
    level: string;
    experience: string;
  }[];
}

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const jobData: Job = await response.json();
        setJob(jobData);
      } catch (error) {
        setError(error);
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
        {/* Header Job */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <p className="text-blue-600 font-semibold text-lg">{job.salary}</p>
            <p className="text-gray-600">{job.company}</p>
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
          <p className="text-gray-700">{job.description}</p>
        </div>

        {/* Qualifications */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Qualifications</h2>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((requirement, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full"
              >
                {requirement}
              </span>
            ))}
          </div>
        </div>

        {/* Required Skills */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Other Information */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Last Updated</h2>
          <p className="text-gray-600">{job.lastUpdated}</p>
        </div>

        {/* Recruiter Information */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Recruiter</h2>
          <p className="text-gray-700">{job.recruiter.name}</p>
          <p className="text-gray-600">{job.recruiter.title}</p>
        </div>

        {/* Company Details */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Company Details</h2>
          <p className="text-gray-700">{job.companyDetails.name}</p>
          <p className="text-gray-600">{job.companyDetails.industry}</p>
          <p className="text-gray-600">{job.companyDetails.size}</p>
          <p className="text-gray-600">{job.companyDetails.address}</p>
        </div>

        {/* Related Jobs */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Related Jobs</h2>
          <div className="grid grid-cols-2 gap-4">
            {job.relatedJobs.map((relatedJob, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-md p-4"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {relatedJob.title}
                </h3>
                <p className="text-gray-600">{relatedJob.company}</p>
                <p className="text-gray-600">{relatedJob.location}</p>
                <p className="text-blue-600 font-semibold">
                  {relatedJob.salary}
                </p>
                <p className="text-gray-600">{relatedJob.lastUpdated}</p>
                <p className="text-gray-600">{relatedJob.level}</p>
                <p className="text-gray-600">{relatedJob.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
