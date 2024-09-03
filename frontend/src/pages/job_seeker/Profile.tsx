import { useState, useEffect, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils";
import { AllContext } from "../../App";

interface SocialLinks {
  portfolio: string;
  linkedin: string;
  github: string;
  instagram: string;
}

interface Profile {
  name: string;
  role: string;
  whatsapp: string;
  email: string;
  location: string;
  age: string;
  education: string;
  gender: string;
  experience: string;
  about: string;
  workExperience: string;
  educationDetails: string;
  skills: string;
  jobInterest: string;
  socialLinks: SocialLinks;
  organizationExperience: string;
}

function ProfilePage() {
  const navigate = useNavigate();
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { userId } = useContext(AllContext) as unknown as { userId: string };

  useEffect(() => {
    api
      .get(`/job-seekers/${userId}`) // Replace with your API endpoint
      .then((response) => {
        console.log(userId);
        const data = response as {
          name: string;
          role: string;
          phoneNumber: string;
          email: string;
          location: string;
          age: string;
          hasWorkExperience: boolean;
          gender: string;
          aboutMe: string;
          portfolioLink: string;
          linkedinLink: string;
          githubLink: string;
        };
        setProfile({
          name: data.name,
          role: data.role,
          whatsapp: data.phoneNumber,
          email: data.email,
          location: data.location,
          age: data.age,
          education: data.hasWorkExperience ? "Experience" : "No Experience",
          gender: data.gender === "male" ? "Laki-laki" : "Perempuan",
          experience: data.hasWorkExperience
            ? "Has experience"
            : "No experience",
          about: data.aboutMe,
          workExperience: data.hasWorkExperience
            ? "Has work experience"
            : "No work experience",
          educationDetails: "Details not provided",
          skills: "Skills not provided",
          jobInterest: "Job interest not provided",
          socialLinks: {
            portfolio: data.portfolioLink,
            linkedin: data.linkedinLink || "",
            github: data.githubLink,
            instagram: "",
          },
          organizationExperience: "Organization experience not provided",
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [navigate, userId]);

  const handleSaveBasicInfo = () => {
    if (profile) {
      // Implement saving logic here
      setIsEditingBasic(false);
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
                { label: "Nama", value: profile.name },
                { label: "Phone Number", value: profile.whatsapp },
                { label: "Lokasi", value: profile.location },
                { label: "Pendidikan Terakhir", value: profile.education },
                { label: "Email", value: profile.email },
                { label: "Usia", value: profile.age },
                { label: "Jenis Kelamin", value: profile.gender },
                {
                  label: "Keterangan Pengalaman Kerja",
                  value: profile.experience,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white p-4 rounded-lg shadow-sm border"
                >
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-gray-600">{item.value}</p>
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

          {/* Basic Info Edit Popup */}
          {isEditingBasic && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
                <h2 className="text-lg font-semibold mb-4">Edit Info Dasar</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Nama", field: "name" },
                      { label: "Phone Number", field: "whatsapp" },
                      { label: "Lokasi", field: "location" },
                      { label: "Pendidikan Terakhir", field: "education" },
                      { label: "Email", field: "email" },
                      { label: "Usia", field: "age" },
                      { label: "Jenis Kelamin", field: "gender" },
                      {
                        label: "Keterangan Pengalaman Kerja",
                        field: "experience",
                      },
                    ].map((field) => (
                      <div key={field.label} className="flex flex-col">
                        <label className="font-medium mb-1">
                          {field.label}
                        </label>
                        <input
                          type="text"
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
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    onClick={handleSaveBasicInfo}
                  >
                    Simpan
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                    onClick={() => setIsEditingBasic(false)}
                  >
                    Batal
                  </button>
                </div>
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
