import React, { useEffect, useState } from "react";
import { api } from "../utils";

// Function to calculate the duration between two dates
const calculateDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMs = Math.abs(end.getTime() - start.getTime());
  const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
  const diffInMonths = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44)
  );

  if (diffInYears > 0) {
    return `${diffInYears} tahun ${diffInMonths} bulan`;
  }
  return `${diffInMonths} bulan`;
};

interface WorkExperience {
  id: number;
  jobSeeker: {
    id: number;
  };
  companyName: string;
  startDate: string;
  endDate: string;
  position: string;
  additionalInfo: string;
}

interface Props {
  userId: number;
}

export default function WorkExperienceComponent({ userId }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false); // Track if we are in edit mode
  const [editExperienceId, setEditExperienceId] = useState<number | null>(null); // Track the ID of the experience being edited
  const [newExperience, setNewExperience] = useState<Partial<WorkExperience>>({
    companyName: "",
    startDate: "",
    endDate: "",
    position: "",
    additionalInfo: "",
  });

  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data from the API
    api
      .get(`/work-experience/job-seeker/${userId}`)
      .then((response) => {
        setExperiences(response); // Assuming the API response contains an array of experiences
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching experiences:", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleSubmit = () => {
    if (
      newExperience.companyName &&
      newExperience.startDate &&
      newExperience.endDate &&
      newExperience.position
    ) {
      if (editMode && editExperienceId !== null) {
        // Update existing experience
        const updatedExperience = {
          id: editExperienceId,
          jobSeeker: {
            id: userId,
          },
          ...newExperience,
        } as WorkExperience;

        api
          .put(`/work-experience/${editExperienceId}`, updatedExperience)
          .then(() => {
            alert("Pengalaman berhasil diperbarui");
            window.location.reload();
          })
          .catch((error) => console.error("Error updating experience:", error));
      } else {
        // Add new experience
        const newExp = {
          jobSeeker: {
            id: userId,
          },
          ...newExperience,
        } as WorkExperience;

        api
          .post("/work-experience", newExp)
          .then(() => alert("Berhasil disimpan"))
          .catch((error) => console.error("Error saving experience:", error));
      }

      // Reset form after submission
      setNewExperience({
        companyName: "",
        startDate: "",
        endDate: "",
        position: "",
        additionalInfo: "",
      });
      setShowForm(false); // Close the form after submission
      setEditMode(false); // Exit edit mode
      setEditExperienceId(null); // Reset edit ID
    } else {
      alert("Harap isi semua data pengalaman kerja.");
    }
  };

  const onEdit = (id: number) => {
    const experienceToEdit = experiences.find((exp) => exp.id === id);
    if (experienceToEdit) {
      setNewExperience({
        companyName: experienceToEdit.companyName,
        startDate: experienceToEdit.startDate,
        endDate: experienceToEdit.endDate,
        position: experienceToEdit.position,
        additionalInfo: experienceToEdit.additionalInfo,
      });
      setEditExperienceId(id);
      setEditMode(true);
      setShowForm(true); // Show the form with prefilled data
    }
  };

  const onDelete = (id: number) => {
    api
      .delete(`/work-experience/${id}`)
      .then(() => {
        setExperiences(experiences.filter((exp) => exp.id !== id));
        alert("Pengalaman kerja berhasil dihapus");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting experience:", error);
      });
  };

  return (
    <div className="p-6">
      <h2 className="font-semibold text-xl mb-4 border-b pb-2 text-gray-800">
        Pengalaman Kerja
      </h2>

      <button
        className="text-blue-500 font-semibold mb-6"
        onClick={() => setShowForm(!showForm)}
      >
        + Tambahkan Pengalaman Kerja
      </button>

      {showForm && (
        <div className="mb-8 p-4 border rounded-lg bg-gray-100">
          <h3 className="font-semibold text-lg mb-4">
            Tambahkan Pengalaman Kerja Baru
          </h3>

          <div className="mb-4">
            <label className="block text-gray-700">Perusahaan</label>
            <input
              type="text"
              name="companyName"
              value={newExperience.companyName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Masukkan Nama Perusahaan"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tanggal Mulai</label>
            <input
              type="date"
              name="startDate"
              value={newExperience.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tanggal Selesai</label>
            <input
              type="date"
              name="endDate"
              value={newExperience.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Posisi</label>
            <input
              type="text"
              name="position"
              value={newExperience.position}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Masukkan Posisi"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Deskripsi</label>
            <textarea
              name="additionalInfo"
              value={newExperience.additionalInfo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Masukkan Deskripsi Pekerjaan"
            ></textarea>
          </div>

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={handleSubmit}
          >
            Simpan
          </button>
        </div>
      )}

      {experiences.length > 0 ? (
        experiences.map((exp) => (
          <div key={exp.id} className="relative mb-8">
            {/* Timeline Indicator */}
            <div className="absolute left-0 top-2 h-full border-l-4 border-blue-500"></div>
            <div className="relative flex pl-8">
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{exp.position}</h3>
                <p className="text-gray-600">{exp.companyName}</p>
                <p className="text-gray-500">
                  {exp.startDate} - {exp.endDate} (
                  {calculateDuration(exp.startDate, exp.endDate)})
                </p>
                <p className="text-gray-700 mt-2">{exp.additionalInfo}</p>
              </div>

              {/* Edit and Delete Buttons */}
              <div className="flex items-start ml-4">
                <button
                  className="text-blue-500 mr-2 hover:text-blue-600"
                  onClick={() => onEdit(exp.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => onDelete(exp.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Tidak ada pengalaman kerja yang tersedia.</p>
      )}
    </div>
  );
}
