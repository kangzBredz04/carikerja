import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { api } from "../utils";

interface Props {
  userId: number;
}

export default function SkillComponent({ userId }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<
    { id: number; skillName: string }[]
  >([]);
  const [allSkills, setAllSkills] = useState<
    { id: number; skillName: string }[]
  >([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  // Fetch skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skills");
        setAllSkills(response); // Adjusted to use response.data
        setFilteredSkills(response);

        const tampSkill = await api.get(`/job-seekers/${userId}`);

        const skillsArray = tampSkill.skills
          .split(",")
          .map((skill) => skill.trim());
        console.log(skillsArray);

        setSkills(skillsArray);
      } catch (error) {
        console.error("Failed to fetch skills", error);
      }
    };
    fetchSkills();
  }, [userId]);

  // Handle search term change
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    setFilteredSkills(
      allSkills?.filter((skill) =>
        skill.skillName.toLowerCase().includes(lowercasedTerm)
      )
    );
  }, [searchTerm, allSkills]);

  // Handle adding a new skill
  const handleAddSkill = (skill: string) => {
    console.log(selectedSkills);

    if (!selectedSkills.includes(skill)) {
      console.log("masuk");

      // Properly create a new array with the spread operator
      setSelectedSkills([...selectedSkills, skill]);
      console.log(selectedSkills);
    }
    setSearchTerm(""); // Reset input pencarian
  };

  // Handle removing a skill
  const handleRemoveSkill = (skillName: string) => {
    const updatedSkills = selectedSkills.filter((skill) => skill !== skillName);
    setSelectedSkills(updatedSkills);
    onSkillsChange(updatedSkills); // Notify parent component of changes
  };

  // Handle saving skills
  const handleSave = () => {
    // Implement saving logic here, e.g., update API or state
    setIsEditing(false); // Exit editing mode
  };

  // Handle canceling edits
  const handleCancel = () => {
    setSelectedSkills(initialSkills); // Revert to initial skills
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      <div className="p-6 bg-white rounded-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills?.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No skills available</p>
          )}
        </div>
      </div>
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
            {filteredSkills?.length > 0 ? (
              filteredSkills?.map((skill) => (
                <li
                  key={skill.id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleAddSkill(skill.skillName);
                  }}
                >
                  {skill.skillName}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">Tidak ditemukan keahlian</li>
            )}
          </ul>
        )}

        {/* Keahlian yang Dipilih */}
        {selectedSkills?.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {selectedSkills?.map((skill) => (
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
        <div className="flex items-center mt-3">
          <button
            onClick={async () => {
              try {
                // Merge previously fetched skills with newly selected skills
                const allSkills = [...new Set([...skills, ...selectedSkills])];
                const skillsString = allSkills.join(", ");

                // Send the updated skills to the API
                await api.put(`/job-seekers/${userId}/skills`, skillsString);

                alert("Data skill berhasil tersimpan");
                window.location.reload();
              } catch (error) {
                console.error("Error saving skills:", error);
                alert("Gagal menyimpan data skill");
              }
            }}
            className="w-full p-2 bg-blue-500 rounded-md text-white font-semibold text-lg"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
