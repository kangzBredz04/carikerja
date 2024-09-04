import React, { useState } from "react";

interface Application {
  id: number;
  title: string;
  company: string;
  date: string;
  status: string;
}

const applications: Application[] = [
  {
    id: 1,
    title: "UI/UX Designer",
    company: "Ribloch Planet",
    date: "October 3, 2023, 2:11 PM",
    status: "In Review",
  },
  {
    id: 2,
    title: "Sales",
    company: "Ribloch Planet",
    date: "September 29, 2023, 4:51 PM",
    status: "Closed",
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "TechWorld",
    date: "September 30, 2023, 9:23 AM",
    status: "Interview",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Innovate Inc",
    date: "September 28, 2023, 11:14 AM",
    status: "Offering",
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "Analytics Hub",
    date: "September 27, 2023, 3:30 PM",
    status: "Hired",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "MarketForce",
    date: "October 1, 2023, 12:00 PM",
    status: "Not Suitable",
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "CloudNet",
    date: "October 2, 2023, 5:45 PM",
    status: "In Review",
  },
  {
    id: 8,
    title: "Content Writer",
    company: "Creative Minds",
    date: "October 3, 2023, 10:10 AM",
    status: "Interview",
  },
  {
    id: 9,
    title: "Graphic Designer",
    company: "DesignPro",
    date: "September 26, 2023, 4:20 PM",
    status: "Hired",
  },
  {
    id: 10,
    title: "Customer Support",
    company: "HelpDesk Co.",
    date: "September 25, 2023, 6:15 PM",
    status: "Closed",
  },
];

const ApplicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const tabs = [
    "All",
    "In Review",
    "Interview",
    "Offering",
    "Hired",
    "Not Suitable",
    "Closed",
  ];

  // Filter applications based on active tab
  const filteredApplications = applications.filter((app) => {
    if (activeTab === 0) return true; // "All" tab shows all applications
    return app.status === tabs[activeTab];
  });

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
            {sortedApplications.length} Applications
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
          <div key={app.id} className="border p-4 rounded mb-4">
            <h3 className="font-bold text-xl">{app.title}</h3>
            <p>{app.company}</p>
            <p>Sent on {app.date}</p>
            <p>Status: {app.status}</p>
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
