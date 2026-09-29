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

// ── Wedding Car Animation (WO mode, drives across hero bottom) ──────────────
const WeddingCarHeader = ({ color = '#ffffff', accentColor }) => {
  const carColor = accentColor || color || '#ffffff';

  return (
    <>
      <style>{`
        @keyframes weddingCarDrive {
          0%   { transform: translateX(-350px); }
          100% { transform: translateX(calc(100vw + 350px)); }
        }
        @keyframes carBounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        @keyframes wheelRotate {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ribbonWave {
          0%   { d: path('M0,12 Q30,0 60,12 Q90,24 120,12'); }
          50%  { d: path('M0,12 Q30,24 60,12 Q90,0 120,12'); }
          100% { d: path('M0,12 Q30,0 60,12 Q90,24 120,12'); }
        }
        @keyframes ribbonFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25%      { transform: translateY(-3px) rotate(2deg); }
          75%      { transform: translateY(3px) rotate(-2deg); }
        }
        @keyframes heartFloat {
          0%   { transform: translate(0, 0) scale(0); opacity: 0; }
          15%  { transform: translate(-5px, -10px) scale(1); opacity: 1; }
          100% { transform: translate(-30px, -60px) scale(0.3); opacity: 0; }
        }
        @keyframes canDangle {
          0%, 100% { transform: rotate(-5deg); }
          50%      { transform: rotate(5deg); }
        }
        @keyframes dustPuff {
          0%   { transform: scale(0.3); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
        .wedding-car-container {
          position: absolute;
          bottom: 8%;
          left: 0;
          width: 100%;
          height: 120px;
          pointer-events: none;
          z-index: 150;
          overflow: visible;
        }
        .wedding-car-group {
          animation: weddingCarDrive 12s linear infinite;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .wedding-car-body {
          animation: carBounce 0.6s ease-in-out infinite;
          position: relative;
        }
      `}</style>

      <div className="wedding-car-container">
        <div className="wedding-car-group">
          <div className="wedding-car-body">
            {/* Floating Hearts */}
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={`heart-${i}`}
                style={{
                  position: 'absolute',
                  top: -10 - i * 6,
                  left: 80 + i * 25,
                  animation: `heartFloat ${1.8 + i * 0.3}s ease-out infinite`,
                  animationDelay: `${i * 0.7}s`,
                  color: carColor,
                  fontSize: 12 + i * 2,
                  filter: `drop-shadow(0 2px 4px ${carColor}66)`,
                }}
              >
                ♥
              </div>
            ))}

            {/* Trailing Ribbons */}
            <svg
              width="140"
              height="24"
              viewBox="0 0 140 24"
              fill="none"
              style={{
                position: 'absolute',
                left: -130,
                top: 30,
                animation: 'ribbonFloat 2s ease-in-out infinite',
                opacity: 0.8,
              }}
            >
              <path
                d="M0,12 Q30,0 60,12 Q90,24 120,12"
                stroke={carColor}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                style={{ animation: 'ribbonWave 2s ease-in-out infinite' }}
              />
              <path
                d="M10,18 Q40,6 70,18 Q100,30 130,18"
                stroke={carColor}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
                style={{ animation: 'ribbonWave 2.5s ease-in-out infinite', animationDelay: '0.3s' }}
              />
            </svg>

            {/* Tin Cans */}
            {[0, 1, 2].map((i) => (
              <div
                key={`can-${i}`}
                style={{
                  position: 'absolute',
                  left: -40 - i * 28,
                  top: 55,
                  animation: `canDangle ${0.4 + i * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 0.12}s`,
                  transformOrigin: 'top center',
                }}
              >
                {/* String */}
                <div style={{
                  width: 1,
                  height: 10 + i * 4,
                  background: `${carColor}88`,
                  margin: '0 auto',
                }} />
                {/* Can */}
                <div style={{
                  width: 10,
                  height: 14,
                  borderRadius: '2px 2px 3px 3px',
                  background: `linear-gradient(135deg, ${carColor}cc, ${carColor}66)`,
                  border: `1px solid ${carColor}44`,
                  margin: '0 auto',
                }} />
              </div>
            ))}

            {/* Dust Puffs behind car */}
            {[0, 1, 2].map((i) => (
              <div
                key={`dust-${i}`}
                style={{
                  position: 'absolute',
                  left: -15 - i * 12,
                  bottom: 2,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: `${carColor}22`,
                  animation: `dustPuff ${0.8 + i * 0.2}s ease-out infinite`,
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            ))}

            {/* ── Wedding Car SVG (Luxury Sedan) ── */}
            <svg
              width="260"
              height="100"
              viewBox="0 0 260 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: `drop-shadow(0 6px 20px rgba(255, 245, 230, 0.4))`,
                marginLeft: '-20px'
              }}
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f0f4f8" />
                </linearGradient>
                <linearGradient id="windowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2d3748" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1a202c" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="goldAccents" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#f3e5ab" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
                <radialGradient id="carGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff5e6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#fff5e6" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Backglow / Soft Warm Glow */}
              <ellipse cx="130" cy="50" rx="120" ry="40" fill="url(#carGlow)" opacity="0.8" />
              
              {/* Ground reflection line */}
              <line x1="10" y1="92" x2="250" y2="92" stroke={carColor} strokeWidth="0.5" opacity="0.3" />

              {/* Car Body - Luxury Sedan Silhouette */}
              <path
                d="M25,75 L20,60 Q18,52 28,48 L65,42 Q75,25 90,25 L165,25 Q180,25 195,42 L225,48 Q235,50 238,60 L235,75 Z"
                fill="url(#bodyGrad)"
              />
              
              {/* Lower Body Gold Trim */}
              <path
                d="M23,73 L233,73 L235,75 L21,75 Z"
                fill="url(#goldAccents)"
                opacity="0.8"
              />

              {/* Side Gold Line */}
              <line x1="30" y1="52" x2="225" y2="52" stroke="url(#goldAccents)" strokeWidth="1" opacity="0.8" />

              {/* Windows (Slightly tinted) */}
              <path
                d="M72,42 Q80,28 92,28 L162,28 Q175,28 188,42 Z"
                fill="url(#windowGrad)"
              />
              {/* Window Divider / B-Pillar */}
              <rect x="130" y="28" width="4" height="14" fill="url(#bodyGrad)" />

              {/* ── Bride & Groom Silhouettes (visible through tinted window) ── */}
              {/* Groom */}
              <circle cx="115" cy="32" r="6" fill={carColor} opacity="0.8" />
              <rect x="111" y="38" width="8" height="4" rx="1" fill={carColor} opacity="0.75" />
              {/* Bride */}
              <circle cx="145" cy="31" r="5.5" fill={carColor} opacity="0.85" />
              <path d="M145,25 Q152,25 155,30 Q153,35 147,38 Q144,36 142,35 Z" fill={carColor} opacity="0.6" />
              <rect x="141" y="37" width="8" height="5" rx="1" fill={carColor} opacity="0.85" />

              {/* Windshield glare */}
              <path d="M78,32 L88,32 L82,42 L72,42 Z" fill="#ffffff" opacity="0.15" />
              <path d="M168,30 L178,30 L188,42 L178,42 Z" fill="#ffffff" opacity="0.15" />

              {/* Bumper front */}
              <rect x="15" y="65" width="12" height="6" rx="2" fill="url(#goldAccents)" />
              {/* Bumper rear */}
              <rect x="231" y="65" width="12" height="6" rx="2" fill="url(#goldAccents)" />
              
              {/* Headlight */}
              <ellipse cx="22" cy="58" rx="3" ry="5" fill="#fff9e6" />
              <ellipse cx="20" cy="58" rx="1.5" ry="3" fill="#ffffff" />
              {/* Taillight */}
              <ellipse cx="236" cy="56" rx="3" ry="4" fill="#ff4d4d" />
              <ellipse cx="237" cy="56" rx="1.5" ry="2" fill="#ff9999" />

              {/* Front Grill (Luxury style) */}
              <path d="M18,65 L22,50 L28,50 L28,65 Z" fill="url(#goldAccents)" opacity="0.8" />
              <line x1="20" y1="52" x2="20" y2="65" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
              <line x1="23" y1="52" x2="23" y2="65" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
              <line x1="26" y1="52" x2="26" y2="65" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />

              {/* ── Floral Decorations ── */}
              {/* Front Flowers */}
              <circle cx="25" cy="48" r="5" fill="#ffffff" />
              <circle cx="21" cy="52" r="4" fill="#f8f9fa" />
              <circle cx="29" cy="51" r="3.5" fill="#e2e8f0" />
              <circle cx="25" cy="48" r="1.5" fill="url(#goldAccents)" />
              {/* Front Leaves */}
              <path d="M25,48 Q20,40 15,45 Z" fill="#a7f3d0" />
              <path d="M25,48 Q35,42 35,48 Z" fill="#6ee7b7" />

              {/* Rear Flowers */}
              <circle cx="225" cy="45" r="4.5" fill="#ffffff" />
              <circle cx="220" cy="48" r="3.5" fill="#f8f9fa" />
              <circle cx="230" cy="47" r="4" fill="#e2e8f0" />
              <circle cx="225" cy="45" r="1.5" fill="url(#goldAccents)" />
              {/* Rear Leaves */}
              <path d="M225,45 Q215,38 215,45 Z" fill="#a7f3d0" />
              <path d="M225,45 Q235,38 238,45 Z" fill="#6ee7b7" />
              
              {/* Roof Ribbon / Flower */}
              <circle cx="125" cy="23" r="3" fill="#ffffff" />
              <circle cx="125" cy="23" r="1" fill="url(#goldAccents)" />
              <path d="M125,23 Q110,25 105,30" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
              <path d="M125,23 Q140,25 145,30" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />

              {/* "JUST MARRIED" Plaque on back */}
              <rect x="226" y="58" width="14" height="5" rx="1" fill="url(#goldAccents)" />
              <text x="233" y="61.5" textAnchor="middle" fontSize="3.5" fill="#1a202c" fontWeight="bold">MARRIED</text>

              {/* Clean Premium Wheels */}
              {/* Front Wheel */}
              <g style={{ transformOrigin: '65px 75px', animation: 'wheelRotate 1s linear infinite' }}>
                <circle cx="65" cy="75" r="14" fill="#1a202c" />
                <circle cx="65" cy="75" r="11" fill="#2d3748" />
                {/* Premium Rims */}
                <circle cx="65" cy="75" r="8" fill="url(#goldAccents)" />
                <circle cx="65" cy="75" r="4" fill="#ffffff" opacity="0.9" />
                <circle cx="65" cy="75" r="1.5" fill="#1a202c" opacity="0.8" />
                {/* Spokes */}
                <line x1="65" y1="67" x2="65" y2="83" stroke="#2d3748" strokeWidth="1.5" />
                <line x1="57" y1="75" x2="73" y2="75" stroke="#2d3748" strokeWidth="1.5" />
                <line x1="59" y1="69" x2="71" y2="81" stroke="#2d3748" strokeWidth="1.5" />
                <line x1="59" y1="81" x2="71" y2="69" stroke="#2d3748" strokeWidth="1.5" />
              </g>

              {/* Rear Wheel */}
              <g style={{ transformOrigin: '195px 75px', animation: 'wheelRotate 1s linear infinite' }}>
                <circle cx="195" cy="75" r="14" fill="#1a202c" />
                <circle cx="195" cy="75" r="11" fill="#2d3748" />
                {/* Premium Rims */}
                <circle cx="195" cy="75" r="8" fill="url(#goldAccents)" />
                <circle cx="195" cy="75" r="4" fill="#ffffff" opacity="0.9" />
                <circle cx="195" cy="75" r="1.5" fill="#1a202c" opacity="0.8" />
                {/* Spokes */}
                <line x1="195" y1="67" x2="195" y2="83" stroke="#2d3748" strokeWidth="1.5" />
                <line x1="187" y1="75" x2="203" y2="75" stroke="#2d3748" strokeWidth="1.5" />
                <line x1="189" y1="69" x2="201" y2="81" stroke="#2d3748" strokeWidth="1.5" />
                <line x1="189" y1="81" x2="201" y2="69" stroke="#2d3748" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>
      </div>
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
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
  const heroBadgeRef = useRef(null);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Premium Text Reveal Animation
    const targets = [heroBadgeRef.current, heroTextRef.current, heroDescRef.current, btnGroupRef.current].filter(Boolean);
    if (targets.length) {
      gsap.fromTo(
        targets,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.18, ease: "power4.out", delay: 0.2 }
      );
    }

    // Magnetic Button Logic
    const magneticBtn = magneticBtnRef.current;
    let handleMouseMove, handleMouseLeave;
    if (magneticBtn) {
      handleMouseMove = (e) => {
        const rect = magneticBtn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.45;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.45;
        gsap.to(magneticBtn, { x, y, duration: 0.35, ease: "power2.out" });
      };
      handleMouseLeave = () => {
        gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.3)" });
      };
      magneticBtn.addEventListener("mousemove", handleMouseMove);
      magneticBtn.addEventListener("mouseleave", handleMouseLeave);
    }

    if (heroImageRef.current && heroSectionRef.current) {
      // Cinematic zoom-out & parallax on scroll for hero image
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.18, y: 0 },
        {
          scale: 1,
          y: "18%",
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }

    // Section reveal animations
    gsap.utils.toArray(".gsap-reveal").forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true }
        }
      );
    });
    
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
      if (type === 'card') return 'card-premium hover:-translate-y-3 transition-all duration-500';
      if (type === 'btn') return 'hover:opacity-85 transition-all duration-300';
      if (type === 'image') return 'img-hover-zoom';
    } else if (mode === 'eo') {
      if (type === 'card') return 'card-premium hover:scale-[1.02] transition-all duration-300';
      if (type === 'btn') return 'hover:scale-105 transition-all duration-200';
      if (type === 'image') return 'img-hover-zoom';
    } else if (mode === 'travel') {
      if (type === 'card') return 'card-premium hover:-translate-y-4 hover:shadow-2xl transition-all duration-300';
      if (type === 'btn') return 'hover:scale-105 hover:shadow-lg transition-all duration-200';
      if (type === 'image') return 'img-hover-zoom';
    }
    return 'card-premium transition-all';
  };

  // 3D tilt on card hover
  const handleCardTilt = (e, idx) => {
    setHoveredCard(idx);
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 12, rotateX: -y * 12, duration: 0.3, ease: 'power2.out',
      transformPerspective: 800, transformOrigin: 'center center',
    });
  };
  const handleCardLeave = (e) => {
    setHoveredCard(null);
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <div
      className="w-full transition-colors duration-300"
      style={{ ...aboutStyle, fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* ── Scroll Progress Bar ── */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, height: '2px', zIndex: 99999,
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, ${theme.accentColor || '#d4af37'}, ${theme.accentColor || '#d4af37'}88)`,
          transition: 'width 0.1s linear',
          boxShadow: `0 0 8px ${theme.accentColor || '#d4af37'}88`,
          pointerEvents: 'none',
        }}
      />

      {/* ── 7arzz Intro Popup ── */}
      {showIntro && (
        <div
          onClick={dismissIntro}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(16px)",
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
              background: "linear-gradient(145deg, #0d0d0d 0%, #120f07 100%)",
              border: `1px solid ${theme.accentColor || '#d4af37'}28`,
              borderRadius: "32px",
              padding: "56px 64px",
              textAlign: "center",
              maxWidth: "500px",
              width: "90%",
              animation: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: `0 60px 120px rgba(0,0,0,0.7), 0 0 60px ${theme.accentColor || '#d4af37'}10, inset 0 1px 0 rgba(255,255,255,0.04)`,
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Glow orb */}
            <div style={{
              position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
              width: '240px', height: '240px', borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.accentColor || '#d4af37'}18 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* Big logo */}
            <div
              style={{
                fontSize: "clamp(4rem, 14vw, 7rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontFamily: "'Playfair Display', Georgia, serif",
                background: `linear-gradient(135deg, #fff 0%, ${theme.accentColor || '#d4af37'} 50%, rgba(255,255,255,0.5) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "16px",
                userSelect: "none",
                backgroundSize: '200% 200%',
                animation: 'gradientFlow 4s ease infinite',
              }}
            >
              7arzz
            </div>

            <p style={{
              color: `${theme.accentColor || '#d4af37'}bb`,
              fontSize: "11px", fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '8px',
            }}>✦ Premium Web Experience</p>

            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "14px", fontWeight: 300,
                marginBottom: "40px", lineHeight: 1.75,
              }}
            >
              Website ini dibuat oleh <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>7arzz</strong> — studio desain web premium Indonesia
            </p>

            <button
              onClick={dismissIntro}
              style={{
                background: `linear-gradient(135deg, ${theme.accentColor || '#d4af37'}, ${theme.accentColor || '#d4af37'}bb)`,
                color: "#0a0a0a",
                border: "none",
                borderRadius: "999px",
                padding: "16px 40px",
                fontWeight: 700, fontSize: "15px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                width: "100%",
                letterSpacing: '0.03em',
                boxShadow: `0 8px 32px ${theme.accentColor || '#d4af37'}44`,
              }}
              onMouseEnter={(e) => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = `0 12px 40px ${theme.accentColor || '#d4af37'}66`; }}
              onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = `0 8px 32px ${theme.accentColor || '#d4af37'}44`; }}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1.02)")}
            >
              Masuk ke Website →
            </button>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes slideUp { from { opacity: 0; transform: translateY(32px) scale(0.95) } to { opacity: 1; transform: translateY(0) scale(1) } }
            @keyframes gradientFlow { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
          `}</style>
        </div>
      )}

      {/* GSAP Scroll Decorations (Kelopak/Confetti) */}
      <ScrollDecorations mode={theme.animationMode || 'wo'} color={theme.accentColor} />

      {/* (Travel plane moved inside hero section) */}

      <nav
        className="px-6 py-4 fixed top-0 w-full z-50 border-b border-white/5 transition-all duration-300"
        style={{
          ...navbarStyle,
          background: `rgba(${parseInt(navbarStyle.backgroundColor.slice(1, 3), 16)}, ${parseInt(navbarStyle.backgroundColor.slice(3, 5), 16)}, ${parseInt(navbarStyle.backgroundColor.slice(5, 7), 16)}, 0.6)`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-50">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {business.logoURL ? (
              <img
                src={business.logoURL}
                alt="Logo"
                className={`h-10 ${business.logoShape === 'rectangle' ? 'object-contain' : 'w-10 object-cover rounded-full'} group-hover:scale-105 transition-transform duration-300`}
              />
            ) : (
              <div className={`h-10 flex items-center justify-center font-bold text-xl ${business.logoShape === 'rectangle' ? 'px-3 rounded' : 'w-10 rounded-full'}`}
                   style={{ background: `linear-gradient(135deg, ${theme.accentColor || '#d4af37'}, ${theme.accentColor || '#d4af37'}88)`, color: '#fff' }}>
                {business.name.charAt(0)}
              </div>
            )}
            <div className="font-bold text-xl tracking-tight font-serif relative overflow-hidden">
              <span className="block group-hover:-translate-y-full transition-transform duration-300">{business.name}</span>
              <span className="block absolute top-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ color: theme.accentColor || '#d4af37' }}>{business.name}</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 text-[13px] uppercase tracking-[0.15em] font-semibold items-center">
            {['Tentang Kami', 'Layanan', 'Portofolio'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative py-2 opacity-60 hover:opacity-100 transition-opacity group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ backgroundColor: theme.accentColor || '#d4af37' }}></span>
              </a>
            ))}
            <a
              href="#booking"
              className="px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ ...getBtnStyle("navbar", theme.primaryColor, theme.secondaryColor), letterSpacing: '0.1em' }}
            >
              Booking
            </a>
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            className="md:hidden p-2 focus:outline-none opacity-60 hover:opacity-100 relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-4 relative flex flex-col justify-between">
              <span className={`w-full h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`w-full h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 w-full shadow-2xl border-t border-opacity-10 z-40 px-6 py-8"
            style={{ ...navbarStyle, background: `rgba(${parseInt(navbarStyle.backgroundColor.slice(1, 3), 16)}, ${parseInt(navbarStyle.backgroundColor.slice(3, 5), 16)}, ${parseInt(navbarStyle.backgroundColor.slice(5, 7), 16)}, 0.95)`, backdropFilter: "blur(24px)" }}
          >
            <div className="flex flex-col space-y-6 text-xl font-serif">
              <a href="#tentang-kami" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 hover:translate-x-2 transition-all">Tentang Kami</a>
              <a href="#layanan" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 hover:translate-x-2 transition-all">Layanan</a>
              <a href="#portofolio" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 hover:translate-x-2 transition-all">Portofolio</a>
              <a
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-6 py-4 rounded-xl font-semibold text-center transition-transform active:scale-[0.98]"
                style={getBtnStyle("navbar", theme.primaryColor, theme.secondaryColor)}
              >
                Booking
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section: Premium Editorial Layout with strong typography and dynamic reveal */}
        <section
          id="beranda"
          ref={heroSectionRef}
          className="pt-32 pb-24 px-6 lg:px-12 flex items-center min-h-[100vh] overflow-hidden relative"
          style={heroStyle}
        >
          {/* ── Travel mode plane flies diagonally across hero ── */}
          {(theme.animationMode || 'wo') === 'travel' && (
            <TravelPlaneHeader color={theme.accentColor || '#ffffff'} accentColor={theme.accentColor} />
          )}

          {/* ── WO mode wedding car drives across hero bottom ── */}
          {(theme.animationMode || 'wo') === 'wo' && (
            <WeddingCarHeader color={theme.accentColor || '#ffffff'} accentColor={theme.accentColor} />
          )}

          {/* Subtle Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: heroStyle.color || "white",
                  width: Math.random() * 3 + 1 + "px",
                  height: Math.random() * 3 + 1 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.4 + 0.1,
                  animation: `floatUp ${Math.random() * 5 + 8}s linear infinite`,
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


            /* ── Spotlight Animation for EO mode ── */
            @keyframes spotSweepL {
              0%   { transform: rotate(15deg); }
              50%  { transform: rotate(-20deg); }
              100% { transform: rotate(15deg); }
            }
            @keyframes spotSweepR {
              0%   { transform: rotate(-15deg); }
              50%  { transform: rotate(20deg); }
              100% { transform: rotate(-15deg); }
            }
            @keyframes spotFlicker {
              0%, 100% { opacity: 0.85; }
              25%      { opacity: 0.95; }
              50%      { opacity: 0.75; }
              75%      { opacity: 0.9; }
            }

            @keyframes floorGlowSweepL {
              0%   { transform: translateX(0%); }
              50%  { transform: translateX(50%); }
              100% { transform: translateX(0%); }
            }
            @keyframes floorGlowSweepR {
              0%   { transform: translateX(0%); }
              50%  { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
          `}</style>

          {/* ── EO Spotlight Beams (realistic stage lights) ── */}
          {(theme.animationMode || 'wo') === 'eo' && (
            <>
              {/* ===== LEFT SPOTLIGHT ===== */}
              {/* Cone beam - main */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '-5%',
                width: '70%',
                height: '120%',
                transformOrigin: '8% 100%',
                animation: 'spotSweepL 7s ease-in-out infinite',
                pointerEvents: 'none',
                zIndex: 5,
              }}>
                {/* Primary bright cone */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(5% 100%, 0% 100%, 35% 0%, 50% 0%)',
                  background: 'linear-gradient(to top, rgba(255,220,120,0.5) 0%, rgba(255,240,180,0.25) 40%, rgba(255,255,220,0.05) 100%)',
                  filter: 'blur(8px)',
                  animation: 'spotFlicker 4s ease-in-out infinite',
                }} />
                {/* Inner hot core */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(7% 100%, 3% 100%, 38% 0%, 47% 0%)',
                  background: 'linear-gradient(to top, rgba(255,240,200,0.7) 0%, rgba(255,255,240,0.3) 30%, rgba(255,255,255,0.02) 70%)',
                  filter: 'blur(4px)',
                }} />
                {/* Volumetric haze */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(8% 100%, -2% 100%, 30% 0%, 55% 0%)',
                  background: 'linear-gradient(to top, rgba(255,200,80,0.2) 0%, rgba(255,220,130,0.08) 50%, transparent 100%)',
                  filter: 'blur(20px)',
                }} />
              </div>

              {/* Floor glow pool - left */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '5%',
                width: '40%',
                height: '80px',
                background: 'radial-gradient(ellipse at center, rgba(255,220,100,0.4) 0%, rgba(255,200,60,0.15) 40%, transparent 70%)',
                filter: 'blur(15px)',
                pointerEvents: 'none',
                zIndex: 4,
                animation: 'floorGlowSweepL 7s ease-in-out infinite',
              }} />



              {/* ===== RIGHT SPOTLIGHT ===== */}
              {/* Cone beam - main */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: '-5%',
                width: '70%',
                height: '120%',
                transformOrigin: '92% 100%',
                animation: 'spotSweepR 7s ease-in-out infinite',
                animationDelay: '0.5s',
                pointerEvents: 'none',
                zIndex: 5,
              }}>
                {/* Primary bright cone */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(95% 100%, 100% 100%, 65% 0%, 50% 0%)',
                  background: 'linear-gradient(to top, rgba(255,220,120,0.5) 0%, rgba(255,240,180,0.25) 40%, rgba(255,255,220,0.05) 100%)',
                  filter: 'blur(8px)',
                  animation: 'spotFlicker 4s ease-in-out infinite',
                  animationDelay: '1s',
                }} />
                {/* Inner hot core */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(93% 100%, 97% 100%, 62% 0%, 53% 0%)',
                  background: 'linear-gradient(to top, rgba(255,240,200,0.7) 0%, rgba(255,255,240,0.3) 30%, rgba(255,255,255,0.02) 70%)',
                  filter: 'blur(4px)',
                }} />
                {/* Volumetric haze */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(92% 100%, 102% 100%, 70% 0%, 45% 0%)',
                  background: 'linear-gradient(to top, rgba(255,200,80,0.2) 0%, rgba(255,220,130,0.08) 50%, transparent 100%)',
                  filter: 'blur(20px)',
                }} />
              </div>

              {/* Floor glow pool - right */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: '5%',
                width: '40%',
                height: '80px',
                background: 'radial-gradient(ellipse at center, rgba(255,220,100,0.4) 0%, rgba(255,200,60,0.15) 40%, transparent 70%)',
                filter: 'blur(15px)',
                pointerEvents: 'none',
                zIndex: 4,
                animation: 'floorGlowSweepR 7s ease-in-out infinite',
                animationDelay: '0.5s',
              }} />



              {/* ===== AMBIENT PARTICLES IN BEAMS ===== */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`dust-${i}`}
                  style={{
                    position: 'absolute',
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: 'rgba(255,230,150,0.8)',
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 70}%`,
                    animation: `floatUp ${3 + Math.random() * 4}s linear infinite`,
                    animationDelay: `-${Math.random() * 5}s`,
                    filter: 'blur(1px)',
                    pointerEvents: 'none',
                    zIndex: 6,
                  }}
                />
              ))}
            </>
          )}

          {/* travel plane is now rendered as a fixed overlay at top level */}

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10 mt-10">
            <div className="lg:col-span-7 space-y-10">
              <h1 
                className="text-5xl sm:text-6xl lg:text-[5.5rem] font-medium tracking-[-0.04em] leading-[1.05] max-w-3xl font-serif"
                ref={heroTextRef}
              >
                {business.tagline || "Wujudkan Pernikahan"}
                <br />
                <span className="italic font-normal relative inline-block mt-2" style={textAccent}>
                  {business.taglineHighlight || "terbaik anda"}
                  <svg className="absolute w-full h-[0.3em] left-0 -bottom-2 opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span> {business.taglineEnd || "dengan kami."}
              </h1>
              
              <p 
                className="max-w-xl opacity-75 text-lg md:text-xl leading-[1.8] font-light"
                ref={heroDescRef}
              >
                {business.description || "Kami membantu merancang dan mengeksekusi momen paling berharga dalam hidup Anda dengan presisi dan keindahan."}
              </p>
              
              <div 
                className="flex flex-wrap items-center gap-6 pt-6"
                ref={btnGroupRef}
              >
                <div ref={magneticBtnRef} className="inline-block relative group">
                  <div className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300 opacity-50 group-hover:opacity-100" 
                       style={{ background: theme.accentColor || '#d4af37' }} />
                  <a
                    href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(business.name)}`}
                    className="relative px-10 py-5 rounded-full font-semibold transition-transform duration-300 active:scale-[0.97] whitespace-nowrap block"
                    style={{ ...getBtnStyle("hero", theme.primaryColor, theme.secondaryColor), letterSpacing: '0.05em' }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Konsultasi Gratis
                  </a>
                </div>
                <a
                  href="#layanan"
                  className="px-8 py-5 rounded-full font-semibold transition-all duration-300 active:scale-[0.97] whitespace-nowrap opacity-70 hover:opacity-100 hover:bg-white/5"
                  style={{
                    backgroundColor: "transparent",
                    color: heroStyle.color,
                    border: `1px solid ${heroStyle.color}44`,
                    letterSpacing: '0.05em'
                  }}
                >
                  Lihat Layanan
                </a>
              </div>
            </div>
            
            {/* Right side premium visual placeholder/asset */}
            <div className="lg:col-span-5 relative w-full aspect-[4/5] lg:h-[700px] rounded-[2.5rem] overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-500 group-hover:bg-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <img 
                ref={heroImageRef}
                src={business.heroImageURL || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"} 
                alt={business.heroImageAlt || "Wedding"} 
                className="w-full h-full object-cover origin-center transition-transform duration-[2s] group-hover:scale-105" 
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

        {/* Layanan & Harga: Premium Bento Grid layout */}
        <section id="layanan" className="py-32 px-6 lg:px-12 relative overflow-hidden" style={servicesStyle}>
          {/* Subtle Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
             <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full blur-[120px]" style={{ background: theme.accentColor || '#d4af37' }} />
             <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] rounded-full blur-[120px]" style={{ background: theme.accentColor || '#d4af37' }} />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center text-center mb-20">
                <span className="text-sm font-semibold tracking-[0.2em] uppercase mb-4 opacity-80" style={{ color: theme.accentColor || '#d4af37' }}>Investment</span>
                <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-6 font-serif">Layanan & Harga</h2>
                <p className="max-w-2xl opacity-75 text-lg leading-relaxed font-light">Pilih layanan yang sesuai dengan visi Anda. Kami menyediakan berbagai paket kurasi untuk mendukung kesuksesan momen spesial Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  onMouseMove={(e) => handleCardTilt(e, `service-${idx}`)}
                  onMouseLeave={handleCardLeave}
                  className={`group relative rounded-[2rem] p-1 lg:p-1 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:-translate-y-4 shadow-xl hover:shadow-2xl gsap-reveal`}
                  style={{
                    background: `linear-gradient(145deg, ${servicesStyle.backgroundColor} 0%, rgba(0,0,0,0.1) 100%)`,
                    border: `1px solid ${servicesStyle.color}15`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Highlight border effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                       style={{ background: `radial-gradient(800px circle at 50% 50%, ${theme.accentColor || '#d4af37'}15, transparent 40%)` }} />
                  
                  <div className="h-full bg-opacity-90 rounded-[1.9rem] p-8 lg:p-10 flex flex-col relative z-10"
                       style={{ backgroundColor: servicesStyle.backgroundColor, transform: 'translateZ(30px)' }}>
                    
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold tracking-tight font-serif" style={{ transform: 'translateZ(20px)' }}>{service.name}</h3>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0"
                           style={{ background: `${theme.accentColor || '#d4af37'}22`, color: theme.accentColor || '#d4af37' }}>
                        →
                      </div>
                    </div>
                    
                    <p className="mb-10 flex-1 text-[15px] opacity-75 leading-[1.8] font-light" style={{ transform: 'translateZ(10px)' }}>
                      {service.description}
                    </p>

                    <div className="mb-8 pt-8 border-t border-opacity-10 transition-colors duration-300" style={{ borderColor: servicesStyle.color }}>
                      <div className="text-sm opacity-50 line-through mb-1 font-mono">Rp {Math.floor(Math.random() * 5 + 2)}.000.000</div>
                      <div className="text-4xl font-semibold tracking-tighter" style={{ color: theme.accentColor || '#d4af37', transform: 'translateZ(15px)' }}>{service.price}</div>
                    </div>

                    <ul className="space-y-4 mb-10 opacity-80" style={{ transform: 'translateZ(10px)' }}>
                      <li className="flex items-start text-[14px]">
                        <span className="mr-3 font-bold" style={{ color: theme.accentColor || '#d4af37' }}>✦</span>
                        Sertifikat / Konsep Acara
                      </li>
                      <li className="flex items-start text-[14px]">
                        <span className="mr-3 font-bold" style={{ color: theme.accentColor || '#d4af37' }}>✦</span>
                        Materi Praktik / Manajemen Vendor
                      </li>
                      <li className="flex items-start text-[14px]">
                        <span className="mr-3 font-bold" style={{ color: theme.accentColor || '#d4af37' }}>✦</span>
                        On-day Execution VIP
                      </li>
                    </ul>

                    <a
                      href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20pesan%20layanan%20${service.name}`}
                      className="block w-full py-5 text-center rounded-2xl font-semibold transition-all duration-300 group-hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: `linear-gradient(135deg, ${theme.accentColor || '#d4af37'}, ${theme.accentColor || '#d4af37'}dd)`,
                        color: "#000",
                        transform: 'translateZ(20px)'
                      }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Pilih Paket
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portofolio: Premium Masonry-like Grid */}
        <section id="portofolio" className="py-32 px-6 lg:px-12 relative" style={portfolioStyle}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="text-sm font-semibold tracking-[0.2em] uppercase mb-4 opacity-80" style={{ color: theme.accentColor || '#d4af37' }}>Gallery</span>
                <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-4 font-serif">Karya Kami</h2>
                <p className="opacity-75 text-lg font-light leading-relaxed">Koleksi momen terbaik yang diabadikan dengan presisi dan keindahan. Setiap frame bercerita tentang visi yang terwujud.</p>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-2">
                <button
                  onClick={() => setActiveFilter("Semua")}
                  className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 active:scale-[0.98] ${
                    activeFilter === "Semua" ? "shadow-lg scale-105" : "opacity-60 hover:opacity-100 hover:scale-105 border border-opacity-20"
                  }`}
                  style={
                    activeFilter === "Semua"
                      ? { ...getBtnStyle("portfolio", theme.secondaryColor, theme.primaryColor), background: `linear-gradient(135deg, ${theme.accentColor || '#d4af37'}, ${theme.accentColor || '#d4af37'}cc)` }
                      : { borderColor: portfolioStyle.color }
                  }
                >
                  Semua
                </button>
                {['Wedding', 'Event', 'Marketing', 'Lainnya'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 active:scale-[0.98] ${
                      activeFilter === cat ? "shadow-lg scale-105" : "opacity-60 hover:opacity-100 hover:scale-105 border border-opacity-20"
                    }`}
                    style={
                      activeFilter === cat
                        ? { ...getBtnStyle("portfolio", theme.secondaryColor, theme.primaryColor), background: `linear-gradient(135deg, ${theme.accentColor || '#d4af37'}, ${theme.accentColor || '#d4af37'}cc)` }
                        : { borderColor: portfolioStyle.color }
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 masonry-grid">
              {portfolio
                .filter((item) => activeFilter === "Semua" || item.category === activeFilter)
                .map((item, idx) => (
                <div 
                  key={idx} 
                  className={`group overflow-hidden rounded-[2rem] bg-black relative cursor-pointer shadow-2xl ${idx % 3 === 0 ? 'md:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'} ${getAnimClass('card')}`}
                >
                  <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-700 group-hover:bg-transparent" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10 z-20">
                     <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                       {item.category && (
                         <div className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: theme.accentColor || '#d4af37' }}>{item.category}</div>
                       )}
                       <div className="text-white font-medium text-3xl font-serif">{item.title}</div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimoni Klien: Refined Premium 3D Carousel */}
        <section id="testimoni" className="py-32 px-6 lg:px-12 border-t border-opacity-10 border-current overflow-hidden relative" style={testimonialsStyle}>
          {/* Subtle noise/texture overlay for editorial feel */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png")' }} />
          
          <div className="max-w-7xl mx-auto relative z-10">
             <div className="text-center mb-24">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase mb-4 opacity-80" style={{ color: theme.accentColor || '#d4af37' }}>Stories</span>
              <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-6 font-serif">Kata Klien</h2>
              <div className="flex justify-center items-center mb-4 text-2xl space-x-2" style={{ color: theme.accentColor || '#d4af37' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>

            <div className="relative h-[550px] md:h-[450px] flex items-center justify-center w-full">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-0 z-30 p-5 opacity-40 hover:opacity-100 transition-all active:scale-[0.9] rounded-full border border-opacity-20 hover:bg-white/5"
                style={{ color: testimonialsStyle.color, borderColor: testimonialsStyle.color }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
              </button>

              <div className="relative w-full max-w-5xl h-full flex justify-center items-center" style={{ perspective: "1500px" }}>
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
                    rotateY = "20deg";
                    scale = 0.8;
                    zIndex = 10;
                    opacity = 0.3;
                  } else if (offset === 1) {
                    xPos = "60%";
                    rotateY = "-20deg";
                    scale = 0.8;
                    zIndex = 10;
                    opacity = 0.3;
                  } else if (!isActive) {
                    opacity = 0;
                    zIndex = 0;
                    scale = 0.6;
                    xPos = offset < 0 ? "-120%" : "120%";
                  }

                  return (
                    <div
                      key={idx}
                      className={`absolute top-1/2 left-1/2 w-[90%] md:w-[500px] rounded-[2rem] p-12 flex flex-col items-center text-center backdrop-blur-md ${!isVisible ? "pointer-events-none" : ""}`}
                      style={{
                        background: `linear-gradient(145deg, ${testimonialsStyle.backgroundColor} 0%, rgba(0,0,0,0.05) 100%)`,
                        color: testimonialsStyle.color,
                        border: `1px solid ${testimonialsStyle.color}15`,
                        boxShadow: isActive ? `0 30px 60px rgba(0,0,0,0.15), 0 0 40px ${theme.accentColor || '#d4af37'}15` : 'none',
                        transform: `translate(-50%, -50%) translateX(${xPos}) rotateY(${rotateY}) scale(${scale})`,
                        opacity: opacity,
                        zIndex: zIndex,
                        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className="mb-6 opacity-80" style={{ color: theme.accentColor || '#d4af37', transform: 'translateZ(30px)' }}>
                         <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                      </div>
                      <p className="text-xl md:text-2xl font-serif italic leading-[1.8] opacity-90 mb-10" style={{ transform: 'translateZ(40px)' }}>
                        "{testi.text}"
                      </p>
                      <div className="w-16 h-16 rounded-full mb-4 overflow-hidden border-2" style={{ borderColor: theme.accentColor || '#d4af37', transform: 'translateZ(20px)' }}>
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testi.name)}&background=random`} alt={testi.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-semibold tracking-wider uppercase text-sm" style={{ transform: 'translateZ(20px)' }}>{testi.name}</div>
                      <div className="text-xs mt-2 opacity-50 uppercase tracking-[0.2em]" style={{ transform: 'translateZ(20px)' }}>VIP Client</div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-0 z-30 p-5 opacity-40 hover:opacity-100 transition-all active:scale-[0.9] rounded-full border border-opacity-20 hover:bg-white/5"
                style={{ color: testimonialsStyle.color, borderColor: testimonialsStyle.color }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        </section>

        {/* Form Booking: Premium UI */}
        <section id="booking" className="py-32 px-6 lg:px-12 relative" style={bookingStyle}>
          <div className="absolute inset-0 bg-black/5 z-0" />
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-8">
               <span className="text-sm font-semibold tracking-[0.2em] uppercase opacity-80" style={{ color: theme.accentColor || '#d4af37' }}>Consultation</span>
               <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter font-serif leading-[1.1]">Mari <br/><span className="italic font-light">Berbicara.</span></h2>
               <p className="opacity-70 text-lg leading-[1.8] max-w-md font-light">
                 Setiap visi yang besar dimulai dari sebuah percakapan. Isi formulir ini untuk memulai konsultasi awal bersama tim ahli kami.
               </p>
               
               {/* Contact cards info */}
               <div className="grid grid-cols-2 gap-6 pt-8 border-t border-opacity-10" style={{ borderColor: bookingStyle.color }}>
                 <div>
                   <div className="text-xs uppercase tracking-[0.1em] opacity-50 mb-2">Direct Line</div>
                   <div className="font-semibold text-lg">{contact.whatsapp ? `+${contact.whatsapp}` : '-'}</div>
                 </div>
                 <div>
                   <div className="text-xs uppercase tracking-[0.1em] opacity-50 mb-2">Email</div>
                   <div className="font-semibold text-lg">{contact.email || '-'}</div>
                 </div>
               </div>
            </div>
            
            <form
              className="space-y-8 p-10 md:p-14 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative"
              style={{
                background: `linear-gradient(145deg, ${bookingStyle.backgroundColor} 0%, rgba(0,0,0,0.02) 100%)`,
                border: `1px solid ${bookingStyle.color}15`,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" style={{ color: theme.accentColor || '#d4af37' }} />
              
              <div className="relative group">
                <input
                  type="text"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full pb-4 bg-transparent border-b border-opacity-20 focus:border-opacity-100 outline-none transition-colors text-xl font-light placeholder-transparent peer"
                  style={{ borderColor: bookingStyle.color, color: bookingStyle.color }}
                  placeholder="Nama"
                  id="b-name"
                />
                <label htmlFor="b-name" className="absolute left-0 -top-4 text-xs font-bold uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-xs" style={{ color: theme.accentColor || '#d4af37' }}>
                  Nama Lengkap
                </label>
              </div>
              
              <div className="relative group pt-4">
                <label className="block text-xs font-bold mb-4 uppercase tracking-[0.2em]" style={{ color: theme.accentColor || '#d4af37' }}>
                  Layanan yang Diminati
                </label>
                <div className="relative">
                  <select
                    value={bookingForm.service}
                    onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                    className="w-full pb-4 bg-transparent border-b border-opacity-20 focus:border-opacity-100 outline-none transition-colors text-xl font-light appearance-none cursor-pointer"
                    style={{ borderColor: bookingStyle.color, color: bookingStyle.color }}
                  >
                    <option value="" style={{ color: "#000" }}>Pilih Layanan</option>
                    {services.map((s, i) => (
                      <option key={i} value={s.name} style={{ color: "#000" }}>{s.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">↓</div>
                </div>
              </div>
              
              <div className="relative group pt-4">
                <textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="w-full pb-4 bg-transparent border-b border-opacity-20 focus:border-opacity-100 outline-none transition-colors h-28 text-xl font-light resize-none placeholder-transparent peer"
                  style={{ borderColor: bookingStyle.color, color: bookingStyle.color }}
                  placeholder="Catatan"
                  id="b-notes"
                />
                <label htmlFor="b-notes" className="absolute left-0 -top-4 text-xs font-bold uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-xs" style={{ color: theme.accentColor || '#d4af37' }}>
                  Ceritakan Visi Anda
                </label>
              </div>
              
              <button
                type="button"
                onClick={handleBookingSubmit}
                className="w-full py-5 rounded-full font-bold tracking-[0.1em] text-sm uppercase mt-8 transition-all duration-300 hover:shadow-lg active:scale-[0.98] hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${theme.accentColor || '#d4af37'}, ${theme.accentColor || '#d4af37'}dd)`,
                  color: "#000"
                }}
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
          className="py-32 px-6 lg:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <p className="text-sm font-bold tracking-[0.2em] uppercase opacity-70 mb-4" style={{ color: theme.accentColor || '#d4af37' }}>Headquarters</p>
                <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter font-serif">Lokasi Kami</h2>
              </div>
              <div className="flex items-start gap-4 max-w-sm">
                <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.accentColor || '#d4af37' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg leading-[1.8] font-light opacity-80">{contact.address}</span>
              </div>
            </div>

            <div
              className="w-full overflow-hidden rounded-[2.5rem] shadow-2xl relative group"
              style={{ height: '500px', border: `1px solid ${theme.secondaryColor}15` }}
            >
              <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] z-10" />
              {getMapEmbedUrl(contact.address) ? (
                <iframe
                  title="Lokasi Kami"
                  src={getMapEmbedUrl(contact.address)}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(30%) contrast(1.1) brightness(0.9)', transition: 'filter 0.5s' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="group-hover:filter-none"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/5 backdrop-blur-md">
                  <p className="text-xl font-light opacity-50 tracking-widest uppercase">Location Unavailable</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer: Premium minimal */}
      <footer className="relative overflow-hidden" style={{ ...footerStyle }}>
        <div className="absolute inset-0 bg-black/5" />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-7 space-y-8">
               <div className="font-bold text-4xl tracking-tighter font-serif">{business.name}</div>
               <p className="text-lg opacity-70 leading-[1.8] max-w-md font-light">
                 {business.description || 'Menghadirkan mahakarya visual dan pengalaman tak terlupakan untuk setiap momen spesial Anda.'}
               </p>
               <div className="flex gap-4 pt-4">
                  {/* Social icons placeholders */}
                  {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
                    <a key={social} href="#" className="w-12 h-12 rounded-full border border-opacity-20 flex items-center justify-center transition-all hover:bg-white/10 hover:-translate-y-1" style={{ borderColor: footerStyle.color }}>
                      <span className="text-xs uppercase tracking-wider">{social.charAt(0)}</span>
                    </a>
                  ))}
               </div>
            </div>

            <div className="md:col-span-5 flex flex-col md:items-end space-y-10">
                <div className="space-y-6 text-right">
                  {contact.whatsapp && (
                    <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="block group">
                      <div className="text-xs uppercase tracking-[0.2em] font-bold opacity-50 mb-1" style={{ color: theme.accentColor || '#d4af37' }}>WhatsApp</div>
                      <div className="text-xl font-light group-hover:opacity-100 opacity-80 transition-opacity">+{contact.whatsapp}</div>
                    </a>
                  )}
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="block group">
                      <div className="text-xs uppercase tracking-[0.2em] font-bold opacity-50 mb-1" style={{ color: theme.accentColor || '#d4af37' }}>Email</div>
                      <div className="text-xl font-light group-hover:opacity-100 opacity-80 transition-opacity">{contact.email}</div>
                    </a>
                  )}
                  {contact.address && (
                    <div className="block">
                      <div className="text-xs uppercase tracking-[0.2em] font-bold opacity-50 mb-1" style={{ color: theme.accentColor || '#d4af37' }}>Location</div>
                      <div className="text-lg font-light opacity-80 max-w-[250px] leading-relaxed">{contact.address}</div>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>

        <div className="border-t border-opacity-10 relative z-10" style={{ borderColor: footerStyle.color }}>
          <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm opacity-50 font-light tracking-wide">
              &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
            </p>
            <p className="font-black tracking-tighter opacity-20 select-none text-4xl font-serif">
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
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white"
        style={{ width: "64px", height: "64px" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
};

export default Template01;
