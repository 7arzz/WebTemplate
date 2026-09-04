export default function About() {
  const handleOf = [
    'Training Skills', 'EO & WO', 'Bisnis Planner', 'Video Iklan',
    'Wedding Creator', 'Konten Kreator', 'Class Marketing & Talent', 'Legalitas'
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tentang Kami</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Sultan's Management Indonesia lahir dari dedikasi untuk menghadirkan layanan profesional berkualitas tinggi di bidang event management, produksi kreatif, dan pengembangan bisnis.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Visi</h3>
                <p className="text-gray-600">
                  Menjadi manajemen pilihan utama di Indonesia yang menginspirasi inovasi dan memberikan nilai tambah optimal bagi setiap mitra.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Misi</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Memberikan pelayanan ekselen dan terpercaya.</li>
                  <li>Mengembangkan talenta kreatif dan profesional.</li>
                  <li>Menciptakan ekosistem bisnis yang berkelanjutan.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-6">Handle Of</h3>
            <div className="grid grid-cols-2 gap-4">
              {handleOf.map(item => (
                <div key={item} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-center">
                  <h4 className="font-semibold text-sm md:text-base">{item}</h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
