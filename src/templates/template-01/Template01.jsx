import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins at module level so they are available
// before any component (including ScrollDecorations) runs its effects
gsap.registerPlugin(ScrollTrigger);

// ── Travel Hero Plane Animation (auto-loop, diagonal fly) ───────────────────
const TravelPlaneHeader = ({ color = '#ffffff', accentColor }) => {
  const planColor = accentColor || color || '#ffffff';

  return (
    <>
      <style>{`
        @keyframes planeHeroFly0 {
          0%   { transform: translate(-120px, 0) rotate(0deg) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          45%  { transform: translate(45vw, 0) rotate(0deg) scale(1); opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(calc(100vw + 120px), -5vh) rotate(-5deg) scale(1); opacity: 0; }
        }
        @keyframes planeHeroFly1 {
          0%   { transform: translate(-120px, 0) rotate(0deg) scale(0.85); opacity: 0; }
          10%  { opacity: 1; }
          45%  { transform: translate(45vw, 0) rotate(0deg) scale(0.85); opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(calc(100vw + 120px), -35vh) rotate(-30deg) scale(0.85); opacity: 0; }
        }
        @keyframes planeHeroFly2 {
          0%   { transform: translate(-120px, 0) rotate(0deg) scale(0.7); opacity: 0; }
          10%  { opacity: 1; }
          45%  { transform: translate(45vw, 0) rotate(0deg) scale(0.7); opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(calc(100vw + 120px), 35vh) rotate(30deg) scale(0.7); opacity: 0; }
        }
        .travel-hero-plane {
          position: absolute;
          top: 40%;
          left: 0;
          pointer-events: none;
          z-index: 200;
          opacity: 0;
        }
      `}</style>
      
      {/* Membuat 3 pesawat berbaris yang berpisah arah saat di tengah */}
      {[0, 1, 2].map((index) => {
        return (
          <div
            key={index}
            className="travel-hero-plane"
            style={{
              color: planColor,
              filter: `drop-shadow(0 4px 12px ${planColor}aa)`,
              animation: `planeHeroFly${index} 6s linear infinite`,
              marginLeft: `-${index * 160}px`, // Jarak antar pesawat agar berbaris
            }}
          >
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ transform: 'rotate(90deg)' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>
        );
      })}
    </>
  );
};

