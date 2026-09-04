import { useState } from 'react';

const services = [
  'Training Skills', 'EO & WO', 'Bisnis Planner', 'Video Iklan',
  'Wedding Creator', 'Konten Kreator', 'Class Marketing & Talent', 'Legalitas'
];

export default function Booking() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', notes: '' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Halo Sultan's Management, saya ${form.name} tertarik dengan layanan ${form.service}.`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="booking" className="py-16 md:py-24 bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-5">
            
            {/* Left Info Panel */}
            <div className="md:col-span-2 bg-black text-white p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Pesan Layanan</h2>
              <p className="text-gray-300 mb-8">
                Isi formulir ini untuk melakukan pemesanan atau mengatur jadwal konsultasi dengan tim ahli kami.
              </p>
              <div className="space-y-4 text-sm text-gray-300">
                <p>✓ Respons Cepat</p>
                <p>✓ Konsultasi Gratis</p>
                <p>✓ Tim Profesional</p>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="md:col-span-3 p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input required type="text" name="name" value={form.name} onChange={handle}
                      className="field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">No. WhatsApp</label>
                    <input required type="tel" name="phone" value={form.phone} onChange={handle}
                      className="field" placeholder="08123456789" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Layanan</label>
                    <select required name="service" value={form.service} onChange={handle} className="field bg-white">
                      <option value="" disabled>Pilih Layanan...</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal (Opsional)</label>
                    <input type="date" name="date" value={form.date} onChange={handle} className="field" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catatan / Pesan</label>
                  <textarea name="notes" rows="4" value={form.notes} onChange={handle}
                    className="field resize-none" placeholder="Ceritakan sedikit tentang kebutuhan Anda..."></textarea>
                </div>

                <button type="submit" className="w-full h-12 rounded-md bg-black text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer border-0">
                  <span>Kirim via WhatsApp</span>
                </button>

              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
