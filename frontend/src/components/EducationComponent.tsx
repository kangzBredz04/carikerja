import React from "react";

interface Education {
  id: number;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Props {
  educations: Education[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const EducationComponent: React.FC<Props> = ({
  educations,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-6">
      <h2 className="font-semibold text-xl mb-4 border-b pb-2 text-gray-800">
        Pendidikan
      </h2>

      <button className="text-blue-500 font-semibold mb-6">
        + Tambahkan Pendidikan
      </button>

      {educations.map((edu) => (
        <div key={edu.id} className="relative mb-8">
          {/* Timeline Indicator */}
          <div className="absolute left-0 top-2 h-full border-l-4 border-blue-500"></div>
          <div className="relative flex pl-8">
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500">
                {edu.startDate} - {edu.endDate}
              </p>
              <p className="text-gray-700 mt-2">{edu.description}</p>
            </div>

            {/* Edit and Delete Buttons */}
            <div className="flex items-start ml-4">
              <button
                className="text-blue-500 mr-2 hover:text-blue-600"
                onClick={() => onEdit(edu.id)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => onDelete(edu.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationComponent;
