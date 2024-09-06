import { useEffect, useState } from "react";
import { api } from "../../utils";
import { useParams } from "react-router-dom";

interface Candidate {
  id: number;
  name: string;
  location: string;
  appliedAt: string;
  gender: string;
  requiredEducation: string;
  experience: string;
  resume: string;
  status: string;
}

export default function CandidatePage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [activeTab, setActiveTab] = useState("Chat Dimulai");
  const { id } = useParams<{ id: string }>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    api.get(`/applications/job/${id}`).then((res) => {
      const mappedCandidates = res?.map((application: any) => ({
        id: application.id,
        name: application.jobSeeker?.name || "Unknown",
        location: application.jobSeeker?.location || "Unknown",
        appliedAt: application.appliedAt,
        gender: application.jobSeeker?.gender || "-",
        requiredEducation: `Rp 1 - Rp 2/bulan`,
        experience: application.jobSeeker?.hasWorkExperience ? "Ya" : "Tidak",
        resume: application.jobSeeker?.resume || "-",
        status: application.status,
        createdAt: application.appliedAt,
      }));

      setCandidates(mappedCandidates);
    });
  }, [id]);

  console.log(candidates);
  const handleSortOrder = () => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index].status = newStatus;
    setCandidates(updatedCandidates);

    // Kirim update status ke API
    const candidateId = updatedCandidates[index].id; // Sesuaikan jika ada ID kandidat
    api
      .put(`/applications/${candidateId}/status`, { status: newStatus })
      .then((res) => {
        console.log("Status updated:", res.data);
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Sticky Tabs */}
      <div className="sticky top-[68px] bg-white z-10 border-b mb-6 px-4 py-2">
        <div className="flex space-x-6">
          {[
            "Chat Dimulai",
            "Dalam Komunikasi",
            "Tes dan Wawancara",
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
              <th className="p-4 text-left">Tanggal Dilamar</th>
              <th className="p-4 text-left">Jenis Kelamin</th>
              <th className="p-4 text-left">Ekspektasi Gaji</th>
              <th className="p-4 text-left">Berpengalaman</th>
              <th className="p-4 text-left">Link Resume</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">
                  {candidate.name} <br />
                  <span className="text-gray-500 text-sm">
                    {candidate.location}
                  </span>
                </td>
                <td className="p-4">{formatDate(candidate.appliedAt)}</td>
                <td className="p-4">{candidate.gender}</td>
                <td className="p-4">Rahasia</td>
                <td className="p-4">{candidate.experience}</td>
                <td className="p-4">{candidate.resume}</td>
                <td className="p-4">
                  {/* Select Option for Status */}
                  <select
                    value={candidate.status}
                    onChange={(e) => {
                      api
                        .put(
                          `/applications/${candidate.id}/status`,
                          e.target.value
                        )
                        .then(() => {
                          window.location.reload();
                        });
                    }}
                    className="p-2 border rounded"
                  >
                    <option value={`Chat Dimulai`}>Chat Dimulai</option>
                    <option value={`Dalam Komunikasi`}>Dalam Komunikasi</option>
                    <option value="Tes dan Wawancara">Tes dan Wawancara</option>
                    <option value="Direkrut">Direkrut</option>
                    <option value="Belum Sesuai">Belum Sesuai</option>
                  </select>
                </td>
                <td className="p-4">
                  <button className="py-1 px-2 bg-blue-500 text-white rounded">
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
