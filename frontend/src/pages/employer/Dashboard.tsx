// Dashboard.tsx
import React, { useState } from "react";

export interface Job {
  id: number;
  title: string;
  type: string;
  address: string;
  createdAt: string;
  applicants: number;
}

// Sample data
const mockJobs: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    type: "Full-time",
    address: "Jakarta, Indonesia",
    createdAt: "2024-08-20",
    applicants: 12,
  },
  {
    id: 2,
    title: "Marketing Specialist",
    type: "Part-time",
    address: "Bandung, Indonesia",
    createdAt: "2024-08-22",
    applicants: 5,
  },
  // Add more mock jobs as needed
];

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  // Handle delete job
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Daftar Lowongan Kerja
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-4 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            <p className="text-gray-600">Tipe Pekerjaan: {job.type}</p>
            <p className="text-gray-600">Alamat: {job.address}</p>
            <p className="text-gray-600">Dibuat: {job.createdAt}</p>
            <p className="text-gray-600">Jumlah Pelamar: {job.applicants}</p>

            <div className="flex space-x-4 mt-auto">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => alert("Kelola Kandidat")}
              >
                Kelola Kandidat
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                onClick={() => alert("Edit Job")}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                onClick={() => handleDelete(job.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
