import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils";

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
  socialLinks: {
    portfolio: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
  organizationExperience: string;
}

function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "Wahyu",
    role: "Instruktur",
    whatsapp: "+628889387769",
    email: "wabredz1234@gmail.com",
    location: "Bandung, Jawa Barat",
    age: "21",
    education: "Sarjana (S1)",
    gender: "Laki-laki",
    experience: "Belum ada pengalaman kerja",
    about: "Saya seorang instruktur yang berdedikasi...",
    workExperience: "Belum ada pengalaman kerja",
    educationDetails: "Sarjana S1 - Universitas Indonesia",
    skills: "React, TypeScript, Tailwind CSS",
    jobInterest: "Software Development",
    socialLinks: {
      portfolio: "https://myportfolio.com",
      linkedin: "https://linkedin.com/in/wahyu",
      github: "https://github.com/wahyu",
      instagram: "https://instagram.com/wahyu",
    },
    organizationExperience: "Ketua BEM Universitas Indonesia 2022",
  });

  useEffect(() => {
    api
      .get("/auth/me")
      .then((response) => {
        if (response.status === 403) {
          navigate("/user/login");
        } else if (response.data) {
          setIsLoggedIn(true);
        }
      })
      .catch(() => {
        navigate("/user/login");
      });
  }, [navigate]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/Elon Musk.jpeg"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-semibold">{profile.name}</h1>
            <p className="text-gray-600">{profile.role}</p>
          </div>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit Info Dasar"}
        </button>
      </div>

      <div className="mt-6">
        {/* Info Dasar */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold text-lg">Info Dasar</h2>
            <p>
              WhatsApp:{" "}
              {isEditing ? (
                <input
                  className="border"
                  value={profile.whatsapp}
                  name="whatsapp"
                  onChange={(e) =>
                    setProfile({ ...profile, whatsapp: e.target.value })
                  }
                />
              ) : (
                profile.whatsapp
              )}
            </p>
            <p>
              Email:{" "}
              {isEditing ? (
                <input
                  className="border"
                  value={profile.email}
                  name="email"
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              ) : (
                profile.email
              )}
            </p>
            <p>
              Lokasi:{" "}
              {isEditing ? (
                <input
                  className="border"
                  value={profile.location}
                  name="location"
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                />
              ) : (
                profile.location
              )}
            </p>
            <p>
              Usia:{" "}
              {isEditing ? (
                <input
                  className="border"
                  value={profile.age}
                  name="age"
                  onChange={(e) =>
                    setProfile({ ...profile, age: e.target.value })
                  }
                />
              ) : (
                profile.age
              )}
            </p>
            <p>
              Pendidikan Terakhir:{" "}
              {isEditing ? (
                <input
                  className="border"
                  value={profile.education}
                  name="education"
                  onChange={(e) =>
                    setProfile({ ...profile, education: e.target.value })
                  }
                />
              ) : (
                profile.education
              )}
            </p>
            <p>
              Jenis Kelamin:{" "}
              {isEditing ? (
                <input
                  className="border"
                  value={profile.gender}
                  name="gender"
                  onChange={(e) =>
                    setProfile({ ...profile, gender: e.target.value })
                  }
                />
              ) : (
                profile.gender
              )}
            </p>
          </div>

          {/* Tentang Saya */}
          <div>
            <h2 className="font-semibold text-lg">Tentang Saya</h2>
            {isEditing ? (
              <textarea
                className="border w-full"
                value={profile.about}
                name="about"
                onChange={(e) =>
                  setProfile({ ...profile, about: e.target.value })
                }
              ></textarea>
            ) : (
              <p>{profile.about}</p>
            )}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Pengalaman Kerja</h2>
          {isEditing ? (
            <textarea
              className="border w-full"
              value={profile.workExperience}
              name="workExperience"
              onChange={(e) =>
                setProfile({ ...profile, workExperience: e.target.value })
              }
            ></textarea>
          ) : (
            <p>{profile.workExperience}</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-lg">Pendidikan</h2>
          {isEditing ? (
            <textarea
              className="border w-full"
              value={profile.educationDetails}
              name="educationDetails"
              onChange={(e) =>
                setProfile({ ...profile, educationDetails: e.target.value })
              }
            ></textarea>
          ) : (
            <p>{profile.educationDetails}</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-lg">Skill</h2>
          {isEditing ? (
            <textarea
              className="border w-full"
              value={profile.skills}
              name="skills"
              onChange={(e) =>
                setProfile({ ...profile, skills: e.target.value })
              }
            ></textarea>
          ) : (
            <p>{profile.skills}</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-lg">Minat Pekerjaan</h2>
          {isEditing ? (
            <textarea
              className="border w-full"
              value={profile.jobInterest}
              name="jobInterest"
              onChange={(e) =>
                setProfile({ ...profile, jobInterest: e.target.value })
              }
            ></textarea>
          ) : (
            <p>{profile.jobInterest}</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-lg">Link Sosial Media</h2>
          {isEditing ? (
            <div>
              <input
                className="border w-full"
                value={profile.socialLinks.portfolio}
                name="portfolio"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      portfolio: e.target.value,
                    },
                  })
                }
                placeholder="Portfolio Link"
              />
              <input
                className="border w-full mt-2"
                value={profile.socialLinks.linkedin}
                name="linkedin"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      linkedin: e.target.value,
                    },
                  })
                }
                placeholder="LinkedIn Link"
              />
              <input
                className="border w-full mt-2"
                value={profile.socialLinks.github}
                name="github"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      github: e.target.value,
                    },
                  })
                }
                placeholder="GitHub Link"
              />
              <input
                className="border w-full mt-2"
                value={profile.socialLinks.instagram}
                name="instagram"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      instagram: e.target.value,
                    },
                  })
                }
                placeholder="Instagram Link"
              />
            </div>
          ) : (
            <ul>
              <li>
                Portfolio:{" "}
                <a href={profile.socialLinks.portfolio}>
                  {profile.socialLinks.portfolio}
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a href={profile.socialLinks.linkedin}>
                  {profile.socialLinks.linkedin}
                </a>
              </li>
              <li>
                GitHub:{" "}
                <a href={profile.socialLinks.github}>
                  {profile.socialLinks.github}
                </a>
              </li>
              <li>
                Instagram:{" "}
                <a href={profile.socialLinks.instagram}>
                  {profile.socialLinks.instagram}
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
