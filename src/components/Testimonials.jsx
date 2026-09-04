const testimonials = [
  { name: 'Diana & Reza', role: 'Pasangan Pengantin', text: 'Terima kasih banyak Sultan\'s Management! Pernikahan impian kami benar-benar terwujud. Semuanya berjalan sangat lancar.' },
  { name: 'Bapak Sudirman', role: 'HR Director, PT. Maju Bersama', text: 'Corporate gathering perusahaan kami tahun ini adalah yang paling meriah berkat tim profesional Sultan\'s.' },
  { name: 'Siska & Aldi', role: 'Pasangan Lamaran', text: 'Dekorasinya sangat cantik, persis seperti referensi yang saya berikan. Sangat memuaskan!' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimoni Klien</h2>
          
          <div className="flex items-center justify-center space-x-1 text-gold mb-2 text-xl">
            <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
            <span className="text-white ml-2 text-lg font-semibold">4.9 / 5.0 Rata-rata Rating</span>
          </div>
          <p className="text-gray-400">Apa kata mereka yang telah bekerja sama dengan kami.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-900 p-8 rounded-2xl border border-gray-800 flex flex-col">
              <div className="flex space-x-1 text-gold mb-4 text-sm">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="text-gray-300 italic mb-6 flex-grow">"{t.text}"</p>
              <div>
                <strong className="block text-white font-semibold">{t.name}</strong>
                <span className="block text-gray-400 text-sm">{t.role}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
