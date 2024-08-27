import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Cari 25,000+ loker di Indonesia</h1>
      </div>

      {/* Search Box */}
      <div className="flex justify-center gap-4 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Ketik posisi pekerjaan"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-[1px] border-black rounded-lg py-3 px-4 w-80"
          />
          <BiSearch className="absolute right-3 top-3 text-xl text-gray-500" />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-[1px] border-black rounded-lg py-3 px-4 w-80"
          />
          <HiOutlineLocationMarker className="absolute right-3 top-3 text-xl text-gray-500" />
        </div>

        <button className="bg-blue-600 text-white rounded-lg py-3 px-6">
          Cari
        </button>
      </div>

      {/* Dibutuhkan Segera dan Perusahaan Terpercaya */}
      <div className="flex justify-between mb-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-xl font-bold mb-4">Dibutuhkan segera</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Data Analyst",
              "Digital Marketing",
              "Management Trainee",
              "Customer Service",
              "Administrasi",
              "Graphic Designer",
              "Content Writer",
              "Quality Assurance",
              "Web Developer",
              "Human Resource",
              "UI/UX Designer",
              "Content Creator",
              "Product Manager",
              "Social Media Specialist",
            ].map((job) => (
              <span
                key={job}
                className="bg-gray-200 py-2 px-4 rounded-md text-blue-600"
              >
                {job}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">
            Perusahaan terpercaya sedang merekrut
          </h2>
          <div className="flex flex-wrap gap-6">
            {[
              {
                name: "Amazon",
                img: "/logo-amazon.png",
              },
              {
                name: "Apple",
                img: "/logo-apple.jpg",
              },
              {
                name: "Edii",
                img: "/logo-edii.png",
              },
              {
                name: "Google",
                img: "/logo-google.jpg",
              },
              {
                name: "Intel",
                img: "/logo-intel.png",
              },
              {
                name: "Microsoft",
                img: "/logo-microsoft.jpg",
              },
              {
                name: "Oracle",
                img: "/logo-oracle.png",
              },
              {
                name: "Samsung",
                img: "/logo-samsung.png",
              },
              {
                name: "Telkom",
                img: "/logo-telkom.jpg",
              },
            ].map((company, index) => (
              <img
                key={index}
                src={`${company.img}`}
                alt={company.name}
                className="w-24 h-auto"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Job Categories */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">
          Kategori pekerjaan populer
        </h2>
      </div>

      {/* Category Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
        {[
          "Admin",
          "Marketing",
          "Operations",
          "Aktif Merekrut",
          "Supply Chain & Logistics",
          "Software Engineering",
          "Accounting & Finance",
          "WFH/Remote",
          "Design",
          "Media & Communication",
          "Java Developer",
          "Fresh Graduates",
        ].map((category, index) => (
          <button
            key={index}
            className={`py-4 rounded-lg text-center ${
              category === "Aktif Merekrut" ||
              category === "WFH/Remote" ||
              category === "Fresh Graduates"
                ? "bg-blue-100 text-blue-600 border border-blue-300"
                : "bg-white border border-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Testimoni Glints */}
      <div className="bg-white py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">
            5 juta talenta dapat kerja via CariKerja
          </h2>
          <p className="text-gray-500">
            Simak kisah mereka dapat pekerjaan via CariKerja. Kini giliranmu!
          </p>
        </div>
        <div className="flex justify-center gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Windya A.",
              age: "24 tahun",
              role: "Content Strategist",
              img: "/Mark-Zuckerberg.jpeg",
              quote:
                "CariKerja jadi platform cari kerja yang paling mudah & cepat buatku. Aku berhasil career switch ke bidang yang jadi passion-ku dan dapat kerja cuma dalam 4 hari.",
            },
            {
              name: "Dimas B Wicaksono",
              age: "26 tahun",
              role: "Senior Account Executive",
              quote:
                "Lewat CariKerja, aku bisa dapat pekerjaan yang bikin aku puas dan orang tua bangga. Prosesnya cepat, cuma 4 hari aku langsung dihubungi rekruter.",
              img: "/Elon Musk.jpeg",
            },
            {
              name: "Ashalia T. Tasha",
              age: "21 tahun",
              role: "Marketing Communication",
              quote:
                "Lewat CariKerja, aku berhasil mematahkan stigma jurusanku & berhasil dapat kerja sebelum lulus. Prosesnya cepat, aku diterima seminggu setelah interview.",
              img: "/Albert Einstein.jpeg",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg">
              <img
                src={`${testimonial.img}`}
                alt={testimonial.name}
                className="w-28 rounded-full mb-4 mx-auto"
              />
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="text-gray-800 font-semibold">
                {testimonial.name}, {testimonial.age}
              </p>
              <p className="text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
