import { useParams } from "react-router-dom";
import { FaBookmark, FaShareAlt, FaRocket } from "react-icons/fa";

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();

  // Dummy data untuk pekerjaan, ambil data detail berdasarkan ID dari URL
  const job = {
    id,
    title: "Magento Developer (English Active)",
    company: "PT Sigma Global Teknologi",
    location: "Tangerang, Banten, Indonesia",
    salary: "Rp 9-11 jt/Bulan",
    description: `
      Bachelor's degree in Computer Science or related field.
      Experience in Magento development for at least 2 years.
      Back-End Web Development, Object-Oriented Programming (OOP), and Programming skills.
      Knowledge of PHP, MySQL, HTML, CSS, and JavaScript.
      Proficiency in written and verbal English language.
      Ability to work on-site in BSD Area.
    `,
    requirements: ["1-3 tahun pengalaman", "Minimal Sarjana (S1)", "2-3 tahun"],
    skills: ["Magento", "Back-End Web Development", "Web Development"],
    lastUpdated: "21 hari yang lalu",
    recruiter: {
      name: "Filnes Afryani",
      title: "HRD - PT Sigma Global Teknologi",
    },
    companyDetails: {
      name: "PT Sigma Global Teknologi",
      industry: "Information Technology and Services",
      size: "51-200 karyawan",
      address:
        "Sona Topas Tower Lt. 12, Jl. Jend. Sudirman, RT.4/RW.2, Kuningan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12920",
    },
    relatedJobs: [
      {
        title: "Senior .NET Engineer with AWS Knowledge",
        company: "PT Crescent Solution Indonesia",
        location: "Tangerang, Banten",
        salary: "Rp 8-13 jt",
        lastUpdated: "21 hari yang lalu",
        level: "Minimal Sarjana (S1)",
        experience: "1-3 tahun pengalaman",
      },
      // Tambahkan data loker lain sesuai kebutuhan
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className=" mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Header Job */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <p className="text-blue-600 font-semibold text-lg">{job.salary}</p>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
          </div>
          <div>
            {/* Tombol Aksi */}
            <div className="flex flex-col gap-5">
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
                <FaRocket />
                Lamar Cepat
              </button>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-600 rounded-lg shadow-lg hover:bg-gray-200">
                  <FaBookmark />
                  Bookmark
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-600 rounded-lg shadow-lg hover:bg-gray-200">
                  <FaShareAlt />
                  Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Deskripsi Pekerjaan */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Deskripsi Pekerjaan</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>

        {/* Kualifikasi */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Kualifikasi</h2>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((requirement, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full"
              >
                {requirement}
              </span>
            ))}
          </div>
        </div>

        {/* Keahlian yang Dibutuhkan */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Keahlian yang Dibutuhkan
          </h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Informasi Lain */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Diupdate Terakhir</h2>
          <p className="text-gray-600">{job.lastUpdated}</p>
        </div>

        {/* Perekrut */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Perekrut</h2>
          <p className="text-gray-700">{job.recruiter.name}</p>
          <p className="text-gray-600">{job.recruiter.title}</p>
        </div>

        {/* Tentang Perusahaan */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Tentang Perusahaan</h2>
          <p className="text-gray-700">{job.companyDetails.name}</p>
          <p className="text-gray-600">{job.companyDetails.industry}</p>
          <p className="text-gray-600">{job.companyDetails.size}</p>
          <p className="text-gray-600">{job.companyDetails.address}</p>
        </div>

        {/* Pekerjaan Terkait */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Pekerjaan Terkait</h2>
          <div className="grid grid-cols-2 gap-4">
            {job.relatedJobs.map((relatedJob, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-md p-4"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {relatedJob.title}
                </h3>
                <p className="text-gray-600">{relatedJob.company}</p>
                <p className="text-gray-600">{relatedJob.location}</p>
                <p className="text-blue-600 font-semibold">
                  {relatedJob.salary}
                </p>
                <p className="text-gray-600">{relatedJob.lastUpdated}</p>
                <p className="text-gray-600">{relatedJob.level}</p>
                <p className="text-gray-600">{relatedJob.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
