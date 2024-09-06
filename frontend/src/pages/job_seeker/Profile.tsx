import { useState, useEffect, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils";
import { AllContext } from "../../App";
import WorkExperienceComponent from "../../components/WorkExperienceComponent";
import EducationComponent from "../../components/EducationComponent";
import SkillComponent from "../../components/SkillComponent";

interface SocialLinks {
  portfolioLink: string;
  linkedin_link: string;
  githubLink: string;
}

interface Profile {
  id: number; // sesuai dengan primary key di tabel
  user_id: number; // relasi ke tabel users
  name: string;
  birthDate: string; // Tanggal lahir
  phoneNumber: string; // Nomor WhatsApp
  email: string;
  location: string;
  gender: "Laki-laki" | "Perempuan"; // Hanya dua opsi sesuai catatan di tabel
  aboutMe: string; // Tentang diri
  hasWorkExperience: boolean; // Apakah memiliki pengalaman kerja
  resume: string; // Link ke CV
  portfolioLink: string; // Link ke portofolio
  githubLink: string; // Link ke GitHub
  willingToWorkRemotely: boolean; // Bersedia kerja remote
  socialLinks: SocialLinks; // Menghubungkan ke social media links
}

function ProfilePage() {
  const navigate = useNavigate();
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { userId } = useContext(AllContext) as unknown as { userId: string };

  const experiences = [
    {
      id: 1,
      title: "Instruktur",
      company: "Program Beasiswa PUB",
      startDate: "Agustus 2023",
      endDate: "Desember 2023",
      duration: "5 bulan",
      description:
        "Membimbing peserta dalam proyek akhir yang menggabungkan Spring Boot dan Thymeleaf.",
    },
    {
      id: 2,
      title: "Instruktur",
      company: "Program Beasiswa PUB",
      startDate: "Juni 2023",
      endDate: "Agustus 2023",
      duration: "3 bulan",
      description:
        "Menjelaskan dasar-dasar web development dengan HTML, CSS, dan JavaScript.",
    },
  ];

  const educations = [
    {
      id: 1,
      degree: "Sarjana Akuntansi",
      institution: "Universitas Nasional Pasim",
      startDate: "September 2020",
      endDate: "Agustus 2024",
      description:
        "Fokus pada Akuntansi dan Sistem Informasi, dengan keahlian dalam audit dan pengelolaan keuangan.",
    },
    {
      id: 2,
      degree: "Diploma Komputer",
      institution: "Politeknik Negeri Bali",
      startDate: "September 2017",
      endDate: "Agustus 2020",
      description:
        "Mengambil jurusan Sistem Informasi dengan fokus pada pengembangan web dan manajemen basis data.",
    },
  ];

  const skills = [
    "Node.js",
    "JavaScript",
    "Spring Framework",
    "MySQL",
    "Java",
    "PostgreSQL",
    "React.js",
    "GIT",
    "CSS3",
    "HTML5",
  ];

  useEffect(() => {
    api
      .get(`/job-seekers/${userId}`) // Pastikan endpoint API sesuai
      .then((response) => {
        const data = response as {
          name: string;
          birthDate: string;
          phoneNumber: string;
          email: string;
          location: string;
          gender: string;
          aboutMe: string;
          hasWorkExperience: boolean;
          resume: string;
          portfolioLink: string;
          githubLink: string;
          willingToWorkRemotely: boolean;
        };

        setProfile((prevProfile) => ({
          ...prevProfile, // Menjaga properti lain yang mungkin sudah ada
          id: prevProfile?.id || 0, // Isi id dengan nilai dari prevProfile atau nilai default
          user_id: prevProfile?.user_id || 0, // Sama dengan user_id
          name: data.name,
          birthDate: data.birthDate,
          phoneNumber: data.phoneNumber,
          email: data.email,
          location: data.location,
          gender: data.gender == "Laki-laki" ? "Laki-laki" : "Perempuan",
          hasWorkExperience: data.hasWorkExperience,
          resume: data.resume,
          portfolioLink: data.portfolioLink,
          githubLink: data.githubLink,
          willingToWorkRemotely: data.willingToWorkRemotely,
          aboutMe: data.aboutMe || "", // Jika tidak ada nilai aboutMe di data, isi dengan string kosong
          socialLinks: prevProfile?.socialLinks || [], // Jika socialLinks tidak ada, beri nilai default array kosong
        }));
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [navigate, userId]);

  const handleSaveBasicInfo = async () => {
    try {
      api.put(`/job-seekers/${userId}`, profile).then(() => {
        alert("Data berhasil di update");
        window.location.reload();
        setIsEditingBasic(false);
      });
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleSaveAboutMe = () => {
    try {
      api.put(`/job-seekers/${userId}`, profile).then(() => {
        alert("Tentang saya berhasil di update");
        window.location.reload();
        setIsEditingAbout(false);
      });
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleChange = (
    field: keyof Profile,
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (profile) {
      setProfile((prev) => {
        if (prev) {
          const value =
            e.target.type === "checkbox"
              ? e.target.checked
              : e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : e.target.value;
          return { ...prev, [field]: value };
        }
        return prev;
      });
    }
  };

  return (
    <div className=" bg-white rounded-lg shadow-lg relative">
      {profile ? (
        <>
          {/* Basic Info Section */}
          <div className="p-6">
            <h2 className="font-semibold text-xl mb-4 border-b pb-2 text-gray-800">
              Info Dasar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Info Cards */}
              {[
                { label: "Nama", field: "name" },
                { label: "Tanggal Lahir", field: "birthDate" },
                { label: "Nomor Telepon", field: "phoneNumber" },
                { label: "Lokasi", field: "location" },
                { label: "Jenis Kelamin", field: "gender" },
                {
                  label: "Pengalaman Kerja",
                  field: "hasWorkExperience",
                  isBoolean: true, // Flag untuk field boolean
                  trueText: "Saya punya pengalaman keja",
                  falseText: "Saya belum pernah bekerja",
                },
                { label: "Resume (CV)", field: "resume" },
                { label: "Portofolio", field: "portfolioLink" },
                { label: "GitHub", field: "githubLink" },
                {
                  label: "Bersedia Kerja Remote",
                  field: "willingToWorkRemotely",
                  isBoolean: true, // Flag untuk field boolean
                  trueText: "Bersedia",
                  falseText: "Tidak Bersedia",
                },
              ].map((field) => (
                <div key={field.label} className="flex flex-col">
                  <label className="font-medium mb-1">{field.label}</label>
                  <p className="border p-2 rounded-lg">
                    {/* Cek apakah field merupakan boolean */}
                    {field.isBoolean
                      ? profile[field.field as keyof Profile]
                        ? field.trueText
                        : field.falseText
                      : (profile[field.field as keyof Profile] as string) ||
                        "Belum diisi"}
                  </p>
                </div>
              ))}
            </div>
            <button
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-150"
              onClick={() => setIsEditingBasic(true)}
            >
              Edit Info Dasar
            </button>
          </div>

          {/* About Me Section */}
          <div className="mt-6 p-6">
            <h2 className="font-semibold text-lg">Tentang Saya</h2>
            <p>
              {profile.aboutMe?.trim()
                ? profile.aboutMe
                : "Belum ada deskripsi tentang saya."}
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4"
              onClick={() => setIsEditingAbout(true)}
            >
              Edit Tentang Saya
            </button>
          </div>

          <WorkExperienceComponent userId={userId} />

          <EducationComponent
            educations={educations}
            onEdit={(id) => console.log(`Edit pendidikan dengan ID: ${id}`)}
            onDelete={(id) => console.log(`Hapus pendidikan dengan ID: ${id}`)}
          />

          <SkillComponent userId={userId} />
          {isEditingBasic && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Edit Info Dasar</h2>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault(); // Mencegah reload halaman
                    handleSaveBasicInfo(); // Panggil fungsi simpan
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        label: "Nama",
                        field: "name",
                        type: "text",
                        placeholder: "Masukkan nama",
                      },
                      {
                        label: "Nomor Telepon",
                        field: "phoneNumber",
                        type: "text",
                        placeholder: "Masukkan nomor telepon",
                      },
                      {
                        label: "Lokasi",
                        field: "location",
                        type: "text",
                        placeholder: "Masukkan lokasi",
                      },
                      {
                        label: "Tanggal Lahir",
                        field: "birthDate",
                        type: "date",
                        placeholder: "Pilih tanggal lahir",
                      },
                    ].map((field) => (
                      <div key={field.label} className="flex flex-col">
                        <label className="font-medium mb-1">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={
                            (profile[field.field as keyof Profile] as string) ||
                            ""
                          }
                          onChange={(e) =>
                            handleChange(field.field as keyof Profile, e)
                          }
                          className="border p-2 rounded-lg"
                        />
                      </div>
                    ))}

                    {/* Jenis Kelamin */}
                    <div className="flex flex-col">
                      <label className="font-medium mb-1">Jenis Kelamin</label>
                      <select
                        value={profile.gender || ""}
                        onChange={(e) => handleChange("gender", e)}
                        className="border p-2 rounded-lg"
                      >
                        <option value="">Pilih jenis kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>

                    {/* Pengalaman Kerja */}
                    <div className="flex flex-col">
                      <label className="font-medium mb-1">
                        Pengalaman Kerja
                      </label>
                      <select
                        value={profile.hasWorkExperience ? true : false}
                        onChange={(e) => handleChange("hasWorkExperience", e)}
                        className="border p-2 rounded-lg"
                      >
                        <option value={true}>
                          Saya punya pengalaman kerja
                        </option>
                        <option value={false}>Saya belum pernah bekerja</option>
                      </select>
                    </div>

                    {/* Resume */}
                    <div className="flex flex-col">
                      <label className="font-medium mb-1">
                        Resume (CV) Link
                      </label>
                      <input
                        type="text"
                        placeholder="Masukkan link resume"
                        value={profile.resume || ""}
                        onChange={(e) => handleChange("resume", e)}
                        className="border p-2 rounded-lg"
                      />
                    </div>

                    {/* Portfolio Link */}
                    <div className="flex flex-col">
                      <label className="font-medium mb-1">Portfolio Link</label>
                      <input
                        type="text"
                        placeholder="Masukkan link portfolio"
                        value={profile.portfolioLink || ""}
                        onChange={(e) => handleChange("portfolioLink", e)}
                        className="border p-2 rounded-lg"
                      />
                    </div>

                    {/* GitHub Link */}
                    <div className="flex flex-col">
                      <label className="font-medium mb-1">GitHub Link</label>
                      <input
                        type="text"
                        placeholder="Masukkan link GitHub"
                        value={profile.githubLink || ""}
                        onChange={(e) => handleChange("githubLink", e)}
                        className="border p-2 rounded-lg"
                      />
                    </div>

                    {/* Bersedia Bekerja Remote */}
                    <div className="flex flex-col">
                      <label className="font-medium mb-1">
                        Bersedia Bekerja Remote
                      </label>
                      <select
                        value={profile.willingToWorkRemotely ? true : false}
                        onChange={(e) =>
                          handleChange("willingToWorkRemotely", e)
                        }
                        className="border p-2 rounded-lg"
                      >
                        <option value={true}>Bersedia</option>
                        <option value={false}>Tidak Bersedia</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                      onClick={() => setIsEditingBasic(false)}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* About Me Edit Popup */}
          {isEditingAbout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
                <h2 className="text-lg font-semibold mb-4">
                  Edit Tentang Saya
                </h2>
                <textarea
                  value={profile.aboutMe || ""} // Ensure value is a string
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setProfile(
                      (prev) =>
                        prev ? { ...prev, aboutMe: e.target.value } : null // Ensure prev is not null
                    )
                  }
                  className="border p-2 rounded-lg w-full h-40"
                />

                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handleSaveAboutMe}
                  >
                    Simpan
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    onClick={() => setIsEditingAbout(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
}

export default ProfilePage;
