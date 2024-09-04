import React, { useState, useEffect, useContext } from "react";
import { AllContext } from "../../App";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";

interface Application {
  id: number;
  title: string;
  company: string;
  date: string;
  status: string;
  jobSeekerId: number; // Include jobSeekerId to filter by userId
  imageUrl: string; // URL for the image
}

const ApplicationsPage: React.FC = () => {
  const { userId } = useContext(AllContext) as unknown as { userId: string };
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    "All",
    "Dilamar",
    "Sedang Komunikasi",
    "Wawancara & Tes",
    "Direkrut",
    "Belum Sesuai",
  ];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/applications"); // Fetch all applications
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        console.log(data);

        setApplications(data);
        setLoading(false);
        filterApplications(data); // Filter applications based on userId
      } catch (err) {
        setError(err as string);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  useEffect(() => {
    filterApplications(applications); // Re-filter applications when activeTab changes
  }, [applications, activeTab]);

  const filterApplications = (apps: Application[]) => {
    const filtered = apps.filter(
      (app) => app.jobSeeker.id === parseInt(userId)
    );
    setFilteredApplications(
      filtered.filter(
        (app) => activeTab === 0 || app.status === tabs[activeTab]
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  // Pagination logic
  const itemsPerPage = 3;
  const totalPages = Math.ceil(sortedApplications.length / itemsPerPage);
  const paginatedApplications = sortedApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="font-bold text-xl mb-4">Applications</h2>
        <ul>
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveTab(index);
                setCurrentPage(1); // Reset to first page on tab change
              }}
              className={`p-2 cursor-pointer ${
                activeTab === index ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="w-3/4 p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-2xl">
            {filteredApplications.length} Applications
          </h2>
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "latest" | "oldest")
            }
            className="border rounded p-2"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Applications List */}
        {paginatedApplications.map((app) => (
          <div
            key={app.id}
            className="border p-4 rounded mb-4 flex items-center"
          >
            <img
              src={app.job.employer.logoImage}
              alt={app.job.jobTitle}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div>
              <h3 className="font-bold text-xl">{app.job.jobTitle}</h3>
              <p className="text-gray-700">{app.company}</p>
              <div className="flex items-center text-gray-500">
                <FaCalendarAlt className="mr-2" />
                <p>{format(new Date(app.appliedAt), "EEEE, dd MMMM yyyy")}</p>
              </div>
              <p className="font-medium">Status: {app.status}</p>
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
