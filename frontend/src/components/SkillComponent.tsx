import React from "react";

type SkillProps = {
  skills: string[];
  onEdit: () => void;
};

const SkillComponent: React.FC<SkillProps> = ({ skills, onEdit }) => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">SKILLS</h2>
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 5.487l1.651 1.651a1.875 1.875 0 010 2.652l-7.59 7.591a4.5 4.5 0 01-1.798 1.07l-3.34.947.947-3.34a4.5 4.5 0 011.07-1.798l7.591-7.59a1.875 1.875 0 012.652 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 19.5h-6"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillComponent;
