import React from "react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
}

const BlogPage: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "10 Tips Sukses dalam Wawancara Kerja",
      description:
        "Pelajari bagaimana cara menjawab pertanyaan sulit dan memberikan kesan yang baik pada pewawancara.",
      image:
        "https://myrobin.id/wp-content/uploads/2024/01/action-learning-program.webp",
      date: "August 30, 2024",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Pekerjaan yang Banyak Dicari di Tahun 2024",
      description:
        "Pahami tren terbaru di pasar kerja dan persiapkan dirimu untuk posisi yang paling diminati tahun ini.",
      image:
        "https://myrobin.id/wp-content/uploads/2024/01/Rumus-Spreadsheet-untuk-HR.webp",
      date: "September 1, 2024",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "Cara Efektif Meningkatkan Skill di Dunia Kerja",
      description:
        "Berikut beberapa tips yang bisa kamu ikuti untuk meningkatkan keahlianmu di dunia kerja.",
      image:
        "https://myrobin.id/wp-content/uploads/2024/01/template-pertanyaan-interview-sales-lapangan.webp",
      date: "September 5, 2024",
      author: "Michael Johnson",
    },
    {
      id: 4,
      title: "Panduan Menulis CV yang Mengesankan",
      description:
        "Panduan langkah demi langkah untuk menulis CV yang akan menarik perhatian perekrut.",
      image:
        "https://myrobin.id/wp-content/uploads/2024/01/Kesenjangan-Sosial-di-Tempat-Kerja.webp",
      date: "September 8, 2024",
      author: "Sarah Lee",
    },
    {
      id: 5,
      title: "Pentingnya Networking dalam Karir",
      description:
        "Temukan bagaimana networking dapat membuka pintu peluang baru dalam karirmu.",
      image:
        "https://myrobin.id/wp-content/uploads/2024/01/Menyikapi-Labor-Market.webp",
      date: "September 10, 2024",
      author: "David Brown",
    },
    {
      id: 6,
      title: "Perubahan Teknologi di Dunia Kerja",
      description:
        "Eksplorasi bagaimana teknologi mengubah cara kita bekerja di era digital.",
      image:
        "https://myrobin.id/wp-content/uploads/2024/01/Chatbot-dalam-Bisnis-Telekomunikasi.webp",
      date: "September 12, 2024",
      author: "Emily Davis",
    },
    {
      id: 7,
      title: "Soft Skills yang Dicari di Tahun 2024",
      description:
        "Ketahui soft skills yang paling penting untuk dimiliki di tahun ini.",
      image:
        "https://myrobin.id/wp-content/uploads/2024/01/Win-Lose-Negotiation.webp",
      date: "September 15, 2024",
      author: "James Wilson",
    },
    {
      id: 8,
      title: "Cara Meningkatkan Produktivitas di Tempat Kerja",
      description:
        "Tips dan trik untuk meningkatkan produktivitas kerja harianmu.",
      image:
        "https://myrobin.id/wp-content/uploads/2024/01/Merekrut-Spesialis-vs-Generalis.webp",
      date: "September 18, 2024",
      author: "Olivia Johnson",
    },
    {
      id: 9,
      title: "Menghadapi Burnout di Tempat Kerja",
      description:
        "Panduan untuk mengidentifikasi dan mengatasi burnout di lingkungan kerja.",
      image:
        "https://myrobin.id/wp-content/uploads/2024/01/9-Tips-Menghadapi-Perubahan-di-Tempat-Kerja-.webp",
      date: "September 20, 2024",
      author: "Sophia Martinez",
    },
    {
      id: 10,
      title: "Manfaat Fleksibilitas Kerja untuk Karyawan",
      description:
        "Fleksibilitas dalam bekerja terbukti meningkatkan keseimbangan hidup dan karir.",
      image:
        "https://myrobin.id/wp-content/uploads/2024/01/Berapa-Gaji-OB.webp",
      date: "September 22, 2024",
      author: "Liam Garcia",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Blog Dunia Kerja</h1>
          <p className="mt-2 text-lg">
            Temukan artikel menarik mengenai dunia kerja, tips karir, dan banyak
            lagi.
          </p>
        </div>
      </header>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Artikel Terbaru
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <div className="text-sm text-gray-500 mb-2">
                    <span>{post.author}</span> | <span>{post.date}</span>
                  </div>
                  <button className="text-blue-600 hover:underline font-semibold">
                    Baca Selengkapnya
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ingin Baca Lebih Banyak Artikel?
          </h2>
          <p className="mb-4">
            Temukan lebih banyak tips karir, informasi lowongan pekerjaan, dan
            panduan dunia kerja di blog kami.
          </p>
          <button className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700">
            Lihat Semua Artikel
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