const ScrollDecorations = ({ mode, color }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (mode === 'travel') {
        // travel plane handled by TravelPlaneHeader canvas animation in navbar
      } else if (mode === 'eo') {
        // EO mode uses CSS animations for equalizer and confetti instead of ScrollTrigger
      } else if (mode === 'wo') {
        gsap.utils.toArray(".wo-petal").forEach((petal, i) => {
          gsap.to(petal, {
            y: "150vh",
            rotate: "random(180, 360)",
            x: "random(-150, 150)",
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 2 + Math.random(),
            }
          });
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [mode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" ref={containerRef}>
      {/* travel-plane removed from here — now rendered in the navbar header */}
      {mode === 'eo' && (
        <>
          <style>{`
            @keyframes eqBar {
              0% { height: 12px; }
              50% { height: 48px; }
              100% { height: 12px; }
            }
            @keyframes confettiBlastLeft {
              0% { transform: translate(0, 0) rotate(0deg) scale(0); opacity: 0; }
              5% { opacity: 1; scale: 1.2; }
              100% { transform: translate(calc(30vw + 100px), -90vh) rotate(720deg) scale(0.5); opacity: 0; }
            }
            @keyframes confettiBlastRight {
              0% { transform: translate(0, 0) rotate(0deg) scale(0); opacity: 0; }
              5% { opacity: 1; scale: 1.2; }
              100% { transform: translate(calc(-30vw - 100px), -90vh) rotate(-720deg) scale(0.5); opacity: 0; }
            }
            .eq-container {
              display: flex;
              align-items: flex-end;
              gap: 4px;
              opacity: 0.5;
            }
            .eq-bar {
              width: 6px;
              border-radius: 4px 4px 0 0;
            }
          `}</style>

          {/* Equalizer Left & Right (Disabled temporarily) */}
          {false && (
            <>
              <div className="fixed bottom-6 left-12 eq-container z-0 pointer-events-none">
                {[1, 2, 3, 4, 5, 6].map((bar) => (
                  <div 
                    key={bar} 
                    className="eq-bar" 
                    style={{ 
                      backgroundColor: color,
                      animation: `eqBar ${0.4 + Math.random() * 0.6}s ease-in-out infinite alternate`,
                      animationDelay: `${Math.random() * 0.5}s`
                    }}
                  />
                ))}
              </div>

              {/* Equalizer Right */}
              <div className="fixed bottom-6 right-12 eq-container z-0 pointer-events-none">
                {[1, 2, 3, 4, 5, 6].map((bar) => (
                  <div 
                    key={bar} 
                    className="eq-bar" 
                    style={{ 
                      backgroundColor: color,
                      animation: `eqBar ${0.4 + Math.random() * 0.6}s ease-in-out infinite alternate`,
                      animationDelay: `${Math.random() * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Confetti Popper Left (Disabled temporarily) */}
          {false && (
            <>
              <div className="fixed bottom-0 left-4 w-12 h-12 z-0 pointer-events-none opacity-80" style={{ color: color }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full transform rotate-45">
                  <path d="M5.8 11.3 2 22l10.7-3.79"/>
                  <path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/>
                  <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/>
                  <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"/>
                  <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"/>
                  <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>
                </svg>
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`left-${i}`}
                    className="absolute opacity-70"
                    style={{
                      width: i % 2 === 0 ? '6px' : '8px',
                      height: i % 2 === 0 ? '6px' : '8px',
                      backgroundColor: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93', color][Math.floor(Math.random() * 6)],
                      borderRadius: i % 3 === 0 ? '50%' : '2px',
                      animation: `confettiBlastLeft ${1.5 + Math.random() * 1.5}s ease-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                      left: '50%',
                      top: '50%'
                    }}
                  />
                ))}
              </div>

              {/* Confetti Popper Right */}
              <div className="fixed bottom-0 right-4 w-12 h-12 z-0 pointer-events-none opacity-80" style={{ color: color }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full transform -rotate-45 scale-x-[-1]">
                  <path d="M5.8 11.3 2 22l10.7-3.79"/>
                  <path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/>
                  <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/>
                  <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"/>
                  <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"/>
                  <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>
                </svg>
                 {[...Array(20)].map((_, i) => (
                  <div
                    key={`right-${i}`}
                    className="absolute opacity-70"
                    style={{
                      width: i % 2 === 0 ? '6px' : '8px',
                      height: i % 2 === 0 ? '6px' : '8px',
                      backgroundColor: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93', color][Math.floor(Math.random() * 6)],
                      borderRadius: i % 3 === 0 ? '50%' : '2px',
                      animation: `confettiBlastRight ${1.5 + Math.random() * 1.5}s ease-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                      right: '50%',
                      top: '50%'
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
      {mode === 'wo' && (
        <>
          {[...Array(12)].map((_, i) => (
             <div key={i} className="wo-petal absolute opacity-40 w-5 h-5 rounded-tl-full rounded-br-full" style={{ 
               backgroundColor: color, 
               left: `${5 + i * 8}%`,
               top: `-${10 + Math.random() * 20}%`,
               transform: `rotate(${Math.random() * 360}deg)`
             }}></div>
          ))}
        </>
      )}
    </div>
  );
};

const Template01 = ({ data }) => {
  const { business, theme, services, portfolio, testimonials, contact } = data;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    service: "",
    notes: "",
  });
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("7arzz_intro_shown");
    }
    return false;
  });

  const heroImageRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroDescRef = useRef(null);
  const btnGroupRef = useRef(null);
  const magneticBtnRef = useRef(null);

  useEffect(() => {
    // Text Reveal Animation
    if (heroTextRef.current && heroDescRef.current && btnGroupRef.current) {
      gsap.fromTo(
        [heroTextRef.current, heroDescRef.current, btnGroupRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.3 }
      );
    }

    // Magnetic Button Logic
    const magneticBtn = magneticBtnRef.current;
    let handleMouseMove, handleMouseLeave;
    if (magneticBtn) {
      handleMouseMove = (e) => {
        const rect = magneticBtn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        gsap.to(magneticBtn, { x, y, duration: 0.3, ease: "power2.out" });
      };
      handleMouseLeave = () => {
        gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
      };
      magneticBtn.addEventListener("mousemove", handleMouseMove);
      magneticBtn.addEventListener("mouseleave", handleMouseLeave);
    }

    if (heroImageRef.current && heroSectionRef.current) {
      // Cinematic zoom-out & parallax on scroll for hero image
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.15, y: 0 },
        {
          scale: 1,
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (magneticBtn) {
        magneticBtn.removeEventListener("mousemove", handleMouseMove);
        magneticBtn.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const dismissIntro = () => {
    sessionStorage.setItem("7arzz_intro_shown", "1");
    setShowIntro(false);
  };

  const handleBookingSubmit = () => {
    const message = `Halo, saya ingin booking layanan.\n\nNama: ${bookingForm.name}\nLayanan: ${bookingForm.service}\nCatatan: ${bookingForm.notes}`;
    const waUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  // Auto-generate Google Maps embed URL dari alamat teks atau URL apapun
  const getMapEmbedUrl = (addressOrUrl) => {
    if (!addressOrUrl) return null;
    // Kalau sudah format embed langsung pakai
    if (addressOrUrl.includes('/maps/embed')) return addressOrUrl;
    // Kalau URL Google Maps biasa (place/search/goo.gl) → konversi ke embed via search query
    if (
      addressOrUrl.startsWith('http') &&
      (addressOrUrl.includes('google.com/maps') || addressOrUrl.includes('maps.app.goo.gl') || addressOrUrl.includes('goo.gl/maps'))
    ) {
      // Ekstrak query dari URL jika ada
      try {
        const url = new URL(addressOrUrl);
        const q = url.searchParams.get('q') || url.pathname.replace('/maps/place/', '').replace('/maps/search/', '');
        if (q) return `https://maps.google.com/maps?q=${encodeURIComponent(decodeURIComponent(q))}&output=embed&hl=id`;
      } catch (_) {}
      return `https://maps.google.com/maps?q=${encodeURIComponent(addressOrUrl)}&output=embed&hl=id`;
    }
    // Alamat teks biasa → langsung jadikan query
    return `https://maps.google.com/maps?q=${encodeURIComponent(addressOrUrl)}&output=embed&hl=id`;
  };

  const getStyle = (secId, defaultBg, defaultText) => ({
    backgroundColor: theme[`${secId}Bg`] || defaultBg,
    color: theme[`${secId}Text`] || defaultText,
  });

  const getBtnStyle = (secId, defaultBg, defaultText) => ({
    backgroundColor:
      theme[`${secId}BtnBg`] || theme[`${secId}Text`] || defaultText,
    color: theme[`${secId}BtnText`] || theme[`${secId}Bg`] || defaultBg,
  });

  const navbarStyle = getStyle("navbar", theme.primaryColor, theme.secondaryColor);
  const heroStyle = getStyle("hero", theme.primaryColor, theme.secondaryColor);
  const aboutStyle = getStyle("about", theme.secondaryColor, theme.primaryColor);
  const servicesStyle = getStyle("services", theme.secondaryColor, theme.primaryColor);
  const portfolioStyle = getStyle("portfolio", theme.secondaryColor, theme.primaryColor);
  const testimonialsStyle = getStyle("testimonials", theme.primaryColor, theme.secondaryColor);
  const bookingStyle = getStyle("booking", theme.secondaryColor, theme.primaryColor);
  const footerStyle = getStyle("footer", theme.primaryColor, theme.secondaryColor);

  const textAccent = { color: theme.accentColor };

  // Helper for dynamic animations based on mode
  const getAnimClass = (type) => {
    const mode = theme.animationMode || 'wo';
    if (mode === 'wo') {
      if (type === 'card') return 'hover:-translate-y-2 transition-transform duration-500';
      if (type === 'btn') return 'hover:opacity-80 transition-opacity duration-300';
      if (type === 'image') return 'animate-wo-fade';
    } else if (mode === 'eo') {
      if (type === 'card') return 'hover:scale-105 hover:rotate-1 transition-transform duration-300';
      if (type === 'btn') return 'hover:animate-eo-pulse';
      if (type === 'image') return 'animate-eo-slide-in';
    } else if (mode === 'travel') {
      if (type === 'card') return 'hover:-translate-y-3 hover:shadow-xl transition-all duration-300';
      if (type === 'btn') return 'hover:animate-travel-hover';
      if (type === 'image') return 'animate-travel-float';
    }
    return 'transition-all';
  };

  return (
    <div
      className="font-sans w-full transition-colors duration-300 selection:bg-black selection:text-white overflow-x-hidden"
      style={aboutStyle}
    >
      {/* ── 7arzz Intro Popup ── */}
      {showIntro && (
        <div
          onClick={dismissIntro}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.4s ease",
            cursor: "pointer",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0a0a0a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "48px 56px",
              textAlign: "center",
              maxWidth: "480px",
              width: "90%",
              animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Big logo */}
            <div
              style={{
                fontSize: "clamp(4rem, 14vw, 7rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                background:
                  "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "12px",
                userSelect: "none",
              }}
            >
              7arzz
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "15px",
                fontWeight: 600,
                marginBottom: "32px",
              }}
            >
              Web prototype by 7arzz
            </p>

            <button
              onClick={dismissIntro}
              style={{
                background: "white",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "12px",
                padding: "12px 32px",
                fontWeight: 700,
                fontSize: "15px",
                cursor: "pointer",
                transition: "all 0.2s",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              Masuk ke Website →
            </button>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
          `}</style>
        </div>
      )}

      {/* GSAP Scroll Decorations (Kelopak/Confetti) */}
      <ScrollDecorations mode={theme.animationMode || 'wo'} color={theme.accentColor} />

      {/* (Travel plane moved inside hero section) */}

      <nav
        className="px-6 py-4 sticky top-0 z-50 border-b border-opacity-10 border-current backdrop-blur-md"
        style={{ ...navbarStyle, position: 'sticky' }}
      >
        {/* Plane moved to hero section for travel mode */}
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-50">
          <div className="flex items-center space-x-3">
            {business.logoURL && (
              <img
                src={business.logoURL}
                alt="Logo"
                className="w-10 h-10 object-cover rounded-full"
              />
            )}
            <div className="font-bold text-xl tracking-tight">{business.name}</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
            <a href="#tentang-kami" className="opacity-60 hover:opacity-100 transition-opacity">Tentang</a>
            <a href="#layanan" className="opacity-60 hover:opacity-100 transition-opacity">Layanan</a>
            <a href="#portofolio" className="opacity-60 hover:opacity-100 transition-opacity">Portofolio</a>
            <a
              href="#booking"
              className="px-5 py-2.5 rounded-full font-semibold transition-all active:scale-[0.98]"
              style={getBtnStyle("navbar", theme.primaryColor, theme.secondaryColor)}
            >
              Booking
            </a>
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            className="md:hidden p-2 focus:outline-none opacity-60 hover:opacity-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full shadow-2xl border-t border-opacity-10 z-40 p-6" style={navbarStyle}>
            <div className="flex flex-col space-y-6 text-lg font-medium">
              <a href="#tentang-kami" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100">Tentang</a>
              <a href="#layanan" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100">Layanan</a>
              <a href="#portofolio" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100">Portofolio</a>
              <a
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 rounded-xl font-semibold text-center transition-transform active:scale-[0.98]"
                style={getBtnStyle("navbar", theme.primaryColor, theme.secondaryColor)}
              >
                Booking
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section: Left-aligned, limited width, strong typography */}
        <section
          id="beranda"
          ref={heroSectionRef}
          className="pt-24 pb-20 px-6 lg:px-12 flex items-center min-h-[90vh] overflow-hidden relative"
          style={heroStyle}
        >
          {/* ── Travel mode plane flies diagonally across hero ── */}
          {(theme.animationMode || 'wo') === 'travel' && (
            <TravelPlaneHeader color={theme.accentColor || '#ffffff'} accentColor={theme.accentColor} />
          )}

          {/* Subtle Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: heroStyle.color || "white",
                  width: Math.random() * 4 + 2 + "px",
                  height: Math.random() * 4 + 2 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.5 + 0.2,
                  animation: `floatUp ${Math.random() * 5 + 5}s linear infinite`,
                  animationDelay: `-${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes floatUp {
              0% { transform: translateY(0) scale(1); opacity: 0; }
              20% { opacity: 0.8; }
              80% { opacity: 0.8; }
              100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
            }
          `}</style>

          {/* travel plane is now rendered as a fixed overlay at top level */}

          <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
            <div className="md:col-span-7 space-y-8">
              <h1 
                className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.1] max-w-2xl"
                ref={heroTextRef}
              >
                {business.tagline || "Wujudkan Pernikahan"}
                <br />
                <span className="italic font-light opacity-90" style={textAccent}>{business.taglineHighlight || "terbaik anda"}</span> {business.taglineEnd || "dengan kami."}
              </h1>
              <p 
                className="max-w-lg opacity-70 text-lg md:text-xl leading-relaxed"
                ref={heroDescRef}
              >
                {business.description || "Kami membantu merancang dan mengeksekusi momen paling berharga dalam hidup Anda dengan presisi dan keindahan."}
              </p>
              <div 
                className="flex flex-wrap items-center gap-4 pt-4"
                ref={btnGroupRef}
              >
                <div ref={magneticBtnRef} className="inline-block">
                  <a
                    href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(business.name)}`}
                    className="px-8 py-4 rounded-full font-semibold transition-all active:scale-[0.98] whitespace-nowrap block"
                    style={getBtnStyle("hero", theme.primaryColor, theme.secondaryColor)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Konsultasi Gratis
                  </a>
                </div>
                <a
                  href="#layanan"
                  className="px-8 py-4 rounded-full font-semibold transition-all active:scale-[0.98] whitespace-nowrap opacity-80 hover:opacity-100"
                  style={{
                    backgroundColor: "transparent",
                    color: heroStyle.color,
                    border: `1px solid ${heroStyle.color}`,
                  }}
                >
                  Lihat Layanan
                </a>
              </div>
            </div>
            
            {/* Right side visual placeholder/asset */}
            <div 
              className="md:col-span-5 h-[600px] rounded-3xl overflow-hidden relative"
             
             
            >
                {/* Fallback image if no specific hero image, using a placeholder from unsplash focused on aesthetic wedding/event */}
                <img 
                  ref={heroImageRef}
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" 
                  alt="Wedding" 
                  className="w-full h-full object-cover origin-center" 
                />
            </div>
          </div>
        </section>

        {/* Tentang Kami: Editorial Layout */}
        <section id="tentang-kami" className="py-24 px-6 lg:px-12 border-t border-opacity-10 border-current" style={aboutStyle}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-8">Tentang Kami</h2>
                <div className="text-xl md:text-2xl leading-relaxed opacity-90 font-medium">
                  {business.about}
                </div>
              </div>
              
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
                {/* Visi */}
                <div className="border-t border-opacity-20 pt-6" style={{ borderColor: aboutStyle.color }}>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accentColor }}></span>
                    Visi
                  </h3>
                  <p className="opacity-70 leading-relaxed text-base">
                    Menjadi manajemen pilihan utama di Indonesia yang
                    menginspirasi inovasi dan memberikan nilai tambah optimal bagi
                    setiap mitra.
                  </p>
                </div>

                {/* Misi */}
                <div className="border-t border-opacity-20 pt-6" style={{ borderColor: aboutStyle.color }}>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accentColor }}></span>
                    Misi
                  </h3>
                  <ul className="space-y-3 opacity-70 text-base leading-relaxed">
                    <li>— Memberikan pelayanan ekselen dan terpercaya.</li>
                    <li>— Mengembangkan talenta kreatif dan profesional.</li>
                    <li>— Menciptakan ekosistem bisnis yang berkelanjutan.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Layanan & Harga: Clean borders, no heavy shadows */}
        <section id="layanan" className="py-24 px-6 lg:px-12 border-t border-opacity-10 border-current" style={servicesStyle}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">Layanan & Harga</h2>
                    <p className="opacity-70 text-lg">Pilih layanan yang sesuai dengan kebutuhan Anda. Kami menyediakan berbagai paket untuk mendukung kesuksesan event Anda.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl p-8 lg:p-10 flex flex-col border border-opacity-20 ${getAnimClass('card')}`}
                  style={{ borderColor: servicesStyle.color }}
                >
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{service.name}</h3>
                  <p className="mb-8 flex-1 text-base opacity-70 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-8 pt-6 border-t border-opacity-20" style={{ borderColor: servicesStyle.color }}>
                    <div className="text-sm opacity-50 line-through mb-1">Rp {Math.floor(Math.random() * 5 + 2)}.000.000</div>
                    <div className="text-3xl font-semibold tracking-tight">{service.price}</div>
                  </div>

                  <ul className="space-y-4 mb-10 opacity-80">
                    <li className="flex items-start text-sm">
                      <span className="mr-3 opacity-50">—</span>
                      Sertifikat / Konsep Acara
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="mr-3 opacity-50">—</span>
                      Materi Praktik / Manajemen Vendor
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="mr-3 opacity-50">—</span>
                      On-day Execution
                    </li>
                  </ul>

                  <a
                    href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20pesan%20layanan%20${service.name}`}
                    className="block w-full py-4 text-center rounded-full font-semibold transition-all active:scale-[0.98]"
                    style={{
                      backgroundColor: theme.accentColor,
                      color: "#fff", // assuming accent needs white text
                    }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pesan Sekarang
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portofolio */}
        <section id="portofolio" className="py-24 px-6 lg:px-12 border-t border-opacity-10 border-current" style={portfolioStyle}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">Karya Kami</h2>
            <p className="mb-12 opacity-70 text-lg">Momen terbaik yang pernah kami dokumentasikan.</p>

            <div className="flex flex-wrap gap-2 mb-12">
              <button
                onClick={() => setActiveFilter("Semua")}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all active:scale-[0.98] ${
                  activeFilter === "Semua" ? "" : "opacity-70 hover:opacity-100 border border-opacity-20"
                }`}
                style={
                  activeFilter === "Semua"
                    ? getBtnStyle("portfolio", theme.secondaryColor, theme.primaryColor)
                    : { borderColor: portfolioStyle.color }
                }
              >
                Semua
              </button>
              {['Wedding', 'Event', 'Marketing', 'Lainnya'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all active:scale-[0.98] ${
                    activeFilter === cat ? "" : "opacity-70 hover:opacity-100 border border-opacity-20"
                  }`}
                  style={
                    activeFilter === cat
                      ? getBtnStyle("portfolio", theme.secondaryColor, theme.primaryColor)
                      : { borderColor: portfolioStyle.color }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio
                .filter((item) => activeFilter === "Semua" || item.category === activeFilter)
                .map((item, idx) => (
                <div 
                  key={idx} 
                  className={`group overflow-hidden rounded-3xl aspect-[4/3] bg-black relative ${getAnimClass('card')}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                     <div className="text-white font-medium text-lg">{item.title}</div>
                     {item.category && (
                       <div className="text-white/70 text-sm mt-1">{item.category}</div>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimoni Klien: Refined 3D Carousel */}
        <section id="testimoni" className="py-24 px-6 lg:px-12 border-t border-opacity-10 border-current overflow-hidden" style={testimonialsStyle}>
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">Kata Klien</h2>
              <div className="flex justify-center items-center mb-4 text-xl space-x-1" style={textAccent}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>

            <div className="relative h-[450px] md:h-[400px] flex items-center justify-center w-full">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-0 z-30 p-4 opacity-50 hover:opacity-100 transition-all active:scale-[0.9] rounded-full border border-opacity-20"
                style={{ color: testimonialsStyle.color, borderColor: testimonialsStyle.color }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
              </button>

              <div className="relative w-full max-w-5xl h-full flex justify-center items-center" style={{ perspective: "1200px" }}>
                {testimonials.map((testi, idx) => {
                  const total = testimonials.length;
                  let offset = idx - activeTestimonial;
                  if (offset < -Math.floor(total / 2)) offset += total;
                  if (offset > Math.floor(total / 2)) offset -= total;
                  
                  const isActive = offset === 0;
                  const isVisible = Math.abs(offset) <= 1;

                  let xPos = "0%";
                  let rotateY = "0deg";
                  let scale = 1;
                  let zIndex = 20;
                  let opacity = 1;

                  if (offset === -1) {
                    xPos = "-60%";
                    rotateY = "15deg";
                    scale = 0.85;
                    zIndex = 10;
                    opacity = 0.4;
                  } else if (offset === 1) {
                    xPos = "60%";
                    rotateY = "-15deg";
                    scale = 0.85;
                    zIndex = 10;
                    opacity = 0.4;
                  } else if (!isActive) {
                    opacity = 0;
                    zIndex = 0;
                    scale = 0.7;
                    xPos = offset < 0 ? "-100%" : "100%";
                  }

                  return (
                    <div
                      key={idx}
                      className={`absolute top-1/2 left-1/2 w-[90%] md:w-[480px] rounded-3xl p-10 flex flex-col items-center text-center border border-opacity-20 ${!isVisible ? "pointer-events-none" : ""}`}
                      style={{
                        backgroundColor: testimonialsStyle.backgroundColor,
                        color: testimonialsStyle.color,
                        borderColor: testimonialsStyle.color,
                        transform: `translate(-50%, -50%) translateX(${xPos}) rotateY(${rotateY}) scale(${scale})`,
                        opacity: opacity,
                        zIndex: zIndex,
                        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className="mb-4 opacity-80" style={textAccent}>
                         <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                      </div>
                      <p className="text-lg md:text-xl font-medium leading-relaxed opacity-90 mb-8">
                        "{testi.text}"
                      </p>
                      <div className="w-12 h-12 rounded-full mb-3 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testi.name)}&background=random`} alt={testi.name} />
                      </div>
                      <div className="font-semibold tracking-tight">{testi.name}</div>
                      <div className="text-sm mt-1 opacity-50">Client</div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-0 z-30 p-4 opacity-50 hover:opacity-100 transition-all active:scale-[0.9] rounded-full border border-opacity-20"
                style={{ color: testimonialsStyle.color, borderColor: testimonialsStyle.color }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        </section>

        {/* Form Booking: Premium UI */}
        <section id="booking" className="py-24 px-6 lg:px-12 border-t border-opacity-10 border-current" style={bookingStyle}>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">Mari Berbicara.</h2>
               <p className="opacity-70 text-lg leading-relaxed mb-8">
                 Isi formulir ini untuk memulai konsultasi awal bersama tim kami. Kami siap mewujudkan konsep Anda.
               </p>
            </div>
            
            <form
              className="space-y-6"
             
             
            >
              <div>
                <label className="block text-sm font-semibold mb-2 opacity-80 uppercase tracking-widest">
                  Nama
                </label>
                <input
                  type="text"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full pb-3 bg-transparent border-b border-opacity-20 focus:border-opacity-100 outline-none transition-colors text-lg"
                  style={{ borderColor: bookingStyle.color, color: bookingStyle.color }}
                  placeholder="Nama lengkap anda"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 opacity-80 uppercase tracking-widest">
                  Layanan
                </label>
                <select
                  value={bookingForm.service}
                  onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                  className="w-full pb-3 bg-transparent border-b border-opacity-20 focus:border-opacity-100 outline-none transition-colors text-lg appearance-none"
                  style={{ borderColor: bookingStyle.color, color: bookingStyle.color }}
                >
                  <option value="" style={{ color: "#000" }}>Pilih layanan...</option>
                  {services.map((s, i) => (
                    <option key={i} value={s.name} style={{ color: "#000" }}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 opacity-80 uppercase tracking-widest">
                  Pesan / Catatan
                </label>
                <textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="w-full pb-3 bg-transparent border-b border-opacity-20 focus:border-opacity-100 outline-none transition-colors h-24 text-lg resize-none"
                  style={{ borderColor: bookingStyle.color, color: bookingStyle.color }}
                  placeholder="Deskripsikan rencana anda..."
                />
              </div>
              <button
                type="button"
                onClick={handleBookingSubmit}
                className="w-full py-4 rounded-full font-semibold text-lg mt-4 transition-all active:scale-[0.98]"
                style={getBtnStyle("booking", theme.secondaryColor, theme.primaryColor)}
              >
                Kirim Permintaan
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Section: Lokasi / Google Maps Embed */}
      {contact.address && (
        <section
          id="lokasi"
          style={{ backgroundColor: theme.primaryColor, color: theme.secondaryColor }}
          className="py-20 px-6 lg:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-2 font-semibold">Temukan Kami</p>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter">Lokasi Kami</h2>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm leading-relaxed max-w-xs">{contact.address}</span>
              </div>
            </div>

            <div
              className="w-full overflow-hidden rounded-2xl"
              style={{ height: '420px', border: `1px solid ${theme.secondaryColor}22` }}
            >
              {getMapEmbedUrl(contact.address) ? (
                <iframe
                  title="Lokasi Kami"
                  src={getMapEmbedUrl(contact.address)}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-30">
                  <p className="text-lg">Alamat belum tersedia</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer: Clean and minimal */}
      <footer className="border-t border-opacity-20" style={{ ...footerStyle, borderColor: footerStyle.color }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-6 space-y-6">
               <div className="font-bold text-2xl tracking-tight">{business.name}</div>
               <p className="text-base opacity-70 leading-relaxed max-w-sm">
                 {business.description}
               </p>
            </div>

            <div className="md:col-span-6 flex flex-col md:items-end space-y-6">
                <div className="space-y-4 text-base">
                  {contact.whatsapp && (
                    <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center md:justify-end gap-3 opacity-70 hover:opacity-100 transition-opacity">
                      <span>WhatsApp : +{contact.whatsapp}</span>
                    </a>
                  )}
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="flex items-center md:justify-end gap-3 opacity-70 hover:opacity-100 transition-opacity">
                      <span>Email : {contact.email}</span>
                    </a>
                  )}
                  {contact.address && (
                    <div className="flex flex-col md:items-end gap-1 opacity-70">
                      <span className="font-semibold uppercase tracking-widest text-xs opacity-50">Lokasi</span>
                      <span className="leading-relaxed md:text-right max-w-xs">{contact.address}</span>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>

        <div className="border-t border-opacity-10" style={{ borderColor: footerStyle.color }}>
          <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
            <p className="text-sm opacity-50">
              &copy; {new Date().getFullYear()} {business.name}.
            </p>
            <p className="font-bold tracking-tighter opacity-30 select-none text-2xl">
              7arzz
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20ingin%20konsultasi/order%20di%20${encodeURIComponent(business.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center bg-[#25D366] text-white"
        style={{ width: "60px", height: "60px" }}
       
       
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
};

export default Template01;
