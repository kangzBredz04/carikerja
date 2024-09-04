import { useState, useEffect, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils";
import { AllContext } from "../../App";

interface SocialLinks {
  portfolio_link: string;
  linkedin_link: string;
  github_link: string;
}

interface Profile {
  id: number; // sesuai dengan primary key di tabel
  user_id: number; // relasi ke tabel users
  name: string;
  birth_date: string; // Tanggal lahir
  phone_number: string; // Nomor WhatsApp
  email: string;
  location: string;
  age: string; // Sesuai dengan tabel
  gender: "Laki-laki" | "Perempuan"; // Hanya dua opsi sesuai catatan di tabel
  about_me: string; // Tentang diri
  has_work_experience: string; // Apakah memiliki pengalaman kerja
  resume: string; // Link ke CV
  portfolio_link: string; // Link ke portofolio
  github_link: string; // Link ke GitHub
  willing_to_work_remotely: boolean; // Bersedia kerja remote
  socialLinks: SocialLinks; // Menghubungkan ke social media links
}

function ProfilePage() {
  const navigate = useNavigate();
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { userId } = useContext(AllContext) as unknown as { userId: string };
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
          age: number;
          gender: string;
          aboutMe: string;
          hasWorkExperience: boolean;
          resume: string;
          portfolioLink: string;
          githubLink: string;
          willingToWorkRemotely: boolean;
        };

        setProfile({
          name: data.name,
          birth_date: data.birthDate,
          phone_number: data.phoneNumber,
          email: data.email,
          location: data.location,
          age: data.age.toString(),
          gender: data.gender === "male" ? "Laki-laki" : "Perempuan",
          about_me: data.aboutMe,
          has_work_experience: data.hasWorkExperience
            ? "Memiliki pengalaman kerja"
            : "Tidak memiliki pengalaman kerja",
          resume: data.resume || "Belum diisi",
          portfolio_link: data.portfolioLink || "Belum diisi",
          github_link: data.githubLink || "Belum diisi",
          willing_to_work_remotely: data.willingToWorkRemotely
            ? "Bersedia"
            : "Tidak bersedia",
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [navigate, userId]);

  const handleSaveBasicInfo = async () => {
    try {
      api.put(`/job-seekers/${userId}`, profile).then(() => {
        alert("Data berhasil di update");
        setIsEditingBasic(false);
      });
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleSaveAboutMe = () => {
    if (profile) {
      // Implement saving logic here
      setIsEditingAbout(false);
    }
  };

  const handleChange = (
    field: keyof Profile,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (profile) {
      setProfile((prev) => {
        if (prev) {
          return { ...prev, [field]: e.target.value };
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
                { label: "Tanggal Lahir", field: "birth_date" },
                { label: "Nomor Telepon", field: "phone_number" },
                { label: "Email", field: "email" },
                { label: "Lokasi", field: "location" },
                { label: "Usia", field: "age" },
                { label: "Jenis Kelamin", field: "gender" },
                { label: "Tentang Saya", field: "about_me" },
                { label: "Pengalaman Kerja", field: "has_work_experience" },
                { label: "Resume (CV)", field: "resume" },
                { label: "Portofolio", field: "portfolio_link" },
                { label: "GitHub", field: "github_link" },
                {
                  label: "Bersedia Kerja Remote",
                  field: "willing_to_work_remotely",
                },
              ].map((field) => (
                <div key={field.label} className="flex flex-col">
                  <label className="font-medium mb-1">{field.label}</label>
                  <p className="border p-2 rounded-lg">
                    {(profile[field.field as keyof Profile] as string) ||
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
          <div className="mt-6">
            <h2 className="font-semibold text-lg">Tentang Saya</h2>
            <p>{profile.about}</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4"
              onClick={() => setIsEditingAbout(true)}
            >
              Edit Tentang Saya
            </button>
          </div>

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
                        field: "phone_number",
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
                        label: "Email",
                        field: "email",
                        type: "text",
                        placeholder: "Masukkan email",
                      },
                      {
                        label: "Tanggal Lahir",
                        field: "birth_date",
                        type: "date",
                        placeholder: "Pilih tanggal lahir",
                      },
                      {
                        label: "Usia",
                        field: "age",
                        type: "number",
                        placeholder: "Masukkan usia",
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
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                      </select>
                    </div>

                    {/* Pengalaman Kerja */}
                    <div className="flex flex-col">
                      <label className="font-medium mb-1">
                        Pengalaman Kerja
                      </label>
                      <select
                        value={profile.has_work_experience ? "yes" : "no"}
                        onChange={(e) => handleChange("has_work_experience", e)}
                        className="border p-2 rounded-lg"
                      >
                        <option value="no">Tidak ada</option>
                        <option value="yes">Ada</option>
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
                        value={profile.portfolio_link || ""}
                        onChange={(e) => handleChange("portfolio_link", e)}
                        className="border p-2 rounded-lg"
                      />
                    </div>

                    {/* GitHub Link */}
                    <div className="flex flex-col">
                      <label className="font-medium mb-1">GitHub Link</label>
                      <input
                        type="text"
                        placeholder="Masukkan link GitHub"
                        value={profile.github_link || ""}
                        onChange={(e) => handleChange("github_link", e)}
                        className="border p-2 rounded-lg"
                      />
                    </div>

                    {/* Bersedia Bekerja Remote */}
                    <div className="flex flex-col">
                      <label className="font-medium mb-1">
                        Bersedia Bekerja Remote
                      </label>
                      <select
                        value={profile.willing_to_work_remotely ? "yes" : "no"}
                        onChange={(e) =>
                          handleChange("willing_to_work_remotely", e)
                        }
                        className="border p-2 rounded-lg"
                      >
                        <option value="no">Tidak</option>
                        <option value="yes">Ya</option>
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
                  value={profile.about || ""} // Ensure value is a string
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setProfile(
                      (prev) =>
                        prev ? { ...prev, about: e.target.value } : null // Ensure prev is not null
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
