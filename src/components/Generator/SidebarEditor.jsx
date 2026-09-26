import React, { useState, useEffect } from 'react';
import { generateWebsiteContent, upgradeThemeColor } from '../../utils/aiService';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const EditorForm = ({ data, setData, activeTab }) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiSuccess, setAiSuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // AI Color Upgrade states
  const [colorUpgradeLoading, setColorUpgradeLoading] = useState(false);
  const [colorUpgradeError, setColorUpgradeError] = useState('');
  const [colorUpgradeResult, setColorUpgradeResult] = useState(null);
  const [upgradingCustomerId, setUpgradingCustomerId] = useState(null);

  useEffect(() => {
    if (activeTab === 'import' && customers.length === 0) {
      fetchCustomers();
    }
  }, [activeTab]);

  const fetchCustomers = async () => {
    try {
      setLoadingCustomers(true);
      const q = query(collection(db, "customers"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomers(docs);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleImportCustomer = (customer) => {
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (customer.businessName) newData.business.name = customer.businessName;
      if (customer.slogan) newData.business.description = customer.slogan;
      if (customer.aboutUs) newData.business.about = customer.aboutUs;
      if (customer.primaryColor) newData.theme.primaryColor = customer.primaryColor;
      if (customer.secondaryColor) newData.theme.secondaryColor = customer.secondaryColor;
      if (customer.accentColor) newData.theme.accentColor = customer.accentColor;
      return newData;
    });
    setImportSuccess(`Data ${customer.businessName || 'Customer'} berhasil diimport!`);
    setTimeout(() => setImportSuccess(''), 5000);
  };

  const handleChange = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setData((prev) => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const handleAddArrayItem = (section, emptyItem) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], emptyItem]
    }));
  };

  const handleRemoveArrayItem = (section, index) => {
    setData((prev) => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const handleColorUpgrade = async (contextOverride = null) => {
    const ctx = contextOverride || {
      businessName: data.business.name,
      description: data.business.description,
      services: data.services,
    };
    if (contextOverride?.customerId) {
      setUpgradingCustomerId(contextOverride.customerId);
    } else {
      setColorUpgradeLoading(true);
    }
    setColorUpgradeError('');
    setColorUpgradeResult(null);

    const result = await upgradeThemeColor(ctx);

    if (result.success) {
      // Apply colors to theme immediately
      setData(prev => ({
        ...prev,
        theme: {
          ...prev.theme,
          primaryColor: result.data.primaryColor,
          secondaryColor: result.data.secondaryColor,
          accentColor: result.data.accentColor,
        }
      }));
      setColorUpgradeResult(result.data);
    } else {
      setColorUpgradeError(result.error || 'Gagal upgrade warna.');
    }

    setColorUpgradeLoading(false);
    setUpgradingCustomerId(null);
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiError('');
    setAiSuccess(false);

    const result = await generateWebsiteContent(aiPrompt);

    if (result.success) {
      setData(result.data);
      setAiSuccess(true);
      setTimeout(() => setAiSuccess(false), 5000);
    } else {
      setAiError(result.error || 'Terjadi kesalahan saat generate konten.');
    }
    setAiLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-sm rounded-lg border border-gray-200 mt-6">
      
      {activeTab === 'ai' && (
        <section className="animate-fadeIn">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Website Generator</h2>
            <p className="text-gray-500 text-sm">Deskripsikan bisnis Anda, dan AI akan mengisi seluruh konten & warna website secara otomatis.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsikan Bisnis Anda</label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Contoh: Wedding Organizer bernama Sultan's Management di Jakarta. Layanan meliputi wedding planning, event corporate, dan dekorasi. Target market menengah ke atas dengan tema elegan dan mewah."
                className="w-full border border-gray-300 rounded-xl p-4 h-40 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 text-sm mb-2">💡 Tips untuk hasil terbaik:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Sebutkan <strong>nama bisnis</strong> dan <strong>jenis usaha</strong></li>
                <li>• Jelaskan <strong>layanan/produk</strong> yang ditawarkan</li>
                <li>• Sebutkan <strong>target market</strong> dan <strong>lokasi</strong></li>
                <li>• Tentukan <strong>mood/gaya</strong> yang diinginkan (mewah, modern, minimalis, dll)</li>
              </ul>
            </div>

            <button
              onClick={handleAiGenerate}
              disabled={aiLoading || !aiPrompt.trim()}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                aiLoading
                  ? 'bg-gray-300 text-gray-500 cursor-wait'
                  : !aiPrompt.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {aiLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>AI sedang membuat website Anda...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Generate Website dengan AI</span>
                </>
              )}
            </button>

            {aiError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm flex items-start space-x-2">
                <span>❌</span>
                <span>{aiError}</span>
              </div>
            )}

            {aiSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm flex items-start space-x-2">
                <span>✅</span>
                <div>
                  <p className="font-semibold">Website berhasil di-generate!</p>
                  <p className="mt-1 opacity-80">Semua konten, warna, layanan, portofolio, dan testimoni telah diisi oleh AI. Anda bisa mengeditnya di tab-tab lainnya, atau klik "Preview Site" untuk melihat hasilnya.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'import' && (
        <section className="animate-fadeIn">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📥</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Import dari Database Customer</h2>
            <p className="text-gray-500 text-sm">Pilih customer dari database untuk otomatis mengisi data bisnis dan tema warna.</p>
          </div>

          {importSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm flex items-center space-x-2 mb-6">
              <span>✅</span>
              <span className="font-semibold">{importSuccess}</span>
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700">Daftar Customer ({customers.length})</h3>
            <button 
              onClick={fetchCustomers} 
              disabled={loadingCustomers}
              className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {loadingCustomers ? 'Memuat...' : 'Refresh'}
            </button>
          </div>

          <div className="mb-4 relative">
            <input 
              type="text" 
              placeholder="Cari nama bisnis, deskripsi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {loadingCustomers && customers.length === 0 ? (
              <div className="text-center py-8 text-gray-400">Loading data dari Firebase...</div>
            ) : (() => {
              const filteredCustomers = customers.filter(c => 
                (c.businessName || c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (c.slogan || c.aboutUs || '').toLowerCase().includes(searchQuery.toLowerCase())
              );
              
              if (filteredCustomers.length === 0) {
                return <div className="text-center py-8 text-gray-400 border border-dashed border-gray-200 rounded-xl">{searchQuery ? 'Customer tidak ditemukan.' : 'Belum ada customer.'}</div>;
              }

              return filteredCustomers.map(customer => (
                <div key={customer.id} className="p-4 bg-white border border-gray-200 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{customer.businessName || customer.name || 'Unnamed Customer'}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{customer.slogan || customer.aboutUs || 'Tidak ada deskripsi'}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{customer.category || 'Uncategorized'}</span>
                      {customer.primaryColor && (
                        <div className="flex gap-1">
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customer.primaryColor }}></div>
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customer.secondaryColor }}></div>
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customer.accentColor }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleImportCustomer(customer)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
                    >
                      Import Data
                    </button>
                    <button
                      onClick={() => handleColorUpgrade({
                        customerId: customer.id,
                        businessName: customer.businessName || customer.name || '',
                        description: customer.slogan || customer.aboutUs || '',
                        services: data.services,
                      })}
                      disabled={upgradingCustomerId === customer.id}
                      className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 disabled:opacity-50 disabled:cursor-wait text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      {upgradingCustomerId === customer.id ? (
                        <>
                          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <><span>✨</span><span>AI Upgrade Warna</span></>
                      )}
                    </button>
                  </div>
                </div>
              ));
            })()}
          </div>
        </section>
      )}

      {activeTab === 'business' && (
        <section className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Profil & Informasi Bisnis</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Bisnis</label>
              <input type="text" value={data.business.name} onChange={(e) => handleChange('business', 'name', e.target.value)} className="w-full border border-gray-300 rounded-md p-3" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">URL Logo (Opsional)</label>
              <input type="text" value={data.business.logoURL || ''} onChange={(e) => handleChange('business', 'logoURL', e.target.value)} placeholder="https://contoh.com/logo.png" className="w-full border border-gray-300 rounded-md p-3" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Singkat</label>
              <textarea value={data.business.description} onChange={(e) => handleChange('business', 'description', e.target.value)} className="w-full border border-gray-300 rounded-md p-3 h-24" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tentang Kami</label>
              <textarea value={data.business.about} onChange={(e) => handleChange('business', 'about', e.target.value)} className="w-full border border-gray-300 rounded-md p-3 h-32" />
            </div>
          </div>
        </section>
      )}

      {activeTab === 'theme' && (
        <section className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Theme & Colors</h2>

          {/* AI Color Upgrade Panel */}
          <div className="mb-6 p-5 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-violet-800 text-sm flex items-center gap-2">✨ AI Color Upgrade</h3>
                <p className="text-xs text-violet-600 mt-1">Biarkan AI memilihkan palet warna terbaik berdasarkan profil bisnis Anda saat ini.</p>
              </div>
              <button
                onClick={() => handleColorUpgrade()}
                disabled={colorUpgradeLoading}
                className="shrink-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 disabled:opacity-50 disabled:cursor-wait text-white text-sm font-bold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                {colorUpgradeLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                    <span>AI Menganalisis...</span>
                  </>
                ) : (
                  <><span>✨</span><span>Upgrade Sekarang</span></>
                )}
              </button>
            </div>

            {colorUpgradeError && (
              <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-xs flex items-center gap-2">
                <span>❌</span><span>{colorUpgradeError}</span>
              </div>
            )}

            {colorUpgradeResult && (
              <div className="mt-4 bg-white rounded-xl border border-violet-100 p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Warna yang Diterapkan AI</p>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                    <div className="h-12" style={{ backgroundColor: colorUpgradeResult.primaryColor }}></div>
                    <div className="p-2 bg-white">
                      <p className="text-[10px] font-semibold text-gray-500">Primary</p>
                      <p className="text-xs font-mono font-bold text-gray-800">{colorUpgradeResult.primaryColor}</p>
                    </div>
                  </div>
                  <div className="flex-1 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                    <div className="h-12" style={{ backgroundColor: colorUpgradeResult.secondaryColor }}></div>
                    <div className="p-2 bg-white">
                      <p className="text-[10px] font-semibold text-gray-500">Secondary</p>
                      <p className="text-xs font-mono font-bold text-gray-800">{colorUpgradeResult.secondaryColor}</p>
                    </div>
                  </div>
                  <div className="flex-1 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                    <div className="h-12" style={{ backgroundColor: colorUpgradeResult.accentColor }}></div>
                    <div className="p-2 bg-white">
                      <p className="text-[10px] font-semibold text-gray-500">Accent</p>
                      <p className="text-xs font-mono font-bold text-gray-800">{colorUpgradeResult.accentColor}</p>
                    </div>
                  </div>
                </div>
                {colorUpgradeResult.reason && (
                  <div className="bg-violet-50 rounded-lg p-3 border border-violet-100">
                    <p className="text-[11px] text-violet-700"><span className="font-bold">💡 Alasan AI:</span> {colorUpgradeResult.reason}</p>
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleColorUpgrade()}
                    className="flex-1 py-2 text-xs font-semibold border border-violet-300 text-violet-700 rounded-lg hover:bg-violet-50 transition-colors"
                  >
                    🔄 Coba Warna Lain
                  </button>
                  <button
                    onClick={() => setColorUpgradeResult(null)}
                    className="py-2 px-3 text-xs font-semibold border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ✕ Tutup
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 p-4 rounded-xl border border-blue-100 bg-blue-50/50">
            <h3 className="font-bold text-blue-800 mb-4 text-sm uppercase tracking-wider">Warna Global (Default)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-2">Primary</label>
                <div className="flex items-center space-x-2">
                  <input type="color" className="w-8 h-8 rounded cursor-pointer shrink-0" value={data.theme.primaryColor} onChange={(e) => handleChange('theme', 'primaryColor', e.target.value)} />
                  <input type="text" className="w-full text-xs border border-gray-300 rounded p-1 uppercase" value={data.theme.primaryColor} onChange={(e) => handleChange('theme', 'primaryColor', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Secondary</label>
                <div className="flex items-center space-x-2">
                  <input type="color" className="w-8 h-8 rounded cursor-pointer shrink-0" value={data.theme.secondaryColor} onChange={(e) => handleChange('theme', 'secondaryColor', e.target.value)} />
                  <input type="text" className="w-full text-xs border border-gray-300 rounded p-1 uppercase" value={data.theme.secondaryColor} onChange={(e) => handleChange('theme', 'secondaryColor', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Accent</label>
                <div className="flex items-center space-x-2">
                  <input type="color" className="w-8 h-8 rounded cursor-pointer shrink-0" value={data.theme.accentColor} onChange={(e) => handleChange('theme', 'accentColor', e.target.value)} />
                  <input type="text" className="w-full text-xs border border-gray-300 rounded p-1 uppercase" value={data.theme.accentColor} onChange={(e) => handleChange('theme', 'accentColor', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 rounded-xl border border-purple-100 bg-purple-50/50">
            <h3 className="font-bold text-purple-800 mb-4 text-sm uppercase tracking-wider">Style Animasi</h3>
            <p className="text-xs text-purple-600 mb-3">Pilih gaya animasi yang sesuai dengan jenis bisnis Anda (Warna akan tetap sama, hanya efek kemunculannya yang berubah).</p>
            <div>
              <select 
                value={data.theme.animationMode || 'wo'} 
                onChange={(e) => handleChange('theme', 'animationMode', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="wo">Wedding Organizer (Elegan, Lambat, Lembut)</option>
                <option value="eo">Event Organizer (Dinamis, Cepat, Menghentak)</option>
                <option value="travel">Tour & Travel (Ceria, Mengapung, Mengalir)</option>
              </select>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider mt-8">Warna Per Bagian (Kustom)</h3>
          <p className="text-xs text-gray-500 mb-4">Ganti warna ini jika Anda ingin setiap halaman/bagian memiliki warna yang berbeda.</p>
          <div className="space-y-3">
            {[
              { id: 'navbar', label: 'Navbar', hasBtn: true },
              { id: 'hero', label: 'Hero (Beranda)', hasBtn: true },
              { id: 'about', label: 'Tentang Kami', hasBtn: false },
              { id: 'services', label: 'Layanan & Harga', hasBtn: true },
              { id: 'portfolio', label: 'Portofolio', hasBtn: true },
              { id: 'testimonials', label: 'Testimoni', hasBtn: false },
              { id: 'booking', label: 'Form Booking', hasBtn: true },
              { id: 'footer', label: 'Footer', hasBtn: false }
            ].map(sec => {
              // Determine default based on original design
              const isDarkDefault = ['navbar', 'hero', 'testimonials', 'footer'].includes(sec.id);
              const defaultBg = isDarkDefault ? data.theme.primaryColor : data.theme.secondaryColor;
              const defaultText = isDarkDefault ? data.theme.secondaryColor : data.theme.primaryColor;
              
              // By default, button is inverted from section colors
              const defaultBtnBg = defaultText;
              const defaultBtnText = defaultBg;
              
              return (
                <div key={sec.id} className="flex flex-col p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
                  <span className="font-semibold text-sm text-gray-700 mb-3">{sec.label}</span>
                  <div className="flex justify-between items-center w-full">
                    {/* Section Colors */}
                    <div className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] text-gray-500 mb-1 font-semibold uppercase">Bagian BG</span>
                        <input type="color" className="w-8 h-8 rounded cursor-pointer border-0 p-0 mb-1 shrink-0" value={data.theme[`${sec.id}Bg`] || defaultBg} onChange={(e) => handleChange('theme', `${sec.id}Bg`, e.target.value)} />
                        <input type="text" className="w-14 text-[10px] text-center border border-gray-200 rounded p-0.5 uppercase" value={data.theme[`${sec.id}Bg`] || defaultBg} onChange={(e) => handleChange('theme', `${sec.id}Bg`, e.target.value)} />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] text-gray-500 mb-1 font-semibold uppercase">Bagian Teks</span>
                        <input type="color" className="w-8 h-8 rounded cursor-pointer border-0 p-0 mb-1 shrink-0" value={data.theme[`${sec.id}Text`] || defaultText} onChange={(e) => handleChange('theme', `${sec.id}Text`, e.target.value)} />
                        <input type="text" className="w-14 text-[10px] text-center border border-gray-200 rounded p-0.5 uppercase" value={data.theme[`${sec.id}Text`] || defaultText} onChange={(e) => handleChange('theme', `${sec.id}Text`, e.target.value)} />
                      </div>
                    </div>

                    {/* Button Colors */}
                    {sec.hasBtn && (
                      <div className="flex space-x-4 border-l pl-4">
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] text-blue-500 mb-1 font-semibold uppercase">Tombol BG</span>
                          <input type="color" className="w-8 h-8 rounded cursor-pointer border-0 p-0 mb-1 shrink-0" value={data.theme[`${sec.id}BtnBg`] || data.theme[`${sec.id}Text`] || defaultBtnBg} onChange={(e) => handleChange('theme', `${sec.id}BtnBg`, e.target.value)} />
                          <input type="text" className="w-14 text-[10px] text-center border border-gray-200 rounded p-0.5 uppercase" value={data.theme[`${sec.id}BtnBg`] || data.theme[`${sec.id}Text`] || defaultBtnBg} onChange={(e) => handleChange('theme', `${sec.id}BtnBg`, e.target.value)} />
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] text-blue-500 mb-1 font-semibold uppercase">Tombol Teks</span>
                          <input type="color" className="w-8 h-8 rounded cursor-pointer border-0 p-0 mb-1 shrink-0" value={data.theme[`${sec.id}BtnText`] || data.theme[`${sec.id}Bg`] || defaultBtnText} onChange={(e) => handleChange('theme', `${sec.id}BtnText`, e.target.value)} />
                          <input type="text" className="w-14 text-[10px] text-center border border-gray-200 rounded p-0.5 uppercase" value={data.theme[`${sec.id}BtnText`] || data.theme[`${sec.id}Bg`] || defaultBtnText} onChange={(e) => handleChange('theme', `${sec.id}BtnText`, e.target.value)} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {activeTab === 'contact' && (
        <section className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Lokasi & Kontak</h2>
          <div className="space-y-6">
            <div><label className="block text-sm font-semibold mb-2">WhatsApp <span className="font-normal text-gray-400">(format: 628xxx)</span></label><input type="text" value={data.contact.whatsapp} onChange={(e) => handleChange('contact', 'whatsapp', e.target.value)} className="w-full border border-gray-300 rounded-md p-3" /></div>
            <div><label className="block text-sm font-semibold mb-2">Email</label><input type="text" value={data.contact.email} onChange={(e) => handleChange('contact', 'email', e.target.value)} className="w-full border border-gray-300 rounded-md p-3" /></div>
            <div><label className="block text-sm font-semibold mb-2">Alamat Lengkap</label><textarea value={data.contact.address} onChange={(e) => handleChange('contact', 'address', e.target.value)} className="w-full border border-gray-300 rounded-md p-3 h-24" /></div>
            
            {/* Maps URL */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Google Maps Embed URL <span className="font-normal text-gray-400">(opsional)</span>
              </label>
              <input
                type="text"
                value={data.contact.mapsUrl || ''}
                onChange={(e) => handleChange('contact', 'mapsUrl', e.target.value)}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full border border-gray-300 rounded-md p-3 text-sm"
              />
              {/* Step-by-step guide */}
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-semibold text-amber-800 text-sm mb-2">📍 Cara mendapatkan URL Embed Maps:</p>
                <ol className="text-xs text-amber-700 space-y-1 list-decimal list-inside">
                  <li>Buka <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="underline font-semibold">maps.google.com</a></li>
                  <li>Cari nama bisnis atau alamat Anda</li>
                  <li>Klik tombol <strong>Share</strong> (ikon bagikan)</li>
                  <li>Pilih tab <strong>"Embed a map"</strong></li>
                  <li>Klik <strong>"Copy HTML"</strong></li>
                  <li>Dari kode yang dicopy, ambil hanya bagian URL-nya saja dari <code className="bg-amber-100 px-1 rounded">src="..."</code></li>
                </ol>
                <p className="text-xs text-amber-600 mt-2">Contoh: <code className="bg-amber-100 px-1 rounded break-all">https://www.google.com/maps/embed?pb=!1m18...</code></p>
              </div>
              {/* Preview */}
              {data.contact.mapsUrl && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Preview:</p>
                  <iframe
                    src={data.contact.mapsUrl}
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Maps Preview"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}


      {activeTab === 'services' && (
        <section className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Produk / Jasa & Pricelist</h2>
          <div className="space-y-8 mb-6">
            {data.services.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 relative">
                <button onClick={() => handleRemoveArrayItem('services', index)} className="absolute top-2 right-2 text-red-500 text-sm font-bold hover:text-red-700">Hapus</button>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div><label className="block text-sm font-semibold mb-1">Nama</label><input type="text" value={service.name} onChange={(e) => handleArrayChange('services', index, 'name', e.target.value)} className="w-full border p-2" /></div>
                  <div><label className="block text-sm font-semibold mb-1">Harga</label><input type="text" value={service.price} onChange={(e) => handleArrayChange('services', index, 'price', e.target.value)} className="w-full border p-2" /></div>
                  <div className="col-span-2"><label className="block text-sm font-semibold mb-1">Deskripsi</label><textarea value={service.description} onChange={(e) => handleArrayChange('services', index, 'description', e.target.value)} className="w-full border p-2" /></div>
                  <div className="col-span-2"><label className="block text-sm font-semibold mb-1">URL Gambar</label><input type="text" value={service.image} onChange={(e) => handleArrayChange('services', index, 'image', e.target.value)} className="w-full border p-2" /></div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => handleAddArrayItem('services', { id: Date.now(), name: 'Layanan Baru', description: 'Deskripsi...', price: 'Rp 0', image: '' })} className="w-full py-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold hover:bg-blue-100">+ Tambah Layanan</button>
        </section>
      )}

      {activeTab === 'portfolio' && (
        <section className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Portofolio & Dokumentasi</h2>
          <div className="space-y-8 mb-6">
            {data.portfolio.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 grid grid-cols-2 gap-4 relative">
                <button onClick={() => handleRemoveArrayItem('portfolio', index)} className="absolute top-2 right-2 text-red-500 text-sm font-bold hover:text-red-700">Hapus</button>
                <div className="mt-2"><label className="block text-sm font-semibold mb-1">Judul</label><input type="text" value={item.title} onChange={(e) => handleArrayChange('portfolio', index, 'title', e.target.value)} className="w-full border p-2" /></div>
                <div className="mt-2"><label className="block text-sm font-semibold mb-1">Kategori</label><input type="text" value={item.category} onChange={(e) => handleArrayChange('portfolio', index, 'category', e.target.value)} className="w-full border p-2" /></div>
                <div className="col-span-2"><label className="block text-sm font-semibold mb-1">URL Gambar</label><input type="text" value={item.image} onChange={(e) => handleArrayChange('portfolio', index, 'image', e.target.value)} className="w-full border p-2" /></div>
              </div>
            ))}
          </div>
          <button onClick={() => handleAddArrayItem('portfolio', { id: Date.now(), title: 'Judul Baru', category: 'Semua', image: '' })} className="w-full py-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold hover:bg-blue-100">+ Tambah Portofolio</button>
        </section>
      )}

      {activeTab === 'testimonials' && (
        <section className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Testimoni Customer</h2>
          <div className="space-y-8 mb-6">
            {data.testimonials.map((testi, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 relative">
                <button onClick={() => handleRemoveArrayItem('testimonials', index)} className="absolute top-2 right-2 text-red-500 text-sm font-bold hover:text-red-700">Hapus</button>
                <div className="mt-2"><label className="block text-sm font-semibold mb-1">Nama Customer</label><input type="text" value={testi.name} onChange={(e) => handleArrayChange('testimonials', index, 'name', e.target.value)} className="w-full border p-2 mb-4" /></div>
                <div><label className="block text-sm font-semibold mb-1">Review</label><textarea value={testi.text} onChange={(e) => handleArrayChange('testimonials', index, 'text', e.target.value)} className="w-full border p-2" /></div>
                <div><label className="block text-sm font-semibold mb-1">Rating</label><input type="number" min="1" max="5" value={testi.rating || 5} onChange={(e) => handleArrayChange('testimonials', index, 'rating', parseInt(e.target.value))} className="w-full border p-2" /></div>
              </div>
            ))}
          </div>
          <button onClick={() => handleAddArrayItem('testimonials', { id: Date.now(), name: 'Nama', text: 'Review...', rating: 5 })} className="w-full py-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold hover:bg-blue-100">+ Tambah Testimoni</button>
        </section>
      )}

    </div>
  );
};

export default EditorForm;
