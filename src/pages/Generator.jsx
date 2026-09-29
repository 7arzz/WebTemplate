import React, { useState } from "react";
import { defaultData } from "../utils/schema";
import Template01 from "../templates/template-01/Template01";
import EditorForm from "../components/Generator/SidebarEditor"; // Now functions as EditorForm
import { exportWebsite } from "../utils/exportWebsite";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const Generator = () => {
  const [data, setData] = useState(defaultData);
  const [publishedSlug, setPublishedSlug] = useState(null);

  // Dashboard states
  const [activeTab, setActiveTab] = useState("business");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleExport = () => {
    exportWebsite(data);
  };

  const handlePublish = async () => {
    const slug = data.business.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    try {
      // Simpan ke Firestore agar bisa diakses dari device manapun
      await setDoc(doc(db, "sites", slug), {
        ...data,
        slug,
        updatedAt: new Date().toISOString(),
      });
      setPublishedSlug(slug);
    } catch (err) {
      console.error("Publish gagal:", err);
      alert("Gagal publish. Cek koneksi dan coba lagi.");
    }
  };

  const navItems = [
    { id: "ai", label: "AI Generator", icon: "🤖" },
    { id: "import", label: "Import Data", icon: "📥" },
    { id: "business", label: "Business Info", icon: "🏢" },
    { id: "theme", label: "Theme & Colors", icon: "🎨" },
    { id: "contact", label: "Contact Details", icon: "📞" },
    { id: "services", label: "Services", icon: "⚙️" },
    { id: "portfolio", label: "Portfolio", icon: "📸" },
    { id: "testimonials", label: "Testimonials", icon: "⭐" },
  ];

  if (isPreviewMode) {
    return (
      <div className="flex flex-col h-screen bg-gray-100 font-sans relative">
        {/* Floating Preview Controls */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full flex items-center space-x-6 shadow-2xl z-[99999]">
          <button
            onClick={() => setIsPreviewMode(false)}
            className="flex items-center space-x-2 text-sm font-semibold hover:text-gray-300 transition-colors"
          >
            <span>← Back to Editor</span>
          </button>
          <div className="w-px h-4 bg-gray-600"></div>
          <span className="font-semibold text-sm">Live Preview</span>
          <div className="w-px h-4 bg-gray-600"></div>
          <button
            onClick={handlePublish}
            className="text-sm font-bold text-green-400 hover:text-green-300 transition-colors"
          >
            Publish
          </button>
        </div>

        {/* Render Template */}
        <div
          className="flex-1 overflow-y-auto bg-white"
          style={{
            "--primary-color": data.theme.primaryColor,
            "--secondary-color": data.theme.secondaryColor,
            "--accent-color": data.theme.accentColor,
          }}
        >
          {data.theme.templateId === "template-01" ? (
            <Template01 data={data} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Template not found
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Dashboard Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Karya<span className="text-blue-500">Gen</span>
          </h1>
          <p className="text-gray-400 text-xs mt-1">
            Website Builder Dashboard
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                activeTab === item.id
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-3">
          <div className="text-xs text-gray-500 text-center mb-2">
            Ready to go live?
          </div>
          <button
            onClick={() => setIsPreviewMode(true)}
            className="w-full flex justify-center items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors font-medium border border-gray-700"
          >
            <span>👁️</span>
            <span>Preview Site</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {navItems.find((i) => i.id === activeTab)?.label}
          </h2>

          <div className="flex items-center space-x-4">
            {publishedSlug && (
              <a
                href={`/${publishedSlug}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-green-600 hover:text-green-700 underline"
              >
                View Published Link
              </a>
            )}
            <button
              onClick={handleExport}
              className="px-5 py-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-lg transition-colors border border-blue-200"
            >
              Export ZIP
            </button>
            <button
              onClick={handlePublish}
              className="px-6 py-2 text-sm bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-sm shadow-green-200"
            >
              Publish
            </button>
          </div>
        </header>

        {/* Form Container */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <EditorForm data={data} setData={setData} activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
};

export default Generator;
