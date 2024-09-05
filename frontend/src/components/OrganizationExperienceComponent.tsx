interface OrganizationExperience {
  id: number;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
}

interface Props {
  organization: OrganizationExperience[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function OrganizationExperienceComponent({
  organization,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="p-6">
      <h2 className="font-semibold text-xl mb-4 border-b pb-2 text-gray-800">
        Pengalaman Organisasi
      </h2>

      <button className="text-blue-500 font-semibold mb-6">
        + Tambahkan Pengalaman Organisasi
      </button>

      {organization.map((exp) => (
        <div key={exp.id} className="relative mb-8">
          {/* Timeline Indicator */}
          <div className="absolute left-0 top-2 h-full border-l-4 border-blue-500"></div>
          <div className="relative flex pl-8">
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{exp.role}</h3>
              <p className="text-gray-600">{exp.organization}</p>
              <p className="text-gray-500">
                {exp.startDate} - {exp.endDate} ({exp.duration})
              </p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
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
      ))}
    </div>
  );
}
