import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Generator from './pages/Generator';
import PublishedSite from './pages/PublishedSite';
import PasswordGate from './components/PasswordGate';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('site_auth_7arzz') === 'granted';
  });

  const handleLogout = () => {
    localStorage.removeItem('site_auth_7arzz');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <PasswordGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Generator onLogout={handleLogout} />} />
        <Route path="/:slug" element={<PublishedSite onLogout={handleLogout} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
