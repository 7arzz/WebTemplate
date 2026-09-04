import { useState } from 'react';

const categories = ['Semua', 'Wedding', 'Event', 'Marketing', 'Lainnya'];

const projects = [
  { title: 'Corporate Gathering 2024', category: 'Event', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80' },
  { title: 'Intimate Wedding J&K', category: 'Wedding', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80' },
  { title: 'Product Launch Campaign', category: 'Marketing', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80' },
  { title: 'Grand Royal Wedding', category: 'Wedding', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80' },
  { title: 'Seminar Nasional Tech', category: 'Event', img: 'https://images.unsplash.com/photo-1475721025592-569df4b3737b?w=600&q=80' },
  { title: 'Brand Video Commercial', category: 'Lainnya', img: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80' },
];

export default function Portfolio() {
  const [active, setActive] = useState('Semua');

  const filtered = active === 'Semua' ? projects : projects.filter(p => p.category === active);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Portofolio & Dokumentasi</h2>
          <p className="text-gray-600 text-lg">
            Momen dan proyek terbaik yang pernah kami kerjakan.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border-0 cursor-pointer
                ${active === cat 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={p.title + i} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-gold text-xs font-bold uppercase tracking-wider mb-1">{p.category}</span>
                <h3 className="text-white text-lg font-bold">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in-up">
          <button className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer border-0">
            Lihat Semua Portofolio & Dokumentasi
            <span>→</span>
          </button>
          <p className="mt-4 text-gray-400 text-sm">Dokumentasi lengkap setiap event tersedia di halaman portofolio</p>
        </div>

      </div>
    </section>
  );
}
