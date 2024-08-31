/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoBookmarkOutline } from "react-icons/io5";

// Menghitung format gaji
const formatSalary = (minSalary: number, maxSalary: number) => {
  const formatToJt = (salary: number) => {
    const salaryInJt = salary / 1_000_000;
    return salaryInJt >= 1
      ? `${salaryInJt.toFixed(1).replace(/\.0$/, "")} jt`
      : salary.toLocaleString();
  };

  return `${formatToJt(minSalary)} - ${formatToJt(maxSalary)}`;
};

interface Job {
  employer: any;
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
  companyName: string;
  companyAddress: string;
  companyLogo: string; // URL logo perusahaan
}

interface JobCardProps {
  job: Job;
  onClick: (id: number) => void;
}

export default function JobCard({ job, onClick }: JobCardProps) {
  return (
    <div
      className="border-2 border-gray-200 rounded-md p-4 mb-4 cursor-pointer"
      onClick={() => onClick(job.id)}
    >
      <div className="flex items-center mb-4">
        <img
          src={job.companyLogo || "/logo-pub.png"} // Gambar dummy jika logo tidak ada
          alt="Company Logo"
          className="w-12 h-12 object-cover rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
          <span className="text-gray-600">
            {formatSalary(job.minSalary, job.maxSalary)}
          </span>
        </div>
      </div>

      <div className="mb-4 space-x-2 space-y-2">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
          {job.workSystem}
        </span>
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
          {job.requiredExperience}
        </span>
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
          {job.jobField}
        </span>
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
          {job.requiredEducation}
        </span>
      </div>

      <p className="text-gray-500 mb-2">
        {job.employer.companyName || "Anonymous"}
      </p>
      <p className="text-gray-500 mb-2">
        {job.employer.address || "Alamat tidak ditemukan"}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">{job.jobDescription}</span>
        <IoBookmarkOutline size={20} className="cursor-pointer" />
      </div>
    </div>
  );
}
