import React, { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { api } from "../../utils";
import { Skill } from "../../types/Skill";
import { EmployeContext } from "./Employe";
import { useLocation, useNavigate } from "react-router-dom";
import { Job } from "../../types/Job";

export default function TambahJob() {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeId } = useContext(EmployeContext);
  const [formData, setFormData] = useState({
    jobField: "",
    jobTitle: "",
    jobType: "",
    workSystem: "",
    location: "",
    jobDescription: "",
    minSalary: "",
    maxSalary: "",
    minAge: "",
    maxAge: "",
    genderPreference: "",
    requiredSkills: "",
    requiredEducation: "",
    requiredExperience: "",
    employer: {
      id: employeId,
    },
    createdAt: new Date().toISOString(),
    applicants: 0, // Set jumlah pelamar
  });

  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);

  useEffect(() => {
    api.get("/skills").then((res) => setAvailableSkills(res));
    const state = location.state as { job?: Job };
    if (state?.job) {
      setFormData(state.job);
      if (state.job.requiredSkills) {
        setSelectedSkills(state.job.requiredSkills.split(","));
      }
    }
  }, [location.state]);

  console.log(formData);

  // State untuk menyimpan skill yang dipilih dan hasil pencarian
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handle perubahan data form
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Buat objek khusus untuk update data yang hanya berisi field yang diperlukan
        const updateData = {
          jobField: formData.jobField,
          jobTitle: formData.jobTitle,
          jobType: formData.jobType,
          workSystem: formData.workSystem,
          location: formData.location,
          jobDescription: formData.jobDescription,
          minSalary: formData.minSalary,
          maxSalary: formData.maxSalary,
          minAge: formData.minAge,
          maxAge: formData.maxAge,
          genderPreference: formData.genderPreference,
          requiredSkills: formData.requiredSkills,
          requiredEducation: formData.requiredEducation,
          requiredExperience: formData.requiredExperience,
        };

        // Lakukan update data menggunakan PUT request
        await api.put(`/jobs/${formData.id}`, updateData);
        alert("Data lowongan kerja berhasil diedit");
        window.location.href = "/employe/dashboard"; // Arahkan ke dashboard setelah update
      } else {
        // Lakukan tambah data jika formData.id tidak ada
        console.log("masuk");

        await api
          .post("/jobs", formData)
          .then(() => alert("Data lowongan kerja berhasil ditambah"))
          .catch((err) => console.log(err));
        window.location.href = "/employe/dashboard"; // Arahkan ke dashboard setelah tambah
      }

      // Reset form setelah submit berhasil
      setFormData({
        jobField: "",
        jobTitle: "",
        jobType: "",
        workSystem: "",
        location: "",
        jobDescription: "",
        minSalary: "",
        maxSalary: "",
        minAge: "",
        maxAge: "",
        genderPreference: "",
        requiredSkills: "",
        requiredEducation: "",
        requiredExperience: "",
        employer: {
          id: employeId,
        },
        createdAt: new Date().toISOString(), // Set tanggal saat ini
        applicants: 0, // Set jumlah pelamar
      });
    } catch (error) {
      console.log(error); // Log error jika ada
    }
  };

  // Fungsi untuk menangani penambahan skill dari hasil pencarian
  const handleAddSkill = (skill: string) => {
    if (selectedSkills.length < 5 && !selectedSkills.includes(skill)) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
      // Update formData dengan skill yang dipilih
      setFormData((prevData) => ({
        ...prevData,
        requiredSkills: updatedSkills.join(","),
      }));
    }
    setSearchTerm(""); // Reset input pencarian
  };

  // Fungsi untuk menghapus skill yang sudah dipilih
  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(updatedSkills);
    // Update formData dengan skill yang dipilih
    setFormData((prevData) => ({
      ...prevData,
      requiredSkills: updatedSkills.join(","),
    }));
  };

  // Filter keahlian berdasarkan search term
  const filteredSkills = availableSkills?.filter((skill) =>
    skill.skillName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          {formData.id ? "Edit" : "Tambah"} Lowongan Pekerjaan
        </h2>

        {/* Job Field dan Job Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-gray-700">Bidang Pekerjaan</label>
            <select
              name="jobField"
              value={formData.jobField}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Pilih bidang pekerjaan
              </option>
              <option value="teknologi_informasi">Teknologi Informasi</option>
              <option value="keuangan">Keuangan</option>
              <option value="kesehatan">Kesehatan</option>
              <option value="pendidikan">Pendidikan</option>
              <option value="pemasaran">Pemasaran</option>
              <option value="manufaktur">Manufaktur</option>
              <option value="perdagangan">Perdagangan</option>
              <option value="perhotelan">Perhotelan</option>
              <option value="teknik">Teknik</option>
              <option value="kreatif">Kreatif</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Judul Pekerjaan</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Masukkan judul pekerjaan"
            />
          </div>
        </div>

        {/* Job Type dan Work System dan Lokasi*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <label className="block text-gray-700">Jenis Pekerjaan</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Pilih jenis pekerjaan</option>
              <option value="full-time">Pekerjaan Penuh Waktu</option>
              <option value="part-time">Pekerjaan Paruh Waktu</option>
              <option value="internship">Magang</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Sistem Kerja</label>
            <select
              name="workSystem"
              value={formData.workSystem}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Pilih sistem kerja</option>
              <option value="in-office">Di Kantor</option>
              <option value="remote">Jarak Jauh (Remote)</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Lokasi</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Masukkan lokasi"
            />
          </div>
        </div>

        {/* Deskripsi Pekerjaan */}
        <div className="grid grid-cols-1 gap-6 mb-4">
          <div>
            <label className="block text-gray-700">Deskripsi Pekerjaan</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Deskripsikan pekerjaan"
              rows={3}
            />
          </div>
        </div>

        {/* Gaji dan Usia */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-4">
          <div>
            <label className="block text-gray-700">Gaji Minimum</label>
            <input
              type="number"
              name="minSalary"
              value={formData.minSalary}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Gaji Min"
            />
          </div>
          <div>
            <label className="block text-gray-700">Gaji Maksimum</label>
            <input
              type="number"
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Gaji Max"
            />
          </div>
          <div className="flex items-center gap-2">
            <div>
              <label className="block text-gray-700">
                Preferensi Usia Minimum
              </label>
              <input
                type="number"
                name="minAge"
                value={formData.minAge}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Usia Min"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Preferensi Usia Maksimum
              </label>
              <input
                type="number"
                name="maxAge"
                value={formData.maxAge}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Usia Max"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <label className="block text-gray-700">Preferensi Gender</label>
            <select
              name="genderPreference"
              value={formData.genderPreference}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Pilih preferensi gender</option>
              <option value="male">Pria</option>
              <option value="female">Wanita</option>
              <option value="no preference">Tidak Ada Preferensi</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Pendidikan Diperlukan</label>
            <select
              name="requiredEducation"
              value={formData.requiredEducation}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Belum dipilih
              </option>
              <option value="sd">SD</option>
              <option value="smp">SMP</option>
              <option value="sma/smk">SMA/SMK</option>
              <option value="diploma">Diploma (D1-D4)</option>
              <option value="sarjana">Sarjana (S1)</option>
              <option value="magister">Magister (S2)</option>
              <option value="doktor">Doktor (S3)</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Pengalaman Diperlukan</label>
            <select
              name="requiredExperience"
              value={formData.requiredExperience}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Belum dipilih
              </option>
              <option value="kurang dari setahun">Kurang dari setahun</option>
              <option value="1-3 tahun">1-3 tahun</option>
              <option value="3-5 tahun">3-5 tahun</option>
              <option value="5-10 tahun">5-10 tahun</option>
              <option value="10 tahun ke atas">10 tahun ke atas</option>
              <option value="tanpa preferensi">Tanpa Preferensi</option>
              <option value="tanpa pengalaman">Tanpa Pengalaman</option>
            </select>
          </div>
        </div>

        {/* Input Skill */}
        <div className="grid grid-cols-1 gap-6 mb-4">
          <div>
            <label className="block text-gray-700">Keahlian Diperlukan</label>
            <input
              type="text"
              name="skill_search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Cari keahlian..."
            />

            {/* Hasil Pencarian */}
            {searchTerm && (
              <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <li
                      key={skill.id}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleAddSkill(skill.skillName)}
                    >
                      {skill.skillName}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">
                    Tidak ditemukan keahlian
                  </li>
                )}
              </ul>
            )}

            {/* Keahlian yang Dipilih */}
            {selectedSkills.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {skill}
                      <MdClose
                        onClick={() => handleRemoveSkill(skill)}
                        className="cursor-pointer font-extrabold"
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-bold text-lg mt-6"
        >
          {formData.id ? "Edit" : "Tambah"} Lowongan
        </button>
      </form>
    </div>
  );
}
