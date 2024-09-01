import { useContext } from "react";
import { EmployeContext } from "./Employe";
import JobCardDashboard from "../../components/JobCardDashboard";
import { Job } from "../../types/Job";

export default function Dashboard() {
  const { jobs, employeId } = useContext(EmployeContext);
  console.log(jobs);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Daftar Lowongan Kerja
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {jobs
          ?.filter((job) => job.employer?.id == employeId)
          ?.map((job: Job) => (
            <JobCardDashboard key={job.id} job={job} />
          ))}
      </div>
      <div className="flex justify-center items-center min-h-[200px] mt-8">
        <h1 className="text-xl font-semibold text-gray-600">
          Anda telah mencapai batas maksimal
        </h1>
      </div>
    </div>
  );
}
