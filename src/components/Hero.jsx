export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            <span className="block text-white mb-2">Elevate Your Career</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-light to-gold-dark">
              to Royal Heights
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Kami mewujudkan impian karir Anda di industri hiburan dengan manajemen eksklusif kelas atas. Bergabunglah dengan talenta-talenta terbaik di Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="btn btn-primary h-14 px-10 text-lg">
              Mulai Karir Anda
            </a>
            <a href="#services" className="btn btn-outline h-14 px-10 text-lg">
              Lihat Layanan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
