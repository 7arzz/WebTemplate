import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#home', label: 'Beranda' },
  { href: '#about', label: 'Tentang Kami' },
  { href: '#services', label: 'Layanan & Harga' },
  { href: '#portfolio', label: 'Portofolio' },
  { href: '#testimonials', label: 'Testimoni' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled ? 'bg-black text-white shadow-lg' : 'bg-transparent text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="flex items-center space-x-3 no-underline text-white">
              <span className="font-bold text-base sm:text-xl md:text-2xl tracking-tight">Sultan's Management</span>
            </a>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="text-sm font-medium transition-colors hover:text-gray-300 text-white no-underline">
                {link.label}
              </a>
            ))}
            <a href="#booking" className="btn btn-primary h-9 px-4 text-sm no-underline">
              Booking
            </a>
          </nav>

          {/* Mobile burger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none p-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 5h16"></path>
                <path d="M4 12h16"></path>
                <path d="M4 19h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-white hover:text-gray-300 no-underline">
                {link.label}
              </a>
            ))}
            <a href="#booking" onClick={() => setMenuOpen(false)}
              className="block mt-4 px-3 py-2 text-base font-medium text-black bg-white rounded-md no-underline text-center">
              Booking
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
