import { useState, useRef, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  hot: boolean;
  active: boolean;
  time: string;
}

export default function JobList() {
  const jobsPerPage = 10;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Untuk menangani pencarian
  const topRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Ambil data dari backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/jobs"); // Ganti dengan endpoint backend yang sesuai
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
          setFilteredJobs(data); // Set initial data untuk filteredJobs
        } else {
          console.error("Error fetching jobs:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Update filteredJobs saat searchTerm berubah
  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset ke halaman 1 saat melakukan pencarian
  }, [searchTerm, jobs]);

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

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <div ref={topRef}></div>
      <div className="px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Cari lowongan"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-lg w-4/5"
          />
          <button className="w-1/5 px-4 py-2 bg-blue-600 text-white rounded-lg">
            CARI
          </button>
        </div>
      </div>

      <div className="flex mt-6 px-6 mb-6">
        <div className="w-1/4 pr-4">
          <div className="bg-white rounded-lg shadow-md h-full">
            {/* Filter Sidebar */}
            <div className="bg-white p-4 rounded-lg shadow-md h-full">
              {/* Filter Sidebar bisa disini */}
            </div>
          </div>
        </div>

        <div className="w-3/4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              Info Lowongan Kerja di Indonesia
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {currentJobs.map((job, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-md p-4 mb-4 cursor-pointer"
                  onClick={() => handleJobClick(job.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <span className="text-gray-600">{job.salary}</span>
                  </div>
                  <p className="text-gray-500">{job.company}</p>
                  <p className="text-gray-500 mb-2">{job.location}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {job.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {job.hot && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                          HOT
                        </span>
                      )}
                      {job.active && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                          Aktif Merekrut
                        </span>
                      )}
                      <span className="text-gray-500 text-sm">{job.time}</span>
                    </div>
                    <IoBookmarkOutline size={20} className="cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-4 py-2 ${
                  currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white"
                } rounded-lg`}
              >
                Previous
              </button>
              <span>
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-4 py-2 ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-blue-600 text-white"
                } rounded-lg`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleScrollToTop}
        className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg"
      >
        <FaChevronUp />
      </button>
    </div>
  );
}
