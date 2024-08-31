import React, { useState, useRef, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils";
import JobCard from "../../components/JobCard";
import { FaSearch } from "react-icons/fa";

interface Job {
  id: number;
  jobTitle: string;
  jobField: string;
  jobType: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  requiredEducation: string;
  requiredExperience: string;
  requiredSkills: string;
  workSystem: string;
  jobDescription: string;
}

export default function JobList() {
  const jobsPerPage = 10;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedWorkPolicies, setSelectedWorkPolicies] = useState<string[]>(
    []
  );
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<
    string[]
  >([]);
  const [selectedEducationLevels, setSelectedEducationLevels] = useState<
    string[]
  >([]);
  const topRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Fetch job data from backend
  useEffect(() => {
    api
      .get("/jobs") // Replace with appropriate endpoint
      .then((response) => {
        setJobs(response);
        setFilteredJobs(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  // Update filteredJobs whenever searchTerm or filters change
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearchTerm =
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobField.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesJobType =
        selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType);

      const matchesWorkPolicy =
        selectedWorkPolicies.length === 0 ||
        selectedWorkPolicies.includes(job.workSystem);

      const matchesExperience =
        selectedExperienceLevels.length === 0 ||
        selectedExperienceLevels.includes(job.requiredExperience);

      const matchesEducation =
        selectedEducationLevels.length === 0 ||
        selectedEducationLevels.includes(job.requiredEducation);

      return (
        matchesSearchTerm &&
        matchesJobType &&
        matchesWorkPolicy &&
        matchesExperience &&
        matchesEducation
      );
    });

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [
    searchTerm,
    jobs,
    selectedJobTypes,
    selectedWorkPolicies,
    selectedExperienceLevels,
    selectedEducationLevels,
  ]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleScrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleJobClick = (id: number) => {
    navigate(`/job-list/job/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleJobTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedJobTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  const handleWorkPolicyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSelectedWorkPolicies((prev) =>
      prev.includes(value)
        ? prev.filter((policy) => policy !== value)
        : [...prev, value]
    );
  };

  const handleExperienceLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSelectedExperienceLevels((prev) =>
      prev.includes(value)
        ? prev.filter((level) => level !== value)
        : [...prev, value]
    );
  };

  const handleEducationLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSelectedEducationLevels((prev) =>
      prev.includes(value)
        ? prev.filter((level) => level !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <div ref={topRef}></div>
      <div className="px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search jobs"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-lg w-4/5"
          />
          <button className="w-1/5 px-4 py-2 bg-blue-600 text-white rounded-lg">
            Search
          </button>
        </div>
      </div>

      <div className="flex mt-6 px-6 mb-6">
        <div className="w-1/4 pr-4">
          <div className="bg-white rounded-lg shadow-md h-full">
            {/* Filter Sidebar */}
            <div className="bg-white p-4 rounded-lg shadow-md h-full">
              {/* Prioritize */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Prioritize</h3>
                <div className="flex items-center gap-2">
                  <button
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg"
                    // Add functionality for prioritize options if needed
                  >
                    Most Relevant
                  </button>
                  <button
                    className="px-4 py-2 bg-white border rounded-lg"
                    // Add functionality for prioritize options if needed
                  >
                    Newest
                  </button>
                </div>
              </div>

              {/* Job Types */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Job Type</h3>
                <div className="flex flex-col gap-2">
                  {["Contract", "Internship", "Part Time", "Freelance"].map(
                    (type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={type}
                          checked={selectedJobTypes.includes(type)}
                          onChange={handleJobTypeChange}
                          className="form-checkbox"
                        />
                        {type}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Work Policy */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Work Policy</h3>
                <div className="flex flex-col gap-2">
                  {["On-site", "Hybrid", "Remote"].map((policy) => (
                    <label key={policy} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={policy}
                        checked={selectedWorkPolicies.includes(policy)}
                        onChange={handleWorkPolicyChange}
                        className="form-checkbox"
                      />
                      {policy}
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Experience Level</h3>
                <div className="flex flex-col gap-2">
                  {[
                    "Less than a year",
                    "1-3 years",
                    "3-5 years",
                    "More than 5 years",
                  ].map((experience) => (
                    <label key={experience} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={experience}
                        checked={selectedExperienceLevels.includes(experience)}
                        onChange={handleExperienceLevelChange}
                        className="form-checkbox"
                      />
                      {experience}
                    </label>
                  ))}
                </div>
              </div>

              {/* Education Level */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Education Level</h3>
                <div className="flex flex-col gap-2">
                  {[
                    "High School",
                    "Associate's Degree",
                    "Bachelor's Degree",
                    "Master's Degree",
                  ].map((education) => (
                    <label key={education} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={education}
                        checked={selectedEducationLevels.includes(education)}
                        onChange={handleEducationLevelChange}
                        className="form-checkbox"
                      />
                      {education}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/4 pl-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center text-gray-500 flex flex-col items-center gap-2">
                <FaSearch className="text-4xl text-gray-400" />
                <p>Lowongan kerja tidak ditemukan !!!</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {currentJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={() => handleJobClick(job.id)}
                    />
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleScrollToTop}
          className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg"
        >
          <FaChevronUp />
        </button>
      </div>
    </div>
  );
}
