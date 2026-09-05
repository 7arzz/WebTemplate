import React, { useState } from 'react';

const Template01 = ({ data }) => {
  const { business, theme, services, portfolio, testimonials, contact } = data;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [bookingForm, setBookingForm] = useState({ name: '', service: '', notes: '' });

  const handleBookingSubmit = () => {
    const message = `Halo, saya ingin booking layanan.\n\nNama: ${bookingForm.name}\nLayanan: ${bookingForm.service}\nCatatan: ${bookingForm.notes}`;
    const waUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const getStyle = (secId, defaultBg, defaultText) => ({
    backgroundColor: theme[`${secId}Bg`] || defaultBg,
    color: theme[`${secId}Text`] || defaultText,
  });

  const getBtnStyle = (secId, defaultBg, defaultText) => ({
    backgroundColor: theme[`${secId}BtnBg`] || theme[`${secId}Text`] || defaultText,
    color: theme[`${secId}BtnText`] || theme[`${secId}Bg`] || defaultBg,
  });

  const navbarStyle = getStyle('navbar', theme.primaryColor, theme.secondaryColor);
  const heroStyle = getStyle('hero', theme.primaryColor, theme.secondaryColor);
  const aboutStyle = getStyle('about', theme.secondaryColor, theme.primaryColor);
  const servicesStyle = getStyle('services', theme.secondaryColor, theme.primaryColor);
  const portfolioStyle = getStyle('portfolio', theme.secondaryColor, theme.primaryColor);
  const testimonialsStyle = getStyle('testimonials', theme.primaryColor, theme.secondaryColor);
  const bookingStyle = getStyle('booking', theme.secondaryColor, theme.primaryColor);
  const footerStyle = getStyle('footer', theme.primaryColor, theme.secondaryColor);
  
  const textAccent = { color: theme.accentColor };

  return (
    <div className="font-sans w-full transition-colors duration-300" style={aboutStyle}>
      {/* Navbar */}
      <nav className="p-4 sticky top-0 z-50 shadow-sm transition-colors duration-300" style={navbarStyle}>
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-50">
          <div className="flex items-center space-x-3">
            {business.logoURL && (
              <img src={business.logoURL} alt="Logo" className="h-8 object-contain" />
            )}
            <div className="font-bold text-xl">{business.name}</div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
            <a href="#beranda" className="opacity-80 hover:opacity-100 transition-opacity">Beranda</a>
            <a href="#tentang-kami" className="opacity-80 hover:opacity-100 transition-opacity">Tentang Kami</a>
            <a href="#layanan" className="opacity-80 hover:opacity-100 transition-opacity">Layanan</a>
            <a href="#portofolio" className="opacity-80 hover:opacity-100 transition-opacity">Portofolio</a>
            <a href="#testimoni" className="opacity-80 hover:opacity-100 transition-opacity">Testimoni</a>
            <a 
              href="#booking"
              className="px-4 py-2 rounded font-semibold transition-transform hover:scale-105 shadow-sm"
              style={getBtnStyle('navbar', theme.primaryColor, theme.secondaryColor)}
            >
              Booking
            </a>
          </div>

          {/* Mobile Hamburger Icon */}
          <button 
            className="md:hidden p-2 focus:outline-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden absolute top-full left-0 w-full shadow-lg border-t border-opacity-10 z-40"
            style={navbarStyle}
          >
            <div className="flex flex-col p-4 space-y-4 text-center font-medium">
              <a href="#beranda" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100">Beranda</a>
              <a href="#tentang-kami" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100">Tentang Kami</a>
              <a href="#layanan" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100">Layanan</a>
              <a href="#portofolio" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100">Portofolio</a>
              <a href="#testimoni" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100">Testimoni</a>
              <a 
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded font-semibold mx-auto w-3/4 shadow-sm"
                style={getBtnStyle('navbar', theme.primaryColor, theme.secondaryColor)}
              >
                Booking
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section id="beranda" className="py-32 px-4 text-center transition-colors duration-300" style={heroStyle}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl mx-auto leading-tight">
            Wujudkan Pernikahan<br />terbaik<br /><span style={textAccent}>anda dengan kami</span>
          </h1>
          <p className="mb-10 max-w-2xl mx-auto opacity-80 text-lg">
            {business.description || "lorem ipsum dolor sit amet 7arzz"}
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-y-4">
            <a 
              href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(business.name)}`} 
              className="py-3 px-8 rounded font-semibold hover:opacity-90 transition-opacity"
              style={getBtnStyle('hero', theme.primaryColor, theme.secondaryColor)}
              target="_blank" rel="noreferrer"
            >
              Konsultasi
            </a>
            <a 
              href="#layanan"
              className="py-3 px-8 rounded font-semibold hover:opacity-80 transition-opacity"
              style={{ backgroundColor: 'transparent', color: heroStyle.color, border: `1px solid ${heroStyle.color}` }}
            >
              Lihat Layanan
            </a>
          </div>
        </section>

        {/* Tentang Kami */}
        <section id="tentang-kami" className="py-24 px-4" style={aboutStyle}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Tentang Kami</h2>
              <div className="w-24 h-1 mx-auto rounded" style={{ backgroundColor: aboutStyle.color, opacity: 0.2 }}></div>
            </div>
            
            <div className="text-xl md:text-2xl leading-relaxed text-center max-w-4xl mx-auto mb-16 opacity-90 font-medium">
              "{business.about}"
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Visi */}
              <div className="p-8 rounded-2xl border border-opacity-10 hover:shadow-xl transition-all duration-300" style={{ borderColor: aboutStyle.color, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4" style={getBtnStyle('about', theme.secondaryColor, theme.primaryColor)}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </div>
                  <h3 className="text-3xl font-bold">Visi</h3>
                </div>
                <p className="opacity-80 text-lg leading-relaxed">
                  Menjadi manajemen pilihan utama di Indonesia yang menginspirasi inovasi dan memberikan nilai tambah optimal bagi setiap mitra.
                </p>
              </div>
              
              {/* Misi */}
              <div className="p-8 rounded-2xl border border-opacity-10 hover:shadow-xl transition-all duration-300" style={{ borderColor: aboutStyle.color, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4" style={getBtnStyle('about', theme.secondaryColor, theme.primaryColor)}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h3 className="text-3xl font-bold">Misi</h3>
                </div>
                <ul className="space-y-4 opacity-80 text-lg">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: aboutStyle.color }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Memberikan pelayanan ekselen dan terpercaya.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: aboutStyle.color }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Mengembangkan talenta kreatif dan profesional.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: aboutStyle.color }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Menciptakan ekosistem bisnis yang berkelanjutan.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Layanan & Harga */}
        <section id="layanan" className="py-20 px-4 border-t border-opacity-10 border-black" style={servicesStyle}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Layanan & Harga</h2>
            <p className="text-center mb-12 max-w-3xl mx-auto opacity-80">
              Pilih layanan yang sesuai dengan kebutuhan Anda. Kami menyediakan berbagai paket untuk mendukung kesuksesan event dan bisnis Anda.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="rounded-xl shadow-lg p-8 flex flex-col border border-opacity-10 border-black" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <p className="mb-6 flex-1 text-sm opacity-80">{service.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-sm line-through block mb-1 opacity-60">Rp {Math.floor(Math.random() * 5 + 2)}.000.000</span>
                    <div className="text-2xl font-bold">{service.price}</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8 opacity-80">
                    <li className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Sertifikat / Konsep Acara
                    </li>
                    <li className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Materi Praktik / Manajemen Vendor
                    </li>
                    <li className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Instruktur Berpengalaman / On-day Execution
                    </li>
                  </ul>
                  
                  <a 
                    href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20pesan%20layanan%20${service.name}`}
                    className="block w-full py-3 text-center border rounded font-medium transition-colors"
                    style={{ borderColor: servicesStyle.color, color: servicesStyle.color }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = servicesStyle.color;
                      e.currentTarget.style.color = servicesStyle.backgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = servicesStyle.color;
                    }}
                    target="_blank" rel="noreferrer"
                  >
                    Pesan Sekarang
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portofolio & Dokumentasi */}
        <section id="portofolio" className="py-20 px-4 border-t border-opacity-10 border-black" style={portfolioStyle}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Portofolio & Dokumentasi</h2>
            <p className="text-center mb-10 opacity-80">Momen dan proyek terbaik yang pernah kami kerjakan.</p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button className="px-6 py-2 rounded-full text-sm font-medium" style={getBtnStyle('portfolio', theme.secondaryColor, theme.primaryColor)}>Semua</button>
              <button className="px-6 py-2 rounded-full text-sm font-medium border border-opacity-20 border-black opacity-70 hover:opacity-100" style={{ borderColor: portfolioStyle.color }}>Wedding</button>
              <button className="px-6 py-2 rounded-full text-sm font-medium border border-opacity-20 border-black opacity-70 hover:opacity-100" style={{ borderColor: portfolioStyle.color }}>Event</button>
              <button className="px-6 py-2 rounded-full text-sm font-medium border border-opacity-20 border-black opacity-70 hover:opacity-100" style={{ borderColor: portfolioStyle.color }}>Marketing</button>
              <button className="px-6 py-2 rounded-full text-sm font-medium border border-opacity-20 border-black opacity-70 hover:opacity-100" style={{ borderColor: portfolioStyle.color }}>Lainnya</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.map((item, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow h-80">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimoni Klien */}
        <section id="testimoni" className="py-24 px-4 overflow-hidden" style={testimonialsStyle}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Testimoni Klien</h2>
              <div className="flex justify-center items-center mb-4 text-xl space-x-1" style={textAccent}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="opacity-80">4.9 / 5.0 Rata-rata Rating<br />Apa kata mereka yang telah bekerja sama dengan kami.</p>
            </div>
            
            <div className="relative h-[450px] md:h-[350px] flex items-center justify-center w-full mt-10 mb-8">
              {/* Prev Button */}
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)} 
                className="absolute left-0 md:left-8 z-30 p-3 opacity-60 hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-full"
                style={{ color: testimonialsStyle.color }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>

              <div className="relative w-full max-w-5xl h-full flex justify-center items-center" style={{ perspective: '1200px' }}>
                {testimonials.map((testi, idx) => {
                  const total = testimonials.length;
                  let offset = idx - activeTestimonial;
                  
                  // Handle wrap around
                  if (offset < -Math.floor(total / 2)) offset += total;
                  if (offset > Math.floor(total / 2)) offset -= total;

                  const isActive = offset === 0;
                  const isVisible = Math.abs(offset) <= 1;
                  
                  // Position & rotation: left card rotates toward center, right card rotates toward center
                  let xPos = '0%';
                  let rotateY = '0deg';
                  let scale = 1;
                  let zIndex = 20;
                  let opacity = 1;

                  if (offset === -1) {
                    xPos = '-75%';
                    rotateY = '25deg';
                    scale = 0.8;
                    zIndex = 10;
                    opacity = 0.5;
                  } else if (offset === 1) {
                    xPos = '75%';
                    rotateY = '-25deg';
                    scale = 0.8;
                    zIndex = 10;
                    opacity = 0.5;
                  } else if (!isActive) {
                    opacity = 0;
                    zIndex = 0;
                    scale = 0.6;
                    xPos = offset < 0 ? '-120%' : '120%';
                  }

                  return (
                    <div 
                      key={idx}
                      className={`absolute top-1/2 left-1/2 w-[85%] md:w-[420px] rounded-2xl p-8 md:p-10 flex flex-col items-center text-center ${
                        !isVisible ? 'pointer-events-none' : ''
                      }`}
                      style={{ 
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        color: '#f8fafc',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transform: `translate(-50%, -50%) translateX(${xPos}) rotateY(${rotateY}) scale(${scale})`,
                        opacity: opacity,
                        zIndex: zIndex,
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        transformStyle: 'preserve-3d',
                        boxShadow: isActive ? '0 25px 50px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.2)',
                      }}
                    >
                      <div className="w-14 h-14 rounded-full mb-3 overflow-hidden ring-2 ring-opacity-20 ring-white">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testi.name)}&background=random`} alt={testi.name} />
                      </div>
                      <div className="mb-3 text-yellow-400 text-base">
                        {'★'.repeat(testi.rating || 5)}{'☆'.repeat(5 - (testi.rating || 5))}
                      </div>
                      <p className="text-sm md:text-base italic mb-6 max-w-sm opacity-90 font-medium leading-relaxed">"{testi.text}"</p>
                      <div className="font-bold text-sm">{testi.name}</div>
                      <div className="text-xs mt-1 opacity-50">Client</div>
                    </div>
                  );
                })}
              </div>

              {/* Next Button */}
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)} 
                className="absolute right-0 md:right-8 z-30 p-3 opacity-60 hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-full"
                style={{ color: testimonialsStyle.color }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === idx ? 'w-6 opacity-100' : 'w-2 opacity-30'}`}
                  style={{ backgroundColor: testimonialsStyle.color }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Form Booking */}
        <section id="booking" className="py-20 px-4 border-t border-opacity-10 border-black" style={bookingStyle}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Booking Layanan</h2>
            <form className="space-y-4 p-8 rounded-xl shadow-xl border border-opacity-10" style={{ borderColor: bookingStyle.color, backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <div>
                <label className="block text-sm font-semibold mb-1 opacity-80">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full p-3 rounded border border-opacity-20 bg-transparent focus:border-opacity-100 outline-none transition-colors" 
                  style={{ borderColor: bookingStyle.color, color: bookingStyle.color }} 
                  placeholder="Nama Anda" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 opacity-80">Pilih Layanan</label>
                <select 
                  value={bookingForm.service}
                  onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                  className="w-full p-3 rounded border border-opacity-20 bg-transparent focus:border-opacity-100 outline-none transition-colors" 
                  style={{ borderColor: bookingStyle.color, color: bookingStyle.color }}
                >
                  <option value="" style={{ color: '#000' }}>Pilih salah satu...</option>
                  {services.map((s, i) => <option key={i} value={s.name} style={{ color: '#000' }}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 opacity-80">Catatan Tambahan</label>
                <textarea 
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                  className="w-full p-3 rounded border border-opacity-20 bg-transparent focus:border-opacity-100 outline-none transition-colors h-24" 
                  style={{ borderColor: bookingStyle.color, color: bookingStyle.color }} 
                  placeholder="Detail pesanan..." 
                />
              </div>
              <button 
                type="button" 
                onClick={handleBookingSubmit}
                className="w-full py-4 rounded-lg font-bold text-lg mt-4 shadow-lg hover:opacity-90 transition-opacity" 
                style={getBtnStyle('booking', theme.secondaryColor, theme.primaryColor)}
              >
                Kirim Form Booking
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-opacity-20 border-white text-center text-sm opacity-80" style={footerStyle}>
        <p className="mb-2">&copy; {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p className="text-xs opacity-60">Prototype by 7arzz</p>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20ingin%20konsultasi/order%20di%20${encodeURIComponent(business.name)}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        style={{ width: '60px', height: '60px', backgroundColor: '#25D366', color: '#fff' }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};

export default Template01;

