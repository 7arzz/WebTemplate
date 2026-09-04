const services = [
  { title: 'Training Skills', desc: 'Pelatihan pengembangan diri dan profesional untuk meningkatkan kualitas talenta.' },
  { title: 'EO & WO', desc: 'Manajemen acara lengkap mulai dari korporat hingga pernikahan eksklusif.' },
  { title: 'Bisnis Planner', desc: 'Konsultasi dan perencanaan strategis untuk pertumbuhan bisnis Anda.' },
  { title: 'Video Iklan', desc: 'Produksi video komersial berkualitas tinggi untuk kebutuhan promosi.' },
  { title: 'Wedding Creator', desc: 'Konseptor pernikahan unik yang disesuaikan dengan impian Anda.' },
  { title: 'Konten Kreator', desc: 'Manajemen dan produksi konten kreatif untuk berbagai platform media sosial.' },
  { title: 'Class Marketing & Talent', desc: 'Kelas khusus pemasaran digital dan inkubasi talenta baru.' },
  { title: 'Legalitas', desc: 'Layanan pengurusan izin dan legalitas untuk keamanan bisnis dan acara.' }
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan & Harga</h2>
          <p className="text-gray-600 text-lg">
            Pilih layanan yang sesuai dengan kebutuhan Anda. Kami menyediakan berbagai paket untuk mendukung kesuksesan event dan bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => (
            <div key={s.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm flex-grow mb-6">{s.desc}</p>
              <a href={`#booking`} className="btn btn-outline-dark w-full mt-auto text-sm py-2.5">
                Info Lebih Lanjut
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
