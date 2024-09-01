import { Job } from "../types/Job";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

export default function JobCardDashboard({ job }: { job: Job }) {
  const { jobTitle, jobType, location, createdAt, applicants } = job;

  return (
    <div className="bg-white shadow-md flex flex-col gap-2 rounded-lg p-4 border border-gray-200">
      {/* Job Title */}
      <h2 className="text-2xl font-semibold mb-2 border-b border-black">
        {jobTitle}
      </h2>

      {/* Job Details */}
      <div className="flex justify-between mb-4">
        {/* Left side */}
        <div className="flex flex-col gap-2">
          <span className="text-lg text-gray-600 flex items-center gap-2">
            <FaClock /> {jobType}
          </span>
          <span className="text-lg text-gray-600 flex items-center gap-2">
            <IoLocationSharp /> {location}
          </span>
          <span className="text-lg text-gray-600 flex items-center gap-2">
            <FaCalendarAlt /> {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center text-lg text-gray-600">
          <span className="font-semibold flex items-center gap-1">
            <p>{applicants != null ? applicants : 0}</p>
            <p> pelamar</p>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button className="bg-blue-500 text-white py-1 w-1/4 rounded hover:bg-blue-600">
          Kelola Pelamar
        </button>
        <button className="bg-yellow-500 text-white py-1 w-1/4 rounded hover:bg-yellow-600">
          Edit
        </button>
        <button className="bg-red-500 text-white py-1 w-1/4 rounded hover:bg-red-600">
          Hapus
        </button>
      </div>
    </div>
  );
}
