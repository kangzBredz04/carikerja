import { useState, useRef } from "react";
import { FaChevronUp } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // Gunakan useNavigate untuk navigasi

export default function JobList() {
  const jobsPerPage = 10;
  const totalJobs = 25;
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Inisialisasi navigasi

  const jobs = Array(25)
    .fill(0)
    .map((_, index) => ({
      id: index + 1, // Tambahkan ID unik untuk setiap pekerjaan
      title: `Pekerjaan ${index + 1}`,
      company: `Perusahaan ${index + 1}`,
      location: "Lokasi",
      salary: `Rp ${index + 1} jt`,
      tags: ["Kerja di kantor", "Penuh Waktu", "1 – 3 tahun", "Minimal SMA"],
      hot: index % 2 === 0,
      active: true,
      time: `${index + 10} menit yang lalu`,
    }));

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const handleScrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleJobClick = (id: number) => {
    navigate(`/job-list/job/${id}`); // Navigasi ke halaman detail pekerjaan dengan ID
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <div ref={topRef}></div>
      <div className="px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Cari lowongan"
            className="px-4 py-2 border rounded-lg w-4/5"
          />
          <button className="w-1/5 px-4 py-2 bg-blue-600 text-white rounded-lg">
            CARI
          </button>
        </div>
      </div>

      <div className="flex mt-6 px-6">
        <div className="w-1/4 pr-4">
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            {/* Filter Sidebar */}
            <div className="w-1/4 pr-4">
              <div className="bg-white p-4 rounded-lg shadow-md h-full">
                {/* Prioritaskan */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Prioritaskan</h3>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">
                      Paling Relevan
                    </button>
                    <button className="px-4 py-2 bg-white border rounded-lg">
                      Baru Ditambahkan
                    </button>
                  </div>
                </div>

                {/* Tipe Pekerjaan */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Tipe Pekerjaan</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      "Penuh Waktu",
                      "Kontrak",
                      "Magang",
                      "Paruh Waktu",
                      "Freelance",
                      "Harian",
                    ].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox" />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Kebijakan Kerja */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Kebijakan Kerja</h3>
                  <div className="flex flex-col gap-2">
                    {["Kerja di kantor", "Hybrid", "Remote"].map((policy) => (
                      <label key={policy} className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox" />
                        {policy}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pengalaman Kerja */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Pengalaman Kerja</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      "Kurang dari setahun",
                      "1-3 tahun",
                      "3-5 tahun",
                      "Lebih dari 5 tahun",
                    ].map((experience) => (
                      <label
                        key={experience}
                        className="flex items-center gap-2"
                      >
                        <input type="checkbox" className="form-checkbox" />
                        {experience}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tingkat Pendidikan */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Tingkat Pendidikan</h3>
                  <div className="flex flex-col gap-2">
                    {["SMA/SMK", "Diploma", "Sarjana", "Pascasarjana"].map(
                      (education) => (
                        <label
                          key={education}
                          className="flex items-center gap-2"
                        >
                          <input type="checkbox" className="form-checkbox" />
                          {education}
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Terakhir Diperbarui */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">
                    Terakhir Diperbarui
                  </h3>
                  <div className="flex flex-col gap-2">
                    {[
                      "Dalam 24 jam",
                      "Dalam 3 hari",
                      "Dalam 7 hari",
                      "Lebih dari 7 hari",
                    ].map((updated) => (
                      <label key={updated} className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox" />
                        {updated}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
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
                  onClick={() => handleJobClick(job.id)} // Panggil fungsi handleJobClick dengan ID pekerjaan
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
