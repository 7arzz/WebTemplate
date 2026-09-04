import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Template01 from '../templates/template-01/Template01';

const PublishedSite = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching from a database by checking localStorage
    const savedData = localStorage.getItem(`site_${slug}`);
    
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing saved site data", e);
      }
    }
    
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-xl">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-100 text-center p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-6">Website Not Found</p>
        <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Create Your Own Website
        </a>
      </div>
    );
  }

  // Inject CSS variables for the template if needed
  return (
    <div style={{
      '--primary-color': data.theme.primaryColor,
      '--secondary-color': data.theme.secondaryColor,
      '--accent-color': data.theme.accentColor,
    }}>
      {data.theme.templateId === 'template-01' ? (
        <Template01 data={data} />
      ) : (
        <div>Template not supported.</div>
      )}
    </div>
  );
};

export default PublishedSite;
