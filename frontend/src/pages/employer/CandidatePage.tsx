import { useState } from "react";

interface Candidate {
  name: string;
  location: string;
  whatsapp: string;
  gender: string;
  salaryExpectation: string;
  experience: string;
  lastPosition: string;
  status: string;
  createdAt: string; // Date field to sort candidates by time (dummy data)
}

const dummyData: Candidate[] = [
  // Chat Dimulai
  {
    name: "Kevin Leonardo",
    location: "Lawata, Indonesia",
    whatsapp: "WhatsApp",
    gender: "-",
    salaryExpectation: "Rp 5 jt/bulan",
    experience: "2 thn 1 bln",
    lastPosition: "-",
    status: "Chat Dimulai",
    createdAt: "2023-08-01",
  },
  {
    name: "Dewi Anggraini",
    location: "Surabaya, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Female",
    salaryExpectation: "Rp 4.5 jt/bulan",
    experience: "3 thn",
    lastPosition: "Customer Service",
    status: "Chat Dimulai",
    createdAt: "2023-08-02",
  },
  {
    name: "Ferry Saputra",
    location: "Medan, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Male",
    salaryExpectation: "Rp 6 jt/bulan",
    experience: "2 thn",
    lastPosition: "Sales Executive",
    status: "Chat Dimulai",
    createdAt: "2023-08-03",
  },

  // Dalam Komunikasi
  {
    name: "Rina Wijaya",
    location: "Jakarta, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Female",
    salaryExpectation: "Rp 7 jt/bulan",
    experience: "3 thn",
    lastPosition: "Marketing Manager",
    status: "Dalam Komunikasi",
    createdAt: "2023-07-25",
  },
  {
    name: "Andri Firmansyah",
    location: "Malang, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Male",
    salaryExpectation: "Rp 6.5 jt/bulan",
    experience: "4 thn",
    lastPosition: "Graphic Designer",
    status: "Dalam Komunikasi",
    createdAt: "2023-07-20",
  },
  {
    name: "Wulan Pertiwi",
    location: "Yogyakarta, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Female",
    salaryExpectation: "Rp 5.5 jt/bulan",
    experience: "3.5 thn",
    lastPosition: "Content Writer",
    status: "Dalam Komunikasi",
    createdAt: "2023-07-28",
  },

  // Skill & Psikotes
  {
    name: "Budi Santoso",
    location: "Bandung, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Male",
    salaryExpectation: "Rp 6 jt/bulan",
    experience: "5 thn",
    lastPosition: "Software Engineer",
    status: "Skill & Psikotes",
    createdAt: "2023-06-20",
  },
  {
    name: "Lina Syafitri",
    location: "Semarang, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Female",
    salaryExpectation: "Rp 5.5 jt/bulan",
    experience: "4 thn",
    lastPosition: "HR Manager",
    status: "Skill & Psikotes",
    createdAt: "2023-06-25",
  },
  {
    name: "Agus Hartono",
    location: "Banten, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Male",
    salaryExpectation: "Rp 7 jt/bulan",
    experience: "6 thn",
    lastPosition: "Project Manager",
    status: "Skill & Psikotes",
    createdAt: "2023-06-22",
  },

  // Wawancara
  {
    name: "Siti Nurhaliza",
    location: "Bali, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Female",
    salaryExpectation: "Rp 4 jt/bulan",
    experience: "1 thn",
    lastPosition: "Admin",
    status: "Wawancara",
    createdAt: "2023-08-15",
  },
  {
    name: "Dimas Setiawan",
    location: "Jakarta, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Male",
    salaryExpectation: "Rp 5.5 jt/bulan",
    experience: "3 thn",
    lastPosition: "Operations Supervisor",
    status: "Wawancara",
    createdAt: "2023-08-10",
  },
  {
    name: "Ayu Lestari",
    location: "Bali, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Female",
    salaryExpectation: "Rp 6 jt/bulan",
    experience: "2 thn",
    lastPosition: "Finance Analyst",
    status: "Wawancara",
    createdAt: "2023-08-12",
  },

  // Negosiasi
  {
    name: "Andi Pratama",
    location: "Surabaya, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Male",
    salaryExpectation: "Rp 5.5 jt/bulan",
    experience: "4 thn",
    lastPosition: "HR Specialist",
    status: "Negosiasi",
    createdAt: "2023-08-05",
  },
  {
    name: "Lina Wijaya",
    location: "Jakarta, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Female",
    salaryExpectation: "Rp 6.5 jt/bulan",
    experience: "5 thn",
    lastPosition: "Marketing Specialist",
    status: "Negosiasi",
    createdAt: "2023-08-03",
  },
  {
    name: "Doni Kusuma",
    location: "Bogor, Indonesia",
    whatsapp: "WhatsApp",
    gender: "Male",
    salaryExpectation: "Rp 7 jt/bulan",
    experience: "6 thn",
    lastPosition: "Business Analyst",
    status: "Negosiasi",
    createdAt: "2023-08-01",
  },
];

export default function CandidatePage() {
  const [candidates] = useState<Candidate[]>(dummyData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [activeTab, setActiveTab] = useState("Chat Dimulai");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };

  const filteredCandidates = candidates
    .filter((candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((candidate) => candidate.status === activeTab)
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Sticky Tabs */}
      <div className="sticky top-[68px] bg-white z-10 border-b mb-6 px-4 py-2">
        <div className="flex space-x-6">
          {[
            "Chat Dimulai",
            "Dalam Komunikasi",
            "Skill & Psikotes",
            "Wawancara",
            "Negosiasi",
            "Direkrut",
            "Belum Sesuai",
          ].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 font-semibold"
                  : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sticky Search and Filter */}
        <div className="flex justify-between items-center mt-4 mb-4">
          <input
            type="text"
            placeholder={`Cari kandidat di tahap: ${activeTab}`}
            className="p-2 border rounded w-1/2"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="flex space-x-4 items-center">
            <button
              className="py-2 px-4 bg-gray-200 rounded"
              onClick={handleSortOrder}
            >
              Filter
            </button>
            <span className="text-gray-600">
              Urutkan:{" "}
              {sortOrder === "newest" ? "Baru ke Lama" : "Lama ke Baru"}
            </span>
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-4 text-left">Nama & Domisili</th>
              <th className="p-4 text-left">WhatsApp</th>
              <th className="p-4 text-left">Jenis Kelamin</th>
              <th className="p-4 text-left">Ekspektasi Gaji</th>
              <th className="p-4 text-left">Total Pengalaman</th>
              <th className="p-4 text-left">Posisi Terakhir</th>
              <th className="p-4 text-left">Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">
                  <div>
                    <span className="font-semibold">{candidate.name}</span>
                    <div className="text-gray-500">{candidate.location}</div>
                  </div>
                </td>
                <td className="p-4">{candidate.whatsapp}</td>
                <td className="p-4">{candidate.gender}</td>
                <td className="p-4">{candidate.salaryExpectation}</td>
                <td className="p-4">{candidate.experience}</td>
                <td className="p-4">{candidate.lastPosition}</td>
                <td className="p-4">
                  <button className="py-1 px-3 bg-blue-500 text-white rounded">
                    Chat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message if no more candidates */}
      {filteredCandidates.length === 0 && (
        <div className="flex justify-center items-center min-h-[200px] mt-8">
          <h1 className="text-xl font-semibold text-gray-600">
            Tidak ada kandidat yang ditemukan
          </h1>
        </div>
      )}
    </div>
  );
}
